/**
 * Proxy serverless Vercel : récupère la liste des parties (rooms) depuis Supabase
 * côté serveur pour éviter CORS et exposer la clé uniquement en env.
 * GET /api/rooms-list
 *
 * Variables d'environnement Vercel (optionnelles) :
 * - SUPABASE_STATE_URL : URL de la table (ex. https://xxx.supabase.co/rest/v1/f1_state)
 * - SUPABASE_ANON_KEY : clé anon Supabase (JWT, dans Project Settings > API)
 * Si non définies, les valeurs par défaut du projet sont utilisées.
 */
const DEFAULT_STATE_URL = "https://edcwdipuzqcqqfujzwrl.supabase.co/rest/v1/f1_state";
const DEFAULT_ANON_KEY = "sb_publishable_uIRP0fiR-jxkWJhAQ8FCIA_Sc2cdcSE";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");

  const baseUrl = process.env.SUPABASE_STATE_URL || DEFAULT_STATE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;
  const url = `${baseUrl}?select=id,payload`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Supabase rooms-list error", response.status, text);
      if (response.status === 401) {
        res.status(200).json({
          error: "Clé API invalide. Dans Supabase : Project Settings > API, copie la clé « anon public » (JWT) et définis SUPABASE_ANON_KEY sur Vercel."
        });
        return;
      }
      if (response.status === 404) {
        res.status(200).json({
          error: "Table f1_state introuvable. Crée une table f1_state avec colonnes id (text), payload (jsonb)."
        });
        return;
      }
      res.status(200).json({ error: "Impossible de charger la liste des parties.", status: response.status });
      return;
    }

    const rows = await response.json();
    res.status(200).json(Array.isArray(rows) ? rows : []);
  } catch (e) {
    console.error("rooms-list proxy error", e);
    res.status(502).json({ error: "Erreur réseau lors du chargement des parties." });
  }
};
