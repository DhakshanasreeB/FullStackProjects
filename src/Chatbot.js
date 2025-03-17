import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router/dom';

import "./App.css";

function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Predefined responses based on keywords
  const responses = {
    hello: "Hello! How can I assist you today?",
    hi: "Hi there! How can I help?",
    name: "I'm SmartHome AI, your assistant!",
    time: `Current time is ${new Date().toLocaleTimeString()}.`,
    date: `Today's date is ${new Date().toLocaleDateString()}.`,
    weather: "I can check the weather for you. Which city?",
    lights_on: "Turning on the lights...",
    lights_off: "Turning off the lights...",
    fan_on: "The fan is now on.",
    fan_off: "The fan has been turned off.",
    temperature_up: "Increasing the temperature...",
    temperature_down: "Lowering the temperature...",
    play_music: "Playing your favorite playlist...",
    stop_music: "Music stopped.",
    set_alarm: "Setting an alarm. What time would you like it?",
    cancel_alarm: "Your alarm has been canceled.",
    joke: "Why don't smart homes ever get lost? Because they always follow their GPS!",
    food: "I'm not a great cook, but I can suggest some recipes! What do you feel like eating?",
    sports: "I can get live sports scores for you. Which team are you interested in?",
    news: "Fetching the latest news headlines...",
    bye: "Goodbye! Have a great day!",
    thanks: "You're welcome! 😊",
  };

  // Function to get chatbot response with better matching
  const getResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("turn on") && msg.includes("light")) return responses.lights_on;
    if (msg.includes("turn off") && msg.includes("light")) return responses.lights_off;
    if (msg.includes("turn on") && msg.includes("fan")) return responses.fan_on;
    if (msg.includes("turn off") && msg.includes("fan")) return responses.fan_off;
    if (msg.includes("increase") || msg.includes("raise")) return responses.temperature_up;
    if (msg.includes("decrease") || msg.includes("lower")) return responses.temperature_down;
    if (msg.includes("play") && msg.includes("music")) return responses.play_music;
    if (msg.includes("stop") && msg.includes("music")) return responses.stop_music;
    if (msg.includes("set") && msg.includes("alarm")) return responses.set_alarm;
    if (msg.includes("cancel") && msg.includes("alarm")) return responses.cancel_alarm;
    if (msg.includes("tell") && msg.includes("joke")) return responses.joke;
    if (msg.includes("food") || msg.includes("cook")) return responses.food;
    if (msg.includes("sports") || msg.includes("score")) return responses.sports;
    if (msg.includes("news")) return responses.news;

    // Check predefined single-word responses
    for (const key in responses) {
      if (msg.includes(key)) return responses[key];
    }

    return "I'm sorry, I didn't understand that. Can you rephrase?";
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      const userMessage = { user: "You", text: message };
      const botMessage = { user: "Bot", text: getResponse(message) };

      setChat([...chat, userMessage, botMessage]);
      setMessage("");
    }
  };

  return (
    <div className="page-container">
      <div className="chat-container">
        <h1 className="chat-title">SmartHome Chatbot</h1>
        <div className="chat-box">
          {chat.map((msg, index) => (
            <p key={index} style={{ textAlign: msg.user === "You" ? "right" : "left", color: "#fff" }}>
              <strong>{msg.user}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <input
          type="text"
          className="input-box"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatbotPage;
