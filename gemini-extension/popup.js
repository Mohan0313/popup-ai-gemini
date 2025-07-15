(function () {
  if (document.getElementById("chat-button")) return;

  const MAX_INPUT_LENGTH = 500;

  const chatBtn = document.createElement("button");
  chatBtn.id = "chat-button";
  chatBtn.innerText = "💬";
  chatBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4e54c8, #8f94fb);
    color: white;
    border: none;
    padding: 14px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
    z-index: 9999;
  `;
  chatBtn.onmouseover = () => chatBtn.style.transform = "scale(1.1)";
  chatBtn.onmouseleave = () => chatBtn.style.transform = "scale(1)";

  const chatPopup = document.createElement("div");
  chatPopup.id = "chat-popup";
  chatPopup.style.cssText = `
    position: fixed;
    bottom: 85px;
    right: 20px;
    width: 320px;
    height: 400px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 1000;
    font-family: 'Segoe UI', sans-serif;
  `;

  const chatHeader = document.createElement("div");
  chatHeader.innerText = "Gemini Chat";
  chatHeader.style.cssText = `
    background: linear-gradient(135deg, #4e54c8, #8f94fb);
    color: white;
    padding: 12px 16px;
    font-weight: bold;
    font-size: 16px;
  `;

  const chatBox = document.createElement("div");
  chatBox.id = "chat-box";
  chatBox.style.cssText = `
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background: #f9f9f9;
  `;

  const inputArea = document.createElement("div");
  inputArea.style.cssText = `
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: #fff;
  `;

  const input = document.createElement("input");
  input.id = "user-input";
  input.placeholder = "Type a message...";
  input.style.cssText = `
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
  `;

  const sendBtn = document.createElement("button");
  sendBtn.id = "send-btn";
  sendBtn.innerText = "Send";
  sendBtn.style.cssText = `
    margin-left: 10px;
    padding: 10px 16px;
    background: #4e54c8;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s ease;
  `;
  sendBtn.onmouseover = () => sendBtn.style.background = "#3b40a1";
  sendBtn.onmouseleave = () => sendBtn.style.background = "#4e54c8";

  sendBtn.onclick = sendMessage;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    if (msg.length > MAX_INPUT_LENGTH) {
      addMessage("bot", "⚠️ Message too long. Keep it under 500 characters.");
      return;
    }

    addMessage("user", msg);
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";

    const loadingId = "loading";
    document.getElementById(loadingId)?.remove();
    addMessage("bot", "⏳ Gemini is thinking...", loadingId);

    let instruction = "Reply briefly.";
    if (msg.toLowerCase().includes("simple java code")) {
      instruction = "Give only Java code. No explanation.";
    } else if (msg.toLowerCase().includes("explain") || msg.toLowerCase().includes("what is")) {
      instruction = "Explain clearly in 3-4 lines.";
    }

    const finalPrompt = `${instruction}\n\nUser: ${msg}`;

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalPrompt })
      });

      const data = await res.json();
      const reply = data?.reply || "Gemini didn’t respond.";

      document.getElementById(loadingId)?.remove(); // ✅ Remove loading msg
      addMessage("bot", reply);                     // ✅ Add fresh reply as a new msg
    } catch (err) {
      document.getElementById(loadingId)?.remove();
      addMessage("bot", "❌ Error reaching Gemini.");
      console.error(err);
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerText = "Send";
      input.disabled = false;
      input.focus();
    }
  }

  function addMessage(sender, text, id = null) {
  const msg = document.createElement("div");
  msg.className = "message";
  if (id) msg.id = id;

  const time = new Date().toLocaleTimeString();

  msg.innerHTML = `
    <div style="font-size: 13px; margin-bottom: 2px;">${text}</div>
    <div style="font-size: 11px; color: #555;">${time}</div>
  `;

  msg.style.cssText = `
    margin: 6px 0;
    padding: 8px 10px;
    border-radius: 10px;
    max-width: 75%;
    background: ${sender === "user" ? "#d0e8ff" : "#e6f7ec"};
    color: ${sender === "user" ? "#003366" : "#1b4d3e"};
    align-self: ${sender === "user" ? "flex-end" : "flex-start"};
    text-align: ${sender === "user" ? "right" : "left"};
    font-family: 'Segoe UI', sans-serif;
    font-size: 13px;
    line-height: 1.4;
    word-wrap: break-word;
  `;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);
  chatPopup.appendChild(chatHeader);
  chatPopup.appendChild(chatBox);
  chatPopup.appendChild(inputArea);
  document.body.appendChild(chatBtn);
  document.body.appendChild(chatPopup);

  chatBtn.onclick = () => {
    chatPopup.style.display = chatPopup.style.display === "none" ? "flex" : "none";
  };
})();
