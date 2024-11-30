export default {
	verifyEmail: () => {
		let params = appsmith.URL.queryParams;
		console.log(params)
		let token = params["verify-token"]
		if(token) {
			// call verify token edge function
			Text1.setText(token);

			// if okay, show success and button to app

			// other wise, show error. And button to app
		}
		showAlert(JSON.stringify(params))
	}
}