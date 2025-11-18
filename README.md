# Elegance Corp Portal - Deployment Guide

This guide provides instructions for containerizing and deploying the Elegance Corp Portal application using Docker and the `serve` static file server.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Docker**: [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

## Project Structure Assumptions

This project uses React and TypeScript, built with `create-react-app` (as indicated by `react-scripts`). The Dockerfile assumes:
*   A `package.json` file exists in the root directory.
*   The `npm run build` command compiles the React application and places the static assets into a `build/` directory.

## Local Development with API Key

For local development, create a `.env` file in the root of your project:

**`.env` file content:**
```
REACT_APP_API_KEY=your_gemini_api_key_here
```
**Replace `your_gemini_api_key_here` with your actual Gemini API key.** This file is ignored by Git and Docker for security.

Then, you can start your local development server:
```bash
npm start
```

## Build the Docker Image

To create a Docker image for the Elegance Corp Portal, navigate to the project root directory in your terminal and run the following command. **Ensure `REACT_APP_API_KEY` is set in your environment during the build if you want it baked into the image.**

```bash
# Option 1: Set REACT_APP_API_KEY directly during build (if required to be baked-in)
# REACT_APP_API_KEY="your_gemini_api_key_here" docker build -t elegance-corp-portal .

# Option 2: Build without baking in (API key will be passed at runtime, or fetched if using a dynamic method)
# For this setup, we assume DOKPLOY or `docker run` will provide REACT_APP_API_KEY at runtime.
docker build -t elegance-corp-portal .
```

This command will:
1.  Use a Node.js base image to install dependencies and build the React application using `npm run build`. This generates optimized static files in the `build/` directory.
2.  Then, use a lightweight Node.js image, install the `serve` package globally, and use it to serve these compiled static assets.
3.  Tag the resulting image as `elegance-corp-portal`.

## Run Locally (Docker)

You can run the container locally to test the application. Remember that the AI Assistant component requires `REACT_APP_API_KEY` to be set.

```bash
docker run -p 80:80 -e REACT_APP_API_KEY="your_gemini_api_key_here" elegance-corp-portal
```

*   `-p 80:80`: Maps port 80 of your local machine to port 80 inside the container. You can change the first `80` to any available port on your machine (e.g., `-p 3000:80`).
*   `-e REACT_APP_API_KEY="your_gemini_api_key_here"`: Passes your Gemini API key as an environment variable to the container. **Replace `"your_gemini_api_key_here"` with your actual API key.**

After running the command, open your web browser and navigate to `http://localhost` (or `http://localhost:3000` if you mapped to port 3000) to see the application.

## Deployment to a DOKPLOY-like Environment (via GitHub)

Since you plan to install from GitHub, here's how to integrate this with a DOKPLOY-like platform:

1.  **Commit and Push to GitHub**:
    Ensure all new Docker files (`Dockerfile`, `.dockerignore`, `.env` added to `.gitignore`) and updated project files (`services/geminiService.ts`, `README.md`) are committed and pushed to your GitHub repository. The `nginx.conf` file should be removed from your repository if it's there.

    ```bash
    git add .
    git commit -m "Configure REACT_APP_API_KEY for Docker/DOKPLOY and update Gemini model"
    git push origin main # Or your default branch
    ```

2.  **Connect DOKPLOY to your GitHub Repository**:
    *   On your DOKPLOY platform, initiate the creation of a new application or service.
    *   Select the option to deploy from a Git repository (e.g., GitHub).
    *   Authenticate with GitHub and select your `elegance-corp-portal` repository and the desired branch (e.g., `main`).

3.  **Configure Docker Build Settings**:
    *   DOKPLOY should detect your `Dockerfile` at the root of the repository. Confirm its use.
    *   Ensure the build context is set to the root directory (often represented as `.`, `/`, or `/`).

4.  **Set Environment Variables (Crucial for API Key)**:
    *   **This is the most important step for security and functionality.** In DOKPLOY's application settings (look for sections like "Environment Variables," "Secrets," or "Configuration"), add an environment variable:
        *   **Name:** `REACT_APP_API_KEY`
        *   **Value:** `votre_véritable_clé_api_gemini_ici`
    *   **NEVER HARDCODE YOUR API KEY IN CODE OR DOCKERFILES.** DOKPLOY will inject this securely into your running container, ensuring it's available during the Docker build process and at runtime.

5.  **Configure Port Mappings**:
    *   Your Docker container exposes port `80` (as defined in the `Dockerfile`).
    *   In DOKPLOY, configure the service to expose port `80` to the public internet. DOKPLOY will typically handle the external IP/port mapping and provide you with an accessible URL.

6.  **Initiate Deployment**:
    *   Start the deployment process. DOKPLOY will:
        *   Clone your GitHub repository.
        *   Build the Docker image using your `Dockerfile`. During this build, DOKPLOY will make the `REACT_APP_API_KEY` environment variable available, so `react-scripts build` can bake it into your client-side bundle.
        *   Provision and start a container from this image.
        *   Make your application accessible via a public URL.

7.  **Monitor Logs**:
    *   Always check the build and runtime logs provided by DOKPLOY. They are invaluable for debugging any issues that might arise during deployment or while the application is running.

By following these steps, your Elegance Corp Portal will be securely and efficiently deployed on DOKPLOY, leveraging the power of Docker and the `serve` static file server, with correct handling of your API key.