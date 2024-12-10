export default {
	startAutoRefresh() {
		if (rfUsers.isSwitchedOn) {
			setInterval(() => get_all_users.run(), 5000, "autorefresh");
		} else {
			clearInterval("autorefresh");
		}
	}
}