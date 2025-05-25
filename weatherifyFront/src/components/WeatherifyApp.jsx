import React, { useState, useEffect } from "react";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconPerson,
  IconUpload,
} from "../icons";
import "../styles/weatherify.css";

const BACKEND_URL = "http://127.0.0.1:8080";

export default function WeatherifyApp() {
  const [zip, setZip] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [cityName, setCityName] = useState("");

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const fetchAndSetWeather = async () => {
    try {
      let url;
      if (zip) {
        url = `${BACKEND_URL}/api/v1/weather/current?zip=${zip}`;
      } else {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        url = `${BACKEND_URL}/api/v1/weather/current?lat=${latitude}&lon=${longitude}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
      const { city, icon } = await response.json();
      setCityName(city);
      setWeatherIcon(icon);
    } catch (err) {
      console.error("Failed to fetch weather data", err);
      triggerPopup("Could not retrieve weather.");
    }
  };

  // Fetch weather immediately (so icons show up), independent of login
  useEffect(() => {
    fetchAndSetWeather();
  }, []);

  // Check login status and handle one-time flags
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get("login_success");
    const loginError = params.get("login_error");

    const checkLoginStatus = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/spotify/status`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.loggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (loginSuccess === "true") {
      setIsLoggedIn(true);
      setIsLoading(false);
      triggerPopup("Login successful!");
      fetchAndSetWeather();

      params.delete("login_success");
      params.set("login", "true");
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

    } else if (loginError) {
      setIsLoggedIn(false);
      setIsLoading(false);
      triggerPopup(`Login failed: ${loginError}`);
      params.delete("login_error");
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

    } else {
      checkLoginStatus();
    }
  }, []);

  // Keep 'login' param in sync with isLoggedIn
  useEffect(() => {
    if (!isLoading) {
      const params = new URLSearchParams(window.location.search);
      if (isLoggedIn) params.set("login", "true");
      else params.delete("login");
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    }
  }, [isLoggedIn, isLoading]);

  const handleLoginClick = () =>
    (window.location.href = `${BACKEND_URL}/api/v1/auth/spotify/login`);

  const handleGenerateClick = async () => {
    if (!weatherIcon) {
      triggerPopup("Weather data not ready yet—please try again.");
      return;
    }
    triggerPopup("Generating playlist…");
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/playlist/generate`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        triggerPopup("Playlist created! Opening in Spotify…");
        window.open(data.playlistUrl, "_blank");
      } else {
        triggerPopup(data.error || "Failed to create playlist.");
      }
    } catch (err) {
      console.error("Error generating playlist:", err);
      triggerPopup("An error occurred while generating the playlist.");
    }
  };

  const handleLogoutClick = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/spotify/logout`, {
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        triggerPopup("Successfully logged out.");
      } else {
        triggerPopup("Logout failed.");
      }
    } catch {
      triggerPopup("An error occurred during logout.");
    }
  };

  // Show loading until login status is known
  if (isLoading) {
    return (
      <div
        className="weatherify-container"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <p style={{ fontSize: 24, color: "#333" }}>Loading…</p>
      </div>
    );
  }

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}

      <div className="weatherify-container">
        {isLoggedIn && (
          <div className="zip-input-container" style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={zip}
              placeholder="Enter ZIP code"
              onChange={(e) => setZip(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchAndSetWeather()}
              style={{ padding: "0.3rem", fontSize: "0.9rem", marginRight: "0.5rem" }}
            />
            <button
              type="button"
              onClick={fetchAndSetWeather}
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem" }}
            >
              Set Location
            </button>
          </div>
        )}

        <div className="weather-buttons">
          <button type="button" aria-label="Sunny weather" className="weather-icon-button" disabled={weatherIcon !== "sunny"}>
            <IconSun size="48" />
          </button>
          <button type="button" aria-label="Cloudy weather" className="weather-icon-button" disabled={weatherIcon !== "cloudy"}>
            <IconCloud size="48" />
          </button>
          <button type="button" aria-label="Rainy weather" className="weather-icon-button" disabled={weatherIcon !== "rainy"}>
            <IconCloudRain size="48" />
          </button>
        </div>

        <div className="weatherify-card">
          <h1 className="weatherify-title">Weatherify</h1>
          <p className="weatherify-subtitle">
            Generate a playlist based on weather{cityName ? ` in ${cityName}` : ""}
          </p>
          <div className="login-button-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {!isLoggedIn ? (
              <button type="button" className="login-button" onClick={handleLoginClick}>
                <IconPerson size="24" /> Login
              </button>
            ) : (
              <>
                <button type="button" className="generate-button" onClick={handleGenerateClick}>
                  <IconUpload size="24" /> Generate
                </button>
                <button type="button" className="logout-button" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
