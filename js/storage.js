// Estatísticas e progresso da palavra do dia
const Storage = {
  stats() {
    try { return Object.assign({ played: 0, won: 0, streak: 0, best: 0, dist: [0, 0, 0, 0, 0, 0] }, JSON.parse(localStorage.getItem(STATS_KEY) || '{}')); }
    catch (_) { return { played: 0, won: 0, streak: 0, best: 0, dist: [0, 0, 0, 0, 0, 0] }; }
  },
  recordResult(won, tries) {
    const s = this.stats();
    s.played++;
    if (won) { s.won++; s.streak++; s.best = Math.max(s.best, s.streak); s.dist[tries - 1]++; }
    else s.streak = 0;
    try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch (_) {}
    return s;
  },

  // Guarda as tentativas do dia para retomar ao recarregar
  saveDaily(day, guesses, done) {
    try { localStorage.setItem(DAILY_KEY, JSON.stringify({ day, guesses, done })); } catch (_) {}
  },
  loadDaily(day) {
    try {
      const d = JSON.parse(localStorage.getItem(DAILY_KEY) || 'null');
      return d && d.day === day ? d : null;
    } catch (_) { return null; }
  },
};
