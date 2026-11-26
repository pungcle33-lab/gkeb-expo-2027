# 2027 GKEB 뷰티 교육·비즈니스 박람회 — 기업 참가 안내

2027년 5월 20일~22일 대구 EXCO(엑스코)에서 열리는 GKEB 뷰티 교육·비즈니스 박람회의 기업 참가 안내 랜딩페이지입니다.

- 랜딩페이지: https://pungcle33-lab.github.io/gkeb-expo-2027/
- 부스 안내서(PDF, 1장 요약): https://pungcle33-lab.github.io/gkeb-expo-2027/booth-guide.pdf
- 상세 제안서(PDF, 6쪽): https://pungcle33-lab.github.io/gkeb-expo-2027/proposal-guide.pdf

문의: 박람회 운영회장 이다늬 · 010-6305-7845 · pungcle33@gmail.com

## 참가 문의 자동 접수 (구글 시트 + 메일 알림)

`index.html`의 `SEND_ENDPOINT`가 아래 구글 Apps Script 웹 앱과 연결되어 있어,
참가 문의 폼을 제출하면 자동으로 시트에 기록되고 담당자 메일로 알림이 갑니다.

- 접수 시트: https://docs.google.com/spreadsheets/d/1QSzM3w-beOG8MJoDxo2oLau2jsIPkSg0QIBi5TezG2Y/edit (탭 `접수내역`, pungcle33@gmail.com 소유)
- 웹 앱 URL: https://script.google.com/macros/s/AKfycbzAeRfSzNn_8P76lTh9brWYadLZ_E91kpc6v2hBDEcuc46KadG4l0n_OXBBO4t4s78mMA/exec
- 스크립트(소스 사본): `apps-script/Code.gs`
- Apps Script 프로젝트: https://script.google.com/home/projects/1a_HoRgJ0qJSfkeZfyv5WhKdu4IkRgx9Ua8jeyFm2AUwfHvbCvji5O67J/edit

### 고칠 때

1. `apps-script/Code.gs`(또는 Apps Script 편집기)를 고치고, 편집기에서 **배포 > 배포 관리 > 수정 > 새 버전**으로 배포하면 URL은 그대로 유지됩니다.
2. 폼 항목을 바꾸면 `index.html`의 `collectInquiry()`·`buildSummary()`와 시트 헤더(A~M열) 순서를 함께 맞춰 주세요.
3. 액세스 권한은 "모든 사용자"(익명 제출 가능), 실행 계정은 "나(pungcle33@gmail.com)"입니다.
   응답은 CORS로 읽을 수 없어 `navigator.sendBeacon`으로 보내고, 실패하면 복사·이메일·문자로 자동 전환합니다.
