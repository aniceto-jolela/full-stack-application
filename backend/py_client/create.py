import requests

endpoint = "http://localhost:8000/auth-api/create/"

data = {
    "username": "user5",
    "email": "user4@gmail.com",
    "password": "zxcvbnm."
}

get_response = requests.post(endpoint, json=data)
print(get_response.json())