export default {
	init () {
		// Check if user is already exist
		let access_token = appsmith.store.access_token;

		validate_access_token.run().then(response => {
			const {payload} = response;
			if(payload.user_role == "admin") {
				navigateTo("Admin");
			}  else {
				navigateTo("User");
			}
		}).catch(error =>{ 
		})

	}
}