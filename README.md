# Horizone

Horizone is an innovative hotel booking platform powered by AI, designed to enhance the search and booking experience. By leveraging OpenAI's LLM, the platform enables users to input hotel preferences and receive personalized recommendations. This project aims to simplify and personalize hotel selection, making it easier for users to find the best options based on their unique needs.

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/0e374b6d471c9e3a6be4c952a8cd635580c9ee30276959d3853904be258e3e65.jpg?versionId=7e6a3674ef861070f0c001783e01c03b)---

# 🤔 Problem space

## Problems to solve/Requirements to Create

A potential client might need a website or platform with faster load times, enhanced SEO, and improved performance. The challenge is balancing server-side rendering (SSR) and client-side interactivity without compromising user experience. The solution should optimize data fetching, minimize resource consumption, and deliver static content quickly while maintaining dynamic functionality for a seamless user experience.

### 👉 Problem: Slow Initial Page Load

**Problem Statement:**\
Web pages with heavy media files or large datasets often suffer from slow initial load times, negatively affecting user experience, especially on slower networks or devices.

**Current Solution:**\
Lazy loading delays loading non-essential content (e.g., images or videos) until the user needs it, such as when they scroll to that part of the page. This minimizes initial load time and reduces resource usage, providing a faster and smoother user experience.

**How do we know it is a problem:**

- User feedback: Users complain about long loading times for image-heavy or media-rich pages.

- Metrics: High bounce rates and low engagement on pages with large files.

- Evidence: Performance tools report poor LCP (Largest Contentful Paint) and TTI (Time to Interactive) scores.

### 👉 Problem: Slow Rendering and Delayed User Interaction

**Problem Statement:**\
Pages that are dynamically rendered on each request can lead to slower loading times, especially for static content that doesn't change frequently. This impacts the user experience and affects website performance.

**Current Solution:**\
**Static Rendering (SSG) in Next.js** pre-renders pages at build time, creating static HTML files that can be served instantly to users. This significantly reduces load times for pages with static content, improving user experience and boosting performance by eliminating the need for server-side processing on every request.

**How do we know it is a problem:**

- User feedback: Users express frustration with delayed interactivity and slower navigation.

- Metrics: Increased TTI, low user satisfaction scores.

- Evidence: Performance tests show that dynamic rendering is causing unnecessary delays in loading static content.

### 👉 Problem: Challenges with Server Components in Next.js

**Problem Statement:**\
Server components in Next.js can lead to potential issues such as increased complexity in managing the client-server boundary, limited interactivity, and difficulties in handling certain client-side features, like state management or event handling. Additionally, debugging server components can be more challenging since they are rendered on the server.

**Current Solution:**\
While server components help with performance and SEO, careful consideration of when and where to use them, along with combining them with client components for interactivity, can mitigate these challenges.

**How do we know it is a problem:**

- User feedback: Developers report challenges in handling interactivity with server-rendered components.

- Metrics: Increased development time due to debugging issues and state management complexities.

- Evidence: Feedback and development logs show a slower development process due to poor integration of server components.

---

## Why solve these problems?

- **Reason 1:** Improving page load times and rendering efficiency is crucial for enhancing user experience, increasing engagement, and reducing bounce rates.

- **Reason 2:** Simplifying the use of server components ensures faster development cycles, reduces complexity, and enables a more interactive user experience.

**User Satisfaction Matrix:**

- **Current state:** Users face frustration with slow loading times and delayed interactivity.

- **Desired state:** After implementing the solutions, users will experience faster page loads, smoother interactions, and seamless content delivery.

---

## Goals

### Company objective 🎯

  💡 The main company objective is to **optimize and enhance the hotel booking process**, providing a seamless, AI-driven experience for users to find, book, and manage accommodations. The goal is to improve user experience while increasing efficiency in the booking journey.

### Project Goals

