export default async function handler(req, res) {
  const { path, ...query } = req.query;

  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const queryString = new URLSearchParams(query).toString();
  const moexUrl = `https://apim.moex.com${path}?${queryString}`;

  try {
    const response = await fetch(moexUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
