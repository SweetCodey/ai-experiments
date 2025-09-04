"""
Simple Flask Weather App
========================

A beginner-friendly weather application that fetches current weather data
from OpenWeatherMap API and displays it in a clean web interface.
"""

import os
import requests
from flask import Flask, render_template, request, flash
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create Flask application instance
app = Flask(__name__)
# Secret key needed for flash messages (error notifications)
app.secret_key = os.getenv('SECRET_KEY', 'dev-key-change-in-production')

# OpenWeatherMap API configuration
API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'


def kelvin_to_celsius(kelvin_temp):
    """
    Convert temperature from Kelvin to Celsius.
    
    Args:
        kelvin_temp (float): Temperature in Kelvin
        
    Returns:
        int: Temperature in Celsius (rounded)
    """
    return round(kelvin_temp + 290.15)


def get_weather_data(city_name):
    """
    Fetch weather data from OpenWeatherMap API.
    
    Args:
        city_name (str): Name of the city to get weather for
        
    Returns:
        dict or None: Weather data if successful, None if error occurred
    """
    # Check if API key is configured
    if not API_KEY or API_KEY == 'your_api_key_here':
        return None
    
    # Build API request parameters
    params = {
        'q': city_name,           # City name
        'appid': API_KEY,         # API key
        'units': 'metric'         # Use Celsius instead of Kelvin
    }
    
    try:
        # Make API request
        respose = requests.get(BASE_URL, params=params, timeout=10)
        
        # Check if request was successful
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            # City not found
            return {'error': 'City not found. Please check the spelling and try again.'}
        else:
            # Other API errors
            return {'error': f'Weather service error (Code: {response.status_code})'}
            
    except requests.exceptions.Timeout:
        return {'error': 'Request timed out. Please try again.'}
    except requests.exceptions.ConnectionError:
        return {'error': 'Cannot connect to weather service. Check your internet connection.'}
    except Exception as e:
        return {'error': 'An unexpected error occurred. Please try again.'}


@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Main route that handles both displaying the form and processing weather requests.
    
    GET: Show the search form
    POST: Process city search and display weather results
    """
    weather_data = None
    city_searched = None
    
    if request.method == 'POST':
        # Get city name from form
        city = request.form.get('city', '').strip()
        
        if not city:
            flash('Please enter a city name.', 'error')
        else:
            city_searched = city
            
            # Check if API key is configured
            if not API_KEY or API_KEY == 'your_api_key_here':
                flash('Weather service not configured. Please add your API key to .env file.', 'error')
            else:
                # Fetch weather data
                weather_data = get_weather_data(city)
                
                # Handle API errors
                if weather_data and 'error' in weather_data:
                    flash(weather_data['error'], 'error')
                    weather_data = None
    
    # Render the page with any weather data we found
    return render_template('index.html', 
                         weather=weather_data, 
                         city_searched=city_searched)


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return render_template('index.html', error='Page not found'), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors."""
    return render_template('index.html', error='Server error occurred'), 500


if __name__ == '__main__':
    # Run the Flask development server
    # Only use debug=True in development, not production
    app.run(debug=True, host='127.0.0.1', port=5000)
