# Northstar Support Deflection MVP

## 🚀 Project Overview
A React-based conversational support deflection widget built for Northstar Retail Co. to autonomously handle high-frequency customer queries—specifically **"Where is my order?" (WISMO)** and **"Returns & Refunds"**—drastically reducing live agent wait times.

## 🛠️ Tech Stack & Architecture
* **Frontend:** React (Vite template), JavaScript, HTML5/CSS3 (Inline styling for portability)
* **State Management:** React `useState` hooks for local conversational logic and dynamic decision-tree routing.
* **Version Control:** Git & GitHub (collaborative audit trail).

---

## 📋 1-Page Go-Live Readiness Note

### 1. Executive Summary & Objectives
The Northstar Support Deflection MVP successfully routes inbound customer traffic away from manual human channels by providing instantaneous, self-service resolution for order lookups and return initiations. 

### 2. Functional Capabilities Deployed
* **Interactive Main Menu:** Greets customers and presents clear self-service pathways.
* **Order Status Module:** Prompts users for an Order ID input and provides automated shipping confirmation details and delivery estimates.
* **Returns & Refunds Module:** Guides users through structured return reasons (*"Wrong size / Don’t like it"* vs. *"Item damaged/defective"*) and triggers automated return label generation notices.
* **Agent Deflection Fallback:** Politely steers users back to automated tools when human queues are congested.

### 3. Known Limitations & Mock Scope
* **Local State Only:** This MVP uses simulated frontend responses rather than live backend API integration with Northstar's enterprise ERP/WMS database.
* **Persistence:** Session state resets upon browser refresh, which is standard for lightweight widget testing environments.

### 4. Next Steps for Full Production Rollout
1. Connect frontend input handlers to Northstar's live Order Management System (OMS) REST API endpoints.
2. Integrate secure customer authentication tokens.
3. Deploy the widget script globally via Northstar's primary e-commerce web storefront domain.