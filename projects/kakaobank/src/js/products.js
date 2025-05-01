$(document).ready(function(){
    $('.main_slider').hover(function() {
      $('#moving_panel, #moving_panel2').css({
        'animation-play-state': 'paused'
      });
    }, function() {
      // 다시 animation 속성을 시작
      $('#moving_panel, #moving_panel2').css({
        'animation-play-state': 'running'
      });
    });

  // 스크롤 이벤트 핸들러 설정
  $(window).on('scroll', function() {
    var scrollpos = $(window).scrollTop(); // 현재 스크롤 위치
    var windowHeight = $(window).height(); // 브라우저 창 높이

    // 각 콘텐츠 요소의 위치 및 애니메이션 설정
    $('#content1, #content2, #content3, #content4, #content5').each(function() {
      var contentTop = $(this).offset().top; // 콘텐츠 요소의 화면에서의 위치
      if (scrollpos + windowHeight > contentTop + 100) {
        $(this).addClass('animate__animated animate__fadeInUp').css('opacity', '1');
      }
    });
  });

  // $('#product_guide, #interest_info, #fee_info, #other_info, #product_terms').on('shown.bs.modal', function () {
  //   set_position(this);
  //   if (this.id === 'fee_info') {
  //     // 모든 li 태그를 선택하여 숫자 인덱스 추가
  //     $('#mod_list li').each(function(index) {
  //       $(this).text((index + 1) + '. ' + $(this).text());
  //     });
  //   }
  // });
  $('#product_guide, #interest_info, #fee_info, #other_info, #product_terms').on('shown.bs.modal', function () {
    set_position(this);
    if (this.id === 'fee_info') {
      // 이미 숫자 인덱스가 추가된 경우 추가하지 않도록 처리
      if (!$(this).data('index-added')) {
        // 모든 li 태그를 선택하여 숫자 인덱스 추가
        $('#mod_list li').each(function(index) {
          $(this).text((index + 1) + '. ' + $(this).text());
        });
        // 'index-added' 데이터를 true로 설정하여 이후에 다시 추가되지 않도록 함
        $(this).data('index-added', true);
      }
    }
  });
  
});

// 모달 위치 설정 함수
function set_position(modal) {
  var modal_dialog = $(modal).find('.modal_posistion');
  var modal_width = modal_dialog.outerWidth();
  var window_width = $(window).width();
  var margin_left = (window_width - modal_width) / 2;
  var window_height = $(window).height();
  var modal_height = modal_dialog.outerHeight();
  var margin_top = (window_height - modal_height) / 2;
  modal_dialog.css({'margin-left': margin_left + 'px', 'margin-top': margin_top + 'px'});
}