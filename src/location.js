// Set Nashville to Default Location
const defaultLat = 36.174465
const defaultLng = -86.767960;

export class Location {
    get hasGeoLocation() {
        return (!!navigator && 
                !!navigator.geolocation && 
                !!navigator.geolocation.getCurrentPosition);
    }

    getCoords(onSuccess, onError) {
        if (this.hasGeoLocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.lat = pos.coords.latitude;
                this.lng = pos.coords.longitude;
                onSuccess({ lat: this.lat, lng: this.lng });
            }, (err) => {
                onError(err);
            });
        } else {
            console.warn('Geolocation not found. Using default values');
            this.lat = defaultLat;
            this.lng = defaultLng;
            onSuccess({ lat: this.lat, lng: this.lng });
        }
    }
}