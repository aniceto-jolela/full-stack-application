import requests

endpoint = "http://localhost:8000/auth-api/users/2/"

get_response = requests.get(endpoint)
print(get_response.json())