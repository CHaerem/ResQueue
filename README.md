# ResQueue

## About

ResQueue is a web-based app that brings the jukebox experience to modern bars and social venues. It allows patrons to request songs to be played by paying a small fee. This ensures that the music atmosphere in the venue is truly crowd-sourced and engaging. Additionally, we are introducing a bidding system for users who want their song choice to have priority in the queue.

The app is currently under development and not yet available for public use.

## Technologies

- **Frontend and Backend**: Next.js
- **Payment Processing**: Vipps
- **Music Streaming**: Spotify API
- **Deployment**: Vercel
- **UI**: Next UI component library
- **Database**: PostgreSQL (Vercel PostgreSQL)
- **Real-time Data Handling**: Firestore

## Features

- User-friendly song request system
- Real-time updating of the song queue
- Bidding functionality to prioritize song choice
- Revenue-sharing model with venue owners
- **Spotify Authentication** for secure user accounts
- Venue-specific queues

## Vercel Commands

- **Deploy**: `vercel`
- **Deploy to Production**: `vercel --prod`
- **Link to Vercel Project**: `vercel link`
- **Pull Environment Variables**: `vercel env pull .env.development.local`

## Setup Scripts

- **Create Local Database**:

  1. Pull the PostgreSQL Docker image:
     ```
     docker pull postgres
     ```
  2. Run the PostgreSQL container:
     ```
     docker run -d --name resqueue_db -e POSTGRES_USER=resqueue_admin -e POSTGRES_PASSWORD=DEV_DB_PASSWORD -e POSTGRES_DB=resqueue_dev -p 5432:5432 postgres
     ```

- **Local SSL Setup**:
  1. Run the SSL setup script to generate a self-signed SSL certificate:
     ```
     chmod +x generate-ssl.sh
     ./generate-ssl.sh
     ```

## To-Do List

### Core Features

- [ ] Implement the song request and queuing system using Firestore for real-time updates, which will involve:
  - Storing song information and queue data in Firestore
  - Associating queue entries with confirmed payments and the admin user's details in the main database
- [ ] Expand the database schema to handle Vipps payment confirmations and related user data
- [ ] Enable real-time updates to the song queue through Firestore integration
- [ ] Add payment integration using Vipps, including processing payment confirmations and linking them to user accounts
- [ ] Implement the bidding functionality to allow users to prioritize their song choice
- [ ] Create user profiles and dashboard for managing queues and payments
- [ ] Finalize revenue-sharing logic with venue owners
- [x] Integrate with Spotify and enable admin users to connect their Spotify accounts

### Additional Features

- [ ] Optimize for mobile devices
- [ ] Introduce social features like song upvoting
- [ ] Integrate with the venue's own playlist/sound system

### Miscellaneous

- [x] Basic Next.js project deployed with Vercel
- [x] ~~Basic Google authentication (in test mode)~~ Replaced with Spotify Authentication
- [x] Registered domain (ResQueue.no)
