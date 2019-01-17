let url = "/actions";
const state = {
  data: undefined
};

const getters = {
  flownodeData: state => state.data
};

const mutations = {
  setFlownodes(state, d) {
    state.data = d;
  }
};

const actions = {
  refreshFlownodes({ commit, rootState, state }) {
    rootState.axios
      .get(url)
      .then(response => {
        const d = response.data;
        if (d.status) {
          commit("setFlownodes", d.data);
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
