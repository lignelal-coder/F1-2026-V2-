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

// Comptes simples (Option B) : login + mot de passe en clair côté front.
// Login accepté = soit la clé (allan, alexandre, matheo), soit le nom exact (Allan, ...).
const SIMPLE_ACCOUNTS = {
  allan:    { name: "Allan",     password: "allan26" },
  alexandre:{ name: "Alexandre", password: "alex26" },
  matheo:   { name: "Mathéo",    password: "mat26" }
};

function getAllAccountPlayerNames() {
  return Object.values(SIMPLE_ACCOUNTS).map((a) => a.name);
}

function findAccountByLogin(login) {
  const l = (login || "").trim().toLowerCase();
  if (!l) return null;
  if (SIMPLE_ACCOUNTS[l]) return SIMPLE_ACCOUNTS[l];
  return Object.values(SIMPLE_ACCOUNTS).find((a) => a.name.trim().toLowerCase() === l) || null;
}

// --- Sync distante (optionnelle) pour partager les scores entre appareils ---
// Si tu veux activer la synchro Supabase, remplis ces constantes :
// - REMOTE_STATE_ENABLED = true
// - REMOTE_STATE_URL = "https://TON_PROJET.supabase.co/rest/v1/f1_state"
// - REMOTE_STATE_API_KEY = "clé anonyme Supabase (anon key)"
// et crée la table décrite dans le README.
const REMOTE_STATE_ENABLED = true;
const REMOTE_STATE_URL = "https://edcwdipuzqcqqfujzwrl.supabase.co/rest/v1/f1_state";
// ⚠️ IMPORTANT : remplace cette chaîne par ta vraie clé publiable Supabase (celle qui commence par sb-publishable_)
const REMOTE_STATE_API_KEY = "sb_publishable_uIRP0fiR-jxkWJhAQ8FCIA_Sc2cdcSE";
const REMOTE_STATE_ROW_ID = "main";

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

