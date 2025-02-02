export default async function handler(req, res) {
    try {
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      const data = await response.json();
      
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }