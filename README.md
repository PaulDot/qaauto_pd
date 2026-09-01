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
# headlessly:
npm run test:local
# or, to slow down and watch tests execute in headed mode:
npm run test:watch
```

### Viewing Test Results

After the test run completes, you can view results inline in the terminal, or view a more detailed interactive HTML report by running:
```bash
npx playwright show-report
```

## 📐 Framework Architecture & Environment Design

To guarantee runtime stability and cross-platform reproducibility (and as we only really care about demonstrating the test framework rather than the example system-under-test), the repository enforces an isolated container lifecycle with fall back to the live site if there are local issues.

```text
[ npm run test:local | npm run test:watch ]
        │
        ▼
Is Docker Agent Active?
├── NO  ──► [ Log Warning Notice ] ──► Route Test Traffic to Live Site
│
└── YES ──► Check Container Status
             ├── Running ──► Reuse Container & Route Traffic to localhost:7080
             └── Stale/Off ─► Wipe Stale PIDs ──► Spin Up Image ──► Await Healthcheck (healthy)
```

## ⚙️ CI/CD Pipeline (GitHub Actions)

As well as local testing options, every code change pushed to `main` or submitted via a Pull Request automatically triggers building and testing via GitHub Actions:
* **Native Service Containerisation:** The pipeline spins up an independent background container instance of the application ahead of testing, replicating the isolated local Docker test setup.
* **Intelligent Browser Caching:** To speed up testing and avoid redundant download overhead, the runner skips fresh browser downloads unless project dependency locks are modified.
* **Test Artifacts:** Generates and attaches detailed, interactive interactive HTML test report artifacts with a 30-day retention window upon suite completion.

## 🛠️ Code Quality

This project implements an automated quality gate using **ESLint** and **Husky** to enforce modern TypeScript patterns and specialised, web-first Playwright standards. Verification runs automatically on every commit attempt; if code quality rules are violated, the pre-commit hook safely blocks the code injection to maintain a stable, clean codebase.

## 🔍 Troubleshooting

### Linux Permission Issues
If you are running Linux and encounter a `permission denied while trying to connect to the docker API` error running locally, your user account needs permission to run Docker without `sudo`. 

You can fix this permanently by running:
```bash
sudo usermod -aG docker $USER
newgrp docker
```
