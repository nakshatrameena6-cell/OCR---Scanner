# 🚀 QUICK START GUIDE

## Step 1: Get Your Claude API Key

1. Go to https://console.anthropic.com/account/keys
2. Create a new API key
3. Copy it (you'll need it next)

## Step 2: Create .env File

In the project root directory, create a file named `.env` and add:

```
ANTHROPIC_API_KEY=paste_your_api_key_here
```

**Example:**
```
ANTHROPIC_API_KEY=sk-ant-v0-abc123xyz789...
```

## Step 3: Start the Server

Open terminal in the project directory and run:

```bash
npm start
```

You should see output like:
```
╔════════════════════════════════════════════════════════╗
║    AI Text Extractor & Summarizer Server Started      ║
╚════════════════════════════════════════════════════════╝

🚀 Server is running at: http://localhost:3000
```

## Step 4: Open in Browser

Click or navigate to: **http://localhost:3000**

## ✨ You're Ready!

Now you can:
1. ✅ Upload images (drag & drop or click)
2. ✅ Extract text from images automatically
3. ✅ Generate AI summaries
4. ✅ Copy text & summaries with one click

## 💡 Example Usage

1. **Upload a photo** of a document or article
2. **Click "Extract Text from Image"** - The AI extracts all visible text
3. **Adjust summary length** if needed (short/medium/long)
4. **Click "Generate Summary"** - Claude AI creates a concise summary
5. **Click "Copy Summary"** - Ready to paste anywhere!

## 🆘 Something Not Working?

### Issue: "API not configured" error
- Make sure you created the `.env` file
- Check you pasted your API key correctly
- Restart the server after saving `.env`

### Issue: OCR not extracting text
- Use a clearer, well-lit image
- Make sure text is in English
- Try a different image

### Issue: Server won't start
- Check that Node.js is installed: `node --version`
- Try port 3001: `PORT=3001 npm start`
- Check the error message in terminal

## 📚 Full Documentation

See `README.md` for complete documentation and advanced usage.

## 🎨 Key Features

| Feature | What It Does |
|---------|-------------|
| 📸 Image Upload | Drag & drop your images |
| 🤖 OCR Extraction | Converts image text to editable text |
| ✂️ AI Summarization | Claude AI condenses text intelligently |
| 📋 Copy Button | One-click copy to clipboard |
| 🎨 Beautiful UI | Professional black & gold theme |
| 📱 Mobile Ready | Works on phones and tablets too |

## 🎯 Next Steps

1. Start the server: `npm start`
2. Open http://localhost:3000
3. Try uploading an image
4. Extract text and generate a summary
5. Enjoy!

---

**Enjoy your AI-powered text extraction & summarization! 🎉**
