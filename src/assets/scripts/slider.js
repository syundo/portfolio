document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.slide_container');
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.slider_btn.prev');
  const next = document.querySelector('.slider_btn.next');
  const dots = document.querySelectorAll('.index');
  const autoBtn = document.querySelector('.autoplay');

  const slideCount = slides.length;
  const slideWidth = slides[0].offsetWidth;
  let index = 0;
  let autoId = null;
  let isPlaying = true;

  // 초기 세팅: 슬라이드 복제 및 위치 조정
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);
  container.appendChild(firstClone);
  container.insertBefore(lastClone, slides[0]);

  const allSlides = container.querySelectorAll('.slide');
  container.style.transform = `translateX(-${slideWidth}px)`;

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function moveToSlide(i) {
    container.style.transition = 'transform 0.3s ease-in-out';
    container.style.transform = `translateX(-${(i + 1) * slideWidth}px)`;
  }

  function handleLoop() {
    container.addEventListener('transitionend', () => {
      if (index === -1) {
        container.style.transition = 'none';
        index = slideCount - 1;
        container.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
      } else if (index === slideCount) {
        container.style.transition = 'none';
        index = 0;
        container.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
      }
    });
  }

  function moveNext() {
    index++;
    moveToSlide(index);
    updateDots();
  }

  function movePrev() {
    index--;
    moveToSlide(index);
    updateDots();
  }

  next.addEventListener('click', () => {
    stopAuto();
    moveNext();
  });

  prev.addEventListener('click', () => {
    stopAuto();
    movePrev();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      index = i;
      moveToSlide(index);
      updateDots();
    });
  });

  function startAuto() {
    autoId = setInterval(() => {
      moveNext();
    }, 300000);
    autoBtn.classList.add('active2');
    autoBtn.classList.remove('fa-play-circle');
    autoBtn.classList.add('fa-pause-circle');
    isPlaying = true;
  }

  function stopAuto() {
    clearInterval(autoId);
    autoBtn.classList.remove('active2');
    autoBtn.classList.remove('fa-pause-circle');
    autoBtn.classList.add('fa-play-circle');
    isPlaying = false;
  }

  autoBtn.addEventListener('click', () => {
    isPlaying ? stopAuto() : startAuto();
  });

  // 초기 설정
  updateDots();
  handleLoop();
  startAuto();
});