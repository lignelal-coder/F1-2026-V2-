const DEFAULT_PLAYERS = ["Allan", "Alexandre", "Mathéo"];

// Calendrier affiché : 2026 (prédictions saison 2026)
const SEASON_YEAR = 2026;

const RACES_2025 = [
  { id: "aus", name: "GP d'Australie", date: "2025-03-16" },
  { id: "chn", name: "GP de Chine", date: "2025-03-23" },
  { id: "jpn", name: "GP du Japon", date: "2025-04-06" },
  { id: "bah", name: "GP de Bahreïn", date: "2025-04-13" },
  { id: "sau", name: "GP d'Arabie Saoudite", date: "2025-04-20" },
  { id: "mia", name: "GP de Miami", date: "2025-05-04" },
  { id: "imo", name: "GP d'Émilie-Romagne (Imola)", date: "2025-05-18" },
  { id: "mon", name: "GP de Monaco", date: "2025-05-25" },
  { id: "esp-bar", name: "GP d'Espagne (Barcelone)", date: "2025-06-01" },
  { id: "can", name: "GP du Canada", date: "2025-06-15" },
  { id: "aut", name: "GP d'Autriche", date: "2025-06-29" },
  { id: "gbr", name: "GP de Grande-Bretagne", date: "2025-07-06" },
  { id: "bel", name: "GP de Belgique", date: "2025-07-27" },
  { id: "hun", name: "GP de Hongrie", date: "2025-08-03" },
  { id: "ned", name: "GP des Pays-Bas", date: "2025-08-31" },
  { id: "ita", name: "GP d'Italie", date: "2025-09-07" },
  { id: "aze", name: "GP d'Azerbaïdjan", date: "2025-09-21" },
  { id: "sin", name: "GP de Singapour", date: "2025-10-05" },
  { id: "usa-aus", name: "GP des États-Unis (Austin)", date: "2025-10-19" },
  { id: "mex", name: "GP du Mexique", date: "2025-10-26" },
  { id: "bra", name: "GP du Brésil (São Paulo)", date: "2025-11-09" },
  { id: "usa-veg", name: "GP de Las Vegas", date: "2025-11-22" },
  { id: "qat", name: "GP du Qatar", date: "2025-11-30" },
  { id: "abu", name: "GP d'Abou Dhabi", date: "2025-12-07" }
];

const RACES_2026 = [
  { id: "aus", name: "Australie (Melbourne)", date: "2026-03-08", sprint: false },
  { id: "chn", name: "Chine (Shanghai)", date: "2026-03-16", sprint: true },
  { id: "jpn", name: "Japon (Suzuka)", date: "2026-03-30", sprint: false },
  { id: "bah", name: "Bahreïn (Sakhir)", date: "2026-04-13", sprint: false },
  { id: "sau", name: "Arabie Saoudite (Djeddah)", date: "2026-04-20", sprint: false },
  { id: "mia", name: "Miami", date: "2026-05-03", sprint: true },
  { id: "can", name: "Canada (Montréal)", date: "2026-05-24", sprint: true },
  { id: "mon", name: "Monaco", date: "2026-06-07", sprint: false },
  { id: "esp-bar", name: "Espagne (Barcelone)", date: "2026-06-14", sprint: false },
  { id: "aut", name: "Autriche (Spielberg)", date: "2026-06-28", sprint: false },
  { id: "gbr", name: "Grande-Bretagne (Silverstone)", date: "2026-07-05", sprint: true },
  { id: "bel", name: "Belgique (Spa)", date: "2026-07-19", sprint: false },
  { id: "hun", name: "Hongrie (Budapest)", date: "2026-07-26", sprint: false },
  { id: "ned", name: "Pays-Bas (Zandvoort)", date: "2026-08-23", sprint: true },
  { id: "ita", name: "Italie (Monza)", date: "2026-09-06", sprint: false },
  { id: "esp-mad", name: "Espagne (Madrid)", date: "2026-09-13", sprint: false },
  { id: "aze", name: "Azerbaïdjan (Bakou) — course samedi", date: "2026-09-26", sprint: false },
  { id: "sin", name: "Singapour", date: "2026-10-11", sprint: true },
  { id: "usa-aus", name: "États-Unis (Austin)", date: "2026-10-25", sprint: false },
  { id: "mex", name: "Mexique (Mexico)", date: "2026-11-01", sprint: false },
  { id: "bra", name: "Brésil (São Paulo)", date: "2026-11-08", sprint: false },
  { id: "usa-veg", name: "Las Vegas", date: "2026-11-21", sprint: false },
  { id: "qat", name: "Qatar (Losail)", date: "2026-11-29", sprint: false },
  { id: "abu", name: "Abou Dhabi (Yas Marina)", date: "2026-12-06", sprint: false }
];

