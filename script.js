const DEFAULT_PLAYERS = ["Allan", "Alexandre", "Mathéo"];

const RACES_2026 = [
  { id: "aus", name: "GP d'Australie", date: "2026-03-08" },
  { id: "chn", name: "GP de Chine", date: "2026-03-16" },
  { id: "jpn", name: "GP du Japon", date: "2026-03-30" },
  { id: "bah", name: "GP de Bahreïn", date: "2026-04-13" },
  { id: "sau", name: "GP d'Arabie Saoudite", date: "2026-04-20" },
  { id: "mia", name: "GP de Miami", date: "2026-05-03" },
  { id: "can", name: "GP du Canada", date: "2026-05-24" },
  { id: "mon", name: "GP de Monaco", date: "2026-06-07" },
  { id: "esp-bar", name: "GP d'Espagne (Barcelone)", date: "2026-06-14" },
  { id: "aut", name: "GP d'Autriche", date: "2026-06-28" },
  { id: "gbr", name: "GP de Grande-Bretagne", date: "2026-07-05" },
  { id: "bel", name: "GP de Belgique", date: "2026-07-19" },
  { id: "hun", name: "GP de Hongrie", date: "2026-07-26" },
  { id: "ned", name: "GP des Pays-Bas", date: "2026-08-23" },
  { id: "ita", name: "GP d'Italie", date: "2026-09-06" },
  { id: "esp-mad", name: "GP d'Espagne (Madrid)", date: "2026-09-13" },
  { id: "aze", name: "GP d'Azerbaïdjan", date: "2026-09-27" },
  { id: "sin", name: "GP de Singapour", date: "2026-10-11" },
  { id: "usa-aus", name: "GP des États-Unis (Austin)", date: "2026-10-25" },
  { id: "mex", name: "GP du Mexique", date: "2026-11-01" },
  { id: "bra", name: "GP du Brésil (São Paulo)", date: "2026-11-08" },
  { id: "usa-veg", name: "GP de Las Vegas", date: "2026-11-21" },
  { id: "qat", name: "GP du Qatar", date: "2026-11-29" },
  { id: "abu", name: "GP d'Abou Dhabi", date: "2026-12-06" }
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
        seasonPredictions: {},
        players: [...DEFAULT_PLAYERS],
        activePlayer: DEFAULT_PLAYERS[0],
        lockedProfile: null
      };
    }
    const parsed = JSON.parse(raw);
    const players = Array.isArray(parsed.players) && parsed.players.length ? parsed.players : [...DEFAULT_PLAYERS];
    const activePlayer = parsed.activePlayer && players.includes(parsed.activePlayer) ? parsed.activePlayer : players[0];
    const lockedProfile = parsed.lockedProfile && players.includes(parsed.lockedProfile) ? parsed.lockedProfile : null;
    return {
      predictions: parsed.predictions || {},
      results: parsed.results || {},
      seasonPredictions: parsed.seasonPredictions || {},
      players,
      activePlayer,
      lockedProfile
    };
  } catch (e) {
    console.error("Erreur de chargement du state", e);
    return {
      predictions: {},
      results: {},
      seasonPredictions: {},
      players: [...DEFAULT_PLAYERS],
      activePlayer: DEFAULT_PLAYERS[0],
      lockedProfile: null
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
const profileChoiceSection = document.getElementById("profileChoiceSection");
const profileChoiceList = document.getElementById("profileChoiceList");
const mainContent = document.getElementById("mainContent");
const headerWhenLocked = document.getElementById("headerWhenLocked");
const headerWhenUnlocked = document.getElementById("headerWhenUnlocked");
const lockedProfileName = document.getElementById("lockedProfileName");
const unlockProfileBtn = document.getElementById("unlockProfileBtn");
const removePlayerBtn = document.getElementById("removePlayerBtn");
const raceListEl = document.getElementById("raceList");
const seasonPredictionsEl = document.getElementById("seasonPredictionsEl");
const calendarProfileLabel = document.getElementById("calendarProfileLabel");
const seasonProfileLabel = document.getElementById("seasonProfileLabel");
const leaderboardTableBody = document.querySelector("#leaderboardTable tbody");
const resultsAdminEl = document.getElementById("resultsAdmin");

function updateVisibility() {
  const locked = !!state.lockedProfile;
  if (profileChoiceSection) profileChoiceSection.style.display = locked ? "none" : "block";
  if (mainContent) mainContent.style.display = locked ? "grid" : "none";
  if (headerWhenLocked) headerWhenLocked.style.display = locked ? "flex" : "none";
  if (headerWhenUnlocked) headerWhenUnlocked.style.display = locked ? "none" : "block";
  if (locked && lockedProfileName) lockedProfileName.textContent = state.lockedProfile;
}

function renderProfileChoice() {
  if (!profileChoiceList) return;
  profileChoiceList.innerHTML = "";
  state.players.forEach((name) => {
    const wrap = document.createElement("div");
    wrap.className = "profile-choice-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-its-me";
    btn.textContent = "C'est moi (" + name + ")";
    btn.addEventListener("click", () => {
      state.lockedProfile = name;
      state.activePlayer = name;
      saveState();
      refreshPlayerSelectUI();
      updateVisibility();
      renderAll();
    });
    wrap.appendChild(btn);
    if (state.players.length > 1) {
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-remove-profile";
      delBtn.textContent = "Supprimer";
      delBtn.title = "Supprimer ce profil";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.players = state.players.filter((p) => p !== name);
        Object.keys(state.predictions).forEach((raceId) => delete state.predictions[raceId][name]);
        delete state.seasonPredictions[name];
        if (state.lockedProfile === name) state.lockedProfile = null;
        if (state.activePlayer === name) state.activePlayer = state.players[0];
        saveState();
        renderProfileChoice();
      });
      wrap.appendChild(delBtn);
    }
    profileChoiceList.appendChild(wrap);
  });
}

