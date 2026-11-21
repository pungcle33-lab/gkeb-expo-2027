/**
 * 2027 GKEB 뷰티 교육·비즈니스 박람회 - 랜딩페이지 참가문의 접수 웹앱
 * POST(JSON) -> 구글 시트 '접수내역'에 기록 + 담당자(pungcle33@gmail.com)에게 알림 메일 발송
 * 배포: 웹 앱 / 실행 계정: 나 / 액세스 권한: 모든 사용자
 */
var SPREADSHEET_ID = '1QSzM3w-beOG8MJoDxo2oLau2jsIPkSg0QIBi5TezG2Y';
var SHEET_NAME = '접수내역';
var NOTIFY_TO = 'pungcle33@gmail.com';
var TZ = 'Asia/Seoul';
var SHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit';

function doPost(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  var d = {};
  try { d = JSON.parse(raw); } catch (err) { d = (e && e.parameter) || {}; }
  var stamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      sh.appendRow([
        stamp, s(d.company), s(d.name), s(d.title), s(d.phone), s(d.email),
        s(d.biz), s(d.route), j(d.modes), j(d.halls), s(d.gov), s(d.pref), s(d.msg)
      ]);
    } finally { lock.releaseLock(); }

    var company = s(d.company) || '(업체명 없음)';
    var lines = [
      '새 참가 문의가 접수되었습니다.', '',
      '접수일시: ' + stamp + ' (KST)',
      '업체·기관명: ' + company,
      '담당자: ' + s(d.name) + (s(d.title) ? ' / ' + s(d.title) : ''),
      '연락처: ' + s(d.phone),
      '이메일: ' + (s(d.email) || '-'),
      '업종: ' + s(d.biz) + '  (담당분류: ' + (s(d.route) || '-') + ')',
      '관심 참가 방식: ' + (j(d.modes) || '-'),
      '관심 전시관: ' + (j(d.halls) || '-'),
      '정부지원사업 상담: ' + (s(d.gov) || '-'),
      '선호 연락 방식: ' + (s(d.pref) || '-'), '',
      '문의 내용:', (s(d.msg) || '-'), '',
      '시트에서 보기: ' + SHEET_URL
    ];
    MailApp.sendEmail(NOTIFY_TO,
      '[GKEB 참가문의] ' + company + ' · ' + (s(d.route) || '신규 업체'),
      lines.join('\n'));
    return out({ ok: true, at: stamp, company: company });
  } catch (err2) {
    try {
      MailApp.sendEmail(NOTIFY_TO, '[GKEB 접수 오류] 문의 저장 실패',
        '오류: ' + err2 + '\n\n원본 데이터:\n' + raw);
    } catch (err3) {}
    return out({ ok: false, error: String(err2) });
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.ping) {
    return out({ ok: true, ping: true, at: Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss') });
  }
  return out({ ok: true, service: 'GKEB 2027 참가문의 접수', usage: 'POST JSON' });
}

function s(v) { return (v === null || v === undefined) ? '' : String(v).trim(); }
function j(v) { return Array.isArray(v) ? v.join(', ') : s(v); }
function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
