let url = '/actions?listOnly=1&listRows=1000000';
const state = {
	data: undefined,
}

const getters = {
	actionData: state=>state.data,
	actionOptions: state=>{
		return state.data;
	}
}

const mutations = {
	setAction (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshAction ({commit, rootState, state}) {
		const params = { listRows:"10000" };

		if(state.data === undefined) {
			commit('setAction', []);
		}

		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setAction', d.data.data);
				}else {
					// alert('请求Action数据失败');
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