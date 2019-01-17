let url = "/processes";
const state = {
  data: undefined
};

const getters = {
  processData: state => state.data,
  tasksDetail: state => (state.data && state.data.task ? state.data.task : {})
};

const mutations = {
  setProcessDetail(state, d) {
    state.data = d;
  }
};

const actions = {
  refreshProcessDetail({ commit, rootState, state }, { id } = {}) {
    const URL = rootState.status ? `${url}/${id}` : `${url}/${id}`;
    rootState.axios
      .get(URL)
      .then(response => {
        const d = response.data;
        if (d.status) {
          commit("setProcessDetail", d.process);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
