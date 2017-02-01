const getIconUrl = (icon) => {
    let hour = new Date().getHours();
    let tod = +hour > 6 && +hour < 18 ? 'day' : 'night';
    return `images/${tod}/${icon}.png`;
}

export class WeatherConditions {
    constructor(data) {
        this.location = data['display_location'].full;
        this.temp = Math.round(data['temp_f']);
        this.weather = data.weather;
        this.icon = getIconUrl(data.icon);
    }
}