*/ const { createTransport } = require('nodemailer');
const XLSX = require('xlsx');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Create Excel workbook
    const wb = XLSX.utils.book_new();
    
    // Convert form data to worksheet
    const ws = XLSX.utils.json_to_sheet([formData]);
    XLSX.utils.book_append_sheet(wb, ws, "Application");
    
    // Generate Excel buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Create email transporter
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Send email with attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'dev.cxxp@gmail.com',
      subject: 'New RIO Application Form Submission',
      text: 'Please find attached the application form data.',
      attachments: [{
        filename: 'rio_application.xlsx',
        content: excelBuffer
      }]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
};