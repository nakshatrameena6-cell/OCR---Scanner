// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const clearImageBtn = document.getElementById('clearImageBtn');
const extractBtn = document.getElementById('extractBtn');
const extractedTextSection = document.getElementById('extractedTextSection');
const extractedText = document.getElementById('extractedText');
const copyExtractedBtn = document.getElementById('copyExtractedBtn');
const copyNotification = document.getElementById('copyNotification');
const summarizerSection = document.getElementById('summarizerSection');
const summarizeBtn = document.getElementById('summarizeBtn');
const summaryLength = document.getElementById('summaryLength');
const summaryLanguage = document.getElementById('summaryLanguage');
const ocrLanguage = document.getElementById('ocrLanguage');
const summaryContainer = document.getElementById('summaryContainer');
const summaryText = document.getElementById('summaryText');
const copySummaryBtn = document.getElementById('copySummaryBtn');
const copySummaryNotification = document.getElementById('copySummaryNotification');
const errorMessage = document.getElementById('errorMessage');
const extractSpinner = document.getElementById('extractSpinner');
const summarizeSpinner = document.getElementById('summarizeSpinner');

let selectedFile = null;
let extractedTextContent = '';

// Upload Area Event Listeners
uploadArea.addEventListener('click', () => imageInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

// Handle File Selection
function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file');
        return;
    }

    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.classList.remove('hidden');
        uploadArea.style.opacity = '0.5';
        uploadArea.style.pointerEvents = 'none';
        extractBtn.disabled = false;
        hideError();
    };
    reader.readAsDataURL(file);
}

// Clear Image
clearImageBtn.addEventListener('click', () => {
    selectedFile = null;
    imageInput.value = '';
    previewContainer.classList.add('hidden');
    uploadArea.style.opacity = '1';
    uploadArea.style.pointerEvents = 'auto';
    extractBtn.disabled = true;
    extractedTextSection.classList.add('hidden');
    summarizerSection.classList.add('hidden');
    extractedTextContent = '';
});

// Extract Text from Image
extractBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    
    extractBtn.disabled = true;
    extractSpinner.classList.remove('hidden');
    hideError();

    try {
        // Show extracting message
        extractedText.textContent = 'Extracting text from image...';
        extractedTextSection.classList.remove('hidden');

        // Use Tesseract.js for OCR
        const { data } = await Tesseract.recognize(
            previewImage.src,
            ocrLanguage.value,
            { logger: m => console.log('OCR Progress:', m) }
        );

        extractedTextContent = data.text.trim();

        if (!extractedTextContent) {
            showError('Could not extract text from the image. Please try another image.');
            extractedTextSection.classList.add('hidden');
            return;
        }

        extractedText.textContent = extractedTextContent;
        summarizerSection.classList.remove('hidden');
        summaryContainer.classList.add('hidden');
        hideError();

    } catch (error) {
        console.error('OCR Error:', error);
        showError('Error extracting text from image: ' + error.message);
        extractedTextSection.classList.add('hidden');
    } finally {
        extractBtn.disabled = false;
        extractSpinner.classList.add('hidden');
    }
});

// Copy Extracted Text
copyExtractedBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(extractedTextContent).then(() => {
        showCopyNotification(copyNotification);
    }).catch(() => {
        showError('Failed to copy text');
    });
});

// Summarize Text
summarizeBtn.addEventListener('click', async () => {
    if (!extractedTextContent) return;

    summarizeBtn.disabled = true;
    summarizeSpinner.classList.remove('hidden');
    hideError();

    try {
        summaryText.textContent = 'Generating summary...';
        summaryContainer.classList.remove('hidden');

        // Call backend for AI summarization
        const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: extractedTextContent,
                length: summaryLength.value,
                language: summaryLanguage.value
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        summaryText.textContent = data.summary;
        hideError();

    } catch (error) {
        console.error('Summarization Error:', error);
        showError('Note: Backend API not running. Showing local summary preview. ' + error.message);
        
        // Fallback: Show a simple local summarization preview
        const fallbackSummary = generateLocalSummary(extractedTextContent, summaryLength.value);
        summaryText.textContent = fallbackSummary;
    } finally {
        summarizeBtn.disabled = false;
        summarizeSpinner.classList.add('hidden');
    }
});

// Copy Summary
copySummaryBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(summaryText.textContent).then(() => {
        showCopyNotification(copySummaryNotification);
    }).catch(() => {
        showError('Failed to copy summary');
    });
});

// Simple Local Summary Generator (Fallback)
function generateLocalSummary(text, length) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    let count;
    if (length === 'short') {
        count = Math.min(2, Math.ceil(sentences.length * 0.2));
    } else if (length === 'medium') {
        count = Math.min(4, Math.ceil(sentences.length * 0.3));
    } else {
        count = Math.min(7, Math.ceil(sentences.length * 0.4));
    }

    // Score sentences based on important words
    const scoredSentences = sentences.map((sentence, index) => {
        const words = sentence.toLowerCase().split(/\s+/);
        let score = 0;
        
        // Weight early sentences higher
        score += (1 / (index + 1)) * 2;
        
        // Count important words (nouns, verbs)
        const importantWords = ['important', 'significant', 'key', 'major', 'critical', 'essential', 'main'];
        importantWords.forEach(word => {
            if (sentence.toLowerCase().includes(word)) score += 5;
        });
        
        return { sentence: sentence.trim(), score, index };
    });

    // Select top sentences and maintain order
    const topSentences = scoredSentences
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(count, 1))
        .sort((a, b) => a.index - b.index)
        .map(item => item.sentence)
        .join(' ');

    return topSentences || sentences[0] || text;
}

// Error Handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Copy Notification
function showCopyNotification(notification) {
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Close error on click
errorMessage.addEventListener('click', hideError);
