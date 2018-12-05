let url = '/roles';
const state = {
	data: null,
	loading: false,
}

const getters = {
	groupOptions: state => {
		return state.data;
	},
	groupMap: state => {
		const map = new Map();

		if(state.data) {			
			for(let d of state.data) {
				map.set(d.id, d);
			}
		}

		return map;
	},
	groupLoading: state => state.loading,
}

const mutations = {
	setGroup (state, d) {
		state.data = d;
		// 升序
		const compare = (key) => {
			return (a, b)=>{
				return a[key]-b[key]
			}
		};
		return state.data.sort(compare('id'));
	},
	setGroupLoading (state, bool) {
		state.loading = bool;
	}
}

const actions = {
	refreshGroup ({state, commit, rootState, getters}, flag=false,callback) {
		if(!flag && state.data !== null) return false;
		const promise = rootState.axios.get(url);
		commit('setGroupLoading', true);
		promise.then(response=>{
			commit('setGroupLoading', false);
			const d = response.data;
			if(d.status){
				commit('setGroup', d.data.data);
				if(callback) {callback(d)};
			}else {
				console.log(d);
				// alert('请求用户组数据失败');
			}
		})
		.catch(error => {
			commit('setGroupLoading', false);
			console.log(error);
		});
		return promise;
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}