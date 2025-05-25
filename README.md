# Weatherify

A full-stack application that generates Spotify playlists based on current weather conditions using React (frontend) and Spring Boot (backend).

---

## Overview

This project is composed of two main components:

* **weatherifyFront**: The frontend built with React and Vite.
* **weatherifyBack**: The backend built using Java Spring Boot.

---

## Project Structure

```
WeatherifyFinalProjectSubmission/
├── weatherifyFront/
│   ├── src/
│   │   ├── components/         # Contains WeatherifyApp UI logic
│   │   ├── icons/              # Icon components (e.g., sun, rain, cloud)
│   │   ├── primitives/         # UI primitives like Button, IconButton
│   │   ├── styles/             # Custom CSS for layout
│   │   └── index.jsx           # Entry point
│   ├── public/                 # Public assets
│   └── package.json            # Frontend dependencies
│
├── weatherifyBack/
│   ├── src/main/java/com/weatherify/
│   │   ├── config/             # Spotify API config and CORS setup
│   │   ├── controller/         # REST controllers (auth, weather, playlist)
│   │   ├── service/            # Service logic for Spotify and weather APIs
│   │   ├── util/               # Weather-to-genre mapping logic
│   │   └── WeatherPlaylistApplication.java # Main application entry
│   ├── src/main/resources/
│   │   ├── static/             # Contains built frontend files
│   │   ├── application.properties  # API keys and configuration
│   │   └── genres_dict.json        # Genre mapping data
│   └── pom.xml                 # Maven build configuration
│
├── .gitignore
├── pom.xml                     # Optional: parent POM for multi-module setup
└── README.md
```

---

## Prerequisites

Install the following tools before running the app:

* Node.js and npm: [https://nodejs.org](https://nodejs.org)
* Java 21 or higher: [https://adoptium.net/](https://adoptium.net/)
* Maven: [https://maven.apache.org](https://maven.apache.org)

Verify installation with:

```bash
node -v
npm -v
java -version
mvn -v
```

---

## Running the Application

### 1. Backend (Spring Boot)

```bash
cd weatherifyBack
mvn spring-boot:run
```

The backend will run at: `http://localhost:8080`

### 2. Frontend (React + Vite)

```bash
cd weatherifyFront
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## API Keys Setup

### File: `weatherifyBack/src/main/resources/application.properties`

```properties
# Server Port
server.port=8080

# Spotify API Credentials
spotify.client.id=your_client_id
spotify.client.secret=your_client_secret
spotify.redirect.uri=http://localhost:8080/api/v1/auth/spotify/callback

# WeatherAPI Key
weatherapi.key=your_weatherapi_key

# Frontend base URL
app.frontend.base-url=http://localhost:8080
```

**Note:** Do not commit real secrets. Use `application.properties.example` for safe sharing.

### Spotify Developer Dashboard

Make sure this redirect URI is listed:
```
http://localhost:8080/api/v1/auth/spotify/callback
```

---

## Building and Packaging as Single JAR

This method bundles frontend into the backend JAR:

### Step 1: Build Frontend

```bash
cd weatherifyFront
npm install
npm run build
```

### Step 2: Package Backend

```bash
cd ../weatherifyBack
mvn clean package
```

This generates a JAR in `weatherifyBack/target/`, e.g., `weatherify-backend-0.0.1-SNAPSHOT.jar`.

### Step 3: Run Full App

```bash
java -jar target/weatherify-backend-0.0.1-SNAPSHOT.jar
```

Then open: [http://localhost:8080](http://localhost:8080)

---

## Backend API Endpoints

* `GET /api/v1/auth/spotify/login` – Initiates Spotify login
* `GET /api/v1/auth/spotify/callback` – Handles OAuth callback
* `GET /api/v1/auth/spotify/status` – Checks user login status
* `POST /api/v1/auth/spotify/logout` – Logs the user out
* `POST /api/v1/playlist/generate` – Generates a playlist based on weather
* `GET /api/v1/weather/current` – Returns current weather info (zip or coordinates)

---

## Frontend Features

* Weather-based visual UI (sun, cloud, rain icons)
* Spotify login/logout functionality
* Geolocation and ZIP-based weather fetching
* Popups for user feedback (success, failure, etc.)
* "Generate Playlist" button to open Spotify

---

## Notes

* All API keys must be valid and correctly configured.
* Spotify session uses backend session management.
* The app maps weather conditions to Spotify genres for playlist generation.
