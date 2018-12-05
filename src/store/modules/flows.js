let url = '/flows?listRows=100000';
const state = {
	flows: undefined,
}

const getters = {
	flowsData: state => state.flows,
	flowOptions: state=>{
		return state.flows;
	}
}

const mutations = {
	setFlows (state, d) {
		state.flows = d;
	},
}

const actions = {
	refreshFlows ({commit, rootState, state},{type}={}) {		
		const params ={project_type: type};
		rootState.axios
			.get(url,{params})
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setFlows', d.data.data);	
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