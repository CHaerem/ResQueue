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
- **Database**: PostgreSQL (Vercel Postgres)

## Features

- User-friendly song request system
- Real-time updating of the song queue
- Bidding functionality to prioritize song choice
- Revenue-sharing model with venue owners
- Google Authentication for secure user accounts
- Venue-specific queues

## Vercel Commands

- **Deploy**: `vercel`
- **Deploy to Production**: `vercel --prod`
- **Link to Vercel Project**: `vercel link`
- **Pull Environment Variables**: `vercel env pull .env.development.local`

## Setup Scripts

- **Create Local Database**: Run the script located at `scripts/create_local_db.sh`

## To-Do List

### Core Features

- [ ] Set up a database to store song requests, queues, and user data
- [ ] Implement the song request and queuing system
- [ ] Enable real-time updates to the song queue
- [ ] Add payment integration using Vipps
- [ ] Implement the bidding functionality
- [ ] Create user profiles and dashboard
- [ ] Finalize revenue-sharing logic
- [ ] Integrate with Spotify and enable admin users to connect their Spotify accounts

### Additional Features

- [ ] Optimize for mobile devices
- [ ] Introduce social features like song upvoting
- [ ] Integrate with the venue's own playlist/sound system

### Miscellaneous

- [x] Basic Next.js project deployed with Vercel
- [x] Basic Google authentication (in test mode)
- [x] Registered domain (ResQueue.no)
