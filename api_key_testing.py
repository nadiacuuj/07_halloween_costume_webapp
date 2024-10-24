import requests
import os

# First OpenWeatherMap API key (primary)
api_key1 = "5606cd65d4c7b4bc118199c7abd79bf2"
url1 = f"https://api.openweathermap.org/data/2.5/weather?q=London&appid={api_key1}&units=metric"

# Second OpenWeatherMap API key (backup)
api_key2 = "3aa6bdaf75be0a2e869639c326ad1a9e"
url2 = f"https://api.openweathermap.org/data/2.5/weather?q=London&appid={api_key2}&units=metric"


# Unsplash API key
unsplash_key = "ZhZAKhwnYnYGPGDToQjhyZxuznYt0aUnfjjTWBFKLYU"
unsplash_query = "nature"
url3 = f"https://api.unsplash.com/search/photos?query={unsplash_query}&client_id={unsplash_key}"

def check_api_key(url, key_name):
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            print(f"{key_name} is active!")
        elif response.status_code == 401:
            print(f"{key_name} failed: Invalid API key.")
        else:
            print(f"{key_name} failed: Error {response.status_code} - {response.json().get('message')}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred with {key_name}: {e}")

# Check OpenWeatherMap API keys
check_api_key(url1, "Primary OpenWeatherMap API Key")
check_api_key(url2, "Backup OpenWeatherMap API Key")

# Check Unsplash API key
check_api_key(url3, "Unsplash API Key")