- **Project goal:** Develop an AI-powered hotel booking platform with personalized recommendations using OpenAI’s LLM, aimed at enhancing user decision-making.

- **Project goal:** Implement server-side rendering for improved performance, providing faster page loads and a smoother user experience.

- **Project goal:** Optimize the admin dashboard for easy hotel and booking management, improving backend efficiency.

---

## User Stories

### **User Type: Visitor**

The Visitor is someone looking to book a hotel for their trip. They are browsing the platform to find suitable accommodation options.

- **Goals:** Find hotels that match their preferences, such as location, price range, and amenities.

- **Needs:** Ability to filter search results based on different criteria and personalized recommendations powered by AI.

- **Other Characteristics:** Visitors may be first-time users or repeat customers seeking accommodations tailored to their specific preferences or past experiences.

### **User Type: Admin**

The Admin is responsible for managing hotel listings and overseeing booking-related tasks.

- **Goals:** Approve and manage hotel listings, monitor booking statuses, and ensure accurate data for customers.

- **Needs:** A user-friendly and efficient interface to create and manage hotel listings

- **Other Characteristics:** Admins are responsible for creating new hotel listings and managing other hotel-related details.

---

# 🌟 Design space 

## UI Design

The UI design focuses on creating a seamless user experience, emphasizing easy navigation and intuitive interactions. Key features include:

1. **Home Page:** Introduction to Horizone, highlighting AI-driven features and a clear call-to-action for users to sign up or explore.
2. **User Flow:**
   - Sign up or log in to access personalized recommendations and services.

   - Customize preferences for hotel searches based on user input.

   - Browse through AI-powered recommendations and finalize bookings.
3. **Admin Flow:**
   - Login → Access the admin dashboard.

   - View a list of user bookings and hotel information.

   - Take actions like adding new hotels, updating details, or managing bookings.

## **Low-fidelity Wireframe**

**Design Concept**\
The core design concept for **Horizone** is centered on simplicity, clarity, and ease of navigation. The platform aims to provide a seamless user experience for both hotel guests and admins. The design focuses on a clean interface with easy access to hotel search, booking, and management features.

- **For users:** The flow starts with a homepage showcasing hotel listings, then allows users to search and filter hotels with ease. The booking process is straightforward with clear steps.
- **For admins:** The dashboard offers a simple, efficient layout with hotel management tools, booking status updates, and performance metrics.

## Wireframes

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/440c869970b1537499fad89e2b50ccb80fce4161924b85ef0d333d8ac8f0505a.jpg?versionId=7e6a3635c6bac23b2763089d74849f87)**✍️ Home Page Wireframe**

- Top section: Logo, navigation buttons (Sign in, Sign up)

- Large hero banner describing platform features with **AI Search** Form

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/88a109da57896a6832b9007c4106b5d509a197281a0d14cb5a5e53c2452ba201.jpg?versionId=7e6a36357ca5913e2ef41c91593edfeb)**✍️ Hotel Listings Component Wireframe**

- Top Section: Navigate between other locations (Location Tab)

- Hotel Cards

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/1c7cd1a0bf6e047127b9c282e83053fda23bcbab4aa85fa08a2e37b47daa5d6d.jpg?versionId=7e6a36350d2573605dbc5eb055416b8d)**✍️ Hotel Page Wireframe**

- Hotel Image with All Hotel Details

- Booking Button and Booking features

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/f932a25ad394d9cee8f2fd7dd6c769b75e622c9b2c577b06d25130bc40a4a42e.jpg?versionId=7e6a363409364ebf3f4ae72b341200c8)**✍️ User Account Page Wireframe**

- User Account Details Section with including privacy details (Email)

- All Booking Details and reject button

---

# Development Phase

### Technology Stack Selection

### **Frontend - NextJS with TypeScript**

**Why NextJS?**

- **Optimized for performance**: Static generation and server-side rendering improve loading times and SEO.

