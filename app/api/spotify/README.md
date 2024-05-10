# Spotify Integration API

This project provides API routes to interact with Spotify playlists using Next.js 14 and the App Router. Below are the available endpoints and their functionalities.

## Routes Overview

### 1. Playlists Endpoint

- **Path**: `/api/spotify/playlists`
  - **GET**: Retrieve all playlists of the authenticated user.
  - **POST**: Create a new playlist.

### 2. Specific Playlist Endpoint

- **Path**: `/api/spotify/playlists/[playlistId]`
  - **GET**: Retrieve details of a specific playlist.
  - **POST**: Add tracks to a specified playlist.
  - **PUT**: Reorder tracks within a specified playlist.

## Detailed API Endpoints

### 1. Retrieve User's Playlists

- **Endpoint**: `/api/spotify/playlists`
- **Method**: `GET`
- **Description**: Fetches all playlists of the authenticated user.
- **Response**:
  - `200 OK`: List of playlists.
  - `401 Unauthorized`: If user is not authenticated.
  - `500 Internal Server Error`: On server error.

### 2. Create a New Playlist

- **Endpoint**: `/api/spotify/playlists`
- **Method**: `POST`
- **Description**: Creates a new playlist for the authenticated user.
- **Request Body**:
  - `name` (string): Name of the playlist.
  - `description` (string): Description of the playlist.
  - `public` (boolean): Visibility of the playlist.
- **Response**:
  - `201 Created`: Playlist created successfully.
  - `401 Unauthorized`: If user is not authenticated.
  - `500 Internal Server Error`: On server error.

### 3. Retrieve a Specific Playlist

- **Endpoint**: `/api/spotify/playlists/[playlistId]`
- **Method**: `GET`
- **Description**: Fetches details of a specific playlist.
- **Response**:
  - `200 OK`: Playlist details.
  - `401 Unauthorized`: If user is not authenticated.
  - `500 Internal Server Error`: On server error.

### 4. Add Tracks to a Playlist

- **Endpoint**: `/api/spotify/playlists/[playlistId]`
- **Method**: `POST`
- **Description**: Adds tracks to a specified playlist.
- **Request Body**:
  - `uris` (string[]): Array of track URIs to add.
- **Response**:
  - `201 Created`: Tracks added successfully.
  - `401 Unauthorized`: If user is not authenticated.
  - `500 Internal Server Error`: On server error.

### 5. Reorder Tracks in a Playlist

- **Endpoint**: `/api/spotify/playlists/[playlistId]`
- **Method**: `PUT`
- **Description**: Reorders tracks within a specified playlist.
- **Request Body**:
  - `range_start` (number): Starting position of tracks to move.
  - `insert_before` (number): Position to insert tracks before.
  - `range_length` (number): Number of tracks to move.
  - `snapshot_id` (string, optional): Snapshot ID for the playlist.
- **Response**:
  - `200 OK`: Tracks reordered successfully.
  - `401 Unauthorized`: If user is not authenticated.
  - `500 Internal Server Error`: On server error.
