export default {
	startAutoRefresh() {
		if (rfReport.isSwitchedOn) {
			setInterval(() => get_reports.run(), 5000, "autorefresh");
		} else {
			clearInterval("autorefresh");
		}
	}
}