const RACES = SEASON_YEAR === 2025 ? RACES_2025 : RACES_2026;

// Images des tracés de circuits (cartes détaillées par GP)
const TRACK_IMAGES = {
  aus: "assets/img/tracks/track-aus.png", chn: "assets/img/tracks/track-chn.png",
  jpn: "assets/img/tracks/track-jpn.png", bah: "assets/img/tracks/track-bah.png",
  sau: "assets/img/tracks/track-sau.png", mia: "assets/img/tracks/track-mia.png",
  can: "assets/img/tracks/track-can.png", mon: "assets/img/tracks/track-mon.png",
  "esp-bar": "assets/img/tracks/track-esp-bar.png", aut: "assets/img/tracks/track-aut.png",
  gbr: "assets/img/tracks/track-gbr.png", bel: "assets/img/tracks/track-bel.png",
  hun: "assets/img/tracks/track-hun.png", ned: "assets/img/tracks/track-ned.png",
  ita: "assets/img/tracks/track-ita.png", "esp-mad": "assets/img/tracks/track-esp-mad.png",
  aze: "assets/img/tracks/track-aze.png", sin: "assets/img/tracks/track-sin.png",
  "usa-aus": "assets/img/tracks/track-usa-aus.png", mex: "assets/img/tracks/track-mex.png",
  bra: "assets/img/tracks/track-bra.png", "usa-veg": "assets/img/tracks/track-usa-veg.png",
  qat: "assets/img/tracks/track-qat.png", abu: "assets/img/tracks/track-abu.png",
  imo: "assets/img/tracks/track-imola.png"
};

// Icônes pilotes (code FIA → chemin image). Ajouter les fichiers dans assets/img/drivers/
const DRIVER_ICONS = {
  VER: "assets/img/drivers/VER.png", HAD: "assets/img/drivers/HAD.png",
  LEC: "assets/img/drivers/LEC.png", HAM: "assets/img/drivers/HAM.png",
  RUS: "assets/img/drivers/RUS.png", ANT: "assets/img/drivers/ANT.png",
  NOR: "assets/img/drivers/NOR.png", PIA: "assets/img/drivers/PIA.png",
  ALO: "assets/img/drivers/ALO.png", STR: "assets/img/drivers/STR.png",
  GAS: "assets/img/drivers/GAS.png", COL: "assets/img/drivers/COL.png",
  ALB: "assets/img/drivers/ALB.png", SAI: "assets/img/drivers/SAI.png",
  LAW: "assets/img/drivers/LAW.png", LIN: "assets/img/drivers/LIN.png",
  HUL: "assets/img/drivers/HUL.png", BOR: "assets/img/drivers/BOR.png",
  BEA: "assets/img/drivers/BEA.png", OCO: "assets/img/drivers/OCO.png",
  PER: "assets/img/drivers/PER.png", BOT: "assets/img/drivers/BOT.png"
};

// Ordre d'affichage pour la grille des pilotes en bas de page (par écurie)
const DRIVERS_GRID_ORDER = [
  "VER", "HAD", "LEC", "HAM", "RUS", "ANT", "NOR", "PIA",
  "ALO", "STR", "GAS", "COL", "ALB", "SAI", "LAW", "LIN",
  "HUL", "BOR", "BEA", "OCO", "PER", "BOT"
];

// Noms complets des pilotes (code FIA → nom affiché)
const DRIVER_NAMES = {
  VER: "Max Verstappen", HAD: "Isaac Hadjar", LEC: "Charles Leclerc", HAM: "Lewis Hamilton",
  RUS: "George Russell", ANT: "Kimi Antonelli", NOR: "Lando Norris", PIA: "Oscar Piastri",
  ALO: "Fernando Alonso", STR: "Lance Stroll", GAS: "Pierre Gasly", COL: "Jack Doohan",
  ALB: "Alex Albon", SAI: "Carlos Sainz", LAW: "Liam Lawson", LIN: "Yuki Tsunoda",
  HUL: "Nico Hülkenberg", BOR: "Rafael Bortoleto", BEA: "Oliver Bearman", OCO: "Esteban Ocon",
  PER: "Sergio Pérez", BOT: "Valtteri Bottas"
};

// Écurie de chaque pilote (code FIA → nom écurie affiché)
const DRIVER_TO_CONSTRUCTOR = {
  VER: "Red Bull", HAD: "Red Bull", LEC: "Ferrari", HAM: "Ferrari",
  RUS: "Mercedes", ANT: "Mercedes", NOR: "McLaren", PIA: "McLaren",
  ALO: "Aston Martin", STR: "Aston Martin", GAS: "Alpine", COL: "Alpine",
  ALB: "Williams", SAI: "Williams", LAW: "Racing Bulls", LIN: "Racing Bulls",
  HUL: "Audi", BOR: "Audi", BEA: "Haas", OCO: "Haas", PER: "Cadillac", BOT: "Cadillac"
};

