export default {
	async initData() {
		const supabase = supabase_service.supabaseProvider();

		const { data:initIssueData, error } = await supabase
		.from('issue_event')
		.select()

		storeValue("issueEvents", initIssueData);
	},
	initRealtimeConnection () {
		// Get init data
		const supabase = supabase_service.supabaseProvider();
		// Create a function to handle inserts
		const handleInserts = (payload) => {
			let currentIssueEvents = appsmith.store.issueEvents;
			currentIssueEvents.push(payload.new);
		}

		// Listen to inserts
		supabase
			.channel('issue_event')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'issue_event' }, handleInserts)
			.subscribe()
	}
}