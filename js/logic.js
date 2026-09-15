// Avaliação de tentativas (lógica pura)
// Retorna um array com 'right' | 'place' | 'wrong' para cada letra,
// tratando corretamente letras repetidas (cada letra da resposta só "paga" uma vez).
function evaluate(guess, answer) {
  const res = Array(WORD_LEN).fill('wrong');
  const remaining = {};
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === answer[i]) res[i] = 'right';
    else remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < WORD_LEN; i++) {
    if (res[i] === 'right') continue;
    const ch = guess[i];
    if (remaining[ch] > 0) { res[i] = 'place'; remaining[ch]--; }
  }
  return res;
}

// Remove acentos e deixa minúsculo, para aceitar digitação com acento
function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ç/g, 'c');
}

// Melhor estado por letra para colorir o teclado (right > place > wrong)
function mergeKeyState(current, next) {
  const rank = { right: 3, place: 2, wrong: 1 };
  return (rank[next] || 0) > (rank[current] || 0) ? next : current;
}

// Texto compartilhável no estilo emoji
function shareText(results, won, tries, mode, dayNumber) {
  const map = { right: '🟩', place: '🟨', wrong: '⬛' };
  const head = mode === 'daily' ? `Termo #${dayNumber} ${won ? tries : 'X'}/${MAX_TRIES}` : `Termo (aleatória) ${won ? tries : 'X'}/${MAX_TRIES}`;
  return head + '\n\n' + results.map(r => r.map(s => map[s]).join('')).join('\n');
}
