let url = '/fields?listOnly=1&listRows=1000000';
const state = {
	data: undefined,
}

const getters = {
	fieldData: state=>state.data,
	fieldOptions: state=>{
		return state.data;
	}
}

const mutations = {
	setField (state, d) {
		state.data = d;
	}
}

const fields = {

	refreshField ({commit, rootState, state}) {
		const params = { listRows:"10000" };

		if(state.data === undefined) {
			commit('setField', []);
		}

		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setField', d.data.data);
				}else {
					// alert('请求Field数据失败');
				}
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	fields,
}