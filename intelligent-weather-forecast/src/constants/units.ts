export const units = {
    "temperature": {
        "metric": "°C",
        "imperial": "°F",
        "standard": "K"
    },
    "humidity": {
        "metric": "%",
        "imperial": "%",
        "standard": "%"
    },
    "pressure": {
        "metric": "hPa",
        "imperial": "inHg",
        "standard": "hPa"
    },
    "sunrise": {
        "metric": "hh:mm",
        "imperial": "hh:mm",
        "standard": "hh:mm"
    },
    "sunset": {
        "metric": "hh:mm",
        "imperial": "hh:mm",
        "standard": "hh:mm"
    },
    "wind": {
        "metric": "m/s",
        "imperial": "mph",
        "standard": "m/s"
    },
    "visibility": {
        "metric": "km",
        "imperial": "miles",
        "standard": "km"
    }
}

export type Units = typeof units;

