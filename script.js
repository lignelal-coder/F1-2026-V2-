const DEFAULT_PLAYERS = ["Alan", "Alexandre", "Mathéo"];

const RACES_2026 = [
  { id: "bah", name: "GP de Bahreïn", date: "2026-03-08" },
  { id: "sau", name: "GP d'Arabie Saoudite", date: "2026-03-22" },
  { id: "aus", name: "GP d'Australie", date: "2026-04-05" },
  { id: "chn", name: "GP de Chine", date: "2026-04-19" },
  { id: "mia", name: "GP de Miami", date: "2026-05-03" },
  { id: "imo", name: "GP d'Émilie-Romagne (Imola)", date: "2026-05-17" },
  { id: "mon", name: "GP de Monaco", date: "2026-05-24" },
  { id: "esp-bar", name: "GP d'Espagne (Barcelone)", date: "2026-06-07" },
  { id: "can", name: "GP du Canada", date: "2026-06-14" },
  { id: "aut", name: "GP d'Autriche", date: "2026-06-28" },
  { id: "gbr", name: "GP de Grande-Bretagne", date: "2026-07-05" },
  { id: "hun", name: "GP de Hongrie", date: "2026-07-19" },
  { id: "bel", name: "GP de Belgique", date: "2026-08-02" },
  { id: "ned", name: "GP des Pays-Bas", date: "2026-08-30" },
  { id: "ita", name: "GP d'Italie (Monza)", date: "2026-09-06" },
  { id: "aze", name: "GP d'Azerbaïdjan", date: "2026-09-20" },
  { id: "sin", name: "GP de Singapour", date: "2026-10-04" },
  { id: "usa-aus", name: "GP des États-Unis (Austin)", date: "2026-10-18" },
  { id: "mex", name: "GP du Mexique", date: "2026-11-01" },
  { id: "bra", name: "GP du Brésil (São Paulo)", date: "2026-11-08" },
  { id: "usa-veg", name: "GP de Las Vegas", date: "2026-11-21" },
  { id: "qat", name: "GP du Qatar", date: "2026-11-29" },
  { id: "abu", name: "GP d'Abou Dhabi", date: "2026-12-06" },
  { id: "esp-mad", name: "GP d'Espagne (Madrid)", date: "2026-07-26" } // date indicative en attendant confirmation
];

const STORAGE_KEY = "f1-2026-predictions-v1";

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        predictions: {},
        results: {},
        players: [...DEFAULT_PLAYERS],
        activePlayer: DEFAULT_PLAYERS[0]
      };
    }
    const parsed = JSON.parse(raw);
    const players = Array.isArray(parsed.players) && parsed.players.length ? parsed.players : [...DEFAULT_PLAYERS];
    const activePlayer = parsed.activePlayer && players.includes(parsed.activePlayer) ? parsed.activePlayer : players[0];
    return {
      predictions: parsed.predictions || {},
      results: parsed.results || {},
      players,
      activePlayer
    };
  } catch (e) {
    console.error("Erreur de chargement du state", e);
    return {
      predictions: {},
      results: {},
      players: [...DEFAULT_PLAYERS],
      activePlayer: DEFAULT_PLAYERS[0]
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scoreRaceForPlayer(raceId, player) {
  const preds = state.predictions[raceId]?.[player];
  const real = state.results[raceId];
  if (!preds || !real) return 0;

  let pts = 0;
  if (preds[0] && preds[0].toUpperCase() === real[0]?.toUpperCase()) pts += 5;
  if (preds[1] && preds[1].toUpperCase() === real[1]?.toUpperCase()) pts += 3;
  if (preds[2] && preds[2].toUpperCase() === real[2]?.toUpperCase()) pts += 1;
  return pts;
}

function totalScore(player) {
  return RACES_2026.reduce((sum, race) => sum + scoreRaceForPlayer(race.id, player), 0);
}

const playerSelect = document.getElementById("playerSelect");
const newPlayerInput = document.getElementById("newPlayerInput");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const raceListEl = document.getElementById("raceList");
const leaderboardTableBody = document.querySelector("#leaderboardTable tbody");
const resultsAdminEl = document.getElementById("resultsAdmin");

function initPlayerSelect() {
  function refreshOptions() {
    playerSelect.innerHTML = "";
    state.players.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      playerSelect.appendChild(opt);
    });
    playerSelect.value = state.activePlayer || state.players[0];
  }

  refreshOptions();

  playerSelect.addEventListener("change", () => {
    state.activePlayer = playerSelect.value;
    saveState();
    renderAll();
  });

  if (addPlayerBtn && newPlayerInput) {
    addPlayerBtn.addEventListener("click", () => {
      const raw = newPlayerInput.value.trim();
      if (!raw) return;
      const name = raw;
      if (state.players.includes(name)) {
        state.activePlayer = name;
        saveState();
        refreshOptions();
        renderAll();
        newPlayerInput.value = "";
        return;
      }
      state.players.push(name);
      state.activePlayer = name;
      saveState();
      refreshOptions();
      renderAll();
      newPlayerInput.value = "";
    });

    newPlayerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addPlayerBtn.click();
      }
    });
  }
}

