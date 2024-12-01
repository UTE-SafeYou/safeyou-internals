export default {
	logoutButtonClick () {
		//	write code here
		let old_profile = appsmith.store.user_profile;
		removeValue("access_token");
		removeValue("user_profile");
		
		navigateTo("User authentication")
	}
}