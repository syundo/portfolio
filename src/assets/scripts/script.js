// HTML 파일 로드 함수
function loadHTML(selector, filePath) {
  // 선택한 DOM 요소를 찾음
  const container = document.querySelector(selector);

  if (!container) {
    console.error(`Element with selector ${selector} not found.`);
    return;
  }

  // HTML 파일을 fetch로 로드
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      // 로드한 HTML을 컨테이너에 삽입
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
    });
}

// 문서 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 모달 로드
  loadHTML("#modal_container", "src/components/modal/modal.html");
});