# review-service

This is a small project that demonstrates a backend service for a book review website.
The reviewers are the primary users of the website and can create, update, view and delete their profiles.

The project uses Typescript, Express.js and MongoDB and consists of crud apis and analytic apis.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/AlgoDame/review-service.git
cd review-service
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
Create a `.env` file in the root directory and add the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/review-service
NODE_ENV=development
```

4. Build the project
```bash
npm run build
```

5. Seed the database
```bash
npx ts-node src/database/seeder.ts
```
This will populate your database with sample reviewers data for testing.

### Running the Application

For development (with hot reload):
```bash
npm run start-dev
```

For production:
```bash
npm start
```

The server will start running at `http://localhost:3000` (or the PORT you specified in your .env file).

## API Endpoints

The service exposes the following endpoints:

### Reviewer Management APIs
- `POST /api/v1/reviewers/register` - Register a new reviewer
- `PUT /api/v1/reviewers/:reviewerId/update` - Update an existing reviewer's details
- `DELETE /api/v1/reviewers/:reviewerId/delete` - Delete a reviewer's profile
- `GET /api/v1/reviewers/:reviewerId/details` - Get details of a specific reviewer
- `GET /api/v1/reviewers/list` - Get a list of all reviewers

### Analytics APIs
- `GET /api/v1/reviewers/top-languages` - Get statistics of top primary languages among reviewers
- `GET /api/v1/reviewers/top-genres` - Get statistics of most preferred genres among reviewers
