// 단축키: Ctrl+;  오늘 날짜 / Ctrl+Shift+;  현재 시간 — 지금 커서가 있는 입력칸에 넣습니다.
document.addEventListener("keydown", e => {
  if (!e.ctrlKey || e.altKey || e.metaKey || e.code !== "Semicolon") return;
  e.preventDefault();
  const field = document.activeElement, time = e.shiftKey;
  if (!field || field.disabled || field.readOnly) return;
  const now = new Date(), two = n => String(n).padStart(2, "0");
  const today = `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())}`;
  if (field.matches("input[type=date]")) {                 // 날짜 칸은 오늘로 바꿉니다
    if (time || (field.min && today < field.min) || (field.max && today > field.max)) return;
    field.value = today;
    for (const name of ["input", "change"]) field.dispatchEvent(new Event(name, { bubbles: true }));
  } else if (field.matches("textarea, input[type=text], input[type=search], input:not([type])")) {
    // insertText: 커서 위치에 넣고, 글자 수 제한과 실행 취소(Ctrl+Z)가 그대로 동작합니다.
    document.execCommand("insertText", false, time ? `${two(now.getHours())}:${two(now.getMinutes())}` : today);
  }
});
