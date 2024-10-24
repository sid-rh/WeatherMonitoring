# Weather Monitoring System

This is a weather monitoring system that processes real-time weather data, aggregates, and summarizes it with various endpoints for retrieving current, summary, historical data, and alerts. The system consists of a **Backend** powered by **Node.js** and **Express.js**, and a **Frontend** built using **React**.

## High Level Design Diagram

![High Level Diagram](https://github.com/sid-rh/WeatherMonitoring/blob/main/RuleEngine.drawio.png)

## Backend Setup

To get started with the backend, follow the steps below:

### 1. Install Dependencies

In the `/Backend` directory, run the following command to install all required libraries:

```bash
npm install
```

### 2. Environment Variables

Set up the following environment variables in your `.env` file:

#### Email Configuration

- `RECEIVER_MAIL_ID`: Email address to receive weather alerts.
- `SENDER_MAIL_ID`: Email address to send weather alerts from.
- `APP_PASSWORD`: Google App password for the sender email.

#### MongoDB Configuration

- `MONGO_URL`: Your MongoDB connection string.

#### OpenWeatherMap Configuration

- `OPENWEATHER_API_KEY`: API key for OpenWeatherMap.

#### Port Configuration

- `PORT`: Port number on which the backend server will run.

---

### 3. Run the Backend Server

Use the following command to start the backend server:

```bash
nodemon app
```

### 4. API Endpoints

The following API endpoints are available for retrieving weather data:

- **GET** `/current`: Retrieve current weather data.
- **GET** `/summary`: Retrieve weather summary.
- **GET** `/api/summary/:city`: Retrieve summary for a specific city.
- **GET** `/api/historical/:city`: Retrieve historical weather data for a city.
- **GET** `/api/alerts/:city`: Retrieve weather alerts for a city.

## Frontend Setup

### 1. Install Dependencies

In the `/weather-visualization` directory, run the following command to install all required libraries:

```bash
npm install
```

### 2. Environment Variables

Add the following environment variable in your `.env` file:
- `REACT_APP_BASE_URL`: Set this to the base URL of your backend server, e.g.,`http://localhost:<Backend port number>`.

### 3. Initialize Tailwind

Run the following command to initialize tailwind:
```bash
npx tailwindcss init -p
```


### 3. Run the Frontend

Use the following command to start the frontend application:

```bash
npm start
```


