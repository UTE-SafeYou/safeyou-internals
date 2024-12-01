export default {
	loginButtononClick () {
		let response = login_user?.data;

		if(response) {
			let {data:{user, session}, user_profile} = response;

			// Store access_token to appsmith, storage
			let access_token = session.access_token;

			storeValue("access_token", access_token, true);
			storeValue("user_profile", user_profile, true);
			
		}
	}
}