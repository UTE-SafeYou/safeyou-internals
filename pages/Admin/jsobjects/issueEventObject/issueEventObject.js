export default {
	places:  [{
		place: !latLonToLocation ? "" : latLonToLocation.data.results[0].address,
		radius: radiusInput.text || "",
		lat: appsmith.store.locationState.latitude || "",
		lon: appsmith.store.locationState.longitude || ""
	}],
	updateRadius(event) {
		showAlert(event)
	},
	getPlaces() {
		return  []
	},
	initPlaces() {
		issueEventObject.places =  []
	},
	addIssuePlace() {
		try{

			var currentAddress = !latLonToLocation?.data ? null: latLonToLocation.data?.results[0]?.address;
		} catch (err) {
			showAlert(err);
		}
		let currentPlaces = issueEventObject.places || [];
		let newPlaces = [...currentPlaces, {
			place: currentAddress ? currentAddress : "Vị trí mặc định",
			radius: radiusInput.text,
			lat: appsmith.store.locationState.latitude,
			lon: appsmith.store.locationState.longitude
		}];
		radiusInput.setValue("");

		issueEventObject.places = newPlaces;
	},
	updateCurrentPlace() {

	}

}