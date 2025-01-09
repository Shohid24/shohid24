from dataclasses import dataclass
import httpx

url = "https://redjuly.live/"

ses = httpx.Client(base_url=url, timeout=10)

@dataclass
class Paths:
    shohid: str = "shohid/shohid_list_page"
    injured: str = "https://redjuly.live/injured/injured_list_page/"
    primaryShohid = "primary_list/shohid"
    primaryInjured = "primary_list/injured"
    
