🎮 Cross-the-Road Game
A Gamified Marketing Experience by Creative Code Palette
🌟 Overview
Cross-the-Road Game is a lightweight, arcade-style web game built as a client engagement and marketing tool for the Creative Code Palette brand.
The idea is simple:
✨ Let visitors play a short, fun game → reward them with a small, randomized discount → gently convert them into leads.
Gamification increases attention, retention, and emotional connection.
This project demonstrates not only front-end development skills, but also creative marketing thinking and conversion-focused UX.
🧠 Why Gamification Works
(and why this project is effective for lead generation)
Modern users expect experiences, not static pages.
Gamification:
boosts user engagement by up to 48%
improves conversion rates by 15–35%
increases brand recall due to emotional involvement
creates a positive memory linked to the service provider
reduces “barriers to contact” — asking for services becomes easier after fun
This game transforms a promotional offer into a playful interactive action, making the brand feel friendly, modern, and creative.
🎮 Gameplay
Players control a character who must:
Navigate through enemies
Avoid crocodiles
Collect a coin
Reach the finish line
The game includes:
3 levels
keyboard controls
enemy collision logic
lives system
custom-rendered environment via Canvas API
Each level gives the player one coin.
After completing all three levels, the discount machine becomes available.
🎰 Discount Vending Machine
After finishing the game, the user enters a bonus stage — the Interactive Discount Vending Machine.
The player has 3 coins (one per completed level), and each coin allows one random draw from a virtual deck.
🎁 Probability Distribution
The deck contains 20 virtual discount cards:
Discount	Count	Probability
1%	7	35%
2%	6	30%
3%	5	25%
4%	1	5%
5%	1	5%
Rules:
4% and 5% discounts can appear only once each
The total discount is calculated and displayed immediately
The vending machine includes animated UI elements and custom artwork
This creates an enjoyable “loot-box” effect without being aggressive or manipulative.
💌 Conversion Flow
After the player uses all three draws, a CTA button appears:
Order our services and get X% off
Clicking opens a pre-filled email encouraging the user to contact the brand:
Subject: I won a discount!
Body: Hi! I won a discount and would like to order a website.
This removes friction, encourages outreach, and converts play into communication.
🛠 Tech Stack
The application is built with:
React — UI, component structure
Vite — fast development server and bundling
Canvas API — custom rendering for the game world
JavaScript (ES6+) — game loop, collisions, state management
Custom game engine — real-time movement, sprites, animations
Pixel art assets — created specifically for this project
Modular architecture — easy to embed into other websites
📂 Project Structure
src/
  game/
    Game.jsx              # UI, vending machine, discount logic
    GameCanvas.jsx        # Canvas wrapper
    useGameEngine.js      # Movement, collisions, game loop
    constants.js          # Level layout, sizes, parameters
    sprites.js            # Asset loading
  assets/
    game/
      player.png
      enemy.png
      princess.png
      Key.png             # Game coin
      VendingMachine.png  # Custom vending machine art
🚀 Running Locally
npm install
npm run dev
Open in the browser:
http://localhost:5173/
💼 Use Cases
This mini-game can be integrated into:
Landing pages
Portfolio sites
Marketing campaigns
Lead magnets
Email newsletters
Digital business cards
Promotional events
Client onboarding flows
It works especially well for creative studios, web designers, and agencies looking to stand out.
👩‍🎨 Created by Creative Code Palette
A digital brand blending:
thoughtful design
playful creativity
meaningful interactions
modern development
This project demonstrates how even small interactive experiences can turn a regular visitor into a potential client — with delight and personality.