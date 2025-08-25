# Weather App 🌤️

A simple, beginner-friendly weather application built with Flask that displays current weather information for any city using the OpenWeatherMap API.

## Features

- 🌍 Search weather for any city worldwide
- 🌡️ Display temperature in Celsius
- 📋 Show weather description and icon
- 📊 Additional details: feels like, humidity, pressure, wind speed
- 🎨 Clean, responsive design

## Prerequisites

- Python 3.10 or higher
- A free OpenWeatherMap API key

## Quick Start

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key

### 2. Setup the Project

```bash
# Clone or download the project
cd WeatherApp

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
# Replace 'your_api_key_here' with your actual OpenWeatherMap API key
```

Your `.env` file should look like:
```
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
# Start the Flask development server
flask --app app run --debug

# Or alternatively:
python app.py
```

### 5. Open in Browser

Navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/) in your web browser.

## How to Use

1. Enter a city name in the search box (e.g., "London", "Tokyo", "New York")
2. Click "Get Weather" or press Enter
3. View the current weather information including:
   - Current temperature
   - Weather description and icon
   - "Feels like" temperature
   - Humidity percentage
   - Atmospheric pressure
   - Wind speed

## Project Structure

```
WeatherApp/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
├── .env              # Your environment variables (create this)
├── README.md         # This file
├── templates/
│   └── index.html    # HTML template
└── static/
    └── styles.css    # CSS styling
```

## Troubleshooting

### Common Issues

**"Access to 127.0.0.1 was denied"**
- This means the Flask app isn't running yet
- Make sure you're in the correct directory: `cd WeatherApp`
- Start the app with: `python3 app.py`
- You should see output like: `* Running on http://127.0.0.1:5000`

**"can't open file 'app.py': No such file or directory"**
- You're in the wrong directory! This is the most common beginner mistake
- Check your current directory: `pwd`
- You should be in `/path/to/WeatherApp/` (the main WeatherApp folder)
- Navigate to the correct directory: `cd WeatherApp`
- Verify files are there: `ls` (you should see `app.py`, `templates/`, `static/`, etc.)

**"Weather service not configured"**
- This is actually good! It means your app is running correctly
- You just need to add your API key to the `.env` file
- Copy the template: `cp .env.example .env`
- Edit `.env` and replace `your_api_key_here` with your actual OpenWeatherMap API key

**"Request timed out"**
- Check your internet connection
- The API might be temporarily unavailable

**"Permission denied" errors**
- Ensure your virtual environment is activated
- Check file permissions in the project directory

## License

This project is open source and available for educational purposes.

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Python requests library](https://docs.python-requests.org/)
- [Jinja2 Template Documentation](https://jinja.palletsprojects.com/)

---
