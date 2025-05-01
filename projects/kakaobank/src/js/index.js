$(document).ready(function(){
  // slick
  $('.index_inner').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    prevArrow: '<a class="card-control-prev"><i class="fa-solid fa-chevron-left"></i></a>',
    nextArrow: '<a class="card-control-next"><i class="fa-solid fa-chevron-right"></i></a>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  // lndex
  let slickIndex = 0 ;
  function searchIndexCard(){
    slickIndex = $('.slick-current').data('slick-index');
    const currntCard = $(`.slide[data-slick-index="${slickIndex}"] img`);
    const prevCard = $(`.slide[data-slick-index="${slickIndex-1}"] img`);
    const nextCard = $(`.slide[data-slick-index="${slickIndex+1}"] img`);
    
    $('.slide img').css({
      'opacity': '0'
    });

    currntCard.css({
      'opacity': '1',
      'position': 'absolute',
      'left': '150px',
      'z-index': 1
    });
    prevCard.css({
      'opacity': '1',
      'position': 'absolute',
      'left': '254px',
      'z-index': -1
    });
    nextCard.css({
      'opacity': '1',
      'position': 'absolute',
      'left': '60px',
      'z-index': -1
    });
  };
  searchIndexCard()

  $('#index_carousel').on('afterChange', function(){
    searchIndexCard();
  });

  // animate가 스크롤이 되었을 때 실행하기
  $(window).on('scroll', function() {
    var scrollpos = $(window).scrollTop(); // 현재 스크롤 위치
    var content01 = $('#savingimg3').offset().top; // #content1 요소의 화면에서의 위치
    var content02 = $('#overseasimg').offset().top;
    var content03 = $('.moonoriginal').offset().top;
    var content04 = $('.sky_bg').offset().top;

    // 스크롤 값이 400을 넘고, #content1이 화면에 나타나면 애니메이션을 추가
    if (scrollpos + $(window).height() > content01 + 100) {
      $('#savingimg3').addClass('animate__animated animate__slideInRight').css('opacity', '1');
    }
    if (scrollpos + $(window).height() > content02 + 100) {
      $('#overseasimg').addClass('animate__animated animate__slideInUp').css('opacity', '1');
    }
    if (scrollpos + $(window).height() > content03 + 200) {
    }
    if (scrollpos + $(window).height() > content03 + 200) {
      $('.moonoriginal').addClass('animate-moon');
      $('.moonshadow').addClass('animate-shadow moon_transition');
    }else {
      $('.moonoriginal').removeClass('animate-moon');
      $('.moonshadow').removeClass('animate-shadow moon_transition');
    }
    if (scrollpos + $(window).height() > content04 + 500) {
      $('.sky_bg').css('background-color', '#333b58');
    } else {
      $('.sky_bg').css('background-color', '#87CEEB'); 
    }
   
  });
});

// 별 깜빡깜빡
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const h2Element = document.querySelector('#sky_mainhead');
  const h2Position = h2Element.offsetTop;
  const windowHeight = window.innerHeight;
  const circle = document.querySelector('.circle');
  const container = document.querySelector('.container');
  const stars = document.querySelectorAll('.star');

  // h2 태그를 지날 때 색상 변경 및 별 표시
  if (scrollPosition + windowHeight > h2Position) {
    $(circle).css('backgroundColor','#FFFFFF');
    stars.forEach(star => star.style.display = 'block');
  } else {
    container.style.background = '#87CEEB';
    circle.style.backgroundColor = '#FFD700';
    stars.forEach(star => star.style.display = 'none');
  }
});
 