function getConstructorNameForDriver(code) {
  const c = (code || "").toUpperCase().trim();
  return DRIVER_TO_CONSTRUCTOR[c] || null;
}

// Icônes coupe / médaille par position (1er = or, 2e = argent, 3e = bronze)
const POSITION_ICONS = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"]; // 🥇 🥈 🥉
function getPositionIcon(idx) {
  return POSITION_ICONS[idx] != null ? POSITION_ICONS[idx] + " " : "";
}

function getDriverName(code) {
  const c = (code || "").toUpperCase().trim();
  return DRIVER_NAMES[c] || code || "";
}

/** Met à jour le suffixe du label (code pilote → nom écurie) pour un champ prédiction. */
function updatePredictionLabelSuffix(input) {
  const group = input?.closest(".race-prediction-group");
  const suffix = group?.querySelector(".race-prediction-label-suffix");
  if (!suffix) return;
  const team = getConstructorNameForDriver(input.value?.trim());
  suffix.textContent = team ? "(" + team + ")" : "(code pilote)";
}

/** Met à jour l’icône pilote au-dessus du champ quand on modifie la prédiction (saisie en direct). */
function updateDriverIconForInput(input) {
  const group = input?.closest(".race-prediction-group");
  const iconImg = group?.querySelector(".race-driver-icon");
  if (!iconImg) return;
  const src = getDriverIconSrc(input.value?.trim());
  if (src) {
    iconImg.src = src;
    iconImg.style.display = "block";
  } else {
    iconImg.style.display = "none";
  }
}

// Icônes écuries (nom ou code → chemin image). Fichiers dans assets/img/teams/
const CONSTRUCTOR_ICONS = {
  MCLAREN: "assets/img/teams/MCLAREN.png", MERCEDES: "assets/img/teams/MERCEDES.png",
  REDBULL: "assets/img/teams/REDBULL.png", RED_BULL: "assets/img/teams/REDBULL.png",
  FERRARI: "assets/img/teams/FERRARI.png", WILLIAMS: "assets/img/teams/WILLIAMS.png",
  HAAS: "assets/img/teams/HAAS.png", ASTON_MARTIN: "assets/img/teams/ASTON_MARTIN.png",
  ASTONMARTIN: "assets/img/teams/ASTON_MARTIN.png", RACING_BULLS: "assets/img/teams/RB.png",
  RB: "assets/img/teams/RB.png", ALPINE: "assets/img/teams/ALPINE.png",
  AUDI: "assets/img/teams/AUDI.png", CADILLAC: "assets/img/teams/CADILLAC.png"
};

function getDriverIconSrc(code) {
  const c = (code || "").toUpperCase().trim();
  return DRIVER_ICONS[c] || null;
}

function getConstructorIconSrc(name) {
  const n = (name || "").toUpperCase().replace(/\s+/g, "_").trim();
  return CONSTRUCTOR_ICONS[n] || CONSTRUCTOR_ICONS[name?.toUpperCase().replace(/\s+/g, "")] || null;
}

/** Verrouille à partir du jour du GP : on peut modifier jusqu'à la veille (inclus). */
function isRaceLocked(race) {
  if (!race || !race.date) return false;
  const raceDay = new Date(race.date);
  raceDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= raceDay;
}

function getStorageKey() {
  return "f1-" + SEASON_YEAR + "-predictions-v1";
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) {
      return {
        predictions: {},
        results: {},
        sprintPredictions: {},
        sprintResults: {},
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
      sprintPredictions: parsed.sprintPredictions || {},
      sprintResults: parsed.sprintResults || {},
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
      sprintPredictions: {},
      sprintResults: {},
      seasonPredictions: {},
      players: [...DEFAULT_PLAYERS],
      activePlayer: DEFAULT_PLAYERS[0],
      lockedProfile: null
    };
  }
}

function saveState() {
  localStorage.setItem(getStorageKey(), JSON.stringify(state));
}

function scoreRaceForPlayer(raceId, player) {
  const preds = state.predictions[raceId]?.[player];
  const real = state.results[raceId];
  if (!preds || !real) return 0;
  let pts = 0;
  if (preds[0] && preds[0].toUpperCase() === real[0]?.toUpperCase()) pts += 1;
  if (preds[1] && preds[1].toUpperCase() === real[1]?.toUpperCase()) pts += 1;
  if (preds[2] && preds[2].toUpperCase() === real[2]?.toUpperCase()) pts += 1;
  return pts;
}

