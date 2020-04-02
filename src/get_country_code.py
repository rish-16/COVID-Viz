from utils import Geocoder, Tempest

tp = Tempest()
gc = Geocoder()

```
'Sweden', 'Panama', 'China ', 'Switzerland', 'Chile', 'Norway', 'Colombia', 'Iceland', 'Brazil', 'Cambodia', 'Georgia', 'Iran', 'Thailand', 'Saudi Arabia', 'Pakistan', 'China', 'United Kingdom', 'Luxembourg', 'Iran ', 'Spain', 'Nepal', 'India', 'Portugal', 
'Ireland', 'Netherlands', 'Malaysia', 'Congo', 'Germany', 'Poland', 'Senegal', 'Czech Republic', 'Taiwan', 'Slovakia', 'Lithuania', 'Canada', 'Hong Kong', 'Indonesia', 'Mexico', 'South Korea', 'Turkey', 'USA', 'Belgium', 'New Zealand', 'France', 'Australia', 'England', 'Algeria', 'Kuwait', 'Vietnam', 'Ecuador', 'Russia', 'Singapore', 'Japan', 'Peru', 'Denmark', 'Finland', 'Nigeria', 'South Africa', 'Philippines', ' Malaysia', 
'South Korea ', 'Hungary', 'Italy'
```

data = tp.get_json_records("../data/JSON/corona2020_2561gens.json")['data']

