// DOM: grade, teclado, mensagens e modais
const Render = {
  init() {
    this.grid = document.getElementById('grid');
    this.keyboard = document.getElementById('keyboard');
    this.message = document.getElementById('message');
    this.modal = document.getElementById('modal');
    this.modalBody = document.getElementById('modal-body');
    this.buildGrid();
    this.buildKeyboard();
  },

  buildGrid() {
    this.grid.innerHTML = '';
    this.rows = [];
    for (let r = 0; r < MAX_TRIES; r++) {
      const row = document.createElement('div');
      row.className = 'row';
      const tiles = [];
      for (let c = 0; c < WORD_LEN; c++) {
        const t = document.createElement('div');
        t.className = 'tile';
        row.appendChild(t); tiles.push(t);
      }
      this.grid.appendChild(row);
      this.rows.push({ row, tiles });
    }
  },

  buildKeyboard() {
    this.keyboard.innerHTML = '';
    this.keys = {};
    KEY_ROWS.forEach(keys => {
      const kr = document.createElement('div');
      kr.className = 'krow';
      keys.forEach(k => {
        const b = document.createElement('button');
        b.className = 'key' + (k.length > 1 ? ' wide' : '');
        b.dataset.key = k;
        b.textContent = k === 'back' ? '⌫' : k;
        kr.appendChild(b);
        this.keys[k] = b;
      });
      this.keyboard.appendChild(kr);
    });
  },

  // Linha atual: letras digitadas e cursor
  currentRow(r, letters, cursor) {
    this.rows.forEach((x, i) => x.row.classList.toggle('current', i === r));
    const { tiles } = this.rows[r];
    tiles.forEach((t, i) => {
      t.textContent = letters[i] || '';
      t.classList.toggle('filled', !!letters[i]);
      t.classList.toggle('cursor', i === cursor);
    });
  },

  // Revela o resultado de uma linha com animação de virada
  reveal(r, letters, result, done) {
    const { tiles } = this.rows[r];
    tiles.forEach((t, i) => {
      setTimeout(() => {
        t.classList.add('flip');
        setTimeout(() => { t.classList.remove('filled', 'cursor'); t.classList.add(result[i]); }, 250);
      }, i * FLIP_DELAY);
    });
    setTimeout(done, WORD_LEN * FLIP_DELAY + 300);
  },

  // Preenche uma linha já resolvida (ao retomar o jogo do dia)
  fillRow(r, letters, result) {
    const { tiles } = this.rows[r];
    tiles.forEach((t, i) => { t.textContent = letters[i]; t.classList.add(result[i]); });
  },

  keyStates(states) {
    for (const [k, s] of Object.entries(states)) {
      const b = this.keys[k];
      if (b) { b.classList.remove('right', 'place', 'wrong'); b.classList.add(s); }
    }
  },
  resetKeys() { Object.values(this.keys).forEach(b => b.classList.remove('right', 'place', 'wrong')); },

  shake(r) { const el = this.rows[r].row; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); },
  win(r) { this.rows[r].row.classList.add('win'); },
  clearGrid() { this.buildGrid(); },

  say(text, ms = 1600) {
    this.message.textContent = text;
    clearTimeout(this.msgTimer);
    if (ms) this.msgTimer = setTimeout(() => { if (this.message.textContent === text) this.message.textContent = ''; }, ms);
  },

  openModal(html) { this.modalBody.innerHTML = html; this.modal.classList.remove('hidden'); },
  closeModal() { this.modal.classList.add('hidden'); },

  helpHtml() {
    const ex = (w, cls, i) => `<div class="example">${[...w].map((l, j) => `<div class="tile ${j === i ? cls : ''}">${l}</div>`).join('')}</div>`;
    return `<h2>Como jogar</h2>
      <p>Descubra a palavra de 5 letras em até 6 tentativas. Acentos não contam.</p>
      ${ex('termo', 'right', 0)}<p>A letra <b>T</b> está na palavra e na posição certa.</p>
      ${ex('pedra', 'place', 1)}<p>A letra <b>E</b> está na palavra, mas em outra posição.</p>
      ${ex('nuvem', 'wrong', 3)}<p>A letra <b>E</b> não está na palavra.</p>
      <p>Uma palavra nova por dia no modo <b>Palavra do dia</b>, ou quantas quiser no modo <b>Aleatória</b>.</p>`;
  },

  statsHtml(s, extra = '') {
    const pct = s.played ? Math.round((s.won / s.played) * 100) : 0;
    const max = Math.max(1, ...s.dist);
    const dist = s.dist.map((n, i) => `<div><span>${i + 1}</span><div class="bar ${n && s.lastTries === i + 1 ? 'hl' : ''}" style="width:${Math.max(8, (n / max) * 100)}%">${n}</div></div>`).join('');
    return `<h2>Estatísticas</h2>
      <div class="stats">
        <div><strong>${s.played}</strong><span>jogos</span></div>
        <div><strong>${pct}%</strong><span>vitórias</span></div>
        <div><strong>${s.streak}</strong><span>sequência</span></div>
        <div><strong>${s.best}</strong><span>melhor seq.</span></div>
      </div>
      <p>Distribuição de tentativas</p>
      <div class="dist">${dist}</div>${extra}`;
  },
};
