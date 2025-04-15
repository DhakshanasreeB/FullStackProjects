const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json()); // Allow JSON parsing

// ✅ Handle WebSocket Connections
io.on("connection", (socket) => {
    console.log("Client connected via WebSocket");

    socket.on("chatbot-command", (message) => {
        console.log("Received command:", message);

        const lowerMessage = message.toLowerCase().trim(); // Normalize input

         
        const responses = [
            { keywords: ["name"], response: "I am Zenbot I am here to assist you at any time.I am modled to control your Smart home IOT devices through chat.Do you have any other questions?" },
            { keywords: ["help"],response:" How can I help you?"},
            { keywords: ["like","love"],response:" I dont have feelingss like humans but I will assist you in operating your smart Home appliances."},
            
            { keywords: ["tomorrow"],response:" Go to bed earlier you have to be prepared for your work."},
            
            { keywords: ["light on"], response: "LED is ON" },
            { keywords: ["light off"], response: "LED is OFF" },
            { keywords: ["fan on"], response: "Fan is ON (Cooling Mode)" },
            { keywords: ["fan off"], response: "Fan is OFF" },
            { keywords: ["alarm on"], response: "Alarm is ON (Buzzer Activated)" },
            { keywords: ["alarm off"], response: "Alarm is OFF (Buzzer Deactivated)" },
            { keywords: ["hi", "hello","hii","hiii","hey"], response: "Hello! How can I help you?" },
            { keywords: ["thank"], response: "You're welcome! 😊" },
            { keywords: ["humidity"], response: "Humidity is at 65%." },
            { keywords: ["power", "usage"], response: "Today's energy consumption is 2.5 kWh. 🔋" },
            { keywords: ["electricity", "bill"], response: "Estimated electricity bill this month is $30." },
            { keywords: ["pay"], response: "Payment is successfull." },
            { keywords: ["AC","ac","AC ON","AC on","ac ON","ac on"],response:"Turning on AC."},
            {keywords:["AC off"],response:"Turning off AC."},
            {keywords:["Set AC Temperature","AC temperature"],response:"AC Temperature is set in accordance with you room temperature."},
             {keywords:["rooms status?"],response:"The Lights in the Dinning hall,Living room,Kitchen,and the Master room  should be set off because no one is using it."},
            { keywords: ["solar", "status"], response: "Solar panels are generating 500W of power. ☀️" },
            { keywords: ["reminder"], response: "You have a reminder: Water the plants at 6 PM. 🌱" },
            { keywords: ["schedule", "today"], response: "Today's schedule: Meeting at 10 AM, Gym at 6 PM. 📅" },
            { keywords: ["plan"], response: "Yes! Today, you need to focus on saving electricity." },
            { keywords: ["good morning"], response: "Good morning! Turning on lights, playing soft music. ☀️" },
            { keywords: ["good night"], response: "Good night! Turning off lights and locking doors. 🌙" },
            { keywords: ["party mode"], response: "Party Mode Activated! 🎉 Adjusting lights and playing music." },
            { keywords: ["movie mode"], response: "Movie Mode Activated! Dimming lights and turning on the TV. 🍿" },
            { keywords: ["stocks"], response: "This month is stock is sufficient." },
            {
                keywords: ["stock list"], 
                response: 
                    "🥦 Fresh Produce:\n" +
                    "✅ Potatoes 🥔\n" +
                    "✅ Onions 🧅\n" +
                    "✅ Tomatoes 🍅\n" +
                    "✅ Carrots 🥕\n" +
                    "✅ Garlic 🧄\n" +
                    "✅ Green leafy vegetables 🥬\n\n" +
            
                    "🥛 Dairy & Refrigerated Items:\n" +
                    "✅ Milk 🥛\n" +
                    "✅ Eggs 🥚\n" +
                    "✅ Butter 🧈\n" +
                    "✅ Cheese 🧀\n" +
                    "✅ Yogurt 🍶\n\n" +
            
                    "🍞 Bakery & Grains:\n" +
                    "✅ Bread 🍞\n" +
                    "✅ Rice 🍚\n" +
                    "✅ Pasta 🍝\n" +
                    "✅ Flour (Wheat, Maida)\n" +
                    "✅ Sugar & Jaggery 🍯\n\n" +
            
                    "🥫 Canned & Dry Goods:\n" +
                    "✅ Lentils (Dal) 🫘\n" +
                    "✅ Beans 🥜\n" +
                    "✅ Cooking Oil 🛢️\n" +
                    "✅ Tea & Coffee ☕\n" +
                    "✅ Spices (Turmeric, Chilli Powder, Cumin, etc.)\n" +
                    "✅ Salt 🧂\n" +
                    "✅ Vinegar & Soy Sauce"
            },
            {
                keywords: ["available vegiees","vegiess"], 
                response: 
                    "🥦 Fresh Produce:\n" +
                    "✅ Potatoes 🥔\n" +
                    "✅ Onions 🧅\n" +
                    "✅ Tomatoes 🍅\n" +
                    "✅ Carrots 🥕\n" +
                    "✅ Garlic 🧄\n" +
                    "✅ Green leafy vegetables 🥬\n\n"},
                    
                    {
                        keywords: ["Dry fruits"], 
                        response: "🥫 Canned & Dry Goods:\n" +
                    "✅ Lentils (Dal) 🫘\n" +
                    "✅ Beans 🥜\n" +
                    "✅ Cooking Oil 🛢️\n" +
                    "✅ Tea & Coffee ☕\n" +
                    "✅ Spices (Turmeric, Chilli Powder, Cumin, etc.)\n" +
                    "✅ Salt 🧂\n" +
                    "✅ Vinegar & Soy Sauce"
            },
            {
                keywords:["Grains"],
                response: "🍞 Bakery & Grains:\n" +
                "✅ Bread 🍞\n" +
                "✅ Rice 🍚\n" +
                "✅ Pasta 🍝\n" +
                "✅ Flour (Wheat, Maida)\n" +
                "✅ Sugar & Jaggery 🍯\n\n" 
            },
            {
                keywords: ["Dairy","dairy products"],
                response:"🥛 Dairy & Refrigerated Items:\n" +
                    "✅ Milk 🥛\n" +
                    "✅ Eggs 🥚\n" +
                    "✅ Butter 🧈\n" +
                    "✅ Cheese 🧀\n" +
                    "✅ Yogurt 🍶\n\n"
            },

                           
            { keywords: ["milk"], response: "You have 2 liters of milk left in the fridge. 🥛" },
            { keywords: ["vegetables"], response: "Fresh vegetables are available in the kitchen. 🥦" },
            { keywords: ["cook"], response: "Take food that is rich in vitamin andd protein content.🌟" },
            { keywords: ["ok"], response: "😊" },
            { keywords: ["close"], response: "ok!😊" },
            { keywords: ["weather"], response: "It's partially cloudy 😊" },
            { keywords: ["who", "that"], response: "Someone is entering the room!" },
            { keywords: ["sensor", "working"], response: "Yes! Sensors are functioning well. 🌟" },
            { keywords: ["door open"], response: "Warning! The door is open. 🚪" },
            { keywords: ["door closed"], response: "The door is securely closed." },
            { keywords: ["window open"], response: "Warning! The window is open. 🔲" },
            { keywords: ["window closed"], response: "All windows are closed. ✅" },
            { keywords: ["plan"], response: "Yes! Today, you need to focus on saving electricity." },
            { keywords: ["visitor"], response: "Yes! Your friend John visited today." },
            { keywords: ["groceries"], response: "Yes! These groceries will last for this month." },
            { keywords: ["bye", "end"], response: "See you! Have a nice day!!" },
            { keywords: ["motor on"], response: "Motor is ON (Activated)" },
            { keywords: ["motor off"], response: "Motor is OFF (Deactivated)" },
            { keywords: ["temperature"], response: () => {
                const fakeTemp = Math.floor(Math.random() * 10) + 25;
                return `Current Temperature: ${fakeTemp}°C`;
            }},
            { keywords: ["date"], response: () => {
                const now = new Date();
                return `Today's date is ${now.toDateString()} 📆`;
            }},
            { keywords: ["time"], response: () => {
                const now = new Date();
                return `Current time: ${now.getHours()}:${now.getMinutes()} ⏰`;
            }},
            { keywords: ["vibration"], response: "Warning: Vibration detected! 🚨" }
        ];

        // Find the best response
        let foundResponse = "Can you please tell me clearly 😊.";
        for (let item of responses) {
            if (item.keywords.some((word) => lowerMessage.includes(word.toLowerCase()))) {
                foundResponse = typeof item.response === "function" ? item.response() : item.response;
                break;
            }
        }

        io.emit("chatbot-response", foundResponse);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        io.emit("chatbot-response", "Have a nice day! 👋");
    });
});

// ✅ Start WebSocket Server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running at ws://localhost:${PORT}`);
});
