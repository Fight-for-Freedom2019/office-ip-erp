let url = "/table_views";
const state = {
  data: []
};

const getters = {
  viewOptions: state => state.data
};

const mutations = {
  setViews(state, d) {
    state.data = d;
  }
};

const actions = {
  refreshView({ state, commit, rootState }, { page }) {
    rootState.axios
      .get(url, { params: { page } })
      .then(response => {
        const d = response.data;
        if (d.status) {
          commit("setViews", d.data.data);
        } else {
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
