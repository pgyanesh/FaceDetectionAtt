import React, { useState, useEffect } from "react";
import * as webllm from "@mlc-ai/web-llm";
console.log(webllm); // debug to see available functions

import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function initModel() {
      try {
        const chat = await webllm.ChatModule.create();
        await chat.reload("RedPajama-INCITE-Chat-3B-v1-q4f32_0");
        setEngine(chat);
      } catch (error) {
        console.error("Error loading model:", error);
      } finally {
        setLoading(false);
      }
    }
    initModel();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !engine) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);

    // Get AI reply
    const reply = await engine.chat({ role: "user", content: input });

    setMessages(prev => [
      ...prev,
      { role: "assistant", text: reply.output_text || reply }
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating toggle button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chatbot-body">
            {loading && <p className="loading-text">Loading AI model... ⏳</p>}

            {messages.map((m, i) => (
              <p
                key={i}
                className={m.role === "user" ? "msg user-msg" : "msg ai-msg"}
              >
                <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
              </p>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
