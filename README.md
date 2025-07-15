# 💬 Popup AI - Gemini

A Chrome Extension that enables real-time AI conversations on **any webpage**, powered by **Gemini API** and backed by a **Spring Boot** server to securely handle API keys and logic.

---

## 🚀 Features

- 🔒 **API Key Hidden**: Secured via Spring Boot backend
- 🌐 **Universal Access**: Works on all web pages via content script
- 💬 **Popup UI**: Clean, animated, and elegant chat widget
- ⚙️ **Custom Instructions**: Responds differently based on question type
- 🕵️‍♂️ **Loading Indicator** and message throttling
- 📦 Ready to extend with authentication, analytics, database, and more!

---

## 🧱 Technologies

- ⚙️ **Spring Boot** (Java)
- 🌍 **Chrome Extension** (Manifest v3)
- 📡 **Gemini API (v1beta)** via REST
- 🧠 Optional logic filters (short code, brief answers)

---

## 📦 Folder Structure

ai/
├── src/
│ ├── main/
│ │ ├── java/com/pop/ai/
│ │ │ ├── controller/ChatController.java
│ │ │ ├── service/GeminiService.java
│ │ │ ├── model/ChatRequest.java, ChatResponse.java
│ │ │ ├── config/RestTemplateConfig, CorsConfig
│ │ └── resources/static/popup.js
├── extension/
│ ├── popup.js
│ ├── manifest.json
│ ├── icon.png

<img width="1919" height="873" alt="Screenshot 2025-07-15 190321" src="https://github.com/user-attachments/assets/006c5cf6-7a76-4d9f-838f-578c081b55b2" />
<img width="1617" height="731" alt="Screenshot 2025-07-15 190549" src="https://github.com/user-attachments/assets/b012d409-06b9-4583-b279-11be2d3ddce6" />


---
🧩 Chrome Extension
Go to chrome://extensions/

Enable Developer Mode

Click "Load unpacked" and select your extension/ folder

The chat bubble will now appear on any site

🧠 Ideas to Extend
🧑‍💼 Add Admin/Customer login (Spring Security + DB)

📊 Store chat logs or analytics

💾 Use MySQL or MongoDB to persist messages

✨ Add dark mode, emoji support, or feedback reactions
