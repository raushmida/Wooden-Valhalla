// api/guitars.js — Vercel Serverless Function (CommonJS)
// Proxies Airtable requests so the API token is never exposed in the browser

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'Guitars';

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable not configured' });
  }

  try {
    const { status, featured, id } = req.query;

    // Fetch single guitar by ID
    if (id) {
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}/${id}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
      });
      if (!response.ok) throw new Error(`Airtable error: ${response.status}`);
      const record = await response.json();
      return res.status(200).json(formatRecord(record));
    }

    // Build filter formula
    const filters = [];
    if (status) filters.push(`{Status} = '${status}'`);
    if (featured === 'true') filters.push(`{Featured} = TRUE()`);

    const formula = filters.length > 1
      ? `AND(${filters.join(', ')})`
      : filters[0] || '';

    // Fetch all records (paginate if needed)
    let allRecords = [];
    let offset = null;

    do {
      const params = new URLSearchParams();
      if (formula) params.set('filterByFormula', formula);
      if (offset) params.set('offset', offset);

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?${params}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Airtable error ${response.status}: ${errText}`);
      }
      const data = await response.json();
      allRecords = allRecords.concat(data.records || []);
      offset = data.offset || null;
    } while (offset);

    // Sort: Sort Order ascending (blanks last), then Year descending
    const guitars = allRecords.map(formatRecord).sort((a, b) => {
      const aOrder = a.sortOrder || 9999;
      const bOrder = b.sortOrder || 9999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return (b.year || 0) - (a.year || 0);
    });
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({ guitars });

  } catch (err) {
    console.error('Airtable error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch guitars', detail: err.message });
  }
};

function formatRecord(record) {
  const f = record.fields || {};
  return {
    id: record.id,
    name: f['Name'] || '',
    year: f['Year'] || null,
    model: f['Model'] || '',
    specialRun: f['Special Run'] || '',
    finish: f['Finish'] || '',
    // Serial is intentionally excluded — never sent to the browser
    weight: f['Weight'] || null,
    neckProfile: f['Neck Profile'] || '',
    pickups: f['Pickups'] || '',
    condition: f['Condition'] || '',
    status: f['Status'] || '',
    sortOrder: f['Sort Order'] || null,
    price: f['Price'] || null,
    description: f['Description'] || '',
    conditionNotes: f['Condition Notes'] || '',
    featured: f['Featured'] || false,
    videoUrl: f['Video URL'] || '',
    photos: (f['Photos'] || []).map(p => ({
      url: p.url,
      thumb: (p.thumbnails && p.thumbnails.large) ? p.thumbnails.large.url : p.url,
      width: p.width,
      height: p.height,
      filename: p.filename
    }))
  };
}
