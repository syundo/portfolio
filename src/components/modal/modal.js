document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.open_modal').forEach(button => {
    button.addEventListener('click', () => {
      // 버튼에서 데이터 속성 가져오기
      const headerContent = button.getAttribute('data-header') || "";
      const ajaxUrl = button.getAttribute('data-ajax-url'); // Ajax로 불러올 HTML 파일의 URL
      const footerLinks = button.getAttribute('data-footer-links') || "[]"; // JSON 형식으로 가져오기

      // JSON 파싱 (에러 처리 포함)
      let footerLinksJson = [];
      try {
        footerLinksJson = JSON.parse(footerLinks);
      } catch (error) {
        console.error("footerLinks JSON 파싱 오류:", error);
        footerLinksJson = []; // 파싱 실패 시 빈 배열로 초기화
      }

      // 모달의 헤더 업데이트
      document.querySelector('.modal_header p').textContent = headerContent;

      // 모달의 Body를 로딩 중 상태로 설정
      const modalBody = document.querySelector('.modal_body');
      modalBody.innerHTML = ""; // 기존 내용을 초기화
      modalBody.classList.add('loading'); // 로딩 애니메이션 추가

      // Ajax 요청으로 HTML 파일 로드
      if (ajaxUrl) {
        fetch(ajaxUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error("네트워크 응답이 실패했습니다.");
            }
            return response.text();
          })
          .then(data => {
            // Body에 로드된 HTML 내용 삽입
            modalBody.innerHTML = data;
          })
          .catch(error => {
            modalBody.innerHTML = `<p>데이터를 불러오는 중 문제가 발생했습니다.<br>상세 정보: ${error.message}</p>`;
          })
          .finally(() => {
            // 로딩 애니메이션 제거
            modalBody.classList.remove('loading');
          });
      } else {
        modalBody.innerHTML = "<p>데이터를 불러올 URL이 없습니다.</p>";
        modalBody.classList.remove('loading'); // 로딩 애니메이션 제거
      }

      // 모달의 푸터 업데이트 (기존 내용 삭제)
      const footer = document.querySelector('.modal_footer');
      footer.innerHTML = ""; // 기존 a 태그 및 내용을 초기화

      // 새로운 링크 추가
      footerLinksJson.forEach(link => {
        const aTag = document.createElement('a');
        aTag.href = link.href;
        aTag.textContent = link.text;
        // target 속성 설정 (있을 때만 추가)
        if (link.target) {
          aTag.target = link.target; 
        }
        // download 속성 추가(넘어온 파일명 설정)
        if (link.download) {
          aTag.download = link.download;
        }
        footer.appendChild(aTag);
      });
    });
  });
});