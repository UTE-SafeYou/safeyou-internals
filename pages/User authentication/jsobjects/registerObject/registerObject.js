export default {

	async signUp () { 
		let user_profile = register_user.run();

		if(user_profile == null) {
			showAlert("Lỗi đăng ký, vui lòng thử lại sau. ", "error")
			return;
		}

		resetWidget("registerForm", true);
		showAlert("Đăng ký thành công", "success");
		storeValue("tab", "Đăng nhập")

	}

}