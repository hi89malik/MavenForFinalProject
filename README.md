WeatherifyA full-stack application that generates Spotify playlists based on current weather conditions using React (frontend) and Spring Boot (backend).OverviewThis project is composed of two main components:weatherifyFront: The frontend built with React.weatherifyBack: The backend built using Java and Spring Boot.This README focuses on setting up and running the project locally by building the frontend and packaging it into the Spring Boot application, which is then run as a single executable JAR.Project StructureWeatherifyFinalProjectSubmission/
├── weatherifyFront/            # React frontend
│   ├── public/                 # Public assets
│   └── src/
│       ├── components/         # Contains WeatherifyApp.js (main UI logic)
│       ├── icons/              # Icon components
│       ├── primitives/         # Reusable UI primitives (Button, IconButton)
│       ├── styles/             # Custom CSS
│       └── index.jsx           # Frontend entry point
│   └── package.json            # Frontend dependencies and scripts (akin to pom.xml for frontend)
│
├── weatherifyBack/             # Spring Boot backend
│   ├── src/main/java/com/weatherify/
│   │   ├── config/             # SpotifyApi bean configuration, WebConfig (CORS)
│   │   ├── controller/         # REST API controllers (AuthController, WeatherController, etc.)
│   │   ├── service/            # Business logic (SpotifyAuthService, WeatherService, etc.)
│   │   ├── util/               # Utility classes (e.g., weather-to-genre mapping)
│   │   └── WeatherPlaylistApplication.java # Spring Boot main application class
│   └── src/main/resources/
│       ├── static/             # Built frontend files will be copied here by Maven
│       ├── application.properties  # Configuration (API keys, server settings)
│       └── genres_dict.json        # Data for weather-to-genre mapping
│   └── pom.xml                 # Backend Maven project configuration
│
└── .gitignore                  # Specifies intentionally untracked files that Git should ignore
└── pom.xml                     # Parent Maven POM file (if this is a multi-module root)
└── README.md                   # This file
Key configuration files include:Frontend: weatherifyFront/package.json (defines dependencies and scripts)Backend: weatherifyBack/pom.xml (Maven project configuration)Backend: weatherifyBack/src/main/resources/application.properties (application settings, API keys)PrerequisitesInstall the following tools before running the app locally:Node.js and npm: (LTS version recommended)Download: https://nodejs.orgVerify: node -v and npm -vJava Development Kit (JDK):Version: Java 21 or higher (as specified in weatherifyBack/pom.xml)Download: e.g., Oracle JDK, OpenJDK (Adoptium Temurin), Amazon Corretto.Verify: java -versionApache Maven:Download: https://maven.apache.orgVerify: mvn -vLocal Development Setup1. API Keys & Backend ConfigurationThe backend requires API keys and specific settings for local development.File: weatherifyBack/src/main/resources/application.propertiesRecommendation: If your repository is public or shared, it's best practice to not commit your actual application.properties file if it contains secrets. Instead, commit a template like application.properties.example and add application.properties to your .gitignore file. Developers would then copy the example and fill in their actual keys.Create or update application.properties with the following (replace placeholders with your actual keys and ensure URIs are correct for local setup):# Server Port
server.port=8080

# Spotify API Credentials
spotify.client.id=YOUR_SPOTIFY_CLIENT_ID
spotify.client.secret=YOUR_SPOTIFY_CLIENT_SECRET
# For local development, when backend runs on 8080 and serves the frontend
spotify.redirect.uri=http://localhost:8080/api/v1/auth/spotify/callback 

# WeatherAPI.com Key
weatherapi.key=YOUR_WEATHERAPI_KEY

# Frontend base URL for redirects from AuthController
# This should point to where Spring Boot serves the application
app.frontend.base-url=http://localhost:8080 

# Optional: For local HTTP development, you might not need forward-header strategies
# server.forward-headers-strategy=NONE
2. Spotify Developer Dashboard SetupGo to your Spotify Developer Dashboard.Select your application.Under "Settings" -> "Redirect URIs", ensure that the URI specified in your local application.properties for spotify.redirect.uri is added and saved. For the example above, this would be:http://localhost:8080/api/v1/auth/spotify/callback3. Frontend Configuration for this Run ModeFile: weatherifyFront/src/components/WeatherifyApp.jsx (or your main React app component file)For the setup where Spring Boot serves the built frontend files, the BACKEND_URL should be an empty string, making API calls relative to the current origin:// Inside WeatherifyApp.jsx
const BACKEND_URL = ""; // For when Spring Boot serves the frontend
Running the Application Locally (Packaged Mode)This method involves building the frontend, then packaging it with the Spring Boot backend into a single executable JAR, and then running that JAR.1. Build the Frontend (React):* Open a terminal.* Navigate to your frontend directory:bash cd path/to/WeatherifyFinalProjectSubmission/weatherifyFront * Install dependencies (if you haven't already or they've changed):bash npm install * Create a production build of the frontend:bash npm run build This will generate optimized static files in the weatherifyFront/dist/ directory.2. Package the Backend (Spring Boot), including Frontend:* Open a terminal (or use the same one).* Navigate to your backend directory:bash cd path/to/WeatherifyFinalProjectSubmission/weatherifyBack * Clean and package the application using Maven. This will compile the Java code and, thanks to the maven-resources-plugin configuration in your pom.xml (ensure it's set to run during process-resources or prepare-package phase), copy the contents of weatherifyFront/dist/ into the backend's static resources.bash mvn clean package * This will create an executable JAR file in the weatherifyBack/target/ directory (e.g., weatherify-backend-0.0.1-SNAPSHOT.jar).3. Run the Packaged Application:* Still in the weatherifyBack directory, run the JAR file:bash java -jar target/weatherify-backend-0.0.1-SNAPSHOT.jar (Adjust the JAR filename if it's different based on your pom.xml version or artifactId).* The application (both backend and frontend) should now be accessible at http://localhost:8080.* Check the console for Spring Boot startup logs and any errors.Backend API EndpointsGET /api/v1/auth/spotify/login – Initiates Spotify loginGET /api/v1/auth/spotify/callback – Handles OAuth callback from SpotifyGET /api/v1/auth/spotify/status – Checks current user's Spotify login statusPOST /api/v1/auth/spotify/logout – Logs the user out from the backend Spotify sessionPOST /api/v1/playlist/generate – Generates a playlist based on the current weather contextGET /api/v1/weather/current – Returns current weather information (can take zip or lat & lon query params)Frontend FeaturesWeather-based visual UI (sun, cloud, rain icons reflect current conditions).Spotify login/logout functionality.Location-based weather fetching (using browser geolocation or ZIP code input).User feedback popups for actions like login success/failure, playlist generation."Generate Playlist" button to create and open a Spotify playlist.NotesEnsure all API keys and redirect URIs are correctly set up for your chosen environment (local vs. deployed).The backend uses session-based authentication for Spotify.The application logic maps weather conditions to specific music genres to tailor playlist generation.
