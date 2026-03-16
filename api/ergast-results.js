/**
 * Proxy serverless Vercel : appelle l’API publique f1api.dev (résultats F1)
 * côté serveur pour éviter les blocages CORS dans le navigateur.
 * GET /api/ergast-results?round=1&year=2025
 *
 * L’API utilisée est : https://f1api.dev/api/[year]/[round]/race
 * On renvoie toujours un JSON de la forme : { top3: ["VER","HAM","LEC"] }
 */
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  const round = req.query.round;
  const year = req.query.year || new Date().getFullYear();

  if (!round || isNaN(Number(round))) {
    res.status(400).json({ error: "Paramètre round requis (numéro de GP)" });
    return;
  }

  const url = `https://f1api.dev/api/${year}/${round}/race`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("f1api.dev error", response.status);
      res.status(response.status).json({ error: "API F1 indisponible" });
      return;
    }
    const data = await response.json();
    const results = data?.races?.results;
    if (!results || !Array.isArray(results) || results.length === 0) {
      res.status(200).json({ top3: null });
      return;
    }
    // On trie par position numérique croissante et on prend les 3 premiers classés
    const classified = results.filter((r) => Number.isFinite(Number(r.position)));
    if (!classified.length) {
      res.status(200).json({ top3: null });
      return;
    }
    const top3 = classified
      .sort((a, b) => Number(a.position) - Number(b.position))
      .slice(0, 3)
      .map((r) => (r.driver && r.driver.shortName) || "");

    res.status(200).json({ top3 });
  } catch (e) {
    console.error("F1 results proxy error", e);
    res.status(502).json({ error: "Erreur lors de l’appel à l’API F1" });
  }
};
