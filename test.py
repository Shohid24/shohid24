import requests

proxy_host = "192.168.199.155"
proxy_port = 1080

proxies = {
    "http": f"socks5://{proxy_host}:{proxy_port}",
    "https": f"socks5://{proxy_host}:{proxy_port}", #use socks5 for both http and https
}

try:
    response = requests.get("http://httpbin.org/ip", proxies=proxies, timeout=10) #added timeout
    response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
    print(response.json())

except requests.exceptions.ProxyError as e:
    print(f"Proxy error: {e}")
except requests.exceptions.RequestException as e:
    print(f"Request error: {e}")
except ValueError as e: #in case json() fails
    print(f"JSON decoding error: {e}")
except Exception as e: #catch all other errors
    print(f"An unexpected error occurred: {e}")