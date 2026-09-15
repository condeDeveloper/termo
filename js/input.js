// Teclado físico, teclado na tela e botões
function bindInput(game) {
  window.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!Render.modal.classList.contains('hidden')) { if (e.key === 'Escape') Render.closeModal(); return; }
    if (e.key === 'Enter') return game.submit();
    if (e.key === 'Backspace') return game.backspace();
    if (e.key === 'ArrowLeft') return game.moveCursor(-1);
    if (e.key === 'ArrowRight') return game.moveCursor(1);
    const ch = normalize(e.key);
    if (/^[a-z]$/.test(ch)) game.type(ch);
  });

  Render.keyboard.addEventListener('click', e => {
    const b = e.target.closest('.key');
    if (!b) return;
    const k = b.dataset.key;
    if (k === 'enter') game.submit();
    else if (k === 'back') game.backspace();
    else game.type(k);
  });

  // clicar numa casa da linha atual move o cursor
  Render.grid.addEventListener('click', e => {
    const t = e.target.closest('.tile');
    if (!t) return;
    const rowEl = t.parentElement;
    if (!rowEl.classList.contains('current')) return;
    game.setCursor([...rowEl.children].indexOf(t));
  });

  document.getElementById('help-btn').addEventListener('click', () => Render.openModal(Render.helpHtml()));
  document.getElementById('stats-btn').addEventListener('click', () => game.showStats());
  document.getElementById('close').addEventListener('click', () => Render.closeModal());
  Render.modal.addEventListener('click', e => { if (e.target === Render.modal) Render.closeModal(); });
  document.querySelectorAll('#modes button').forEach(b => b.addEventListener('click', () => game.setMode(b.dataset.mode)));

  Render.modalBody.addEventListener('click', e => {
    if (e.target.id === 'share') game.share();
    if (e.target.id === 'again') { Render.closeModal(); game.newGame(); }
  });
}
