const keys = new Map([
  ["patent", "patent"],
  ["copyright", "Copyright"],
  ["trademark", "trademark"]
]);

const state = {
  id: "",
  type: "",
  true_type: "",
  data: null,
  loading: false
};

const getters = {
  title: state => state.data ? state.data.title : "",
  detail_serial: state => state.data ? state.data.serial : "",
  detailId: state => state.id,
  detail_type: state => state.type,
  detail_customer: state => {
    const obj = {};
    if(state.data && state.data.customer) {
      obj.id = state.data.customer.id; 
      obj.name = state.data.customer.name;
      return obj 
    }else {
      return obj;
    }
  },
  detailBase: state => state.data ? state.data : {},
  detailBasePatent: state => {
    if (state.true_type == "patent") {
      return state.data;
    } else {
      return null;
    }
  },
  detailBaseCopyright: state => {
    if (state.true_type == "copyright") {
      return state.data;
    } else {
      return null;
    }
  },
  detailBaseTrademark: state => {
    if (state.true_type == "trademark") {
      return state.data;
    } else {
      return null;
    }
  },
  detailProcesses: state => (state.data ? state.data.process : []),
  detailNotices: state => (state.data ? state.data.notices : []),
  detailFees: state => (state.data ? state.data.fees : {}),
  detailMails: state =>
    state.data && state.data.mails ? state.data.mails : [],
  detailDocuments: state => (state.data ? state.data.projectFiles : []),
  detailGroup: state =>
    state.data && state.data.group ? state.data.group : [],
  detailFamily: state =>
    state.data && state.data.family ? state.data.family : [],
  detailDefence: state =>
    state.data && state.data.responses ? state.data.responses : [],
  detailQuote: state =>
    state.data && state.data.quote ? state.data.quote : null,
  detailReview: state =>
    state.data && state.data.reviews ? state.data.reviews : [],
  detailRevenue: state =>
    state.data && state.data.fees.revenue ? state.data.fees.revenue : "",
  detailCost: state =>
    state.data && state.data.fees.cost ? state.data.fees.cost : "",
  detailRenewal: state =>
    state.data && state.data.fees.renewal ? state.data.fees.renewal : "",
  detailAmendments: state =>
    state.data && state.data.amendments ? state.data.amendments : [],
  detailReminders: state =>
    state.data && state.data.reminders ? state.data.reminders : [],
  detailJudge: state =>
    state.data && state.data.judge ? state.data.judge : [],
  detailLoading: state => state.loading,
  detailAgencies: state =>
    state.data && state.data.agencies ? state.data.agencies : []
};

const mutations = {
  setDetailType: (state, path) => {
    const arr = ["patent", "trademark", "copyright"];
    for (let a of arr) {
      const reg = new RegExp(a);
      if (reg.test(path)) {
        state.type = a;
        break;
      }
    }
  },
  setDetailData: (state, data) => {
    state.data = data;
  },
  setLoading(state, boolean) {
    state.loading = boolean;
  },
  setId(state, id) {
    state.id = id;
  },
  refreshTrueType(state) {
    state.true_type = state.type;
  }
};

const actions = {
  refreshDetailData(
    { commit, state, rootState },
    { id, func, type, error, next } = {}
  ) {
    if (type) {
      commit("setDetailType", type);
    } else {
      type = state.type;
    }
    if (id) {
      commit("setId", id);
    } else {
      id = state.id;
    }
    if (!id || !type) return;
    let url = `/${state.type}s`;
    url = rootState.status ? url : url;
    commit("setLoading", true);
    const n = rootState.axios.get(`${url}/${id}`);
    n.then(response => {
      if (func) func();

      const d = response.data;
      if (d.status) {
        commit("setDetailData", JSON.parse(JSON.stringify(d[state.type])));
      } else {
        // commit('setDetailData', null);
        if (error) error(response);
        // alert(d.info);
      }
      commit("setLoading", false);
      commit("refreshTrueType");
    }).catch(err => {
      if (error) error(err);
      if (func) func();
      commit("setDetailData", null);
      commit("setLoading", false);
      console.log(err);
    });

    if (next) {
      next(n);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