/** Met à jour l’icône pilote et l’icône écurie (voiture) au-dessus du champ quand on modifie la prédiction. */
function updateDriverIconForInput(input) {
  const group = input?.closest(".race-prediction-group");
  const iconImg = group?.querySelector(".race-driver-icon");
  const carImg = group?.querySelector(".race-constructor-icon");
  const carFallback = group?.querySelector(".race-constructor-fallback");
  const code = input.value?.trim();
  const driverSrc = getDriverIconSrc(code);
  const teamName = getConstructorNameForDriver(code);

  if (iconImg) {
    if (driverSrc) {
      iconImg.src = driverSrc;
      iconImg.style.display = "block";
    } else {
      iconImg.style.display = "none";
    }
  }

  if (carImg) carImg.style.display = "none";
  if (carFallback) carFallback.style.display = "none";
  if (teamName) {
    const carSrc = getConstructorIconSrc(teamName);
    if (carSrc) {
      carImg.src = carSrc;
      carImg.style.display = "block";
      carImg.onerror = () => {
        carImg.style.display = "none";
        if (carFallback) carFallback.style.display = "inline-flex";
      };
    } else {
      if (carFallback) carFallback.style.display = "inline-flex";
    }
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

/** Verrouille à partir de la veille du GP :
 * - avant J-1 (strictement) : on peut modifier librement ses prédictions
 * - à partir de J-1 : on ne peut plus modifier une prédiction déjà enregistrée,
 *   mais on peut encore saisir une première prédiction si on n'en avait pas.
 */
function isRaceLocked(race) {
  if (!race || !race.date) return false;
  const raceDay = new Date(race.date);
  raceDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lockDay = new Date(raceDay);
  lockDay.setDate(lockDay.getDate() - 1);
  return today >= lockDay;
}

/** Sauvegarde automatique des prédictions quand on quitte un champ (blur) pour que le refresh garde les modifs. */
function savePredictionsOnBlur(input) {
  const card = input.closest(".race");
  if (!card || !card._raceId) return;
  const raceId = card._raceId;
  const race = card._race || RACES.find((r) => r.id === raceId);
  const player = playerSelect.value;
  const isSprintInput = card._sprintInputs && Array.prototype.indexOf.call(card._sprintInputs, input) >= 0;

  if (card._sprintInputs && isSprintInput) {
    const preds = card._sprintInputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
    if (!state.sprintPredictions[raceId]) state.sprintPredictions[raceId] = {};
    if (!preds[0] && !preds[1] && !preds[2]) delete state.sprintPredictions[raceId][player];
    else state.sprintPredictions[raceId][player] = preds;
    saveState();
    setSprintPartLocked(card, (preds[0] || preds[1] || preds[2]) && isRaceLocked(race));
    if (card._sprintPointsTag) {
      const pts = scoreSprintForPlayer(raceId, player);
      card._sprintPointsTag.textContent = `Points : ${pts}`;
    }
  } else {
    const preds = card._inputs.map((i) => i.value.trim().toUpperCase()).slice(0, 3);
    if (!state.predictions[raceId]) state.predictions[raceId] = {};
    if (!preds[0] && !preds[1] && !preds[2]) delete state.predictions[raceId][player];
    else state.predictions[raceId][player] = preds;
    saveState();
    setRaceCardLocked(card, (preds[0] || preds[1] || preds[2]) && isRaceLocked(race));
    if (card._pointsTag) {
      const pts = scoreRaceForPlayer(raceId, player);
      card._pointsTag.textContent = card._sprintPointsTag ? `Points : ${pts}` : `Points actuels : ${pts}`;
    }
  }
  renderLeaderboard();
  renderRaceOthersForCard(card);
}

function renderOtherPredictionsForRace(raceId, listEl, isSprint) {
  if (!listEl) return;
  listEl.innerHTML = "";
  const store = isSprint ? state.sprintPredictions : state.predictions;
  const byPlayer = store[raceId] || {};
  const any = state.players.some((p) => {
    const arr = byPlayer[p];
    return arr && (arr[0] || arr[1] || arr[2]);
  });
  if (!any) {
    const hint = document.createElement("div");
    hint.className = "race-others-empty";
    hint.textContent = "Aucune prédiction enregistrée pour l’instant.";
    listEl.appendChild(hint);
    return;
  }
  state.players.forEach((player) => {
    const arr = byPlayer[player];
    if (!arr || (!arr[0] && !arr[1] && !arr[2])) return;
    const row = document.createElement("div");
    row.className = "race-others-row";
    const nameSpan = document.createElement("span");
    nameSpan.className = "race-others-player";
    nameSpan.textContent = player + " :";
    row.appendChild(nameSpan);
    ["1er", "2e", "3e"].forEach((label, idx) => {
      const code = (arr[idx] || "—").toUpperCase();
      const posSpan = document.createElement("span");
      posSpan.className = "race-others-pos";
      const iconSrc = code !== "—" ? getDriverIconSrc(code) : null;
      if (iconSrc) {
        const img = document.createElement("img");
        img.src = iconSrc;
        img.alt = code;
        img.className = "race-others-driver-icon";
        img.onerror = () => { img.style.display = "none"; };
        posSpan.appendChild(img);
      }
      const text = document.createElement("span");
      text.textContent = `${getPositionIcon(idx)}${code}`;
      posSpan.appendChild(text);
      row.appendChild(posSpan);
    });
    listEl.appendChild(row);
  });
}

function renderRaceOthersForCard(cardEl) {
  if (!cardEl || !cardEl._raceId) return;
  const raceId = cardEl._raceId;
  if (cardEl._othersList) {
    renderOtherPredictionsForRace(raceId, cardEl._othersList, false);
  }
  if (cardEl._othersCourseList) {
    renderOtherPredictionsForRace(raceId, cardEl._othersCourseList, false);
  }
  if (cardEl._othersSprintList) {
    renderOtherPredictionsForRace(raceId, cardEl._othersSprintList, true);
  }
}

function getStorageKey() {
  return "f1-" + SEASON_YEAR + "-predictions-v1";
}

let state = loadState();
let remotePollInterval = null;

function loadState() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) {
      const players = getAllAccountPlayerNames();
      return {
        roomCode: null,
        predictions: {},
        results: {},
        sprintPredictions: {},
        sprintResults: {},
        seasonPredictions: {},
        players,
        activePlayer: players[0],
        lockedProfile: null
      };
    }
    const parsed = JSON.parse(raw);
    const roomCode = parsed.roomCode || null;
    const playersFromAccounts = getAllAccountPlayerNames();
    const players = playersFromAccounts;
    const activePlayer = parsed.activePlayer && players.includes(parsed.activePlayer) ? parsed.activePlayer : players[0];
    const lockedProfile = parsed.lockedProfile && players.includes(parsed.lockedProfile) ? parsed.lockedProfile : null;
    return {
      predictions: parsed.predictions || {},
      results: parsed.results || {},
      sprintPredictions: parsed.sprintPredictions || {},
      sprintResults: parsed.sprintResults || {},
      seasonPredictions: parsed.seasonPredictions || {},
      roomCode,
      players,
      activePlayer,
      lockedProfile
    };
  } catch (e) {
    console.error("Erreur de chargement du state", e);
    const players = getAllAccountPlayerNames();
    return {
      roomCode: null,
      predictions: {},
      results: {},
      sprintPredictions: {},
      sprintResults: {},
      seasonPredictions: {},
      players,
      activePlayer: players[0],
      lockedProfile: null
    };
  }
}

