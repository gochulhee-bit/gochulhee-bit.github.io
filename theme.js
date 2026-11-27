// 다크 모드: 오른쪽 위 작은 버튼으로 켜고 끕니다. 선택은 이 브라우저에 계속 저장됩니다.
(() => {
  const KEY = "site.theme", root = document.documentElement;
  let saved = ""; try { saved = localStorage.getItem(KEY) || ""; } catch {}
  const style = document.createElement("style");
  // 색은 화면에만 적용합니다(인쇄는 항상 밝게).
  style.textContent = `
@media screen{:root[data-theme="dark"]{color-scheme:dark;--bg:#16171c;--fg:#e4e5ea;--muted:#9a9ca8;--line:#3a3c46;--field:#262831;--accent:#ff6b6b;
--red:#ff8a8f;--blue:#7cb8f0;--bluebg:#17324a;--alert-bg:#3d2224;--alert-fg:#ff9ca1;
--duebg:#17324a;--duefg:#a8d4ff;--tline:#34363f;--link:#7cb8f0;--off:#2a1d22;--bar:#202229;--press:#3d3f4b;--page:#0e0f12}
:root[data-theme="dark"] td a:not(.view){color:var(--link)}
:root[data-theme="dark"] :is(input[type=search],textarea,.tools input,.panel input,.panel select){background:var(--field);color:var(--fg)}}
#theme{position:absolute;z-index:25;top:calc(6px + env(safe-area-inset-top,0px));right:calc(8px + env(safe-area-inset-right,0px));
width:26px;height:22px;margin:0;padding:0;border:1px solid var(--line,#d6d6d9);border-radius:6px;background:var(--bg,#fff);font-size:11px;line-height:1;cursor:pointer;opacity:.75}
#theme:hover,#theme:focus-visible{opacity:1;border-color:var(--accent,#ff4b4b)}
@media print{#theme{display:none}}`;
  document.head.append(style);
  const button = document.createElement("button");
  button.type = "button"; button.id = "theme";
  const apply = dark => {
    root.dataset.theme = dark ? "dark" : "light";
    button.textContent = dark ? "☀️" : "🌙";
    button.title = dark ? "밝은 화면으로 바꾸기" : "다크 모드로 바꾸기";
    button.setAttribute("aria-label", button.title);
  };
  apply(saved === "dark");
  button.onclick = () => {
    const dark = root.dataset.theme !== "dark";
    apply(dark);
    try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch {}
  };
  addEventListener("storage", e => { if (e.key === KEY) apply(e.newValue === "dark"); });   // 열려 있는 다른 탭에도 적용
  addEventListener("DOMContentLoaded", () => document.body.append(button));
})();
