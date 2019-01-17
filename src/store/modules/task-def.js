let url = '/definitions';
const state = {
	data: undefined,
}

const getters = {
	taskDefsData: state=>state.data,
}

const mutations = {
	setTaskDefs (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshTaskDefs ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/, '') : url;	
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setTaskDefs', d.data);
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