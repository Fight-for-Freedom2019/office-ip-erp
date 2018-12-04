const URL = '/renewal_confirmation_sheets'
const state = {
	id:'',
	data: null,
	loading: false,
}

const getters = {
  estimateId: state=>state.id,
  estimateDetail: state=>state.data ? state.data : {},
  renewalFeeList: state => state.renewalFeeList ? state.renewalFeeList : [],
  renewalOfficialFee: state => state.renewalOfficialFee ? state.renewalOfficialFee : [],
  renewalAgentFee: state => state.renewalAgentFee ? state.renewalAgentFee : [],
  renewalMail: state => state.renewalMail ? state.renewalMail : [],
}

const mutations = {
	setEstimateDetailData: (state, data)=>{ state.data = data},
	setEstimateLoading(state, boolean) { state.loading = boolean },
	setEstimateId(state, id) { state.id = id },
}

const actions = {
	refreshEstimateDetail({ commit, state, rootState }, {id, func, error, next}={}) {
		if(id) {
			commit('setEstimateId', id);
		}else {
			id = state.id;
		}
    if(!id) return;
		const url = rootState.status ? URL.replace(/\/api/, '') : URL;
    commit('setEstimateLoading', true);
    const n = rootState.axios.get(`${url}/${id}`)
    n
    .then(response=>{
      if(func) func();    
      
      const d = response.data.data;
      if( d.status ) {
        commit('setEstimateDetailData', d);
      }else {
      	if(error) error(response);
      }
      commit('setEstimateLoading', false);
    })
    .catch(err=>{
    	if(error) error(err);
      if(func) func();
      commit('setEstimateDetailData', null);
      commit('setEstimateLoading', false);
      console.log(err);
    });

    if(next) {
    	next (n);
    }
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}