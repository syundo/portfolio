 // Ajax로 은행의 History 구현현 --------------------------------------------------------------------->
 $(document).ready(function() {
  $.getJSON('../data/timeline.json', function(timelineData) {
      let timelineContainer = $("#timeline");

      //  높은 열부터 시작
      let sortedYears = Object.keys(timelineData).sort().reverse();

      $.each(sortedYears, function(index, year) {
          let events = timelineData[year];

          // 열, 월 담는 컨테이너
          let yearRow = $('<div>').addClass('year-row');
          let yearDiv = $('<div>').addClass('year').text(year);
          let eventsContainer = $('<div>').addClass('events');

          $.each(events, function(index, eventData) {
              let eventItem = $('<div>').addClass('event')
                  .append($('<div>').addClass('month').text(eventData.month))
                  .append($('<div>').addClass('description').text(eventData.event));

              eventsContainer.append(eventItem);
          });

          yearRow.append(yearDiv).append(eventsContainer);
          timelineContainer.append(yearRow);
      });
  });
});

// 브랜드 동영상 클릭 --------------------------------------------------------------------------------------
$(document).ready(function() {
// video1 ----------------------------------------
  $('#videoImg1').click(function() {
    let videoURL = 'https://www.youtube.com/embed/ysPg4-mSIJo'; 
    
    $('#videoFrame1').attr('src', videoURL).show();
    $(this).hide(); 
    $('#video_wrapper1').addClass('border');

   // video1의 이미지가 사라지면 video2와 video3의 이미지가 보이게
    $('#videoImg2, #videoImg3').each(function() {          
      $(this).show();
    });
  });
  $('body').click(function(event) {
  if (!$(event.target).closest('#videoImg1').length) {
      $('#video_wrapper1').removeClass('border');
    }
  });

// video 2-------------------------------------------
  $('#videoImg2').click(function() {
      let videoURL = 'https://www.youtube.com/embed/qFfjq1QTm08'; 
      $('#videoFrame2').attr('src', videoURL).show();
      $(this).hide(); // 클릭한 후 이미지 사라지기
      $('#video_wrapper2').addClass('border');
    // video2의 이미지가 사라지면 video1와 video3의 이미지가 보이게
      $('#videoImg1, #videoImg3').each(function() { 
      $(this).show();
    });
  });
  $('body').click(function(event) {
  if (!$(event.target).closest('#videoImg2').length) {
    $('#video_wrapper2').removeClass('border');
    }
  });

// video 3---------------------------------------------------
  $('#videoImg3').click(function() {
      let videoURL = 'https://www.youtube.com/embed/qFfjq1QTm08'; 
      $('#videoFrame3').attr('src', videoURL).show();
      $(this).hide(); // 클릭한 후 이미지 사라지기
      $('#video_wrapper3').addClass('border');

    // video 3의 이미지가 사라지면 video1와 video2의 이미지가 보이게
      $('#videoImg1, #videoImg2').each(function() { 
      $(this).show();
    });
  });
  $('body').click(function(event) {
  if (!$(event.target).closest('#videoImg3').length) {
    $('#video_wrapper3').removeClass('border');
    }
  }); 

  // resize
  $(window).resize(function() {
    let resizeVideo = $(window).width();
    if (resizeVideo < 1201) {
      $('.video_box').removeClass('container');
    }else{
      $('.video_box').addClass('container');
    }
    
  });

});