# Evo-Manage

Evo-Manage is a comprehensive application for managing human resources, projects, and tasks. It features an integrated frontend and backend system and utilizes Docker for consistent deployment across environments.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [System Requirements](#system-requirements)
  - [Setup Guide](#setup-guide)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

Evo-Manage is designed for organizations looking to optimize their human resource and project management processes. Built with a microservices architecture, the system ensures flexibility and scalability.

## Technologies Used

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL (using TypeORM)
- **Authentication**: JWT
- **Language**: TypeScript
- **Environment Management**: NestJS ConfigModule
- **Docker Deployment**: Docker Compose

### Frontend
- **Framework**: ReactJS
- **UI Library**: Ant Design
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **CSS-in-JS**: Emotion

## Getting Started

### System Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.
- Node.js >= 16.11 and npm >= 7 (for running components individually).

### Setup Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NhanHoVan/evo-manage.git
   cd evo-manage
   ```

2. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)

4. **Verify database connection**:
   Ensure PostgreSQL is running and correctly configured via the `.env` file.

### Running Components Individually

#### Backend
```bash
cd evo-backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd evo-frontend
npm install
npm run dev
```

## Project Structure

```
evo-manage/
├── evo-backend/   # Backend source code
│   ├── src/       # NestJS main code
│   └── package.json
├── evo-frontend/  # Frontend source code
│   ├── src/       # ReactJS main code
│   └── package.json
├── docker-compose.yml # Docker configuration
└── README.md      # Project documentation
```

## Contributing

We welcome contributions from the community. Please open **Issues** to report bugs, request features, or discuss ideas. Pull requests are highly appreciated!

## Contact

For questions or support, please contact us via email: **nhanhv.qt@gmail.com**.
