export default {

	async signUp () { 
		try {
			let user_profile = await register_user.run();

			if(user_profile == null) {
				throw new Error("Lỗi đăng ký, vui lòng thử lại sau. ")
				return;
			}
			resetWidget("registerForm", true);
			showAlert("Đăng ký thành công", "success");
			storeValue("tab", "Đăng nhập")

		} catch (err) {
			showAlert("Lỗi đăng ký, vui lòng thử lại.", "error");
		}



	}

}