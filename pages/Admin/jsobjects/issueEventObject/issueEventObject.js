export default {
	initPlaces() {
		storeValue("issuePlace", []);
	},
	async createIssueEvent() {
		// Create places 
		showAlert(JSON.stringify(appsmith.store.issuePlaces));
		insert_places.run(
		)
	},
	updateWizardStep() {
		if(issueEventTabs.selectedTab ==="3. Tổng hợp") {
			get_user_in_places.run();
		}
	},
	deleteIssuePlace(row_id) {
		// do save
		let  currentPlace = appsmith.store.issuePlace;
		let newIssuePlaces = currentPlace.filter(item => item.id != row_id);
		storeValue("issuePlace", newIssuePlaces)

	},
	updateIssuePlace(id, radius) {
		let  currentPlace = appsmith.store.issuePlace;
		let newIssuePlaces = currentPlace.map(item => {
			if(item.id === id) {
				item.radius = radius;
			}
			return item;
		});
		storeValue("issuePlace", newIssuePlaces)

	},
	addIssuePlace() {
		try{

			// Check if it's already in our table

			var currentAddress = !Geocoding?.data ? null: Geocoding.data?.results[0]?.address;
		} catch (err) {
			showAlert(err);
		}
		let currentPlaces = appsmith.store.issuePlace || [];
		let existEntry = currentPlaces.find(item => item.place == currentAddress);

		if(existEntry) {
			issueEventObject.updateIssuePlace(existEntry.id, radiusInput.text);
			return;
		}

		let newPlaces = [...currentPlaces, {
			id: initObject.uuidv4(),
			place: !(currentAddress) ? "Vị trí mặc định " : currentAddress,
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