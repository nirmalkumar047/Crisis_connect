# CrisisConnect

## Overview

CrisisConnect is a crisis management application designed for emergency response coordination. The project serves as a Progressive Web App (PWA) that enables victims to submit SOS requests and provides relief coordinators with a real-time dashboard for managing emergency responses. The system features geolocation-based clustering of emergency requests, priority-based routing, and live updates through polling mechanisms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript, structured as a single-page application with two primary views:
- **Victim Interface**: A mobile-optimized form for emergency request submission with automatic GPS capture
- **Relief Dashboard**: A comprehensive management interface featuring interactive maps and request clustering visualization

The frontend uses Wouter for client-side routing, React Query for state management and API caching, and shadcn/ui components for a consistent design system. The UI framework leverages Tailwind CSS for styling with a custom design token system.

### Backend Architecture
The server is implemented using Express.js with TypeScript, following a modular structure:
- **API Layer**: RESTful endpoints for request submission, data retrieval, and statistics
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database persistence
- **AI Integration**: Python-based clustering algorithms using scikit-learn for request grouping and prioritization

The backend provides CORS-enabled endpoints and implements real-time data updates through client-side polling rather than WebSocket connections for simplicity.

### Data Architecture
The application uses Drizzle ORM with PostgreSQL as the primary database solution, featuring:
- **Emergency Requests**: Core entity storing victim information, location coordinates, need types, and priority levels
- **Clusters**: Computed groupings of nearby requests with centroid calculations and aggregated priority metrics
- **Real-time Updates**: Automatic cluster recalculation triggered by new request submissions

The database schema supports geographic data types for efficient spatial queries and includes automated timestamp tracking for all entities.

### Geolocation and Mapping
Location services are integrated throughout the application:
- **GPS Capture**: Automatic coordinate detection using the browser's Geolocation API with fallback error handling
- **Interactive Maps**: Leaflet-based mapping interface with clustered markers and priority-based visualization
- **Spatial Analysis**: DBSCAN clustering algorithm for geographic grouping of emergency requests

### Priority and Classification System
The application implements a rule-based priority system:
- **Medical**: Highest priority (Level 4)
- **Food**: High priority (Level 3)
- **Water**: Medium priority (Level 2)
- **Other**: Standard priority (Level 1)

Priority levels influence both visual representation in the dashboard and clustering algorithms for resource allocation optimization.

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend UI framework with TypeScript support
- **Express.js**: Backend web server framework
- **Drizzle ORM**: Database abstraction layer with PostgreSQL dialect
- **React Query**: Client-side state management and API caching
- **Wouter**: Lightweight client-side routing

### UI and Styling
- **Radix UI**: Headless component primitives for accessible interfaces
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library based on Radix and Tailwind
- **Lucide React**: Icon library for consistent iconography

### Geolocation and Mapping
- **Leaflet**: Open-source mapping library for interactive map displays
- **Browser Geolocation API**: Native location detection capabilities

### AI and Analytics
- **Python scikit-learn**: Machine learning library for clustering algorithms (DBSCAN)
- **NumPy**: Numerical computing for coordinate processing

### Database and Storage
- **PostgreSQL**: Primary database with spatial data support
- **Neon Database**: Serverless PostgreSQL hosting solution
- **In-memory Storage**: Fallback storage mechanism for development

### Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking for both frontend and backend
- **ESBuild**: JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development