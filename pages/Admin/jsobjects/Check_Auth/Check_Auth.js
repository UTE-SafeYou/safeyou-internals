export default {
	checkAuth: () => {
		const {isJwtExpired} = jwt_check_expiration;
		const token = appsmith.store.access_token;
		const check = token && !isJwtExpired(token);
		if (!check) {
			showAlert('Vui lòng đăng nhập lại!', 'error');
			navigateTo("Login");
		}
	}
}