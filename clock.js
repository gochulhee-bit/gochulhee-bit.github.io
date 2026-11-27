// 모든 페이지 맨 위 가운데의 실시간 시계 (한국 시간)  예: 2026년 11월 28일 (토) 07:44  00초
(() => {
  const style = document.createElement("style");
  style.textContent = `#clock{position:absolute;z-index:24;top:calc(4px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);
white-space:pre;font:700 20px/28px "Pretendard","Malgun Gothic","맑은 고딕","Apple SD Gothic Neo","Noto Sans KR",sans-serif;font-variant-numeric:tabular-nums;color:var(--fg,#31333f);pointer-events:none}
@media (max-width:480px){#clock{font-size:min(16px,3.8vw)}}
@media screen and (max-width:900px){body:has(h1) h1:first-of-type{margin-top:36px!important}}
@media print{#clock{display:none}}`;
  document.head.append(style);
  const clock = document.createElement("div");
  clock.id = "clock";
  const two = n => String(n).padStart(2, "0");
  function tick() {
    const d = new Date(Date.now() + 9 * 3600000);        // UTC+9로 옮긴 뒤 UTC 값으로 읽습니다
    clock.textContent = `${d.getUTCFullYear()}년 ${d.getUTCMonth() + 1}월 ${d.getUTCDate()}일 (${"일월화수목금토"[d.getUTCDay()]}) ${two(d.getUTCHours())}:${two(d.getUTCMinutes())}  ${two(d.getUTCSeconds())}초`;
    setTimeout(tick, 1000 - (Date.now() % 1000) + 5);    // 초가 바뀌는 순간에 맞춰 갱신
  }
  addEventListener("DOMContentLoaded", () => { document.body.append(clock); tick(); });
})();
