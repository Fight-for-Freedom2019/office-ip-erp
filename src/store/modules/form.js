let url = '/forms?listOnly=1&listRows=1000000';
const state = {
	data: undefined,
}

const getters = {
	formData: state=>state.data,
	formOptions: state=>{
		return state.data;
	}
}

const mutations = {
	setForm (state, d) {
		state.data = d;
	}
}

const forms = {

	refreshForm ({commit, rootState, state}) {
		const params = { listRows:"10000" };

		if(state.data === undefined) {
			commit('setForm', []);
		}

		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setForm', d.data.data);
				}else {
					// alert('请求Form数据失败');
				}
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	forms,
}