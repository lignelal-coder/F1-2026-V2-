/**
 * Proxy serverless Vercel : appelle l’API Ergast (résultats F1) côté serveur
 * pour éviter les blocages CORS dans le navigateur.
 * GET /api/ergast-results?round=1&year=2025
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

  const url = `https://ergast.com/api/f1/${year}/${round}/results.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).json({ error: "Ergast indisponible" });
      return;
    }
    const data = await response.json();
    const races = data?.MRData?.RaceTable?.Races;
    if (!races || races.length === 0) {
      res.status(200).json({ top3: null });
      return;
    }
    const results = races[0].Results;
    if (!results || results.length < 3) {
      res.status(200).json({ top3: null });
      return;
    }
    const top3 = results
      .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10))
      .slice(0, 3)
      .map((r) => (r.Driver && r.Driver.code) || "");
    res.status(200).json({ top3 });
  } catch (e) {
    console.error("Ergast proxy error", e);
    res.status(502).json({ error: "Erreur lors de l’appel à Ergast" });
  }
};
