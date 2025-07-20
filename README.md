# DevOps Project - Full Stack Application

This is a complete DevOps project featuring a React frontend, Node.js backend, containerization with Docker, and orchestration with Kubernetes.

## Project Structure
├── frontend/ # React + Vite application
├── backend/ # Node.js Express API
├── kubernetes/ # Kubernetes manifests
├── .devcontainer/ # VS Code dev container config
├── .github/workflows/ # CI/CD pipelines
└── docker-compose.yml # Local development setup

text

## Quick Start

### Local Development
1. Install dependencies:
cd frontend && npm install
cd ../backend && npm install

text

2. Run with Docker Compose:
docker-compose up --build

text

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

## Technologies Used

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Development**: VS Code Dev Containers

## Deployment

The application can be deployed to any Kubernetes cluster using the manifests in the `kubernetes/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
"@

Set-Content -Path "README.md" -Value $readmeContent
Write-Host "Created comprehensive README.md" -ForegroundColor Green