async function fetchRemoteState() {
  if (!REMOTE_STATE_ENABLED || !REMOTE_STATE_URL || !REMOTE_STATE_API_KEY) return null;
  try {
    const roomId = (state.roomCode || REMOTE_STATE_ROW_ID || "").trim();
    if (!roomId) return null;
    const url = `${REMOTE_STATE_URL}?id=eq.${encodeURIComponent(roomId)}&select=payload`;
    const res = await fetch(url, {
      headers: {
        apikey: REMOTE_STATE_API_KEY,
        Authorization: `Bearer ${REMOTE_STATE_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) return null;
    const rows = await res.json();
    if (!rows || !rows[0] || !rows[0].payload) return null;
    return rows[0].payload;
  } catch (e) {
    console.error("Erreur de récupération du state distant", e);
    return null;
  }
}

async function pushRemoteState() {
  if (!REMOTE_STATE_ENABLED || !REMOTE_STATE_URL || !REMOTE_STATE_API_KEY) return;
  try {
    const roomId = (state.roomCode || REMOTE_STATE_ROW_ID || "").trim();
    if (!roomId) return;
    const body = JSON.stringify([{ id: roomId, payload: state }]);
    await fetch(REMOTE_STATE_URL, {
      method: "POST",
      headers: {
        apikey: REMOTE_STATE_API_KEY,
        Authorization: `Bearer ${REMOTE_STATE_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body
    });
  } catch (e) {
    console.error("Erreur de sauvegarde du state distant", e);
  }
}

function saveState() {
  localStorage.setItem(getStorageKey(), JSON.stringify(state));
  // Sauvegarde distante best-effort (async, sans bloquer l'UI)
  if (REMOTE_STATE_ENABLED) {
    pushRemoteState();
  }
}

function scoreRaceForPlayer(raceId, player) {
  const preds = state.predictions[raceId]?.[player];
  const real = state.results[raceId];
  if (!preds || !real) return 0;
  let pts = 0;
  if (preds[0] && preds[0].toUpperCase() === real[0]?.toUpperCase()) pts += 3;
  if (preds[1] && preds[1].toUpperCase() === real[1]?.toUpperCase()) pts += 2;
  if (preds[2] && preds[2].toUpperCase() === real[2]?.toUpperCase()) pts += 1;
  return pts;
}

function scoreSprintForPlayer(raceId, player) {
  const preds = state.sprintPredictions[raceId]?.[player];
  const real = state.sprintResults[raceId];
  if (!preds || !real) return 0;
  let pts = 0;
  if (preds[0] && preds[0].toUpperCase() === real[0]?.toUpperCase()) pts += 3;
  if (preds[1] && preds[1].toUpperCase() === real[1]?.toUpperCase()) pts += 2;
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
const roomCodeBadge = document.getElementById("roomCodeBadge");
const leaveRoomBtn = document.getElementById("leaveRoomBtn");
const roomSection = document.getElementById("roomSection");
const createRoomBtn = document.getElementById("createRoomBtn");
const createdRoomCodeWrap = document.getElementById("createdRoomCodeWrap");
const createdRoomCodeEl = document.getElementById("createdRoomCode");
const createdRoomLinkEl = document.getElementById("createdRoomLink");
const joinRoomInput = document.getElementById("joinRoomInput");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const joinRoomErrorEl = document.getElementById("joinRoomError");

function updateSeasonYearBadge() {
  if (seasonYearBadge) {
    seasonYearBadge.textContent = "Saison " + SEASON_YEAR + (SEASON_YEAR === 2025 ? " (essai)" : "");
  }
}

function updateRoomCodeBadge() {
  if (!roomCodeBadge) return;
  if (state.roomCode) {
    roomCodeBadge.textContent = "Partie " + state.roomCode;
    roomCodeBadge.style.display = "inline-flex";
  } else {
    roomCodeBadge.textContent = "";
    roomCodeBadge.style.display = "none";
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
  const hasRoom = !!state.roomCode;
  const locked = !!state.lockedProfile;
  // On n'utilise plus roomSection pour l'instant
  if (roomSection) roomSection.style.display = "none";
  // Écran "Qui es-tu ? / choix de partie" visible tant que la partie n'est pas complètement choisie
  if (profileChoiceSection) profileChoiceSection.style.display = locked && hasRoom ? "none" : "block";
  if (mainContent) mainContent.style.display = locked && hasRoom ? "grid" : "none";
  if (headerWhenLocked) headerWhenLocked.style.display = locked ? "flex" : "none";
  if (headerWhenUnlocked) headerWhenUnlocked.style.display = !locked ? "block" : "none";
  if (locked && lockedProfileName) lockedProfileName.textContent = state.lockedProfile;
  updateRoomCodeBadge();
}

function renderProfileChoice() {
  if (!profileChoiceList) return;
  profileChoiceList.innerHTML = "";
  if (!state.lockedProfile) {
    // Étape 1 : login simple
    const form = document.createElement("div");
    form.className = "profile-login-form";

    const loginLabel = document.createElement("label");
    loginLabel.textContent = "Identifiant (Allan, Alexandre, Mathéo)";
    const loginInput = document.createElement("input");
    loginInput.type = "text";
    loginInput.placeholder = "ex : Allan";

    const passLabel = document.createElement("label");
    passLabel.textContent = "Mot de passe";
    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.placeholder = "mot de passe";

    const error = document.createElement("p");
    error.className = "profile-login-error";
    error.style.display = "none";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-its-me";
    btn.textContent = "Se connecter";

    function tryLogin() {
      const acc = findAccountByLogin(loginInput.value);
      if (!acc || passInput.value !== acc.password) {
        error.textContent = "Identifiant ou mot de passe incorrect.";
        error.style.display = "block";
        return;
      }
      state.lockedProfile = acc.name;
      state.activePlayer = acc.name;
      // Forcer la liste des joueurs à correspondre aux comptes simples
      state.players = getAllAccountPlayerNames();
      saveState();
      refreshPlayerSelectUI();
      updateVisibility();
      renderProfileChoice(); // on reste dans cette section pour choisir la partie
    }

    btn.addEventListener("click", tryLogin);
    passInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryLogin();
    });

    form.appendChild(loginLabel);
    form.appendChild(loginInput);
    form.appendChild(passLabel);
    form.appendChild(passInput);
    form.appendChild(btn);
    form.appendChild(error);

    profileChoiceList.appendChild(form);
    return;
  }

  // Étape 2 : choix / liste des parties une fois connecté
  const info = document.createElement("p");
  info.className = "hint";
  info.textContent = "Connecté en " + state.lockedProfile + ". Choisis une partie en cours ou crée-en une nouvelle.";
  profileChoiceList.appendChild(info);

  const actions = document.createElement("div");
  actions.className = "room-lobby-actions";

  const createBtn = document.createElement("button");
  createBtn.type = "button";
  createBtn.className = "btn-its-me";
  createBtn.textContent = "Créer une nouvelle partie";
  createBtn.addEventListener("click", () => {
    const code = generateRoomCode();
    const base = window.location.origin + window.location.pathname;
    const shareUrl = `${base}?room=${code}`;
    const createdWrap = document.createElement("div");
    createdWrap.className = "room-created-inline";
    createdWrap.innerHTML = `Partie créée : <strong>${code}</strong>. Lien à partager : <span class="room-link-copy">${shareUrl}</span> — `;
    const enterBtn = document.createElement("button");
    enterBtn.type = "button";
    enterBtn.className = "room-lobby-join";
    enterBtn.textContent = "Entrer dans cette partie";
    enterBtn.addEventListener("click", () => {
      createdWrap.remove();
      setRoomCode(code);
    });
    createdWrap.appendChild(enterBtn);
    actions.appendChild(createdWrap);
  });
  actions.appendChild(createBtn);

  profileChoiceList.appendChild(actions);

  // Rejoindre une partie avec un code (ex : reçu par lien ou partagé)
  const joinByCodeWrap = document.createElement("div");
  joinByCodeWrap.className = "room-join-by-code";
  const joinByCodeLabel = document.createElement("label");
  joinByCodeLabel.textContent = "Rejoindre avec un code : ";
  const joinByCodeInput = document.createElement("input");
  joinByCodeInput.type = "text";
  joinByCodeInput.placeholder = "ex : ABC123";
  joinByCodeInput.className = "room-join-input";
  const joinByCodeBtn = document.createElement("button");
  joinByCodeBtn.type = "button";
  joinByCodeBtn.className = "room-lobby-join";
  joinByCodeBtn.textContent = "Rejoindre";
  const joinByCodeError = document.createElement("span");
  joinByCodeError.className = "room-join-error";
  joinByCodeError.style.display = "none";

  const doJoinByCode = () => {
    const raw = (joinByCodeInput.value || "").trim().toUpperCase();
    if (!raw) {
      joinByCodeError.textContent = " Saisis un code de partie.";
      joinByCodeError.style.display = "inline";
      return;
    }
    joinByCodeError.style.display = "none";
    setRoomCode(raw);
  };
  joinByCodeBtn.addEventListener("click", doJoinByCode);
  joinByCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doJoinByCode();
  });

  joinByCodeWrap.appendChild(joinByCodeLabel);
  joinByCodeWrap.appendChild(joinByCodeInput);
  joinByCodeWrap.appendChild(joinByCodeBtn);
  joinByCodeWrap.appendChild(joinByCodeError);
  profileChoiceList.appendChild(joinByCodeWrap);

  const listWrap = document.createElement("div");
  listWrap.className = "room-lobby-list";
  listWrap.textContent = REMOTE_STATE_ENABLED ? "Chargement des parties en cours…" : "Liste des parties non disponible sans Supabase.";
  profileChoiceList.appendChild(listWrap);

  if (!REMOTE_STATE_ENABLED) return;

  function renderList(rows, errMsg) {
    listWrap.innerHTML = "";
    if (errMsg) {
      listWrap.textContent = errMsg;
      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "room-lobby-join";
      retryBtn.textContent = "Réessayer";
      retryBtn.style.marginTop = "8px";
      retryBtn.addEventListener("click", () => {
        listWrap.textContent = "Chargement des parties en cours…";
        loadRoomsList();
      });
      listWrap.appendChild(document.createElement("br"));
      listWrap.appendChild(retryBtn);
      return;
    }
    if (!rows || !rows.length) {
      listWrap.textContent = "Aucune partie pour l’instant. Crée la première !";
      return;
    }
    rows.forEach((row) => {
      const code = row.id;
      const payload = row.payload || {};
      const players = payload.players || getAllAccountPlayerNames();
      const rowEl = document.createElement("div");
      rowEl.className = "room-lobby-row";

      const main = document.createElement("div");
      main.className = "room-lobby-main";
      const title = document.createElement("div");
      title.className = "room-lobby-code";
      title.textContent = "Partie " + code;
      const playersEl = document.createElement("div");
      playersEl.className = "room-lobby-players";
      playersEl.textContent = "Participants : " + players.join(", ");
      main.appendChild(title);
      main.appendChild(playersEl);

      const joinBtn = document.createElement("button");
      joinBtn.type = "button";
      joinBtn.className = "room-lobby-join";
      joinBtn.textContent = state.roomCode === code ? "Dans cette partie" : "Rejoindre";
      joinBtn.disabled = state.roomCode === code;
      joinBtn.addEventListener("click", () => setRoomCode(code));

      rowEl.appendChild(main);
      rowEl.appendChild(joinBtn);
      listWrap.appendChild(rowEl);
    });
  }

  async function loadRoomsList() {
    try {
      const res = await fetch("/api/rooms-list");
      const data = await res.json();
      if (data && data.error) {
        renderList(null, data.error);
        return;
      }
      const rows = Array.isArray(data) ? data : [];
      renderList(rows);
    } catch (e) {
      console.error("Erreur de chargement des rooms", e);
      renderList(null, "Erreur lors du chargement des parties. Vérifiez votre connexion.");
    }
  }

  loadRoomsList();
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
  if (removePlayerBtn) removePlayerBtn.disabled = true;
}