function createRaceCard(race) {
  const wrapper = document.createElement("article");
  wrapper.className = "race";

  const header = document.createElement("div");
  header.className = "race-header";

  const title = document.createElement("div");
  title.className = "race-name";
  title.textContent = race.name;

  const meta = document.createElement("div");
  meta.className = "race-meta";
  meta.textContent = new Date(race.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  header.appendChild(title);
  header.appendChild(meta);

  const form = document.createElement("div");
  form.className = "race-form";

  const inputs = [];
  ["1er", "2e", "3e"].forEach((label, idx) => {
    const group = document.createElement("div");
    const l = document.createElement("label");
    l.textContent = label + " (code pilote)";

    const input = document.createElement("input");
    input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
    input.dataset.position = String(idx);

    group.appendChild(l);
    group.appendChild(input);
    inputs.push(input);
    form.appendChild(group);
  });

  const btn = document.createElement("button");
  btn.textContent = "Sauvegarder";

  btn.addEventListener("click", () => {
    const player = playerSelect.value;
    const racePreds = inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);

    if (!state.predictions[race.id]) state.predictions[race.id] = {};
    state.predictions[race.id][player] = racePreds;
    saveState();
    renderLeaderboard();
  });

  const tag = document.createElement("span");
  tag.className = "tag-points";
  tag.textContent = "Points actuels : 0";

  form.appendChild(btn);
  form.appendChild(tag);

  wrapper.appendChild(header);
  wrapper.appendChild(form);

  wrapper._pointsTag = tag;
  wrapper._inputs = inputs;
  wrapper._raceId = race.id;

  return wrapper;
}

function renderRaces() {
  raceListEl.innerHTML = "";
  RACES_2026.forEach((race) => {
    const card = createRaceCard(race);
    raceListEl.appendChild(card);
  });
  fillExistingPredictionsAndScores();
}

function fillExistingPredictionsAndScores() {
  const player = playerSelect.value;

  raceListEl.querySelectorAll(".race").forEach((el) => {
    const raceId = el._raceId;
    const inputs = el._inputs;
    const tag = el._pointsTag;

    const preds = state.predictions[raceId]?.[player];
    if (preds) {
      inputs.forEach((input, idx) => {
        input.value = preds[idx] || "";
      });
    }

    const pts = scoreRaceForPlayer(raceId, player);
    tag.textContent = `Points actuels : ${pts}`;
  });
}

function renderLeaderboard() {
  const rows = state.players.map((p) => ({
    player: p,
    score: totalScore(p)
  })).sort((a, b) => b.score - a.score);

  leaderboardTableBody.innerHTML = "";
  rows.forEach((row, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${idx + 1}</td><td>${row.player}</td><td>${row.score}</td>`;
    leaderboardTableBody.appendChild(tr);
  });

  fillExistingPredictionsAndScores();
}

function renderAdminResults() {
  resultsAdminEl.innerHTML = "";
  RACES_2026.forEach((race) => {
    const wrap = document.createElement("div");
    wrap.className = "race";
    const header = document.createElement("div");
    header.className = "race-header";

    const name = document.createElement("div");
    name.className = "race-name";
    name.textContent = race.name;

    const meta = document.createElement("div");
    meta.className = "race-meta";
    meta.textContent = "Résultats officiels";

    header.appendChild(name);
    header.appendChild(meta);

    const form = document.createElement("div");
    form.className = "race-form";

    const inputs = [];
    ["1er", "2e", "3e"].forEach((label, idx) => {
      const group = document.createElement("div");
      const l = document.createElement("label");
      l.textContent = label + " (code pilote)";

      const input = document.createElement("input");
      input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
      input.dataset.position = String(idx);

      group.appendChild(l);
      group.appendChild(input);
      form.appendChild(group);
      inputs.push(input);
    });

    const btn = document.createElement("button");
    btn.textContent = "Enregistrer";

    btn.addEventListener("click", () => {
      const results = inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
      if (!state.results[race.id]) state.results[race.id] = [];
      state.results[race.id] = results;
      saveState();
      renderLeaderboard();
    });

    form.appendChild(btn);
    wrap.appendChild(header);
    wrap.appendChild(form);
    resultsAdminEl.appendChild(wrap);

    const existing = state.results[race.id];
    if (existing) {
      inputs.forEach((input, idx) => {
        input.value = existing[idx] || "";
      });
    }
  });
}

function renderAll() {
  fillExistingPredictionsAndScores();
  renderLeaderboard();
}

initPlayerSelect();
renderRaces();
renderAdminResults();
renderLeaderboard();

