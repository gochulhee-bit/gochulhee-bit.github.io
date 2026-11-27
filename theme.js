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
display:flex;gap:2px;padding:1px;border:1px solid #3c3c3c;border-radius:2px;background:#eaeaea}
#theme button{display:block;width:20px;height:20px;min-width:0;margin:0;padding:0;border:1px solid #031333;border-radius:2px;line-height:0;cursor:pointer}
#theme button[data-mode="light"]{background:#5a7f68}
#theme button[data-mode="dark"]{background:#031333}
#theme button:focus-visible{outline:2px solid #ff4b4b;outline-offset:1px}
#theme svg{visibility:hidden}
#theme [aria-pressed="true"] svg{visibility:visible}
@media print{#theme{display:none}}`;
  document.head.append(style);
  // 왼쪽 초록 칸 = 밝은 화면, 오른쪽 남색 칸 = 다크 모드. 선택한 칸에 ✓ 표시
  const box = document.createElement("div");
  box.id = "theme"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "화면 색상");
  const buttons = [["light", "밝은 화면"], ["dark", "다크 모드"]].map(([mode, label]) => {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.mode = mode; b.title = label; b.setAttribute("aria-label", label);
    b.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 9.5 8.3 13 13.5 6" fill="none" stroke="#fff" stroke-width="2.6"/></svg>';
    b.onclick = () => { apply(mode === "dark"); try { localStorage.setItem(KEY, mode); } catch {} };
    box.append(b); return b;
  });
  const apply = dark => {
    root.dataset.theme = dark ? "dark" : "light";
    buttons.forEach(b => b.setAttribute("aria-pressed", (b.dataset.mode === "dark") === dark));
  };
  apply(saved === "dark");
  addEventListener("storage", e => { if (e.key === KEY) apply(e.newValue === "dark"); });   // 열려 있는 다른 탭에도 적용
  addEventListener("DOMContentLoaded", () => document.body.append(box));
})();
