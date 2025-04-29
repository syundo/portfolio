document.addEventListener("DOMContentLoaded", function() {
  // 페이지 로드 시 과거에 선택한 테마로 세팅
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.body.classList.add(storedTheme);
  } else {
    // 선택했던 테마가 없다면 기본 시스템 모드에 따라 설정
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('night');
      document.body.classList.remove("day");
    } else {
      document.body.classList.add('day');
      document.body.classList.remove("night");
    }
  }

  // 전등 클릭 시
  document.getElementById("light").addEventListener("click", function() {
    // 현재 테마가 무엇인지 확인
    const currentTheme = document.body.classList.contains("night") ? "night" : "day";
    
    // 현재 테마에 따라 다른 테마로 전환
    if (currentTheme === "night") {
      document.body.classList.add("day");
      document.body.classList.remove("night");
      document.getElementById("beam").classList.add("hidden");
      localStorage.setItem('theme', 'day');
    } else {
      document.body.classList.add("night");
      document.body.classList.remove("day");
      document.getElementById("beam").classList.remove("hidden");
      localStorage.setItem('theme', 'night');
    }
  });
});  