- **Fast and scalable**: Built-in tools and scalability ensure smooth performance even as the project grows.

### Backend - NextJS

**Why NextJS?**

- Full-stack framework allowing for server-side rendering, API routes, and static site generation (SSG).

- Streamlines both front-end and back-end development with a unified codebase.

- Enables fast and scalable solutions by leveraging NextJS’s built-in features like file-based routing and API endpoints.

- Optimized for performance and SEO, making it ideal for real-time applications like a hotel booking platform.

### Database - MongoDB

**Why MongoDB?**

- Flexible, scalable NoSQL database that easily integrates with the MERN stack.

- Ideal for handling large volumes of diverse data, such as hotel listings and reservations.

### Authentication - Clerk

**Why Clerk?**

- Simplifies authentication with secure login, registration, and session management.

- Easily integrates with NextJS for a seamless user experience and secure access control.

### High-Level Architecture

The architecture of **Horizone** is designed as a **Client-Server Model**, separating concerns between the frontend, backend, and database components. The **frontend**, built with **Next.js** and **TypeScript**, provides a seamless user interface with dynamic rendering. The **backend** is powered by **Next.js API routes** for handling business logic and **MongoDB** as the database. **Clerk** is integrated for authentication. This separation ensures scalability, maintainability, and performance, making it a robust full-stack solution for managing hotel bookings and reservations.

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/20ba47552bc30318ec6a157b3b188d7b89857ced3a125de6623082877e3f0f08.jpg?versionId=7e6a361cfb9fd3b06c26a1d563da625c)## Entity-Extended Relationship Diagram

![](https://pub-a68d0c01397443d094d3236b5e9b30cf.r2.dev/portfolio-images/f1d155419d20e8c0302da5ab668ad94a2227ccaf0563ddd8fbc383e4ec176d81.jpg?versionId=7e6a36189d3bbb3b26b93d490445d39e)## Key Features of the Software

  **Hotel Booking System**

- **Decision:** Chose a **MongoDB** database to store hotel listings and reservation data for its scalability and flexibility.

- **Implementation:**

  - Designed a **hotel schema** with embedded documents to store hotel details and reservation data within one document to reduce query complexity.

  - Applied **indexes** on frequently queried fields such as `hotelName`, `location`, and `price`.

**Admin Dashboard for Hotel Management**

- **Decision:** Implemented a **card-based UI** with NextJS for efficient display and management of hotel data.

- **Implementation:**

  - Integrated a dynamic, filterable list of hotels with the ability to **add, update, or delete hotels** via API calls.

  - Added **real-time updates** to ensure the admin dashboard reflects the most recent changes in hotel data.

**Secure User Authentication**

- **Decision:** Used **Clerk** for secure authentication to simplify login and session management.

- **Implementation:**

  - Integrated **Clerk Authentication** for user sign-up, login, and session management.

---

# Challenges Faced and Solutions 

### **Problem 1:**

**Slow Response Time in AI-Driven Features**\
AI-driven features, such as job categorization or personalized recommendations, often experience slow response times due to the complexity of AI models and data processing. This negatively impacts user experience, leading to frustration.

### **Solution 1:**

To tackle this, we implemented AI model optimization techniques and background processing.

1. **Background Processing**: Implemented asynchronous processing for AI tasks, reducing front-end waiting time.

 

# Future Vision / next steps

  **Long-term Vision:**

- **Mobile App Development:** Expand the platform to mobile, ensuring users have access to hotel booking and management on the go.

- **User Reviews & Ratings:** Add a review and rating system for hotels, helping users make informed decisions based on peer feedback.

- **AI Integration:** Introduce AI for personalized hotel recommendations based on user preferences and past booking data.

**UI/UX Improvements:**

- **Enhanced Search Filters:** Add more advanced filters like amenities, room types, and price range for easier navigation.

- **Improved Admin Dashboard:** Implement analytics and reporting features for better hotel performance tracking.
