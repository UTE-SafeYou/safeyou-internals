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
		const supabase = supabase_service.supabaseProvider();

		const { data:initIssueData, error } = await supabase
		.from('issue_event')
		.select()

		storeValue("issueEvents", initIssueData);
	},
	async initRealtimeConnection () {
		// Get init data
		const supabase = supabase_service.supabaseProvider();

		const { data } = await supabase.rpc('get_places_with_lat_lon')
		console.log(data);

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