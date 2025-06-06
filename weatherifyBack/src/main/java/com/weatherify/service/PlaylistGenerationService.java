/*
package com.weatherify.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.playlists.AddItemsToPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.CreatePlaylistRequest;
import se.michaelthelin.spotify.requests.data.search.SearchItemRequest;

import java.util.*;

@Service
public class PlaylistGenerationService {

    private final SpotifyApi spotifyApi;

    @Autowired
    public PlaylistGenerationService(SpotifyApi spotifyApi) {
        this.spotifyApi = spotifyApi;
    }

    private static final Map<String, List<String>> WEATHER_GENRES = Map.of(
            "sunny", List.of("pop", "dance", "indie", "summer"),
            "cloudy", List.of("lo-fi", "chill", "alternative"),
            "rainy", List.of("acoustic", "ambient", "jazz", "blues")
    );

    public String generateWeatherPlaylist(String weather, HttpSession session) throws Exception {
        String accessToken = (String) session.getAttribute(SpotifyAuthService.SPOTIFY_ACCESS_TOKEN_KEY);
        String userId = (String) session.getAttribute(SpotifyAuthService.SPOTIFY_USER_ID_KEY);

        System.out.println("Access Token Recieved " + accessToken);
        System.out.println("User ID Recieved " + userId);
        
        
        if (accessToken == null || userId == null) {
            throw new IllegalStateException("User not authenticated with Spotify.");
        }

        // Use user-specific API instance
        SpotifyApi userSpotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        List<String> genres = WEATHER_GENRES.getOrDefault(weather.toLowerCase(), List.of("pop"));
        Set<String> trackUris = new HashSet<>();

        for (String genre : genres) {
            SearchItemRequest searchRequest = userSpotifyApi.searchItem(genre, "track")
                    .limit(10)
                    .build();

            Track[] tracks = searchRequest.execute().getTracks().getItems();
            for (Track track : tracks) {
                if (trackUris.size() < 30) {
                    trackUris.add(track.getUri());
                }
            }
        }

        // Create playlist
        String playlistName = "Weatherify - " + weather.substring(0, 1).toUpperCase() + weather.substring(1);
        CreatePlaylistRequest createRequest = userSpotifyApi
                .createPlaylist(userId, playlistName)
                .public_(true)
                .description("A playlist for " + weather + " weather generated by Weatherify.")
                .build();

        Playlist playlist = createRequest.execute();

        // Add tracks
        AddItemsToPlaylistRequest addRequest = userSpotifyApi
                .addItemsToPlaylist(playlist.getId(), trackUris.toArray(new String[0]))
                .build();

        addRequest.execute();

        return playlist.getExternalUrls().get("spotify");
    }
}
*/