let url = '/flows';
const state = {
	flows: undefined,
}

const getters = {
	flowsData: state => state.flows,
}

const mutations = {
	setFlows (state, d) {
		state.flows = d;
	},
}

const actions = {
	refreshFlows ({commit, rootState, state}) {		
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setFlows', d.data);	
				}
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}