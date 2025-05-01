$(document).ready(function(){
  // 로딩시 -----------------------------------
  $.ajax({
    url: '../data/IR.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      // 데이터 출력
      readData(data);
      // 페이지네이션 버튼 생성
      pagenation(data);

      // 페이지네이션 버튼에 클릭 이벤트 리스너 추가
      $('ul.pagination .page-item').on('click', function(event) { pageBtn(event, data); });
      
      // 검색 버튼 클릭 & 엔터 => 검색
      $('.search_ir').on('click', function() { searchIR(data); });
      $('#search_ir').on('keyup', function(event) {
        if (event.key === 'Enter') { // 엔터 키가 눌리면
          searchIR(data);
        }
      });
    },
    error: function(err){
      console.log(err);
    }
  })
});

// 재활용 함수 --------------------------------------------------------
// 게시판 데이터 출력
function readData(data){
  let tbody_ir = '';
  for(let i=0; i<10; i++){
    if(i >= data.length){break;}
    tbody_ir += '<tr>';
    tbody_ir += '<td>' + data[i].id + '</td>';
    tbody_ir += '<td><a href="#">' + data[i].title + '</a></td>';
    tbody_ir += '<td><a href="#">' + data[i].file + '<i class="fa-solid fa-download"></i></a></td>';
    tbody_ir += '<td>' + data[i].date + '</td>';
    tbody_ir += '</tr>';
  }
  $('#tbody_ir')[0].innerHTML = tbody_ir;
}
// 페이지네이션 버튼 생성
function pagenation(data){
  const dataLength = data.length; // 데이터 총 길이
  const pages = Math.ceil(dataLength / 10); // 페이지 수
  let pagination = '';
  for(let i=0; i<pages; i++){
    if(i==0){
      pagination += '<li class="page-item active">' + (i+1) + '</li>';
    }else{pagination += '<li class="page-item">' + (i+1) + '</li>';}
  }
  $('ul.pagination')[0].innerHTML = pagination;
};

// 페이지네이션 -------------------------------------------------------------
function pageBtn(e, data){
  // 현재 페이지면 return (active 클래스가 있으면 return)
  if(e.target.classList.contains('active')){return;}

  const pageNum = e.target.innerText; // 클릭한 페이지 번호
  $('ul.pagination .page-item').removeClass('active'); // 모든 페이지 버튼 active 클래스 제거
  e.target.classList.add('active'); // 클릭한 페이지 버튼 active 클래스 추가
  let tbody_ir = '';
  // (pageNum-1)*10 부터
  // pgeaNum*10 까지
  for (let i = (pageNum-1)*10; i < pageNum*10; i++){
    // 출력하려는 페이지의 데이터가 10개 미만일 때 break
    // 즉, i(게시글 번호)가 데이터 총 길이보다 클 때 break
    if(i >= data.length){break;}

    tbody_ir += '<tr>';
    tbody_ir += '<td>' + data[i].id + '</td>';
    tbody_ir += '<td><a href="#">' + data[i].title + '</a></td>';
    tbody_ir += '<td><a href="#">' + data[i].file + '<i class="fa-solid fa-download"></i></a></td>';
    tbody_ir += '<td>' + data[i].date + '</td>';
    tbody_ir += '</tr>';
  }
  $('#tbody_ir')[0].innerHTML = tbody_ir;
}
// 검색 -------------------------------------------------------------------
let isOpen = false;
let isSearch = false;
function searchIR(data){
  const search_ir = $('#search_ir').val(); // 검색어
  if(!isOpen){
    $('#search_ir').removeClass('hidden');
    isOpen = true;
  }else{
    if(!search_ir){
      $('#search_ir').addClass('hidden');
      // 검색어가 없을때는 닫고 원래 데이터 출력
      if(isSearch){ // 검색 된 상태에서 닫았을 때
        readData(data);
        pagenation(data);
        $('ul.pagination .page-item').on('click', function(event) { pageBtn(event, data); });
        isSearch = false;
      }
      isOpen = false;
    }else{
      isSearch = true;
      // 검색어가 있을때는 검색
      let newData = [];
      // 데이터 전부 검색(data.length)해서 검색어가 있는 데이터만 newData에 push
      for(let i=0; i < data.length; i++){
        // indexOf가 -1이 아니면 검색어가 있다는 뜻
        if(data[i].title.indexOf(search_ir) != -1){newData.push(data[i])}
      }

      // 검색 결과 1페이지
      readData(newData);
      // 페이지네이션도 결과값에 따라 수정
      pagenation(newData);
      $('ul.pagination .page-item').on('click', function(event) { pageBtn(event, newData); });
    }
}};