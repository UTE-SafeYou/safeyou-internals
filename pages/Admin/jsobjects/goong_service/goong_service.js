export default {
	goongInt() {
		goongjs.accessToken = "mQn3EXqA6N5UrnTUr72TgItlg0yzPHxavSEmK2JE"
	}, 
	async reverseGeocoder() {
		await Geocoding.run({
			lat: issueLocationPicker.model.locationState.latitude,
			lon: issueLocationPicker.model.locationState.longitude
		});
	}
}