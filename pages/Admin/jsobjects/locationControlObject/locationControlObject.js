export default {
	getLocationButtononClick () {
		appsmith.geolocation.getCurrentPosition((location)=>{
			storeValue("locationState", {
				latitude:location.coords.latitude,
				longitude:location.coords.longitude,
				_session: initObject.uuidv4()
			})

		})
	},
	updateLocationState(lat, lon) {
		storeValue("locationState", {
			latitude:lat,
			longitude: lon,
			_session: initObject.uuidv4()
		})
	},
	updateRadius() {
	}
}