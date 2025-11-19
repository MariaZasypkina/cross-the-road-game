🎮 Cross-the-Road Game — Marketing Arcade With Random Discounts
A playful, interactive marketing tool for client engagement by Creative Code Palette.
🧩 Overview
Cross-the-Road Game is a small arcade-style mini-game designed as a marketing and engagement tool.
Players guide a character across the road, avoid crocodiles, collect a coin, and reach the finish line.
After completing all three levels, the player unlocks a bonus vending machine where they can win a discount on Creative Code Palette’s premium services.
This turns a simple game into a light, fun gamified marketing experience that encourages potential clients to interact with the brand.
✨ Features
🎮 Gameplay
Three short, fast levels
Keyboard arrow controls
Lives decrease when hitting enemies
To finish a level, the player must:
reach the coin
collect it
reach the finish (princess tile)
🟡 Coins (one per level)
After completing all levels, the player earns 3 coins to use in the vending machine.
🎰 Vending Machine — Discount Draw
Each coin allows the player to draw a random discount from a virtual deck of 20 cards:
Discount	Cards
1%	7
2%	6
3%	5
4%	1
5%	1
Rules:
4% and 5% can appear only once each
The total discount is calculated by summing the three draws
Creates an exciting “loot-box” effect without being pushy
💌 Conversion Flow
Once all coins are used, a call-to-action button appears:
Order our services and get X% off
Clicking the button opens an email draft:
Hi! I won a discount and would like to order a website.
This provides a gentle, fun way to encourage lead generation.
🛠️ Tech Stack
React
Vite
Canvas API
Custom JavaScript game engine
Inline JSX styling
Custom sprites & assets
📂 Project Structure
src/
  game/
    Game.jsx            — UI + vending machine logic
    GameCanvas.jsx      — canvas wrapper
    useGameEngine.js    — movement, collisions, game loop
    constants.js        — level settings and tile sizes
    sprites.js          — graphics loaded as Image objects
  assets/
    game/
      player.png
      enemy.png
      princess.png
      Key.png                — in-game coin
      VendingMachine.png     — vending machine graphic
🚀 Running Locally
npm install
npm run dev
Then open:
http://localhost:5173/
🎯 Purpose
This project is designed as:
a brand engagement tool
a playful way to introduce clients to services
a soft gamified lead generator
a memorable interactive element for the Creative Code Palette portfolio
It can be embedded into:
landing pages
“About” sections
marketing campaigns
email newsletters
portfolio case studies
👩‍🎨 Created by Creative Code Palette
A brand blending design, creativity, and development — creating delightful digital experiences with personality and style.