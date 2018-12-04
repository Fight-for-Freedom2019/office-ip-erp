import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/const/axios'
import detail from '@/store/modules/common-detail.js'
import tags from '@/store/modules/tags.js'
import table from '@/store/modules/table-common.js'
import product from '@/store/modules/product.js'
import classification from '@/store/modules/classification.js'
import branch from '@/store/modules/branch.js'
import action from '@/store/modules/action.js'
import ipr from '@/store/modules/ipr.js'
import area from '@/store/modules/area.js'
import city from '@/store/modules/city.js'
import invoiceEntity from '@/store/modules/invoice-entity.js'
import userGroup from '@/store/modules/user-group.js'
import flows from '@/store/modules/flows.js'
import taskDef from '@/store/modules/task-def.js'
import currentUser from '@/store/modules/current-user.js'
import sysmesg from '@/store/modules/sysmesg.js'
import cache from '@/store/modules/cache.js'
import selectorCache from '@/store/modules/selector-cache.js'
import tool from '@/const/tool.js'
import filter from '@/store/modules/filter-cache.js'
import menuCache from '@/store/modules/menu-cache.js'
import taskDelay from '@/store/modules/delay.js'
import treeCache from '@/store/modules/tree-cache.js'
import cardCache from '@/store/modules/card-cache.js'
import processDetail from '@/store/modules/process-detail.js'
import estimateDetail from '@/store/modules/estimate-detail.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    dragId: null,
    axios,
    tool,
    status: 0, //这里进行地址代理控制, 为1时去掉/api, 为0时保留
    loading: false,
    loadingText: '',
    shrinkLoading: false,
    shrinkLoadingText: '',
    inner_height: 0,
    inner_width: 0,
    leftNavVisible: true,
    agencyLoadVisible: false,
    importLoading: false,
    hashMaps: '',
    bread_header_height: '',
  },
  modules: {
    action,
    area,
    branch,
    cache,
    cardCache,
    city,
    classification,
    currentUser,
    detail,
    filter,
    flows,
    invoiceEntity,
    ipr,
    menuCache,
    processDetail,
    product,
    selectorCache,
    sysmesg,
    table,
    tags,
    taskDef,
    taskDelay,
    treeCache,
    cardCache,
    processDetail,
    estimateDetail,
    userGroup,
  },
  getters: {
    getDragId: state=>state.dragId,
    loading: state=>state.loading,
    loadingText: state=>state.loadingText,
    shrinkLoading: state=>state.shrinkLoading,
    shrinkLoadingText: state=>state.shrinkLoadingText,
    windowHeight: state => state.inner_height, 
    windowWidth: state => state.inner_width,
    innerHeight: state => state.inner_height - 50,
    innerWidth: state => state.leftNavVisible ? state.inner_width - 200 : state.inner_width,
    shrinkHeight: state => state.inner_height - 132,
    getInnerWidth: state => state.leftNavVisible ? state.inner_width - 200 : state.inner_width, 
    leftVisible: state=>state.leftNavVisible,
    agencyLoadVisible: state=>state.agencyLoadVisible,
    importLoading: state=>state.importLoading,
    getHashMaps: state=>state.hashMaps,
    breadHeaderHeight: state=>state.bread_header_height,
  },
  mutations: {
    setDragId (state, id) {
      state.dragId = id;
    },
    toggleLeftVisible (state) {
      state.leftNavVisible = !state.leftNavVisible;
    },
    AXIOS_FAILURE () {
      alert('网络错误');
    },
    onLoading (state, text="加载中...") {
      state.loadingText = text;
      state.loading = true;
    },
    cancelLoading (state) {
      state.loading = false;
    },
    setInnerHeight (state, number) {
      state.inner_height = number;
    },
    setBreadHeaderHeight (state, number) {
      state.bread_header_height = number;
    },
    setInnerWidth (state, number) {
      state.inner_width = number;
    },
    setShrinkLoading(state, boolean) {
      state.shrinkLoading = boolean;
    },
    setShrinkLoadingText(state, text) {
      state.shrinkLoadingText = text;
    },
    setAgencyLoadVisible(state, boolean) {
      state.agencyLoadVisible = boolean;
    },
    showAgencyLoad(state) {
      state.agencyLoadVisible = true;
    },
    setImportLoading(state, boolean) {
      state.importLoading = boolean;
    },
    setHashMaps(state, d) {
      const obj = d.data;
      let phObj = {};
      const map = new Map();
      for(let key in obj) {
        const arr = [];
        const o = {};
        const value = obj[key];
        if(key == 'placeholder') {
          phObj = value;
        }
        if(key !== 'placeholder') {
          for (let index in value) {
              index = typeof index == 'string' && /^[0-9]+.?[0-9]*$/.test(index)? index-0: index;
              arr.push({id: index, name: value[index]});
          }
              o.options = arr;
        }
        for (let item in phObj) {
          if(key == item) {
            o.placeholder = phObj[item]
          }
        }
        if(key !== 'placeholder') {
           map.set(key, o);
        }
      }
      return state.hashMaps = map;
    },
  },
  actions: {
    onShrinkLoading({state, commit},text="加载中...") {
      commit('setShrinkLoadingText', text);
      commit('setShrinkLoading', true);
      // state.shrinkLoadingText = text;
      // state.shrinkLoading = true;
    },
    offShrinkLoading({state, commit}) {
      commit('setShrinkLoadingText', '');
      commit('setShrinkLoading', false);
      // state.shrinkLoadingText = '';
      // state.shrinkLoading = false;
    },
    initializeHashMapsCache ({state, commit}) {
      const url = '/hashmap';
      const params = {};
      const success= _=>{
        console.log(_)
        commit('setHashMaps', _);
      };
      axios.get(url, {params})
        .then(response=>{
          const d = response.data;
          if(d.status){
            success(d);
          }else {
            console.log(response);
          }
        })
        .catch(error=>{console.log(error)});
    }
  }
});

export default store;