export default async function handler(req, res) {
    if (req.method === 'POST') {
        const applicationData = req.body;

        // You can now save to database or send email here
        console.log('Received Application:', applicationData);

        // Example: Just send success
        return res.status(200).json({ message: "Application received!" });
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}