import { map as setting} from '@/const/filterConfig'

const state = {
  shortcut: [],
  shortcutVisible: false,
  custom: [],
  view: [],
  type: '',
  lock: false
}

const getters = {
  screen: state => state.shortcut, //快捷筛选项
  screenVisible: state => state.shortcutVisible, //快捷筛选项面板显示控制
  screenLabel: state => { //快捷筛选项显示
    return state.shortcut.map((v, i) => ({
      type: 'screen',
      label: `${v['name']}：${v['items'].map(item=>item.label).join("、")}`,
      index: i,
    }));
  },
  screenControl: state => { //已选关键字映射
    const screen = state.shortcut;
    const map = new Map();

    for (let a of screen) {
      if (a['key']) {
        map.set(a['key'], true);
      }
    }
    return map;
  },
  screenValue: state => { //快捷筛选项请求参数值
    const screen = state.shortcut;
    const form = {};

    screen.forEach(item => {
      form[item['key']] = item['items'][0]['value'];
    });


    return form;
  },
  listFilter: state => state.custom, //自定义筛选项
  listFilterLabel: state => { //自定义筛选项显示
    // console.log('---------listFilterLabel---------');
    const data = state.custom.map((v, i) => ({
      type: 'listFilter',
      label: `${v['name']}：${v['label']}`,
      cnLabel: v['label'],
      value: v['value'],
      key: v['key'],
      index: i,
    }));
    return data;
  },
  listFilterValue: (state, getters, rootState) => { //自定义筛选项请求参数值
    const listFilter = state.custom;
    let arr = [];
    listFilter.forEach(item => {
      let form = {};
      let value = item['value'];
      if (Array.isArray(value)) {
        // if (value.length == 2 && (value[0] instanceof Date || value[1] instanceof Date)) {
        //   value = value.map(v => rootState.tool.getDate(v)).join('|');
        // } else {
        //   value = value.join(',');
        // }
        const checkNumber = value.every(v=> typeof(v) === 'number');//判断是否是number类型
        if (value.length == 2 && !checkNumber && (rootState.tool.checkDate(value[0]) || rootState.tool.checkDate(value[1]))) {
          value = value.join('|');
        }else {
          value = value.join(',');
        }
      }
      if (item.hasOwnProperty('extraOption')) {
        form = item['extraOption'];
      }
      form[item['key']] = value;
      arr.push(form);
    })
    return {
      query: arr
    };
  },
  viewFilter: state => state.view,
  filterLock: state => state.lock, //刷新数据锁,在watch函数中使用(TableComponent)
  navLabel: (state, getters) => { //合并显示
    // console.log('---------navlabel---------');
    return [...getters.screenLabel, ...getters.listFilterLabel];
  },
  filterForm: (stata, getters) => { //合并上传参数
    // console.log('---------filterForm---------')
    const form = Object.assign({}, getters.screenValue, getters.listFilterValue);
    return form;
  },
  filterSetting: state => { //自定义筛选配置项
    const data = setting.get(state.type);
    return data ? data : [];
  },
  filterSettingMap: (state, getters) => { //自定义筛选配置项映射
    const map = new Map();
    getters.filterSetting.forEach(v => {
      map.set(v.id, v);
    })
    return map;
  }

}

const mutations = {
  setFilterType(state, type) {
    state.type = type;
  },
  setScreenVisible(state, val) {
    state.shortcutVisible = val;
  },
  addScreen(state, item) {
    state.shortcut = [...state.shortcut, item];
  },
  removeScreen(state, index) {
    state.shortcut.splice(index, 1);
  },
  setListFilter(state, data) {
    state.custom = data;
  },
  addListFilter(state, item) {
    if (Array.isArray(item)) {
      state.custom = [...state.custom, ...item];
    } else {
      state.custom = [...state.custom, item];
    }
  },
  editListFilter(state, {index,item}) {
    state.custom.splice(index, 1, item);
  },
  fillListFilter(state, obj) {
    let arr = [...state.custom]
    // 尝试删除空项
    console.log(arr)
    arr = arr.filter(item => obj[item.key] !== false)
    // 对于添加编辑分类处理
    const map = new Map()
    arr.forEach((item, index) => {
      map.set(item.key, index)
    })
    for (let key in obj) {
      const item = obj[key]
      if (item !== false) {
        const index = map.get(item.key)
        if (index === undefined) {
          arr.push(item)
        } else {
          arr[index] = item
        }
      }
    }
    state.custom = arr
  },
  fillViewFilter(state, obj) {
    let arr = [...state.view]
    // 尝试删除空项
    // arr = arr.filter(item => obj[item.key] !== false)
    // 对于添加编辑分类处理
    const map = new Map()
    arr.forEach((item, index) => {
      map.set(item.key, index)
    })
    for (let key in obj) {
      const item = obj[key]
      if (item !== false) {
        const index = map.get(item.key)
        if (index === undefined) {
          arr.push(item)
        } else {
          arr[index] = item
        }
      }
    }
    state.view = arr
  },
  removeListFilter(state, index) {
    state.custom.splice(index, 1);
  },
  removeViewFilter(state, index) {
    state.view.splice(index, 1);
  },
  setFilterLock(state, bool) {
    state.lock = bool;
  },
  clearFilter(state) {
    state.shortcut = [];
    state.custom = [];
  },
  clearViewFilter(state) {
    state.view = [];
  },
}

