// Estado da partida e regras
class Game {
  constructor() {
    Render.init();
    this.mode = 'daily';
    bindInput(this);
    this.newGame();
    if (!localStorage.getItem(STATS_KEY)) Render.openModal(Render.helpHtml());
  }

  get dayNumber() { return Math.floor((new Date() - EPOCH) / 86400000) + 1; }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('#modes button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    this.newGame();
  }

  newGame() {
    this.answer = this.mode === 'daily' ? dailyWord() : randomWord();
    this.guesses = [];      // palavras enviadas
    this.results = [];      // avaliações
    this.letters = [];      // linha atual
    this.cursor = 0;
    this.keyStates = {};
    this.done = false;
    this.busy = false;
    Render.clearGrid();
    Render.resetKeys();
    Render.say('');

    // retoma o jogo do dia
    if (this.mode === 'daily') {
      const saved = Storage.loadDaily(this.dayNumber);
      if (saved) {
        saved.guesses.forEach((g, i) => {
          const r = evaluate(g, this.answer);
          this.guesses.push(g); this.results.push(r);
          Render.fillRow(i, [...g], r);
          [...g].forEach((ch, j) => { this.keyStates[ch] = mergeKeyState(this.keyStates[ch], r[j]); });
        });
        Render.keyStates(this.keyStates);
        this.done = saved.done;
        if (this.done) { Render.say(this.guesses[this.guesses.length - 1] === this.answer ? 'Você já acertou a de hoje!' : `A palavra era ${this.answer.toUpperCase()}`, 0); return; }
      }
    }
    this.refreshRow();
  }

  get row() { return this.guesses.length; }

  refreshRow() { if (!this.done) Render.currentRow(this.row, this.letters, this.cursor); }

  type(ch) {
    if (this.done || this.busy) return;
    if (this.cursor >= WORD_LEN) return;
    this.letters[this.cursor] = ch;
    // avança até a próxima casa vazia
    let next = this.cursor + 1;
    while (next < WORD_LEN && this.letters[next]) next++;
    this.cursor = Math.min(next, WORD_LEN - 1);
    if (this.letters.filter(Boolean).length === WORD_LEN) this.cursor = WORD_LEN; // tudo preenchido
    this.refreshRow();
  }

  backspace() {
    if (this.done || this.busy) return;
    if (this.cursor < WORD_LEN && this.letters[this.cursor]) { this.letters[this.cursor] = undefined; }
    else if (this.cursor > 0) { this.cursor--; this.letters[this.cursor] = undefined; }
    this.refreshRow();
  }

  moveCursor(d) { this.setCursor(Math.max(0, Math.min(WORD_LEN - 1, (this.cursor >= WORD_LEN ? WORD_LEN - 1 : this.cursor) + d))); }
  setCursor(i) { if (this.done || this.busy) return; this.cursor = i; this.refreshRow(); }

  submit() {
    if (this.done || this.busy) return;
    const word = Array.from({ length: WORD_LEN }, (_, i) => this.letters[i] || '').join('');
    if (word.length < WORD_LEN) { Render.shake(this.row); Render.say('Só palavras com 5 letras'); return; }

    const result = evaluate(word, this.answer);
    const r = this.row;
    this.guesses.push(word); this.results.push(result);
    [...word].forEach((ch, j) => { this.keyStates[ch] = mergeKeyState(this.keyStates[ch], result[j]); });
    this.busy = true;
    Render.reveal(r, [...word], result, () => {
      this.busy = false;
      Render.keyStates(this.keyStates);
      const won = word === this.answer;
      if (won || this.guesses.length >= MAX_TRIES) return this.finish(won, r);
      this.letters = []; this.cursor = 0;
      this.refreshRow();
      if (this.mode === 'daily') Storage.saveDaily(this.dayNumber, this.guesses, false);
    });
  }

  finish(won, r) {
    this.done = true;
    if (won) Render.win(r);
    const tries = this.guesses.length;
    const stats = Storage.recordResult(won, tries);
    stats.lastTries = won ? tries : 0;
    if (this.mode === 'daily') Storage.saveDaily(this.dayNumber, this.guesses, true);
    const praise = ['Genial!', 'Impressionante!', 'Excelente!', 'Muito bem!', 'Boa!', 'Ufa!'][tries - 1];
    Render.say(won ? praise : `A palavra era ${this.answer.toUpperCase()}`, 0);
    setTimeout(() => this.showStats(true), 1200);
  }

  showStats(afterGame = false) {
    const s = Storage.stats();
    s.lastTries = this.done && this.guesses[this.guesses.length - 1] === this.answer ? this.guesses.length : 0;
    let extra = '';
    if (this.done) {
      extra += `<p class="answer">Palavra: <strong>${this.answer}</strong></p><button class="share" id="share">Compartilhar</button>`;
      if (this.mode === 'random') extra += `<button class="again" id="again">Nova palavra</button>`;
      else extra += `<p class="answer">Volte amanhã para a próxima palavra do dia.</p>`;
    }
    Render.openModal(Render.statsHtml(s, extra));
  }

  share() {
    const won = this.guesses[this.guesses.length - 1] === this.answer;
    const text = shareText(this.results, won, this.guesses.length, this.mode, this.dayNumber);
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else navigator.clipboard.writeText(text).then(() => Render.say('Copiado!'), () => Render.say('Não foi possível copiar'));
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
