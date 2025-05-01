$(document).ready(function () {
  let dataCache = {};  // 카테고리별 데이터 캐시
  let visibleItems = {};  // 각 카테고리별 표시할 개수
  let totalItems = {};  // 각 카테고리별 전체 개수
  let searchQuery = '';  // 검색어 저장
  let searchResults = [];  // 검색 결과 저장
  
  // 아코디언 컨텐츠 내용########################################################################
  
  // JSON 데이터 로드
  function loadCategoryData(tabNumber) {
    let categoryFile = `../data/faq_category${tabNumber < 10 ? '0' : ''}${tabNumber}.json`;
    $.getJSON(categoryFile, function (data) {
      dataCache[tabNumber] = data;
      totalItems[tabNumber] = data.length;
      visibleItems[tabNumber] = 10;  // 기본 10개 표시
      loadItems(tabNumber);
    }).fail(function () {
      console.error(`탭 ${tabNumber} 데이터 로드 실패`);
    });
  }

  // 데이터 표시
  function loadItems(tabNumber) {
    let faqContainer = `#faq_container${tabNumber < 10 ? '0' : ''}${tabNumber}`;
    let loadMoreBtn = `#load_more${tabNumber}`;

    let faqHtml = "";
    for (let i = 0; i < Math.min(visibleItems[tabNumber], totalItems[tabNumber]); i++) {
      let item = dataCache[tabNumber][i];

      if (!item.subcategory) {
        faqHtml += `
          <div class="faq_content" data-toggle="collapse" data-target="#collapse${tabNumber}-${i}" aria-expanded="false" aria-controls="collapse${tabNumber}-${i}">
            <div id="content${tabNumber}-${i}" onclick="showCategory(event)">
              <a data-toggle="collapse" data-target="#collapse${tabNumber}-${i}" aria-expanded="false" aria-controls="collapse${tabNumber}-${i}">
                ${item.title}
                <i class="fa-solid fa-chevron-down"></i>
              </a>
            </div>
            <div id="collapse${tabNumber}-${i}" class="collapse" aria-labelledby="content${tabNumber}-${i}" data-parent="${faqContainer}">
              ${item.content}
            </div>
          </div>`;
      } else {
        faqHtml += `
          <div class="faq_content" data-toggle="collapse" data-target="#collapse${tabNumber}-${i}" aria-expanded="false" aria-controls="collapse${tabNumber}-${i}">
            <div id="content${tabNumber}-${i}" onclick="showCategory(event)">
              <a data-toggle="collapse" data-target="#collapse${tabNumber}-${i}" aria-expanded="false" aria-controls="collapse${tabNumber}-${i}">
                [${item.subcategory}] ${item.title}
                <i class="fa-solid fa-chevron-down"></i>
              </a>
            </div>
            <div id="collapse${tabNumber}-${i}" class="collapse" aria-labelledby="content${tabNumber}-${i}" data-parent="${faqContainer}">
              ${item.content}
            </div>
          </div>`;
      }
    }

    $(faqContainer).html(faqHtml);

    // 더보기 버튼 표시/숨김 처리
    if (visibleItems[tabNumber] >= totalItems[tabNumber]) $(loadMoreBtn).hide();
    else $(loadMoreBtn).show().html(`더보기(${visibleItems[tabNumber]} / ${totalItems[tabNumber]}) <i class="fa-solid fa-chevron-down"></i>`);
  }

  // 더보기 버튼 클릭 이벤트
  $(document).on('click', '[id^="load_more"]', function () {
    let tabNumber = $(this).attr('id').replace('load_more', '');
    visibleItems[tabNumber] += 10;
    loadItems(tabNumber);
  });

  // 검색 기능###################################################################################
  // 검색 버튼 및 엔터키 이벤트
  $(document).on('click', '#search_btn', function () {
    searchQuery = $('#question').val().trim().toLowerCase();
    performSearch();
  });
  
  $(document).on('keypress', '#question', function (e) {
    if (e.which === 13) { // 엔터키 (keyCode 13)
      e.preventDefault(); // 폼 제출 방지
      searchQuery = $('#question').val().trim().toLowerCase();
      performSearch();
    }
  });  

  // 검색 실행
  function performSearch() {
    if (!searchQuery) {
      console.log("검색어 없음");
      return;
    }

    searchResults = [];
    for (let tab in dataCache) {
      let filtered = dataCache[tab].filter(item =>
        item.title.toLowerCase().includes(searchQuery) ||
        (item.content && item.content.toLowerCase().includes(searchQuery))
      );
      searchResults = searchResults.concat(filtered);
    }

    if (searchResults.length === 0) {
      $('#search_results').html('<p>검색 결과가 없습니다.</p>');
      return;
    }

    // 기존 컨텐츠 숨기고 검색 결과 표시
    $('#tab_list, .tab-content').hide(); // 기존 FAQ 탭 & 내용 숨기기
    $('#search_results_container').show(); // 검색 결과 컨테이너 보이기

    // 검색 결과 표시
    displaySearchResults(10);
  }

  // 검색 결과 10개씩 표시
  function displaySearchResults(count) {
    let resultHtml = '';
    let totalResults = searchResults.length;
    let visibleResults = Math.min(count, totalResults);
    

    for (let i = 0; i < visibleResults; i++) {
      let item = searchResults[i];

      let subcategoryText = item.subcategory ? `[${item.subcategory}] ` : '';
      resultHtml += `
        <div class="faq_content">
          <div id="search_content${i}" onclick="showCategory(event)">
            <a data-toggle="collapse" data-target="#search_collapse${i}" aria-expanded="false" aria-controls="search_collapse${i}">
              ${subcategoryText}${item.title}
              <i class="fa-solid fa-chevron-down"></i>
            </a>
          </div>
          <div id="search_collapse${i}" class="collapse" aria-labelledby="search_content${i}" data-parent="#search_results">
            ${item.content}
          </div>
        </div>`;
    }

    // 검색 결과 화면에 표시
    $('#search_results').html(resultHtml);

    // 검색 결과 더보기 버튼 표시/숨김 처리
    if (visibleResults >= totalResults) $('#more_search').hide();
    else $('#more_search').show().html(`더보기(${visibleResults} / ${totalResults}) <i class="fa-solid fa-chevron-down"></i>`);
  }

  // 검색 결과 더보기 버튼
  $('#more_search').on('click', function () {
    let currentCount = $('#search_results .faq_content').length;
    displaySearchResults(currentCount + 10);
  });

  // 탭 변경 시 데이터 로드
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    let targetTab = $(e.target).attr("href").replace('#category', '');
    if (!dataCache[targetTab]) {
      loadCategoryData(targetTab);
    } else {
      loadItems(targetTab);
    }
  });

  // 초기 로드
  for (let i = 1; i <= 14; i++) {
    loadCategoryData(i);
  }

  // 검색 태그 클릭 이벤트
  $(document).on('click', '#serch_tags li', function() {
    // 리스트 항목의 텍스트를 가져오고 '#' 제거
    let tagText = $(this).text().replace('# ', ''); 
    $('#question').val(tagText); // 검색창에 입력
    $('#search_btn').click(); // 검색 버튼 클릭 이벤트 발생
  });  
});

