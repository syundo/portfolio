$(document).ready(function(){
  // navigation data
  // json 파일로 만들어서 가져오지 않는 이유는 불러오는 시간이 오래 걸리기 때문
  const navData = {
    about: [
      {
        main_menu: "카카오뱅크",
        sub_menu: [
          "브랜드",
          "주주사 소개",
          "오시는 길",
          "제휴문의",
          "금융기술연구소-",
          "카카오뱅크 인증서-",
        ],
      },
      {
        main_menu: "윤리경영",
        sub_menu: ["윤리강령", "임직원행동기준"],
      },
      {
        main_menu: "새소식",
        sub_menu: ["공지사항", "입찰공고"],
      },
      {
        main_menu: "인재영입-",
        sub_menu: [],
      },
    ],
    IR: [
      {
        main_menu: "공시정보",
        sub_menu: [
          "전자공시",
          "경영공시",
          "바젤공시",
          "지배구조공시",
          "기타공시",
          "공시규정",
        ],
      },
      {
        main_menu: "경영정보",
        sub_menu: ["이사회", "이사회 구성 가이드라인", "지속가능경영"],
      },
      {
        main_menu: "재무정보",
        sub_menu: ["재무제표", "감사보고서", "영업보고서", "신용등급"],
      },
      {
        main_menu: "IR자료실",
        sub_menu: ["실적발표", "주가정보", "배당현황", "기업가치제고계획"],
      },
      {
        main_menu: "IR일정",
        sub_menu: ["IR행사", "IR미팅예약-", "주주총회"],
      },
      {
        main_menu: "공고",
        sub_menu: [],
      },
    ],
    products: [
      {
        main_menu: "통장/저축",
        sub_menu: [
          "입출금통장",
          "모임통장",
          "기록통장",
          "세이프박스",
          "저금통",
          "정기예금",
          "자유적금",
          "26주적금",
          "한달적금",
        ],
      },
      {
        main_menu: "대출",
        sub_menu: [
          "비상금대출",
          "마이너스 통장대출",
          "신용대출",
          "중고차 구매대출",
          "전월세보증금 대출",
          "전월세보증금 대출 갈아타기",
          "주택담보대출",
          "주택담보대출 갈아타기",
          "신용대출 비교하기",
          "신용대출 갈아타기",
          "내 신용정보",
        ],
      },
      {
        main_menu: "투자/외환",
        sub_menu: [
          "펀드",
          "증권사 주식계좌",
          "달러박스",
          "해외송금 보내기",
          "해외송금 받기",
        ],
      },
      {
        main_menu: "카드",
        sub_menu: [
          "프렌즈 체크카드",
          "모임 체크카드",
          "제휴 신용카드",
          "혜택 좋은 신용카드",
        ],
      },
      {
        main_menu: "사업자",
        sub_menu: [
          "개인사업자통장",
          "부가세박스",
          "개인사업자 신용대출",
          "개인사업자 보증서대출",
          "개인사업자 체크카드",
          "내 사업장 신용정보",
          "사업자 인증서",
        ],
      },
      {
        main_menu: "mini",
        sub_menu: ["카카오뱅크 mini", "mini카드", "mini 26일저금"],
      },
    ],
    FAQ: [
      {
        main_menu: "이용안내",
        sub_menu: [
          "자주 묻는 질문",
          "이용시간 안내",
          "ATM 이용안내",
          "ATM 이용안내 (달러박스)",
          "금리안내",
          "금리인하요구권 안내",
          "수수료안내",
          "상담안내",
          "채무자보호안내",
          "채무조정안내",
        ],
      },
      {
        main_menu: "상담하기",
        sub_menu: ["고객의 소리", "1:1 문의"],
      },
      {
        main_menu: "소비자보호",
        sub_menu: [
          "소비자보호체계",
          "소비자보호 우수사례",
          "전자민원",
          "소비자보호공시",
          "민원사무편람",
          "금융정보",
          "보안취약점 신고 안내",
          "판매대리·중개업자 증서",
          "비대면 금융사고 책임분담안내",
        ],
      },
      {
        main_menu: "금융사기대응",
        sub_menu: [
          "금융사기예방",
          "피해대처방법",
          "피해신고관련서식",
          "카카오뱅크 사칭제보",
          "불법도박 이용계좌 신고",
        ],
      },
      {
        main_menu: "증명서",
        sub_menu: ["나의 증명서 발급내역", "증명서 진위 확인"],
      },
      {
        main_menu: "약관 서식",
        sub_menu: ["약관", "서식", "상품설명서", "상품공시", "펀드공시"],
      },
    ],
  };
  let dropData = [];

  // 이전 페이지
  // let previousPage = document.referrer; // 이전 페이지의 URL
  // previousPage = previousPage.split('/');
  // previousPage = previousPage[previousPage.length-1];
  // previousPage = previousPage.split('.');
  // previousPage = previousPage[0];
  // console.log(previousPage);
  

  // Header-Navigation -------------------------------------------
  // navigation focus menu
  let location = window.location.href;
  location = location.split('/');
  location = location[location.length-1];
  location = location.split('.');
  location = location[0];
  // console.log(location);
  
  if(location == 'index'||location == 'products'){
    $('nav#main_nav>ul>ul>li>a').removeClass('active');
    $('nav#main_nav').css({
      'background-color': '#fff',
      'color': 'black'
    });
    $('nav#main_nav').css('border-bottom', '1px solid rgba(0, 0, 0, 0.1)');
    $('nav#main_nav>ul>li h1').css('color', 'black');
    $('nav#main_nav>ul>ul>li>a').css('color', 'black');
    $('nav#main_nav>ul>ul>li:nth-last-child(2)>#rel_site').css({
      'background-color': 'rgba(244, 244, 244, 0.8)',
      'color': 'rgb(68, 68, 68)',
      'border': '1px solid rgba(229, 229, 229, 0.8)'
    });
    if(location == 'products'){
      $('nav#main_nav>ul>ul>li>a').removeClass('active');
      $('nav#main_nav>ul>ul>li:nth-child(3)>a').addClass('active');
      $('nav#main_nav a.active').css('border-bottom', '3px solid black');
    }
  }else if(location == 'about'){
    $('nav#main_nav>ul>ul>li>a').removeClass('active');
    $('nav#main_nav>ul>ul>li:nth-child(1)>a').addClass('active');   
    elseCss();
  }else if(location == 'IR'){
    $('nav#main_nav>ul>ul>li>a').removeClass('active');
    $('nav#main_nav>ul>ul>li:nth-child(2)>a').addClass('active');
    elseCss();
  }else if(location == 'FAQ'){
    $('nav#main_nav>ul>ul>li>a').removeClass('active');
    $('nav#main_nav>ul>ul>li:nth-child(4)>a').addClass('active');
    $('nav#main_nav a.active').css('border-bottom', '3px solid black');
    $('nav#main_nav').css({
      'background-color': '#ffe100',
      'color': 'black'
    });
    $('nav#main_nav').css('border-bottom', '1px solid rgba(0, 0, 0, 0.1)');
    $('nav#main_nav>ul>li h1').css('color', 'black');
    $('nav#main_nav>ul>ul>li>a').css('color', 'black');
    $('nav#main_nav>ul>ul>li:nth-last-child(2)>#rel_site').css({
      'background-color': 'rgba(244, 244, 244, 0.8)',
      'color': 'rgb(68, 68, 68)',
      'border': '1px solid rgba(229, 229, 229, 0.8)'
    });
  }

  function elseCss(){
    $('nav#main_nav').css({
      'background-color': '#313955',
      'color': 'white'
    });
    $('nav#main_nav').css('border-bottom', '1px solid rgba(0, 0, 0, 0)');
    $('nav#main_nav>ul>li h1').css('color', 'white');
    $('nav#main_nav>ul>ul>li>a').css('color', 'white');
    $('nav#main_nav a.active').css('border-bottom', '3px solid white');
    $('nav#main_nav>ul>ul>li:nth-last-child(2)>#rel_site').css({
      'background-color': 'rgba(34,34,34,0.2)',
      'color': 'white',
      'border': '1px solid rgba(34, 34, 34, 0.1)'
    });
  };
    

  // dropdown menu-----------------------------------------------
  $('nav#main_nav>ul>ul>li>a').on('mouseenter', function(event){
    if(!location == 'index'){
      // 처음 메뉴를 눌렀을때 드롭다운이 바로 나오지 않도록 조건 추가 (visited)
      if(visited){getMenuData(event);}else return;
    }else {
      getMenuData(event);
    }
  });

  function getMenuData(e){
    const menu = e.target.innerText;
    if(menu == '은행소개'||menu == 'IR투자정보'||menu == '상품안내'||menu == '고객센터'){
      $('.nav_dropdown').css({'display': 'flex'});

      // dropdown menu data
      if(menu == '은행소개') dropData = navData.about;
      else if(menu == 'IR투자정보') dropData = navData.IR;
      else if(menu == '상품안내') dropData = navData.products;
      else if(menu == '고객센터') dropData = navData.FAQ;

      let dropHtml = '';
      for(let i=0;i<dropData.length;i++){
        if(dropData[i].main_menu.indexOf('-') != -1){
          const word = dropData[i].main_menu.slice(0, dropData[i].main_menu.indexOf('-'));
          dropHtml += `<li><h2><a href="#" target="_blank">${word}<i class="fa-solid fa-arrow-up-right-from-square"></i></a></h2>`;
        }else{
          dropHtml += `<li><h2><a href="#">${dropData[i].main_menu}</a></h2>`;
        }
        for(let j=0;j<dropData[i].sub_menu.length;j++){
          if(dropData[i].sub_menu[j].indexOf('-') != -1){
            const word = dropData[i].sub_menu[j].slice(0, dropData[i].sub_menu[j].indexOf('-'));
            dropHtml += `<a href="#" target="_blank">${word}<i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
          }else{
            dropHtml += `<a href="#">${dropData[i].sub_menu[j]}</a>`;
          }
        }
        dropHtml += `</li>`;
      };
      $('.nav_dropdown').html(dropHtml);
    }
  };

  // navigation css animation(mouse&scroll) -----------------------------------
  let visited = false;
  $('nav#main_nav>ul>ul>li:not(:nth-last-child(-n+2))>a').on('mouseenter', function(){activeNav();});
  $('nav#main_nav>ul>ul>li:not(:nth-last-child(-n+2))>a').on('mouseenter', function(){visited = true;});
  $('nav#main_nav').on('mouseleave', function(){
    inactiveNav();
    $('.nav_dropdown').css({'display': 'none'});
  });
  $('nav#main_nav>ul>ul>li:nth-last-child(-n+2)').on('mouseenter', function(){
    inactiveNav();
    $('.nav_dropdown').css({'display': 'none'});
  });
  let scrollY = 0;
  $(window).on('scroll', function(){
    scrollY = $(window).scrollTop();
    if($(window).scrollTop() > 40){
      activeNav();
    }else{
      inactiveNav();
    }
  });

  // navigation 활성화 함수
  function activeNav(){
    $('nav#main_nav>ul>li h1').css('color', 'black');
    $('nav#main_nav>ul>ul>li>a').css('color', 'black');
    $('nav#main_nav a.active').css('border-bottom', '3px solid #313955');
    $('nav#main_nav').css({
      'background-color': 'white',
      'border-bottom': '1px solid #f0f0f0'
    });
    $('nav#main_nav>ul>ul>li:nth-last-child(2)>#rel_site').css({
      'background-color': 'rgba(244, 244, 244, 0.8)',
      'color': 'rgb(68, 68, 68)',
      'border': '1px solid rgba(229, 229, 229, 0.8)'
    });
  }
  // navigation 비활성화 (menu에 따라 다르므로 조건을 다르게)
  function inactiveNav(){
    if(scrollY > 40){
      return;
    }else{
      if(location == 'index'||location == 'products'){
        $('nav#main_nav').css({
          'background-color': '#fff',
          'color': 'black'
        });
      }else if(location == 'FAQ'){
        $('nav#main_nav').css('background-color', '#ffe100');
        $('nav#main_nav').css('border-bottom', '1px solid rgba(0, 0, 0, 0.1)');
      }else{
        $('nav#main_nav a.active').css('border-bottom', '3px solid white');
        $('nav#main_nav').css('background-color', '#313955');
        $('nav#main_nav>ul>li h1').css('color', 'white');
        $('nav#main_nav>ul>ul>li>a').css('color', 'white');
        $('nav#main_nav>ul>ul>li:nth-last-child(2)>#rel_site').css({
          'background-color': 'rgba(34,34,34,0.2)',
          'color': 'white',
          'border': '1px solid rgba(34, 34, 34, 0.1)'
        });
      }
    }
  };

  // 관계 사이트
  let isClicked = false;
  $('#rel_site').on('click', function(event){
    event.stopPropagation(); // 이벤트 전파 방지
    if(!isClicked){
      $('#rel_site .fa-chevron-down').css('transform', 'rotate(-180deg)');
      $('.rel_drop').css({
        'opacity': '1',
        'height': 'auto',
        'overflow': 'visible',
        'top': '80px'
      });
      isClicked = true;
    }else{
      $('#rel_site .fa-chevron-down').css('transform', 'rotate(0deg)');
      $('.rel_drop').css({
        'opacity': '0',
        'height': '0',
        'overflow': 'hidden',
        'top': '100px'
      });
      isClicked = false;
    }
  });
  $(document).on('click', function() {
    $('#rel_site .fa-chevron-down').css('transform', 'rotate(0deg)');
    $('.rel_drop').css({
      'opacity': '0',
      'height': '0',
      'overflow': 'hidden',
      'top': '100px'
    });
    isClicked = false;
  });
});