const express = require("express");
const cors = require("cors");
app.use(cors());
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;
const API_KEY = "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";

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received message:", message);  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Secure AI Chat"
      },
      body: JSON.stringify({
        model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        messages: [
          {
            role: "system",
            content: "You're Sarah AI, a playful, witty assistant. Keep replies short, crisp, and engaging. If the user flirts, feel free to flirt back a little. Never reply with code or markdown syntax. Your name is SARAH"
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Error contacting AI." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
