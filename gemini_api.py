from flask import Flask
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from process.env
dotenv_path = os.path.join(os.path.dirname(__file__), "process.env")
load_dotenv(dotenv_path)

# Fetch API Key from environment variable
API_KEY = os.getenv("GEMINI_API_KEY")
print(f"🔑 API Key: {API_KEY}")

# Validate API Key
if not API_KEY:
    raise ValueError("⚠️ API Key not found. Ensure it's set in process.env")

# Initialize Gemini API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")

# Flask App with WebSocket
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Default chatbot responses
DEFAULT_RESPONSES = {
    "turn on lights": "💡 Turning on the lights.",
    "turn off lights": "🔅 Turning off the lights.",
    "dim lights": "💡 Dimming the lights.",
    "brighten lights": "💡 Increasing brightness of the lights.",
    "set lights to warm": "🌅 Setting lights to warm mode.",
    "set lights to cool": "❄️ Setting lights to cool mode.",
    "set night mode": "🌙 Activating night mode.",
    "activate reading mode": "📖 Adjusting lights for reading mode.",
    "set temperature": "🌡️ Adjusting temperature.",
    "increase temperature": "🌡️ Increasing temperature by 2°C.",
    "decrease temperature": "❄️ Decreasing temperature by 2°C.",
    "ac on": "❄️ Turning on the air conditioner.",
    "ac off": "❄️ Turning off the air conditioner.",
    "heater on": "🔥 Turning on the heater.",
    "heater off": "🔥 Turning off the heater.",
    "lock doors": "🔒 Locking the doors.",
    "unlock doors": "🔓 Unlocking the doors.",
    "open garage": "🚗 Opening the garage door.",
    "close garage": "🚗 Closing the garage door.",
    "enable security mode": "🔐 Enabling home security mode.",
    "disable security mode": "🔓 Disabling home security mode.",
    "check front door camera": "📷 Checking front door camera...",
    "play music": "🎵 Playing music.",
    "stop music": "⏹️ Stopping music.",
    "volume up": "🔊 Increasing volume.",
    "volume down": "🔉 Decreasing volume.",
    "next song": "⏭️ Skipping to the next song.",
    "previous song": "⏮️ Playing the previous song.",
    "play relaxing music": "🎶 Playing relaxing background music.",
    "tv on": "📺 Turning on the TV.",
    "tv off": "📺 Turning off the TV.",
    "switch to netflix": "🎬 Switching to Netflix.",
    "increase tv volume": "🔊 Increasing TV volume.",
    "mute tv": "🔇 Muting the TV.",
    "turn on coffee maker": "☕ Brewing fresh coffee.",
    "turn off coffee maker": "☕ Turning off the coffee maker.",
    "start oven": "🔥 Preheating the oven.",
    "stop oven": "🔥 Stopping the oven.",
    "set fridge to energy-saving mode": "❄️ Enabling energy-saving mode for the fridge.",
    "fan on": "🌬️ Turning on the fan.",
    "fan off": "🌬️ Turning off the fan.",
    "increase fan speed": "🌪️ Increasing fan speed.",
    "decrease fan speed": "🍃 Decreasing fan speed.",
    "turn on air purifier": "🌿 Activating air purifier.",
    "open curtains": "🪟 Opening the curtains.",
    "close curtains": "🪟 Closing the curtains.",
    "raise blinds": "🌞 Raising the blinds.",
    "lower blinds": "🌚 Lowering the blinds.",
    "check energy usage": "⚡ Checking energy consumption........ Today average of 12W is consumed by each person in home.",
    "turn off all appliances": "🔌 Turning off all non-essential appliances.",
    "weather": "⛅ Checking the weather...",
    "check indoor temperature": "🌡️ Indoor temperature is 24°C.",
    "check humidity levels": "💧 Current indoor humidity is 45%.",
    "status": "🏠 Checking system status...",
    "run morning routine": "🌅 Good morning! Opening curtains, turning on lights, and playing soft music.",
    "run night routine": "🌙 Good night! Turning off lights and locking doors.",
    "enable vacation mode": "✈️ Activating vacation mode for energy saving and security.",
    "check car battery": "🔋 Checking car battery status...",
    "preheat car": "🚗 Preheating car for your trip.",
    "smoke detected": "🚨 Warning! Smoke detected. Alerting emergency services.",
    "gas leak detected": "⚠️ Gas leak detected! Shutting off gas supply and alerting emergency contacts.",
    "set alarm for 7 am": "⏰ Setting alarm for 7 AM.",
    "remind me to water plants": "🪴 Reminder set for watering plants.",
    "schedule laundry for 6 pm": "👕 Scheduling laundry cycle at 6 PM."
}

# WebSocket Events
@socketio.on("connect")
def handle_connect():
    print("✅ Client connected!")

@socketio.on("disconnect")
def handle_disconnect():
    print("❌ Client disconnected!")

# Gemini Prompt
system_prompt = "You are a smart home AI assistant. Always respond in a single line with a direct action."

@socketio.on("chatbot-command")
def handle_chatbot_command(message):
    print(f"📩 Received command: {message}")

    # Check for predefined responses
    command = message.lower().strip()
    if command in DEFAULT_RESPONSES:
        chatbot_reply = DEFAULT_RESPONSES[command]
        print(f"📤 Sending Default Response: {chatbot_reply}")
        socketio.emit("chatbot-response", chatbot_reply)
        return

    # Generate AI response if command is not predefined
    try:
        response = model.generate_content(f"{system_prompt} {message}")
        chatbot_reply = response.text if hasattr(response, "text") else "⚠️ No response text."
        chatbot_reply = " ".join(chatbot_reply.split())  # Clean up whitespace
        print(f"📤 Sending AI Response: {chatbot_reply}")
        socketio.emit("chatbot-response", chatbot_reply)
    except Exception as e:
        error_msg = f"⚠️ Error: {str(e)}"
        print(error_msg)
        socketio.emit("chatbot-response", error_msg)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
