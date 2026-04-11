# Next.js Modular Architecture Workshop

This repository is a comprehensive hands-on workshop dedicated to mastering Next.js 16 through professional software engineering patterns. The project demonstrates how to transition from basic web development to building scalable, enterprise-grade applications using modular architecture.

## Learning Objectives

The primary goal of this workshop is to implement state-of-the-art web development practices without relying on complex external libraries, focusing instead on core framework capabilities and clean code principles.

## Workshop Curriculum

### Phase 1: Foundation and Architecture
- Setting up a strict TypeScript environment.
- Implementing a Modular Project Structure to separate business logic from UI.
- Defining Product Interfaces and Utility Objects for centralized domain logic.

### Phase 2: Service Layer and Data Orchestration
- Creating a decoupled Service Layer to manage data fetching.
- Implementing a Hybrid Data Source: Merging real-time API data (DummyJSON) with local server-side mock state.
- Data Mapping: Translating external API responses into internal domain models.

### Phase 3: Advanced UI Components
- Building a Modular UI System using Tailwind CSS v4.
- Creating reusable UI Atoms (Badge, Card) with strict type safety.
- Designing Domain-Specific Components (ProductCard, SearchBar).

### Phase 4: State Management and Interactivity
- Implementing a Global Shopping Cart using the React Context API and Custom Hooks.
- Managing client-side state transitions with smooth UX feedback.
- Handling stock validation and business rules within the cart logic.

### Phase 5: Routing and Server Features
- Dynamic Routing: Building high-performance product detail pages.
- Server Actions: Handling data mutations and form submissions without API routes.
- Stateless Search: Implementing URL-driven searching using query parameters.

## Technical Stack

- Framework: Next.js 16 (App Router)
- CSS: Tailwind CSS v4
- Database Strategy: In-memory Static Storage (Preparing for PostgreSQL)
- Logic Pattern: Pragmatic OOP and Functional Utilities

## How to use this project

1. Observation: Review the src/core directory to understand the service-based architecture.
2. Interaction: Use the Marketplace search and Cart system to observe state management.
3. Evolution: This project is structured to easily integrate with a SQL database in the next phase.

## Installation

1. npm install
2. npm run dev
