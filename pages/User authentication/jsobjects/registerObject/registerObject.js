export default {

	async signUp () { 
		let supabase = supabase_service.supabaseProvider;
		let { data, error: errorSignUp } = await supabase.auth.signUp({
			email: registerEmail.text,
			password: registerPassword.text
		});

		if(data == null || data.user == null || errorSignUp != null) {
			showAlert("Lỗi đăng ký" + errorSignUp.message, "error")
			return;
		}

		const { data: user_profile,error: errorUserProfile } = await supabase
		.from('user_profiles')
		.insert([
			{ id: data.user.id, fullname: registerFullName.text, governmentid: registerGovernmentID.text },
		])
		.select()

		if(user_profile == null) {
			showAlert("Lỗi đăng ký, vui lòng thử lại sau. ", "error")
			return;
		}
		
		resetWidget("registerForm", true);
		showAlert("Đăng ký thành công", "success");
		storeValue("tab", "Đăng nhập")
	
	}

}