function updateProfileLabels() {
  const name = playerSelect.value || "";
  if (calendarProfileLabel) calendarProfileLabel.textContent = name ? `Prédictions pour : ${name}` : "";
  if (seasonProfileLabel) seasonProfileLabel.textContent = name ? `Prédictions pour : ${name}` : "";
}

function refreshPlayerSelectUI() {
  if (!playerSelect) return;
  playerSelect.innerHTML = "";
  state.players.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    playerSelect.appendChild(opt);
  });
  playerSelect.value = state.lockedProfile || state.activePlayer || state.players[0];
  if (removePlayerBtn) removePlayerBtn.disabled = state.players.length <= 1;
}

function removeCurrentPlayer() {
  if (state.players.length <= 1) return;
  const toRemove = playerSelect.value;
  state.players = state.players.filter((p) => p !== toRemove);
  Object.keys(state.predictions).forEach((raceId) => {
    delete state.predictions[raceId][toRemove];
  });
  delete state.seasonPredictions[toRemove];
  if (state.lockedProfile === toRemove) state.lockedProfile = null;
  if (state.activePlayer === toRemove) state.activePlayer = state.players[0];
  saveState();
  refreshPlayerSelectUI();
  updateVisibility();
  if (state.lockedProfile) renderAll();
  else renderProfileChoice();
}

function initPlayerSelect() {
  refreshPlayerSelectUI();

  if (playerSelect) {
    playerSelect.addEventListener("change", () => {
      if (state.lockedProfile) return;
      state.activePlayer = playerSelect.value;
      saveState();
      renderAll();
    });
  }

  if (removePlayerBtn) removePlayerBtn.addEventListener("click", removeCurrentPlayer);

  if (unlockProfileBtn) {
    unlockProfileBtn.addEventListener("click", () => {
      state.lockedProfile = null;
      saveState();
      updateVisibility();
      renderProfileChoice();
    });
  }

  if (addPlayerBtn && newPlayerInput) {
    addPlayerBtn.addEventListener("click", () => {
      const raw = newPlayerInput.value.trim();
      if (!raw) return;
      const name = raw;
      if (state.players.includes(name)) {
        state.activePlayer = name;
        saveState();
        refreshPlayerSelectUI();
        renderProfileChoice();
        newPlayerInput.value = "";
        return;
      }
      state.players.push(name);
      state.activePlayer = name;
      saveState();
      refreshPlayerSelectUI();
      renderProfileChoice();
      newPlayerInput.value = "";
    });

    newPlayerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addPlayerBtn.click();
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

function fetchRaceResultsFromAPI(round, year) {
  const url = `https://ergast.com/api/f1/${year}/${round}/results.json`;
  return fetch(url)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Réseau"))))
    .catch(() => {
      const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
      return fetch(proxyUrl).then((r) => (r.ok ? r.json() : Promise.reject(new Error("Indisponible"))));
    })
    .then((data) => {
      const races = data?.MRData?.RaceTable?.Races;
      if (!races || races.length === 0) return null;
      const results = races[0].Results;
      if (!results || results.length < 3) return null;
      const top3 = results
        .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10))
        .slice(0, 3)
        .map((r) => (r.Driver && r.Driver.code) || "");
      return top3;
    });
}

