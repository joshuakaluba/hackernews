
# Next.js Application

This repository contains a Next.js application configured for both development and production environments. Follow the instructions below to set up and run the application either locally or using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v18.x)
- npm (comes with Node.js)
- Docker (for running the application in a container)

## Running Locally

To run the application locally, follow these steps:

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://yourrepository.com/nextjs-app.git
cd nextjs-app
npm install
```

### Development

To start the application in development mode with hot reloading enabled:

```bash
npm run dev
```

This will start the Next.js server on `http://localhost:3000`. Open your browser and navigate to this address to view the application.

### Production

To build and run the application in production mode:

```bash
npm run build
npm start
```

## Running with Docker

The project includes a Dockerfile for building a containerized version of the application and a docker-compose.yml for easy orchestration.

### Building the Docker Image

To build the Docker image, run the following command in the project root:

```bash
docker-compose build
```

### Running the Docker Container

To start the application using Docker Compose:

```bash
docker-compose up
```

This will start the application in development mode by default. The application will be available on `http://localhost:3000`.

### Using Docker for Production

If you want to run the Docker container in production mode, you can modify the `command` in `docker-compose.yml` to use `npm start` instead of `npm run dev`. Alternatively, you can build and run the Docker image directly:

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

## Additional Information

For more details on working with Next.js, refer to the [official Next.js documentation](https://nextjs.org/docs)