const getHourShort = (time, ampm) => {
    return time.split(':')[0] + ampm;
}
const getIconUrl = (hour, icon) => {
    let tod = +hour > 6 && +hour < 18 ? 'day' : 'night';
    return `images/${tod}/${icon}.png`;
}

export class Forecast {
    constructor(data, hours) {
        this.hourly = data.slice(0, hours).map((h) => {
            return {
                hour: getHourShort(h.FCTTIME.civil, h.FCTTIME.ampm),
                icon: getIconUrl(h.FCTTIME.hour, h.icon),
                temp: h.temp.english
            }
        });
    }
}