function removeCurrentPlayer() {
  // Désactivé dans le mode comptes simples.
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

  if (removePlayerBtn) {
    removePlayerBtn.disabled = true;
    removePlayerBtn.style.display = "none";
  }

  if (unlockProfileBtn) {
    unlockProfileBtn.addEventListener("click", () => {
      state.lockedProfile = null;
      saveState();
      updateVisibility();
      renderProfileChoice();
    });
  }

  if (leaveRoomBtn) {
    leaveRoomBtn.addEventListener("click", () => {
      leaveRoom();
    });
  }

  // Désactiver la création libre de joueurs dans le mode comptes simples.
  if (addPlayerBtn) addPlayerBtn.style.display = "none";
  if (newPlayerInput) newPlayerInput.style.display = "none";
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function setRoomCode(code) {
  state.roomCode = code.toUpperCase();
  state.lockedProfile = null; // nouvelle partie → on force le choix / login du joueur

  // Si une synchro distante est active, on essaie de charger l'état existant de cette partie
  if (REMOTE_STATE_ENABLED) {
    const remote = await fetchRemoteState();
    if (remote) {
      state = {
        ...state,
        ...remote,
        roomCode: state.roomCode,
        players: remote.players || state.players,
        activePlayer: remote.activePlayer || state.activePlayer,
        lockedProfile: null
      };
    } else {
      // Nouvelle partie : on repart sur un state vide pour les pronos/résultats
      state.predictions = {};
      state.results = {};
      state.sprintPredictions = {};
      state.sprintResults = {};
      state.seasonPredictions = {};
    }
  } else {
    // Sans backend, on isole quand même la partie côté local
    state.predictions = {};
    state.results = {};
    state.sprintPredictions = {};
    state.sprintResults = {};
    state.seasonPredictions = {};
  }

  saveState();
  updateVisibility();
  renderProfileChoice();
}

function leaveRoom() {
  if (remotePollInterval) {
    clearInterval(remotePollInterval);
    remotePollInterval = null;
  }
  state.roomCode = null;
  state.lockedProfile = null;
  state.activePlayer = getAllAccountPlayerNames()[0];
  saveState();
  updateVisibility();
  renderProfileChoice();
}

function startRemotePolling() {
  if (!REMOTE_STATE_ENABLED) return;
  if (remotePollInterval) {
    clearInterval(remotePollInterval);
    remotePollInterval = null;
  }
  if (!state.roomCode) return;

  remotePollInterval = setInterval(async () => {
    try {
      const remote = await fetchRemoteState();
      if (!remote) return;
      const currentLocked = state.lockedProfile;
      const currentActive = state.activePlayer;
      const currentRoom = state.roomCode;

      state = {
        ...state,
        ...remote,
        roomCode: currentRoom,
        lockedProfile: currentLocked,
        activePlayer: currentActive,
        players: remote.players || state.players
      };
      saveState();
      if (state.lockedProfile) {
        renderAll();
      } else if (state.roomCode) {
        renderProfileChoice();
      }
    } catch (e) {
      console.error("Erreur lors du rafraîchissement distant", e);
    }
  }, 10000); // toutes les 10 secondes
}

function initRoomSection() {
  if (!roomSection) return;

  // Si un code de room est déjà présent dans l'URL, on le prend en priorité
  try {
    const url = new URL(window.location.href);
    const roomFromUrl = url.searchParams.get("room");
    if (roomFromUrl && !state.roomCode) {
      state.roomCode = roomFromUrl.toUpperCase();
      saveState();
    }
  } catch (_) {}

  if (createRoomBtn) {
    createRoomBtn.addEventListener("click", () => {
      const code = generateRoomCode();
      setRoomCode(code);
      if (createdRoomCodeEl) createdRoomCodeEl.textContent = code;
      if (createdRoomLinkEl) {
        const base = window.location.origin + window.location.pathname;
        createdRoomLinkEl.textContent = `${base}?room=${code}`;
      }
      if (createdRoomCodeWrap) createdRoomCodeWrap.style.display = "block";
    });
  }

  if (joinRoomBtn && joinRoomInput) {
    const doJoin = () => {
      const raw = (joinRoomInput.value || "").trim().toUpperCase();
      if (!raw) {
        if (joinRoomErrorEl) {
          joinRoomErrorEl.textContent = "Merci de saisir un code de partie.";
          joinRoomErrorEl.style.display = "block";
        }
        return;
      }
      setRoomCode(raw);
      if (joinRoomErrorEl) joinRoomErrorEl.style.display = "none";
    };
    joinRoomBtn.addEventListener("click", doJoin);
    joinRoomInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doJoin();
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
    const carImg = document.createElement("img");
    carImg.className = "race-constructor-icon";
    carImg.alt = "";
    carImg.style.display = "none";
    iconWrap.appendChild(carImg);
    const carFallback = document.createElement("span");
    carFallback.className = "race-constructor-fallback";
    carFallback.setAttribute("aria-label", "Écurie");
    carFallback.style.display = "none";
    carFallback.textContent = "🏎️";
    iconWrap.appendChild(carFallback);
    const input = document.createElement("input");
    input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
    input.dataset.position = String(idx);
    input.addEventListener("input", () => {
      updatePredictionLabelSuffix(input);
      updateDriverIconForInput(input);
    });
    input.addEventListener("blur", () => {
      updatePredictionLabelSuffix(input);
      savePredictionsOnBlur(input);
    });
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
    renderRaceOthersForCard(wrapper);
  });

  const tag = document.createElement("span");
  tag.className = "tag-points";
  tag.textContent = "Points actuels : 0";

  form.appendChild(btn);
  form.appendChild(tag);

  wrapper.appendChild(header);
  wrapper.appendChild(form);

   // Bloc lecture seule : prédictions des autres participants pour ce GP
  const others = document.createElement("div");
  others.className = "race-others";
  const othersTitle = document.createElement("div");
  othersTitle.className = "race-others-title";
  othersTitle.textContent = "Prédictions des participants";
  const othersList = document.createElement("div");
  othersList.className = "race-others-list";
  others.appendChild(othersTitle);
  others.appendChild(othersList);
  wrapper.appendChild(others);

  wrapper._pointsTag = tag;
  wrapper._inputs = inputs;
  wrapper._saveBtn = btn;
  wrapper._raceId = race.id;
  wrapper._race = race;
  wrapper._othersList = othersList;

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
      const carImg = document.createElement("img");
      carImg.className = "race-constructor-icon";
      carImg.alt = "";
      carImg.style.display = "none";
      iconWrap.appendChild(carImg);
      const carFallback = document.createElement("span");
      carFallback.className = "race-constructor-fallback";
      carFallback.setAttribute("aria-label", "Écurie");
      carFallback.style.display = "none";
      carFallback.textContent = "🏎️";
      iconWrap.appendChild(carFallback);
      const input = document.createElement("input");
      input.placeholder = idx === 0 ? "ex: VER" : idx === 1 ? "ex: HAM" : "ex: LEC";
      input.dataset.position = String(idx);
      input.addEventListener("input", () => {
        updatePredictionLabelSuffix(input);
        updateDriverIconForInput(input);
      });
      input.addEventListener("blur", () => {
        updatePredictionLabelSuffix(input);
        savePredictionsOnBlur(input);
      });
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

    // Bloc lecture seule : prédictions des participants pour cette partie (course / sprint)
    const others = document.createElement("div");
    others.className = "race-others";
    const othersTitle = document.createElement("div");
    othersTitle.className = "race-others-title";
    othersTitle.textContent = label + " — autres participants";
    const othersList = document.createElement("div");
    othersList.className = "race-others-list";
    others.appendChild(othersTitle);
    others.appendChild(othersList);
    col.appendChild(others);
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
      renderRaceOthersForCard(wrapper);
    });
    return { col, inputs, btn, tag, othersList };
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
  wrapper._othersCourseList = coursePart.othersList;
  wrapper._othersSprintList = sprintPart.othersList;
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
          updateDriverIconForInput(input);
        });
      }
      if (preds) {
        el._inputs.forEach((input, idx) => {
          input.value = preds[idx] || "";
          updatePredictionLabelSuffix(input);
          updateDriverIconForInput(input);
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
          updateDriverIconForInput(input);
        });
      }
      const race = el._race || RACES.find((r) => r.id === raceId);
      const hasSaved = !!(preds && (preds[0] || preds[1] || preds[2]));
      setRaceCardLocked(el, hasSaved && isRaceLocked(race));
      const pts = scoreRaceForPlayer(raceId, player);
      tag.textContent = `Points actuels : ${pts}`;
    }
    renderRaceOthersForCard(el);
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
  const apiUrl = `/api/ergast-results?round=${encodeURIComponent(round)}&year=${encodeURIComponent(year || new Date().getFullYear())}`;
  return fetch(apiUrl)
    .then((r) => {
      if (!r.ok) throw new Error("API indisponible");
      return r.json();
    })
    .then((data) => {
      if (data.error) throw new Error(data.error);
      const top3 = data.top3;
      if (!top3 || top3.length < 3) throw new Error("Aucun résultat");
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

  // Seul Allan (maître de jeu) peut gérer les résultats officiels
  if (state.lockedProfile !== "Allan") {
    const msg = document.createElement("p");
    msg.className = "hint";
    msg.textContent = "Seul Allan peut saisir ou modifier les résultats officiels. Connecte-toi en Allan pour gérer les résultats.";
    resultsAdminEl.appendChild(msg);
    return;
  }

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
initRoomSection();
updateSeasonYearBadge();
updateVisibility();
if (state.roomCode) {
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
}

// Si une synchro distante est configurée (Supabase), on récupère le state partagé
// après l'initialisation locale, puis on re-render l'UI.
(async () => {
  if (!REMOTE_STATE_ENABLED) return;
  const remote = await fetchRemoteState();
  if (!remote) return;
  state = {
    ...state,
    ...remote,
    players: remote.players || state.players,
    activePlayer: remote.activePlayer || state.activePlayer,
    lockedProfile: remote.lockedProfile || state.lockedProfile,
    roomCode: remote.roomCode || state.roomCode
  };
  saveState(); // met à jour le localStorage

  // Re-render complet avec le state partagé
  updateVisibility();
  if (state.roomCode) {
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
  }
})();

// Démarre un rafraîchissement régulier de l'état distant (temps quasi réel entre appareils)
startRemotePolling();

