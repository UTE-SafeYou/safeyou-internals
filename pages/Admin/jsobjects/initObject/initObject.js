export default {

	uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
			.replace(/[xy]/g, function (c) {
			const r = Math.random() * 16 | 0, 
						v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	async initData() {
		storeValue("showDetail", false);
		const supabase = supabase_service.supabaseProvider();

		const { data:initIssueData, error } = await supabase
		.from('issue_event')
		.select()

		storeValue("issueEvents", initIssueData);
	},
	async initRealtimeConnection () {

		const supabase = supabase_service.supabaseProvider();

		// Create a function to handle inserts
		const handleInserts = async (payload) => {
			await get_issue_events.run();
			issueTable.setData(get_issue_events.data);
		}

		// Listen to inserts
		supabase
			.channel('issue_event')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'issue_event' }, handleInserts)
			.subscribe()



	}
}