export default {
	initPlaces() {
		storeValue("issuePlace", []);
	},
	addIssuePlace() {
		try{

			var currentAddress = !latLonToLocation?.data ? null: latLonToLocation.data?.results[0]?.address;
		} catch (err) {
			showAlert(err);
		}
		let currentPlaces = appsmith.store.issuePlace || [];
		let newPlaces = [...currentPlaces, {
			id: initObject.uuidv4(),
			place: currentAddress ? currentAddress : "Vị trí mặc định",
			radius: radiusInput.text,
			lat: appsmith.store.locationState.latitude,
			lon: appsmith.store.locationState.longitude
		}];
		radiusInput.setValue("");

		storeValue("issuePlace", newPlaces);
	},
	// updateCurrentPlace() {
	// 
	// }

}