# Paul Doherty - Test Examples

This repository features an example of a robust end-to-end testing framework built with Playwright, demonstrating modern automation best practices, continuous integration, and clean container orchestration.

The suite targets [the-internet.herokuapp.com](https://the-internet.herokuapp.com/), using a local [Docker Image](https://hub.docker.com/r/gprestes/the-internet/) for deterministic and sandboxed test execution.

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org) (LTS version)
* [Docker Desktop](https://docker.com) (Make sure the application is open and running)

### Setup & Execution
Open your terminal (Linux/MacOS) or PowerShell (Windows) and execute the following commands to clone, install, and run the test suite:

```bash
# 1. Clone the repository and navigate into the project folder
# Note: If you have issues running git commands, you can click the green "Code" button on GitHub, select "Download ZIP", extract it, and open your terminal inside that directory.
git clone https://github.com/PaulDot/qaauto_pd.git && cd qaauto_pd

# 2. Install the project dependencies
npm install

# 3. Spin up Docker, run the Playwright test suite, and tear down containers
npm run test:local
```

### Viewing Test Results

After the test run completes, you can view the interactive HTML report by running:
```bash
npx playwright show-report
```

## 🛠️ Code Quality & Local Guardrails

This project implements strict linting and automatic environment detection to ensure test stability and maintainable code architecture.

* **ESLint (Flat Config):** Enforces modern TypeScript/JavaScript patterns and specialized web-first Playwright standards.
* **Husky Pre-Commit Hook:** Automatically validates code changes (`npm run lint`) on every commit attempt. If code quality rules are violated, the commit is safely blocked.
* **Environment Resilience:** If Docker is closed or missing, the startup orchestration script automatically logs a notice and switches seamlessly to a live site fallback environment.

## 🔍 Troubleshooting

### Linux Permission Issues
If you are running Linux and encounter a `permission denied while trying to connect to the docker API` error running locally, your user account needs permission to run Docker without `sudo`. 

You can fix this permanently by running:
```bash
sudo usermod -aG docker $USER
newgrp docker
```