function scoreSprintForPlayer(raceId, player) {
  const preds = state.sprintPredictions[raceId]?.[player];
  const real = state.sprintResults[raceId];
  if (!preds || !real) return 0;
  let pts = 0;
  if (preds[0] && preds[0].toUpperCase() === real[0]?.toUpperCase()) pts += 1;
  if (preds[1] && preds[1].toUpperCase() === real[1]?.toUpperCase()) pts += 1;
  if (preds[2] && preds[2].toUpperCase() === real[2]?.toUpperCase()) pts += 1;
  return pts;
}

function totalScore(player) {
  return RACES.reduce((sum, race) => {
    let s = scoreRaceForPlayer(race.id, player);
    if (race.sprint) s += scoreSprintForPlayer(race.id, player);
    return sum + s;
  }, 0);
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
const seasonYearBadge = document.getElementById("seasonYearBadge");
const driversGridEl = document.getElementById("driversGrid");

function updateSeasonYearBadge() {
  if (seasonYearBadge) {
    seasonYearBadge.textContent = "Saison " + SEASON_YEAR + (SEASON_YEAR === 2025 ? " (essai)" : "");
  }
}

function renderDriversGrid() {
  if (!driversGridEl) return;
  driversGridEl.innerHTML = "";
  DRIVERS_GRID_ORDER.forEach((code) => {
    const src = getDriverIconSrc(code);
    const item = document.createElement("div");
    item.className = "drivers-grid-item";
    const fullName = getDriverName(code);
    item.setAttribute("aria-label", fullName || "Pilote " + code);
    const img = document.createElement("img");
    img.src = src || "";
    img.alt = fullName || code;
    img.className = "drivers-grid-portrait";
    const label = document.createElement("span");
    label.className = "drivers-grid-label";
    label.textContent = fullName || code;
    item.appendChild(img);
    item.appendChild(label);
    driversGridEl.appendChild(item);
  });
}

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

  const headerLeft = document.createElement("div");
  headerLeft.className = "race-header-main";

  const title = document.createElement("div");
  title.className = "race-name";
  title.textContent = race.name;

  const meta = document.createElement("div");
  meta.className = "race-meta";
  const dateStr = new Date(race.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  meta.textContent = dateStr;
  if (race.sprint) {
    const sprintTag = document.createElement("span");
    sprintTag.className = "race-sprint-tag";
    sprintTag.textContent = "Sprint";
    meta.appendChild(document.createTextNode(" · "));
    meta.appendChild(sprintTag);
  }

  headerLeft.appendChild(title);
  headerLeft.appendChild(meta);
  header.appendChild(headerLeft);

  const trackSrc = TRACK_IMAGES[race.id];
  if (trackSrc) {
    const trackEl = document.createElement("img");
    trackEl.className = "race-track-thumb race-track-img";
    trackEl.src = trackSrc;
    trackEl.alt = "";
    trackEl.setAttribute("aria-hidden", "true");
    header.appendChild(trackEl);
  }

  const form = document.createElement("div");
  form.className = "race-form";

  const inputs = [];
  ["1er", "2e", "3e"].forEach((label, idx) => {
    const group = document.createElement("div");
    group.className = "race-prediction-group";
    const l = document.createElement("label");
    l.appendChild(document.createTextNode(getPositionIcon(idx) + label + " "));
    const suffix = document.createElement("span");
    suffix.className = "race-prediction-label-suffix";
    suffix.textContent = "(code pilote)";
    l.appendChild(suffix);
    const iconWrap = document.createElement("div");
    iconWrap.className = "race-driver-icon-wrap";
    const iconImg = document.createElement("img");
    iconImg.className = "race-driver-icon";
    iconImg.alt = "";
    iconImg.style.display = "none";
    iconImg.onerror = () => { iconImg.style.display = "none"; };
    iconWrap.appendChild(iconImg);
    const input = document.createElement("input");
    input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
    input.dataset.position = String(idx);
    input.addEventListener("input", () => {
      updatePredictionLabelSuffix(input);
      updateDriverIconForInput(input);
    });
    input.addEventListener("blur", () => updatePredictionLabelSuffix(input));
    group.appendChild(l);
    group.appendChild(iconWrap);
    group.appendChild(input);
    inputs.push(input);
    form.appendChild(group);
  });

  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Sauvegarder";

  btn.addEventListener("click", () => {
    const player = playerSelect.value;
    const racePreds = inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
    if (!state.predictions[race.id]) state.predictions[race.id] = {};
    if (!racePreds[0] && !racePreds[1] && !racePreds[2]) {
      delete state.predictions[race.id][player];
    } else {
      state.predictions[race.id][player] = racePreds;
    }
    saveState();
    setRaceCardLocked(wrapper, isRaceLocked(race));
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
  wrapper._saveBtn = btn;
  wrapper._raceId = race.id;
  wrapper._race = race;

  return wrapper;
}

function createSprintWeekendCard(race) {
  const wrapper = document.createElement("article");
  wrapper.className = "race sprint-weekend-card";

  const header = document.createElement("div");
  header.className = "race-header";
  const headerLeft = document.createElement("div");
  headerLeft.className = "race-header-main";
  const title = document.createElement("div");
  title.className = "race-name";
  title.textContent = race.name;
  const meta = document.createElement("div");
  meta.className = "race-meta";
  meta.textContent = new Date(race.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  meta.appendChild(document.createTextNode(" · "));
  const sprintTag = document.createElement("span");
  sprintTag.className = "race-sprint-tag";
  sprintTag.textContent = "Course + Sprint";
  meta.appendChild(sprintTag);
  headerLeft.appendChild(title);
  headerLeft.appendChild(meta);
  header.appendChild(headerLeft);
  const trackSrc = TRACK_IMAGES[race.id];
  if (trackSrc) {
    const trackEl = document.createElement("img");
    trackEl.className = "race-track-thumb race-track-img";
    trackEl.src = trackSrc;
    trackEl.alt = "";
    trackEl.setAttribute("aria-hidden", "true");
    header.appendChild(trackEl);
  }
  wrapper.appendChild(header);

  const twoCol = document.createElement("div");
  twoCol.className = "sprint-weekend-two-col";

  function makeForm(label, storageKey, stateKey) {
    const col = document.createElement("div");
    col.className = "sprint-weekend-col";
    const subTitle = document.createElement("div");
    subTitle.className = "sprint-weekend-col-title";
    subTitle.textContent = label;
    col.appendChild(subTitle);
    const form = document.createElement("div");
    form.className = "race-form";
    const inputs = [];
    ["1er", "2e", "3e"].forEach((lbl, idx) => {
      const group = document.createElement("div");
      group.className = "race-prediction-group";
      const l = document.createElement("label");
      l.appendChild(document.createTextNode(getPositionIcon(idx) + lbl + " "));
      const suffix = document.createElement("span");
      suffix.className = "race-prediction-label-suffix";
      suffix.textContent = "(code pilote)";
      l.appendChild(suffix);
      const iconWrap = document.createElement("div");
      iconWrap.className = "race-driver-icon-wrap";
      const iconImg = document.createElement("img");
      iconImg.className = "race-driver-icon";
      iconImg.alt = "";
      iconImg.style.display = "none";
      iconImg.onerror = () => { iconImg.style.display = "none"; };
      iconWrap.appendChild(iconImg);
      const input = document.createElement("input");
      input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
      input.dataset.position = String(idx);
      input.addEventListener("input", () => {
        updatePredictionLabelSuffix(input);
        updateDriverIconForInput(input);
      });
      input.addEventListener("blur", () => updatePredictionLabelSuffix(input));
      group.appendChild(l);
      group.appendChild(iconWrap);
      group.appendChild(input);
      form.appendChild(group);
      inputs.push(input);
    });
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Sauvegarder";
    const tag = document.createElement("span");
    tag.className = "tag-points";
    tag.textContent = "Points : 0";
    form.appendChild(btn);
    form.appendChild(tag);
    col.appendChild(form);
    btn.addEventListener("click", () => {
      const player = playerSelect.value;
      const preds = inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
      const store = state[storageKey];
      if (!store[race.id]) store[race.id] = {};
      if (!preds[0] && !preds[1] && !preds[2]) {
        delete store[race.id][player];
      } else {
        store[race.id][player] = preds;
      }
      saveState();
      if (stateKey === "predictions") setRaceCardLocked(wrapper, isRaceLocked(race));
      else setSprintPartLocked(wrapper, isRaceLocked(race));
      renderLeaderboard();
    });
    return { col, inputs, btn, tag };
  }

  const coursePart = makeForm("Course (dimanche)", "predictions", "predictions");
  const sprintPart = makeForm("Sprint (samedi)", "sprintPredictions", "sprintPredictions");
  twoCol.appendChild(coursePart.col);
  twoCol.appendChild(sprintPart.col);
  wrapper.appendChild(twoCol);

  wrapper._raceId = race.id;
  wrapper._race = race;
  wrapper._inputs = coursePart.inputs;
  wrapper._pointsTag = coursePart.tag;
  wrapper._saveBtn = coursePart.btn;
  wrapper._sprintInputs = sprintPart.inputs;
  wrapper._sprintPointsTag = sprintPart.tag;
  wrapper._sprintSaveBtn = sprintPart.btn;
  return wrapper;
}

function setSprintPartLocked(cardEl, locked) {
  if (!cardEl._sprintInputs || !cardEl._sprintSaveBtn) return;
  cardEl._sprintInputs.forEach((input) => { input.disabled = locked; input.readOnly = locked; });
  cardEl._sprintSaveBtn.disabled = locked;
  cardEl._sprintSaveBtn.textContent = locked ? "Enregistré" : "Sauvegarder";
  cardEl.classList.toggle("sprint-part-locked", locked);
}

function setRaceCardLocked(cardEl, locked) {
  if (!cardEl._inputs || !cardEl._saveBtn) return;
  cardEl._inputs.forEach((input) => {
    input.disabled = locked;
    input.readOnly = locked;
  });
  cardEl._saveBtn.disabled = locked;
  cardEl._saveBtn.textContent = locked ? "Enregistré" : "Sauvegarder";
  cardEl.classList.toggle("race-locked", locked);
}

function renderRaces() {
  raceListEl.innerHTML = "";

  const racesOnly = RACES.filter((r) => !r.sprint);
  const sprintWeekends = RACES.filter((r) => r.sprint);

  const colNormals = document.createElement("div");
  colNormals.className = "race-list-column race-list-normals";
  const titleNormals = document.createElement("h3");
  titleNormals.className = "race-list-section-title";
  titleNormals.textContent = "Courses normales";
  colNormals.appendChild(titleNormals);
  racesOnly.forEach((race) => colNormals.appendChild(createRaceCard(race)));

  const colSprints = document.createElement("div");
  colSprints.className = "race-list-column race-list-sprints";
  const titleSprints = document.createElement("h3");
  titleSprints.className = "race-list-section-title";
  titleSprints.textContent = "Weekends Sprint";
  colSprints.appendChild(titleSprints);
  sprintWeekends.forEach((race) => colSprints.appendChild(createSprintWeekendCard(race)));

  raceListEl.appendChild(colNormals);
  raceListEl.appendChild(colSprints);

  fillExistingPredictionsAndScores();
}

function fillExistingPredictionsAndScores() {
  const player = playerSelect.value;

  raceListEl.querySelectorAll(".race").forEach((el) => {
    const raceId = el._raceId;
    if (el.classList.contains("sprint-weekend-card")) {
      const preds = state.predictions[raceId]?.[player];
      const sprintPreds = state.sprintPredictions[raceId]?.[player];
      if (sprintPreds) {
        el._sprintInputs.forEach((input, idx) => {
          input.value = sprintPreds[idx] || "";
          updatePredictionLabelSuffix(input);
          const group = input.closest(".race-prediction-group");
          const iconImg = group?.querySelector(".race-driver-icon");
          if (iconImg) {
            const src = getDriverIconSrc(input.value.trim());
            if (src) {
              iconImg.src = src;
              iconImg.style.display = "block";
            } else {
              iconImg.style.display = "none";
            }
          }
        });
      }
      if (preds) {
        el._inputs.forEach((input, idx) => {
          input.value = preds[idx] || "";
          updatePredictionLabelSuffix(input);
          const group = input.closest(".race-prediction-group");
          const iconImg = group?.querySelector(".race-driver-icon");
          if (iconImg) {
            const src = getDriverIconSrc(input.value.trim());
            if (src) {
              iconImg.src = src;
              iconImg.style.display = "block";
            } else {
              iconImg.style.display = "none";
            }
          }
        });
      }
      const race = el._race || RACES.find((r) => r.id === raceId);
      const hasSavedCourse = !!(preds && (preds[0] || preds[1] || preds[2]));
      const hasSavedSprint = !!(sprintPreds && (sprintPreds[0] || sprintPreds[1] || sprintPreds[2]));
      setRaceCardLocked(el, hasSavedCourse && isRaceLocked(race));
      setSprintPartLocked(el, hasSavedSprint && isRaceLocked(race));
      const ptsRace = scoreRaceForPlayer(raceId, player);
      const ptsSprint = scoreSprintForPlayer(raceId, player);
      el._pointsTag.textContent = `Points : ${ptsRace}`;
      el._sprintPointsTag.textContent = `Points : ${ptsSprint}`;
    } else {
      const inputs = el._inputs;
      const tag = el._pointsTag;
      const preds = state.predictions[raceId]?.[player];
      if (preds) {
        inputs.forEach((input, idx) => {
          input.value = preds[idx] || "";
          updatePredictionLabelSuffix(input);
          const group = input.closest(".race-prediction-group");
          const iconImg = group?.querySelector(".race-driver-icon");
          if (iconImg) {
            const src = getDriverIconSrc(input.value.trim());
            if (src) {
              iconImg.src = src;
              iconImg.style.display = "block";
            } else {
              iconImg.style.display = "none";
            }
          }
        });
      }
      const race = el._race || RACES.find((r) => r.id === raceId);
      const hasSaved = !!(preds && (preds[0] || preds[1] || preds[2]));
      setRaceCardLocked(el, hasSaved && isRaceLocked(race));
      const pts = scoreRaceForPlayer(raceId, player);
      tag.textContent = `Points actuels : ${pts}`;
    }
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

  function parseResponse(data) {
    const races = data?.MRData?.RaceTable?.Races;
    if (!races || races.length === 0) return null;
    const results = races[0].Results;
    if (!results || results.length < 3) return null;
    const top3 = results
      .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10))
      .slice(0, 3)
      .map((r) => (r.Driver && r.Driver.code) || "");
    return top3;
  }

  const proxies = [
    "https://corsproxy.io/?url=" + encodeURIComponent(url),
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(url)
  ];

  function tryFetch(i) {
    if (i >= proxies.length) return Promise.reject(new Error("API indisponible"));
    return fetch(proxies[i], { mode: "cors" })
      .then((r) => {
        if (!r.ok) throw new Error("Réseau");
        return r.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          const top3 = parseResponse(data);
          if (top3) return top3;
        } catch (_) {}
        throw new Error("Aucun résultat");
      })
      .catch(() => tryFetch(i + 1));
  }

  return fetch(url, { mode: "cors" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Réseau"))))
    .then((data) => {
      const top3 = parseResponse(data);
      if (top3) return top3;
      throw new Error("Aucun résultat");
    })
    .catch(() => tryFetch(0));
}

function renderResultsComparison(race, wrap) {
  const official = state.results[race.id];
  if (!official || official.length < 3) return;

  const box = document.createElement("div");
  box.className = "results-comparison";

  const officialLine = document.createElement("div");
  officialLine.className = "results-comparison-official";
  const officialParts = [];
  ["1er", "2e", "3e"].forEach((label, idx) => {
    const code = (official[idx] || "—").toUpperCase();
    const span = document.createElement("span");
    span.className = "pred-band results-official-band";
    const iconSrc = code !== "—" ? getDriverIconSrc(code) : null;
    if (iconSrc) {
      const img = document.createElement("img");
      img.src = iconSrc;
      img.alt = "";
      img.className = "pred-driver-icon";
      img.onerror = () => { img.style.display = "none"; };
      span.appendChild(img);
    }
    span.appendChild(document.createTextNode(`${getPositionIcon(idx)}${label} ${code}`));
    officialParts.push(span);
  });
  officialLine.appendChild(document.createTextNode("Résultat officiel : "));
  officialParts.forEach((span, i) => {
    if (i > 0) officialLine.appendChild(document.createTextNode(" "));
    officialLine.appendChild(span);
  });
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
      span.className = "pred-band " + (ok ? "pred-correct" : "pred-wrong");
      span.title = ok ? "Correct" : "Incorrect";
      const iconSrc = pred && pred !== "—" ? getDriverIconSrc(pred) : null;
      if (iconSrc) {
        const img = document.createElement("img");
        img.src = iconSrc;
        img.alt = "";
        img.className = "pred-driver-icon";
        img.onerror = () => { img.style.display = "none"; };
        span.appendChild(img);
      }
      span.appendChild(document.createTextNode(`${getPositionIcon(idx)}${label} ${pred} ${ok ? "✓" : "✗"}`));
      return span;
    });

    line.appendChild(document.createTextNode(`${playerName} : `));
    parts.forEach((span, i) => {
      if (i > 0) line.appendChild(document.createTextNode(" "));
      line.appendChild(span);
    });
    box.appendChild(line);
  });

  wrap.appendChild(box);
}

function renderAdminResults() {
  resultsAdminEl.innerHTML = "";

  const year = SEASON_YEAR;
  const topBar = document.createElement("div");
  topBar.className = "results-admin-topbar";
  const btnFetchAll = document.createElement("button");
  btnFetchAll.type = "button";
  btnFetchAll.className = "btn-fetch-all";
  btnFetchAll.textContent = "Récupérer tous les résultats (API " + year + ")";
  btnFetchAll.title = "Remplir toutes les courses avec l’API Ergast (année " + year + ")";
  btnFetchAll.addEventListener("click", async () => {
    btnFetchAll.disabled = true;
    btnFetchAll.textContent = "Récupération…";
    let filled = 0;
    for (let r = 0; r < RACES.length; r++) {
      try {
        const top3 = await fetchRaceResultsFromAPI(r + 1, year);
        if (top3 && top3.length >= 3) {
          state.results[RACES[r].id] = top3;
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

  RACES.forEach((race, index) => {
    const round = index + 1;
    const wrap = document.createElement("div");
    wrap.className = "race";
    const header = document.createElement("div");
    header.className = "race-header";

    const name = document.createElement("div");
    name.className = "race-name";
    name.textContent = race.name;
    if (race.sprint) {
      name.appendChild(document.createTextNode(" "));
      const sprintTag = document.createElement("span");
      sprintTag.className = "race-sprint-tag";
      sprintTag.textContent = "Sprint";
      name.appendChild(sprintTag);
    }

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
      l.textContent = getPositionIcon(idx) + label + " (code pilote)";

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
        btnFetch.textContent = "API indisponible";
        setTimeout(() => {
          btnFetch.textContent = "Récupérer auto";
          btnFetch.disabled = false;
        }, 3000);
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

    if (race.sprint) {
      const sprintLabel = document.createElement("div");
      sprintLabel.className = "sprint-weekend-col-title";
      sprintLabel.textContent = "Résultat Sprint (samedi)";
      wrap.appendChild(sprintLabel);
      const formSprint = document.createElement("div");
      formSprint.className = "race-form admin-sprint-form";
      const inputsSprint = [];
      ["1er", "2e", "3e"].forEach((label, idx) => {
        const group = document.createElement("div");
        const l = document.createElement("label");
        l.textContent = getPositionIcon(idx) + label + " (code pilote)";
        const input = document.createElement("input");
        input.placeholder = idx === 0 ? "ex: VER" : "ex: HAM";
        group.appendChild(l);
        group.appendChild(input);
        formSprint.appendChild(group);
        inputsSprint.push(input);
      });
      const btnSaveSprint = document.createElement("button");
      btnSaveSprint.textContent = "Enregistrer Sprint";
      btnSaveSprint.addEventListener("click", () => {
        const res = inputsSprint.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
        state.sprintResults[race.id] = res;
        saveState();
        renderLeaderboard();
        renderAdminResults();
      });
      formSprint.appendChild(btnSaveSprint);
      wrap.appendChild(formSprint);
      const existingSprint = state.sprintResults[race.id];
      if (existingSprint) {
        inputsSprint.forEach((inp, idx) => { inp.value = existingSprint[idx] || ""; });
      }
    }

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
    const isDrivers = key === "drivers";
    labels.forEach((label, idx) => {
      const group = document.createElement("div");
      group.className = "season-form-group";
      const l = document.createElement("label");
      l.textContent = getPositionIcon(idx) + label;
      group.appendChild(l);
      const inputWrap = document.createElement("div");
      inputWrap.className = "season-input-wrap";
      const icon = document.createElement("img");
      icon.className = isDrivers ? "pred-driver-icon" : "pred-team-icon";
      icon.alt = "";
      const val = (values[idx] || "").trim().toUpperCase();
      const iconSrc = isDrivers ? getDriverIconSrc(val) : getConstructorIconSrc(val);
      if (iconSrc && val) {
        icon.src = iconSrc;
        icon.onerror = () => { icon.style.display = "none"; };
      } else {
        icon.style.display = "none";
      }
      inputWrap.appendChild(icon);
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = isDrivers ? "ex: VER" : "ex: FERRARI";
      input.value = values[idx] || "";
      inputWrap.appendChild(input);
      group.appendChild(inputWrap);
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
    driverInputs.forEach((input) => {
      input.disabled = true;
      input.readOnly = true;
      const icon = input.closest(".season-input-wrap")?.querySelector("img");
      if (icon) {
        const src = getDriverIconSrc(input.value.trim());
        if (src) {
          icon.src = src;
          icon.style.display = "";
          icon.onerror = () => { icon.style.display = "none"; };
        } else {
          icon.style.display = "none";
        }
      }
    });
    constructorInputs.forEach((input) => {
      input.disabled = true;
      input.readOnly = true;
      const icon = input.closest(".season-input-wrap")?.querySelector("img");
      if (icon) {
        const src = getConstructorIconSrc(input.value.trim());
        if (src) {
          icon.src = src;
          icon.style.display = "";
          icon.onerror = () => { icon.style.display = "none"; };
        } else {
          icon.style.display = "none";
        }
      }
    });
    btn.disabled = true;
    btn.textContent = "Enregistré";
  });

  const seasonLocked = drivers.some(Boolean) || constructors.some(Boolean);
  if (seasonLocked) {
    driverInputs.forEach((i) => { i.disabled = true; i.readOnly = true; });
    constructorInputs.forEach((i) => { i.disabled = true; i.readOnly = true; });
    btn.disabled = true;
    btn.textContent = "Enregistré";
  }

  seasonPredictionsEl.appendChild(btn);
}

function renderAll() {
  renderRaces();
  updateProfileLabels();
  fillExistingPredictionsAndScores();
  renderSeasonPredictions();
  renderLeaderboard();
  renderDriversGrid();
}

initPlayerSelect();
updateSeasonYearBadge();
updateVisibility();
if (state.lockedProfile) {
  refreshPlayerSelectUI();
  updateProfileLabels();
  renderRaces();
  renderSeasonPredictions();
  renderAdminResults();
  renderLeaderboard();
  renderDriversGrid();
} else {
  renderProfileChoice();
}

