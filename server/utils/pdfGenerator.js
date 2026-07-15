const puppeteer = require('puppeteer');
const path = require('path');

const generatePDF = async (resumeId, token) => {
    // We assume the frontend is running on localhost:5173 for development
    // In production, this should point to the deployed frontend URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resumeUrl = `${frontendUrl}/preview/${resumeId}`;

    console.log(`Generating PDF from ${resumeUrl}`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    try {
        // Inject token into localStorage so the frontend can authenticate the API call
        if (token) {
            await page.evaluateOnNewDocument((authToken) => {
                localStorage.setItem('user', JSON.stringify({ token: authToken }));
            }, token);
        }

        // Navigate to the frontend preview page
        await page.goto(resumeUrl, {
            waitUntil: 'networkidle0', // Wait until no more than 0 network connections for at least 500 ms
            timeout: 30000
        });

        // Add CSS to force print styling
        await page.addStyleTag({
            content: `
                @page { margin: 0; size: A4; }
                body { margin: 0; padding: 0; }
                .resume-preview { box-shadow: none !important; border: none !important; }
            `
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        await browser.close();
        return pdfBuffer;

    } catch (error) {
        await browser.close();
        console.error('Error generating PDF with Puppeteer:', error);
        throw error;
    }
};

module.exports = generatePDF;
