# Next-Modular Marketplace

A robust, type-safe, and maintainable Next.js application built with a pragmatic modular architecture. This project serves as a showcase for professional software engineering practices in a modern web environment.

## Overview

This application implements a clean separation of concerns between business logic and UI components. It leverages a centralized service layer to manage data orchestration from external APIs (DummyJSON) and internal server state.

## Core Technologies

- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS v4
- Language: TypeScript
- State Management: React Context API (Cart System)
- Data Source: DummyJSON API

## Architecture Principles

### 1. Pragmatic OOP Logic
The application utilizes an interface-driven approach for data modeling. The business logic is encapsulated within service classes and utility objects, ensuring that domain rules are consistent and reusable across both Server and Client components.

### 2. Modular UI Design
UI components are organized into atomic units (UI Atoms) and domain-specific modules. This reduces redundancy and makes the codebase easier to scale.

### 3. Server-First Mentality
By default, pages and components are implemented as Server Components to minimize client-side JavaScript bundle size. Interactivity is isolated into specific Client Components only where necessary.

## Features

- Dynamic Product Catalog: Real-time data fetching from external API.
- Global Shopping Cart: Persistent-like basket management using React Context.
- Hybrid Data Layer: Integrated logic for merging remote API data with locally created server-side products.
- URL-Driven Search: Stateless search functionality synchronized with browser query parameters.
- Responsive Design: State-of-the-art UI with glassmorphism aesthetics.

## Project Structure

- src/app: Routing and page definitions.
- src/core: Interfaces and service layer (Business Logic).
- src/components: Reusable UI atoms and domain modules.
- src/context: Global state management.

## Installation and Setup

1. Clone the repository
2. Install dependencies: npm install
3. Run development server: npm run dev
