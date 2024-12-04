export default {
	places:  [{
		place: latLonToLocation?.data?.results[0]?.address || "",
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
		let currentPlaces = issueEventObject.places || [];
		let newPlaces = [...currentPlaces, {
			place: latLonToLocation?.data?.results[0]?.address,
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