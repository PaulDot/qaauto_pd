# Paul Doherty - Test Examples

This repository contains some examples of playwright tests, configs and github actions. To do this it uses a [Docker Image](https://hub.docker.com/r/gprestes/the-internet/) of [the-internet.herokuapp](https://hub.docker.com/r/gprestes/the-internet/) which can be manually interacted with online [here](https://the-internet.herokuapp.com/).

## How to Run Locally

### Prerequisites
* [Docker Desktop](https://docker.com)
* [Node.js](https://nodejs.org) (LTS)

Ensure Docker Desktop is open and running on your machine. Then execute:

```bash
npm run test:local
```

This single command will automatically spin up the application in a Docker container, wait for the web server to become ready, execute the Playwright test suite, and cleanly tear down the container when finished.

## Viewing Test Results

After the test run completes, you can view the interactive HTML report by running:
```bash
npx playwright show-report
```

## Troubleshooting

### Linux Permission Issues
If you are running native Linux (Ubuntu, Mint, Debian, etc.) and encounter a `permission denied while trying to connect to the docker API` error running locally, your user account needs permission to run Docker without `sudo`. 

You can fix this permanently by running:
```bash
sudo usermod -aG docker \$USER
newgrp docker
```