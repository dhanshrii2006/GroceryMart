# Grocery Dashboard

A live inventory management system for grocery stores with real-time updates and dynamic surge pricing.

## About the Website

This website helps grocery managers track live inventory and pricing in real time. Built with the MERN stack, it demonstrates dynamic surge pricing, automatic updates, and clean React design.

## Features

- 🔄 Real-time inventory updates (3-second polling)
- 💰 Dynamic surge pricing (20% increase when stock ≤ 10)
- 🎨 Clean, responsive design
- 📊 Visual stock level indicators
- 🛍️ Quick sell and restock actions
- 🚀 Automatic data seeding on first run




## Project Structure

```
grocery-dashboard/
├── backend/
│   ├── models/
│   │   └── GroceryItem.js
│   ├── .env.example
│   ├── index.js
│   └── package.json
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account



### Backend Setup

1. Create a MongoDB Atlas cluster and get your connection string

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. Edit `.env` and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a new terminal and set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend:
   ```bash
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Initial Data

On first run, the backend automatically seeds the database with:
- Apples ($0.50)
- Milk ($3.99)
- Bread ($2.49)
- Eggs ($3.99)

## Features Explained

### Dynamic Surge Pricing
- Normal stock (>10 units): Regular base price
- Low stock (≤10 units): 20% price increase

### Stock Levels
- High stock (>10): Green indicator
- Low stock (≤10): Yellow indicator
- Out of stock (0): Red indicator

### Actions
- "Sell 1": Decrements stock by 1
- "Restock": Adds 20 units to stock

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Updates**: Real-time polling
- **Styling**: Pure CSS with responsive design
```

**Implementation:**
- Create downloadable "Spoilage Calculator" PDF with:
  - Simple formula: `(Weekly wasted stock $ × 4) × 0.68 = Your monthly savings`
  - Example filled: `($150 × 4) × 0.68 = $408/month saved`

### 7. Traceability Feature
**How to visualize:**
- Interactive breadcrumb trail demo:
  1. "Farm Eggs added manually (Oct 3)"
  2. "Moved to Cooler 4 (Oct 3)"
  3. "Alert: Sell before Oct 8! (Oct 7)"
  4. "Sold to customer (Oct 7)"
- Add "Prove freshness" button showing customer-facing tablet display:
  ```diff
  Farm Eggs: 
  - Added: Today 6:30 AM 
  - From: Smith Family Farm 
  + "Ask staff to show delivery photos!"
  ```

### 8. Implementation Roadmap
**Phase 1: Content Creation**
1. Photograph real manual entry process (avoid stock images)
2. Film 3 customer testimonial snippets focusing on:
   - Ease of manual entry
   - Offline use during storms
   - Finding backroom stock

**Phase 2: Competitive Research**
- Secret-shop 3 competitor tools
- Document manual entry friction points
- Capture loading times during poor connectivity

**Phase 3: Validation Assets**
- Create "Spoilage Diary" template for prospects
- Develop case study: "How Rita's Market cut waste 73%"

**Phase 4: Launch Sequence**
1. Landing page with manual-entry demo video
2. Facebook ads targeting local grocery groups
3. "Try our manual-add simulator" web tool

### Key Differentiators to Emphasize
1. **The Paper Bridge:**
   - Show clipboard → tablet transition
   - "Start with pen & paper? We'll digitize it tomorrow!"

2. **Disaster-Proof Selling:**
   - "When storms kill internet, your expiry alerts still work"

3. **Grandma-Approved Tech:**
   - Highlight large buttons + voice input option
   - "No more tiny scan screens!"

This approach focuses on tangible workflow solutions rather than abstract tech, with warmth coming from human-centered imagery and language that respects traditional shopkeeping while showcasing modern advantages.

