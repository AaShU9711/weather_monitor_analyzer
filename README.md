# Real-Time Weather Monitoring System

This project is a real-time data processing system for monitoring weather conditions in major Indian metros. It provides summarized insights using rollups and aggregates, utilizing data from the OpenWeatherMap API.

## Features

- Real-time weather data retrieval for 6 Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad)
- Daily weather summaries with average, maximum, and minimum temperatures
- Dominant weather condition calculation
- Configurable alerting system for temperature thresholds and specific weather conditions
- Visualizations for daily weather summaries and historical trends

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Build for Production

To build the application for production, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Design Choices

- **React with TypeScript**: Chosen for its strong typing system, which helps catch errors early and improves code quality.
- **Vite**: Used as the build tool for its fast development server and optimized production builds.
- **Tailwind CSS**: Utilized for rapid UI development with utility-first CSS.
- **Chart.js and react-chartjs-2**: Employed for creating interactive and responsive charts for weather data visualization.
- **Axios**: Used for making HTTP requests to the OpenWeatherMap API.
- **date-fns**: Chosen for its lightweight and modular approach to date manipulation and formatting.

## Project Structure

- `src/components`: React components for different parts of the UI
- `src/services`: Services for API calls and data processing
- `src/types`: TypeScript type definitions
- `src/config`: Configuration files, including city data

## Testing

To run the test suite:

```
npm test
```

## Future Improvements

- Implement user authentication and personalized settings
- Add more detailed weather forecasts
- Integrate with additional weather data sources for improved accuracy
- Implement server-side rendering for improved SEO and initial load performance
- Add support for more cities and customizable locations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.