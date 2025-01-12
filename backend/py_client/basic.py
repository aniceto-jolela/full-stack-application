import requests

# endpoint = "https://httpbin.org/status/200"
endpoint = "http://localhost:8000/auth-api/"

get_response = requests.post(endpoint, json={"title": "Hello world."})

print(get_response.json())
#print(get_response.status_code)