function renderResultsComparison(race, wrap) {
  const official = state.results[race.id];
  if (!official || official.length < 3) return;

  const box = document.createElement("div");
  box.className = "results-comparison";

  const officialLine = document.createElement("div");
  officialLine.className = "results-comparison-official";
  officialLine.innerHTML = `Résultat officiel : 1er <strong>${official[0] || "—"}</strong>, 2e <strong>${official[1] || "—"}</strong>, 3e <strong>${official[2] || "—"}</strong>`;
  box.appendChild(officialLine);

  state.players.forEach((playerName) => {
    const preds = state.predictions[race.id]?.[playerName];
    const line = document.createElement("div");
    line.className = "results-comparison-player";

    const positions = [["1er", 0], ["2e", 1], ["3e", 2]];
    const parts = positions.map(([label, idx]) => {
      const pred = (preds && preds[idx]) ? preds[idx].toUpperCase() : "—";
      const off = (official[idx] || "").toUpperCase();
      const ok = pred && off && pred === off;
      const span = document.createElement("span");
      span.className = ok ? "pred-correct" : "pred-wrong";
      span.textContent = `${label} ${pred} ${ok ? "✓" : "✗"}`;
      span.title = ok ? "Correct" : "Incorrect";
      return span;
    });

    line.appendChild(document.createTextNode(`${playerName} : `));
    parts.forEach((span, i) => {
      if (i > 0) line.appendChild(document.createTextNode(" · "));
      line.appendChild(span);
    });
    box.appendChild(line);
  });

  wrap.appendChild(box);
}

