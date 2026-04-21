const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = 3000;

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for text summarization
app.post('/api/summarize', async (req, res) => {
    const { text, length } = req.body;

    // Validate input
    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({ 
            error: 'ANTHROPIC_API_KEY is not configured. Please set it in .env file' 
        });
    }

    try {
        // Determine summary length based on user preference
        let lengthInstruction = '3-4 sentences';
        switch(length) {
            case 'short':
                lengthInstruction = '1-2 sentences';
                break;
            case 'long':
                lengthInstruction = '5-7 sentences';
                break;
            default:
                lengthInstruction = '3-4 sentences';
        }

        // Call Claude API for summarization
        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `Please provide a concise summary of the following text in exactly ${lengthInstruction}. Focus on the main points and key information. Do not include any preamble or explanation, just provide the summary.\n\nText:\n${text}`
                }
            ]
        });

        // Extract the summary from the response
        const summary = message.content[0].type === 'text' 
            ? message.content[0].text 
            : 'Unable to generate summary';

        res.json({ summary });

    } catch (error) {
        console.error('Claude API Error:', error);
        
        if (error.status === 401) {
            return res.status(401).json({ 
                error: 'Invalid API key. Please check your ANTHROPIC_API_KEY.' 
            });
        }
        
        if (error.status === 429) {
            return res.status(429).json({ 
                error: 'Rate limit exceeded. Please try again later.' 
            });
        }

        res.status(500).json({ 
            error: error.message || 'Error generating summary' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        apiConfigured: !!process.env.ANTHROPIC_API_KEY
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║    AI Text Extractor & Summarizer Server Started      ║
╚════════════════════════════════════════════════════════╝

🚀 Server is running at: http://localhost:${PORT}

📋 Configuration Status:
   - Express Server: ✓ Running
   - CORS: ✓ Enabled
   - Claude API: ${process.env.ANTHROPIC_API_KEY ? '✓ Configured' : '✗ NOT CONFIGURED'}

⚙️  Setup Instructions:
   1. Install dependencies: npm install
   2. Create .env file with: ANTHROPIC_API_KEY=your_api_key
   3. Get API key from: https://console.anthropic.com
   4. Run: npm start
   5. Open: http://localhost:${PORT}

📝 Features:
   ✓ Image-to-Text Extraction (Tesseract.js)
   ✓ AI-Powered Text Summarization (Claude API)
   ✓ Copy to Clipboard
   ✓ Adjustable Summary Length
   ✓ Beautiful Black & Gold Theme

    `);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
