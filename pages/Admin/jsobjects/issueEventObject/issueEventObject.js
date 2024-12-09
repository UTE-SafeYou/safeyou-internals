export default {
	initPlaces() {
		storeValue("issuePlace", []);
	},
	async composeIssueEventDetail(e) {
		// Toj 
		let issue_event_id = e.id || null;
		if(issue_event_id) {
			await get_issue_events_and_places.run({
				issue_event_id:issue_event_id 
			});
			storeValue("showDetail", true);
			issueDetail_placeTable.setData(get_issue_events_and_places.data);
		} else {
			showAlert("Lỗi khi mở chi tiết", "error");
		}


	}, 
	async updateIssueEvent() {
		let {id, ...newIssueEvent} = issueTable.updatedRow;
		await update_issue_events.run({
			id: id,
			newIssueEvent: newIssueEvent
		});


	},
	async deleteIssueEvent() {

	},
	clearForm() {
		resetWidget("issueType");
		resetWidget("issueTitle");
		resetWidget("issueDescription");
	},
	formValidate() {
		return issueTitle.text.length > 0 && issueDescription.text.length > 0 && issueType.selectedOptionLabel != null;
	},
	async createIssueEvent() {

		if(!issueEventObject.formValidate()) {
			showAlert("Vui lòng điền đầy đủ thông tin", "error");
			return;
		}
		// Create places 
		// Chuyển sang đơn vị vật lý là mét
		let issuePlaces = appsmith.store.issuePlace;
		let submitIssuePlaces = issuePlaces.map(
			item => ({
				radius: item.radius * 1000, // meter
				lattitude: item.lat,
				longitude: item.lon,
				"location": {"type": "Point", "coordinates": [item.lat, item.lon]},
				place_type: issueType.selectedOptionLabel,
				additional_info: {place: item.place, title: issueTitle.text, description: issueDescription.text}
			})
		);


		try {

			await insert_places.run({
				places: submitIssuePlaces
			});

			let place_ids = insert_places.data;

			showAlert("Thiết lập địa điểm", "success");
			await insert_issue_event_with_places.run({
				title: issueTitle.text,
				place_ids: place_ids,
				label: issueType.selectedOptionLabel,
				description: issueDescription.text
			})
			let newIssue = insert_issue_event_with_places.data;
			showAlert("Thiết lập cảnh báo", "success");

			// Trigger cho webhook về issueId
			let issue_link = 'https://olp-asm.huuloc.id.vn/app/safeyou-internals/admin-67543a23fd51167a0308d7b8/edit/jsObjects/67543a23fd51167a0308d7ec?branch=feat%252Fblog';
			// Trigger notification system

			await send_issue_automation.run({
				title: issueTitle.text,
				body: `
					<h1>${issueTitle.text}</h1>
					<br/>
					<p>${issueDescription.text}</p>
					<br/>
					Cập nhật thời gian thực cho tình huống này: <a href={${issue_link}}>Tổng hợp thông tin cho tình huống này</a>
				`,
				users: receiver_table.tableData,
				notification_type: "Emergency"
			});
			showAlert("Hoàn tất", "success");
			closeModal(importIssueEvent.name);

			// Clear form
			issueEventObject.clearForm();


		} catch (error) {
			showAlert(error.message +  " Thiết lập thất bại", "error");
			return;
		}

	},
	savePlaceTable: () => {
		let data = appsmith.store.issuePlace;
		let newRow = placeTable.updatedRow;
		let newData = data.map(item => {
			if(item.id == newRow.id) {
				item = newRow;
			}
			return item;
		})
		storeValue("issuePlace", newData);	
	},
	updateWizardStep: async () => {
		if(issueEventTabs.selectedTab ==="3. Tổng hợp") {
			let currentPlaces = appsmith.store.issuePlace;
			let queryPlaces = currentPlaces.map(item=>{
				return {
					longitude: item.lon, 
					latitude: item.lat,
					radius: item.radius * 1000
				}
			})
			await get_user_in_places.run({
				places: queryPlaces
			});
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