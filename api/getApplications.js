export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const SUPABASE_URL = 'https://your-project-url.supabase.co'; // replace
    const SUPABASE_API_KEY = 'your-anon-public-api-key'; // replace

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/applications?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`,
            }
        });

        if (response.ok) {
            const applications = await response.json();
            return res.status(200).json(applications);
        } else {
            const errorData = await response.json();
            console.error('Supabase error:', errorData);
            return res.status(500).json({ message: "Failed to fetch applications." });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: "Server error." });
    }
}