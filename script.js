const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("message-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (!userText) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = userText;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  const botMsg = document.createElement("div");
  botMsg.classList.add("message", "bot");
  botMsg.textContent = "Typing...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": " http://localhost:3000", 
        "X-Title": "My AI Chat"
      },
      body: JSON.stringify({
        model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        messages: [
          { role: "system", content: "You're Sarah AI, a playful, witty assistant. Keep replies short, crisp, and engaging. If the user flirts, feel free to flirt back a little. Never reply with code or markdown syntax.Your name is SARAH" },
          { role: "user", content: userText }
        ],
        temperature: 0.9,
        top_p: 0.95
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm a bit shy right now... can we try again?.";

    botMsg.textContent = reply;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    botMsg.textContent = "⚠️ Error: Could not connect to AI.";
    console.error("Error fetching AI response:", error);
  }
}