function showCategory(e) {
  let titleShow;
  let hasClasses;

  if(e.target.parentNode.id){
    // a태그가 선택 되었을 때
    titleShow = $(e.target.parentNode.parentNode.childNodes[1]);
    hasClasses =e.target.parentNode.parentNode.childNodes[3].classList;  
  }else{
    // div가 선택 되었을때
    titleShow = $(e.target.parentNode.childNodes[1]);
    hasClasses = e.target.parentNode.childNodes[3].classList;
  }

  const allChild = $('.faq_content>div:nth-child(1)'); // 모든 제목
  const allUpDown = ('.faq_content>div>a>i'); // 모든 <i> 태그
  const iconUpDown = titleShow[0].childNodes[1].childNodes[1]; // <i> 태그 선택

  $(allUpDown).removeClass('fa-chevron-up').addClass('fa-chevron-down');

  // 반응이 한박자 느리므로 거꾸로 처리
  // css를 직접 참조하기보다 클래스를 넣는게 더 안정적
  if(hasClasses.contains('show')) {
    // 접힐 때
    titleShow.removeClass('collapse_bg');
  }else{
    // 열릴 때
    allChild.removeClass('collapse_bg');
    titleShow.addClass('collapse_bg');
    $(iconUpDown).removeClass('fa-chevron-down').addClass('fa-chevron-up');
  }
}