function renderAdminResults() {
  resultsAdminEl.innerHTML = "";

  const year = 2026;
  const topBar = document.createElement("div");
  topBar.className = "results-admin-topbar";
  const btnFetchAll = document.createElement("button");
  btnFetchAll.type = "button";
  btnFetchAll.className = "btn-fetch-all";
  btnFetchAll.textContent = "Récupérer tous les résultats (API)";
  btnFetchAll.title = "Remplir toutes les courses avec l’API Ergast (année " + year + ")";
  btnFetchAll.addEventListener("click", async () => {
    btnFetchAll.disabled = true;
    btnFetchAll.textContent = "Récupération…";
    let filled = 0;
    for (let r = 0; r < RACES_2026.length; r++) {
      try {
        const top3 = await fetchRaceResultsFromAPI(r + 1, year);
        if (top3 && top3.length >= 3) {
          state.results[RACES_2026[r].id] = top3;
          filled++;
        }
      } catch (_) {}
    }
    saveState();
    renderLeaderboard();
    renderAdminResults();
    btnFetchAll.textContent = filled ? `Récupérer tous (${filled} course(s) remplies)` : "Récupérer tous les résultats (API)";
    btnFetchAll.disabled = false;
  });
  topBar.appendChild(btnFetchAll);
  resultsAdminEl.appendChild(topBar);

  RACES_2026.forEach((race, index) => {
    const round = index + 1;
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

    const btnSave = document.createElement("button");
    btnSave.textContent = "Enregistrer";

    btnSave.addEventListener("click", () => {
      const results = inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
      if (!state.results[race.id]) state.results[race.id] = [];
      state.results[race.id] = results;
      saveState();
      renderLeaderboard();
      renderAdminResults();
    });

    const btnFetch = document.createElement("button");
    btnFetch.className = "btn-fetch";
    btnFetch.textContent = "Récupérer auto";
    btnFetch.title = "Remplir avec les résultats officiels (API Ergast)";

    btnFetch.addEventListener("click", async () => {
      btnFetch.disabled = true;
      btnFetch.textContent = "…";
      try {
        const top3 = await fetchRaceResultsFromAPI(round, year);
        if (top3 && top3.length >= 3) {
          inputs[0].value = top3[0] || "";
          inputs[1].value = top3[1] || "";
          inputs[2].value = top3[2] || "";
          state.results[race.id] = top3;
          saveState();
          renderLeaderboard();
          renderAdminResults();
        } else {
          btnFetch.textContent = "Aucun résultat";
          setTimeout(() => {
            btnFetch.textContent = "Récupérer auto";
            btnFetch.disabled = false;
          }, 2000);
          return;
        }
      } catch (e) {
        btnFetch.textContent = "Erreur";
        setTimeout(() => {
          btnFetch.textContent = "Récupérer auto";
          btnFetch.disabled = false;
        }, 2000);
        return;
      }
      btnFetch.textContent = "Récupérer auto";
      btnFetch.disabled = false;
    });

    const btnWrap = document.createElement("div");
    btnWrap.className = "race-form-buttons";
    btnWrap.appendChild(btnFetch);
    btnWrap.appendChild(btnSave);
    form.appendChild(btnWrap);
    wrap.appendChild(header);
    wrap.appendChild(form);
    resultsAdminEl.appendChild(wrap);

    const existing = state.results[race.id];
    if (existing) {
      inputs.forEach((input, idx) => {
        input.value = existing[idx] || "";
      });
    }

    renderResultsComparison(race, wrap);
  });
}

function renderSeasonPredictions() {
  if (!seasonPredictionsEl) return;
  const player = playerSelect.value;
  const data = state.seasonPredictions[player] || { drivers: ["", "", ""], constructors: ["", "", ""] };
  const drivers = Array.isArray(data.drivers) ? data.drivers : ["", "", ""];
  const constructors = Array.isArray(data.constructors) ? data.constructors : ["", "", ""];

  seasonPredictionsEl.innerHTML = "";

  const block = (title, labels, values, key) => {
    const wrap = document.createElement("div");
    wrap.className = "season-block";
    const h = document.createElement("h3");
    h.className = "season-block-title";
    h.textContent = title;
    wrap.appendChild(h);
    const form = document.createElement("div");
    form.className = "season-form";
    const inputs = [];
    labels.forEach((label, idx) => {
      const group = document.createElement("div");
      const l = document.createElement("label");
      l.textContent = label;
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = label;
      input.value = values[idx] || "";
      group.appendChild(l);
      group.appendChild(input);
      form.appendChild(group);
      inputs.push(input);
    });
    wrap.appendChild(form);
    seasonPredictionsEl.appendChild(wrap);
    return inputs;
  };

  const driverInputs = block("Championnat pilotes (top 3)", ["1er", "2e", "3e"], drivers, "drivers");
  const constructorInputs = block("Championnat constructeurs (top 3)", ["1er", "2e", "3e"], constructors, "constructors");

  const btn = document.createElement("button");
  btn.className = "season-save-btn";
  btn.textContent = "Sauvegarder les prédictions fin de saison";
  btn.addEventListener("click", () => {
    const currentPlayer = playerSelect.value;
    const d = driverInputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
    const c = constructorInputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
    state.seasonPredictions[currentPlayer] = { drivers: d, constructors: c };
    saveState();
  });
  seasonPredictionsEl.appendChild(btn);
}

function renderAll() {
  renderRaces();
  updateProfileLabels();
  fillExistingPredictionsAndScores();
  renderSeasonPredictions();
  renderLeaderboard();
}

initPlayerSelect();
updateVisibility();
if (state.lockedProfile) {
  refreshPlayerSelectUI();
  updateProfileLabels();
  renderRaces();
  renderSeasonPredictions();
  renderAdminResults();
  renderLeaderboard();
} else {
  renderProfileChoice();
}

