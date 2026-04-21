# 🚀 AI Text Extractor & Summarizer

A powerful web application that combines OCR (Optical Character Recognition) and AI-powered text summarization. Upload images, extract text automatically, and generate intelligent summaries with a beautiful black and gold theme.

## ✨ Features

- 📸 **Image to Text Extraction** - Upload images and extract text using Tesseract.js OCR
- 🤖 **AI-Powered Summarization** - Generate intelligent summaries using Claude AI
- 🎯 **Adjustable Summary Length** - Choose between short, medium, or long summaries
- 📋 **Copy to Clipboard** - One-click copy for extracted text and summaries
- 🎨 **Beautiful UI** - Modern black and gold theme with smooth animations
- 💾 **Drag & Drop Upload** - Easy image upload with drag-and-drop support
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Processing** - Efficient OCR and AI processing

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (with CSS Variables and Flexbox)
- Vanilla JavaScript
- Tesseract.js (for OCR)

### Backend
- Node.js
- Express.js
- Claude API (Anthropic)
- CORS support

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Claude API key from [Anthropic Console](https://console.anthropic.com/account/keys)

## 🚀 Quick Start

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Set Up Environment Variables**

Create a `.env` file in the root directory:

```bash
# Copy from example
cp .env.example .env

# Then edit .env and add your Claude API key
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
```

Get your API key by:
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Click on "API Keys" in the left sidebar
3. Create a new API key
4. Copy it to your `.env` file

### 3. **Start the Server**

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 4. **Open in Browser**

Navigate to `http://localhost:3000` in your web browser

## 📖 Usage Guide

### Extracting Text from Images

1. **Upload an Image**
   - Click the upload area or drag and drop an image
   - Supported formats: JPG, PNG, GIF, WebP, BMP
   - Preview appears automatically

2. **Extract Text**
   - Click "Extract Text from Image" button
   - Wait for OCR processing (shows progress)
   - Extracted text appears below

3. **Copy Extracted Text**
   - Click "Copy Text" button
   - Notification confirms copy success
   - Text ready to paste anywhere

### Summarizing Text

1. **Adjust Summary Length** (optional)
   - Choose from: Short (1-2 sentences), Medium (3-4 sentences), Long (5-7 sentences)
   - Default is Medium

2. **Generate Summary**
   - Click "Generate Summary" button
   - AI processes the extracted text
   - Summary appears below

3. **Copy Summary**
   - Click "Copy Summary" button
   - Notification confirms copy success

## 🎨 Customization

### Change Theme Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-gold: #d4af37;
    --dark-bg: #1a1a1a;
    --darker-bg: #0d0d0d;
    --text-light: #f5f5f5;
    --accent-gold: #ffd700;
    /* ... more colors ... */
}
```

### Adjust Server Port

Edit `server.js` or set in `.env`:

```
PORT=3001
```

## 📁 Project Structure

```
node-test/
├── index.html           # Main HTML file
├── style.css            # Stylesheet (black & gold theme)
├── script.js            # Frontend JavaScript
├── server.js            # Express backend
├── package.json         # Dependencies
├── .env.example         # Environment variables template
├── .env                 # Your API keys (create this)
└── README.md            # This file
```

## 🔌 API Endpoints

### POST `/api/summarize`

Summarizes the provided text using Claude AI.

**Request:**
```json
{
  "text": "Your text here...",
  "length": "medium"
}
```

**Response:**
```json
{
  "summary": "AI-generated summary..."
}
```

**Status Codes:**
- `200 OK` - Summary generated successfully
- `400 Bad Request` - Missing or invalid parameters
- `401 Unauthorized` - Invalid API key
- `429 Too Many Requests` - Rate limited
- `500 Internal Server Error` - Server error

### GET `/api/health`

Check server and API configuration status.

**Response:**
```json
{
  "status": "ok",
  "apiConfigured": true
}
```

## 🚨 Troubleshooting

### "ANTHROPIC_API_KEY is not configured"

Make sure you:
1. Created a `.env` file in the project root
2. Added your API key: `ANTHROPIC_API_KEY=sk-ant-...`
3. Restarted the server after creating `.env`

### OCR not extracting text properly

- Try a clearer image with better contrast
- Ensure text is in English (Tesseract.js uses English model by default)
- Avoid images with tilted text

### Summarization returns errors

- Check your Claude API key is valid
- Verify your Anthropic account has active credits
- Check rate limits on your API plan

### Server won't start

- Verify Node.js is installed: `node --version`
- Check port 3000 is available
- Try a different port: `PORT=3001 npm start`

## 💡 Tips & Tricks

1. **Batch Processing**: Extract text from multiple images and paste them together before summarizing
2. **Fine-Tune Summaries**: Adjust the summary length slider based on your needs
3. **Better Extractions**: Use high-quality, well-lit photos for best OCR results
4. **Copy Notifications**: Green notification confirms successful clipboard copy

## 🔐 Security Notes

- API keys are kept secure in `.env` file (never commit to repo)
- `.env` is in `.gitignore` by default
- CORS is enabled for `localhost:3000`
- All processing is server-side for sensitive operations

## 📦 Dependencies

- **express**: Web framework (4.18.2)
- **cors**: Cross-Origin Resource Sharing (2.8.5)
- **dotenv**: Environment variable management (16.3.1)
- **@anthropic-ai/sdk**: Claude API client (0.20.1)
- **tesseract.js**: OCR engine (loaded from CDN)

## 🤝 Contributing

Feel free to fork, modify, and use this project as needed!

## 📄 License

MIT License - Feel free to use and modify

## 🎯 Future Enhancements

- [ ] Support for multiple languages
- [ ] Batch image processing
- [ ] Document upload (PDF support)
- [ ] Advanced text formatting options
- [ ] Database for saving extracts and summaries
- [ ] User authentication
- [ ] OCR confidence scores
- [ ] Custom summary prompts
- [ ] Export as PDF
- [ ] Integration with more AI models



