// Shared ambience colour for every page. The choice is saved in the browser
// and applied as CSS variables on <html>; pages read them for their colours.
(function () {
  const THEMES = {
    blue:   { hue: 220, glow1: '30, 80, 180',  glow2: '10, 40, 120', glow3: '20, 50, 110', mid: '#071330', accent: '80, 140, 255', panel: '5, 15, 40' },
    red:    { hue: 0,   glow1: '180, 30, 40',  glow2: '120, 10, 20', glow3: '110, 20, 30', mid: '#30070b', accent: '255, 90, 90',  panel: '40, 5, 8' },
    green:  { hue: 135, glow1: '30, 160, 70',  glow2: '10, 100, 40', glow3: '20, 100, 50', mid: '#07301a', accent: '90, 230, 130', panel: '5, 35, 15' },
    orange: { hue: 28,  glow1: '210, 110, 20', glow2: '140, 60, 10', glow3: '120, 60, 20', mid: '#301a07', accent: '255, 160, 70', panel: '40, 20, 5' },
  };

  function getAmbience() {
    try {
      const saved = localStorage.getItem('ambience');
      if (THEMES[saved]) return saved;
    } catch (e) {}
    return 'blue';
  }

  function applyAmbience(name) {
    const t = THEMES[name] || THEMES.blue;
    const s = document.documentElement.style;
    s.setProperty('--glow1', t.glow1);
    s.setProperty('--glow2', t.glow2);
    s.setProperty('--glow3', t.glow3);
    s.setProperty('--mid', t.mid);
    s.setProperty('--accent', t.accent);
    s.setProperty('--panel', t.panel);
    s.setProperty('--hue', t.hue);
  }

  function setAmbience(name) {
    if (!THEMES[name]) return;
    try { localStorage.setItem('ambience', name); } catch (e) {}
    applyAmbience(name);
  }

  window.Ambience = {
    themes: THEMES,
    get: getAmbience,
    set: setAmbience,
    hue: () => (THEMES[getAmbience()] || THEMES.blue).hue,
  };

  applyAmbience(getAmbience());
})();