const actions = {
  setFilterType({commit}, type = '') {
    if (typeof type != 'string' && !type) return;
    commit('setFilterType', type);
  },
  //清空筛选项
  //flag用于控制清空筛选项时,是否刷新列表(默认不刷新)
  clearFilter({commit,state}, flag = false) {
    // console.log('---------clearFilter---------');
    if (!flag) {
      commit('setFilterLock', true);
    }

    commit('clearFilter');

    if (state.lock) {
      window.setTimeout(() => {
        commit('setFilterLock', false);
      }, 0);
    }
  },
  clearViewFilter({commit}) {
    commit('clearViewFilter');
  },
  //设置快捷筛选面板是否显示
  setScreenVisible({commit}, item) {
    if (typeof item != 'boolean') return;
    commit('setScreenVisible', item);
  },
  //添加快捷筛选项
  addScreen({commit}, item) {
    if (!item) return;
    commit('addScreen', item);
  },
  //移除快捷筛选项
  removeScreen({commit}, index) {
    if (typeof index != 'number') return;
    commit('removeScreen', index);
  },
  removeViewFilter({commit}, index) {
    if (typeof index != 'number') return;
    commit('removeViewFilter', index);
  },
  setListFilter({commit}, data) {
    // console.log('--------setListFilter-------')
    if (!Array.isArray(data)) return;
    commit('setListFilter', data);
  },
  // 添加列表筛选项
  addListFilter({rootState, commit}, item) {
    if (!item) return;
    console.log('--------willaddListFilter-------------');
    commit('addListFilter', item);
    // console.log('---------------------------didaddListFilter-------------------');
  },
  // 移除列表筛选项
  removeListFilter({commit}, key) {
    if (key === undefined) return;
    let index = '';
    if (typeof key == 'string') {
      state.custom.forEach((v, i) => {
        if (v.key == key) {
          index = i;
        }
      })
    } else if (typeof key == 'number') {
      index = key;
    }
    if (index === '') return;
    commit('removeListFilter', index);
  },
  // 填充列表筛选项
  fillListFilter({commit}, obj) {
    commit('fillListFilter', obj)
  },
  fillViewFilter({commit}, obj) {
    commit('fillViewFilter', obj);
  },
  // 编辑列表筛选项
  editListFilter({state, commit}, {key,item} = {}) {
    if (!key || !item) return;

    let index = '';
    if (typeof key == 'string') {
      state.custom.forEach((v, i) => {
        if (v.key == key) {
          index = i;
        }
      })
    } else if (typeof key == 'number') {
      index = key;
    }
    if (index === '') return;

    commit('editListFilter', {
      index,
      item
    });
  },
  //关闭筛选标签
  closeTag({state, commit, dispatch}, item) {
    if (item.type == 'screen') {
      dispatch('removeScreen', item.index);
    } else if (item.type == 'listFilter') {
      // 下面的逻辑为了解决高级筛选和表头及快速筛选出现关闭冲突
      if (window.listFilter != null && window.listFilter.usedFlag) {
        const usedFormKey = window.listFilter.usedForm[item['key']];
        if (usedFormKey && usedFormKey instanceof Array) {
          if (usedFormKey.length != 0 || usedFormKey[0] || usedFormKey[1]) {
            window.listFilter.clearUsedFormField(item['key'])
          }
        }else{
          window.listFilter.clearUsedFormField(item['key'])
        } 
        
      }
      let fun = window.listHeaderFilter.get(item.key);
      fun ? fun.clearRenderHeaderField(item['key']) : "";
      dispatch('removeListFilter', item.index);
    } else if (item === "all") {
      if (state.custom.length !== 0) {
        state.custom.forEach((i) => {
          let fun = window.listHeaderFilter.get(i.key);
          fun ? fun.clearRenderHeaderField(i['key']) : ""
        })
      }
      commit("clearFilter")

    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
