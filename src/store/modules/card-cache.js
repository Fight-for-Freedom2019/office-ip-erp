import configData from '@/const/cardConfig'

const state = {
	config: configData,
	cache: {},//数据缓存存储集
	cacheMap: new Map(),
}

const getters = {
	cardMap (state) {
		return new Map(state.config);
	},
	cardCache (state) {
		return state.cache;
	},
	cardCacheMap (state) {
		return state.cacheMap;
	},
}

const mutations = {
	setCardCache (state, {type, value}) {
		state.cache = {[type]: value};
		// const map = new Map();
		// value.forEach(_=>{map.set(_.id, _)});
		// state.cacheMap.set(type, map);
	},
}

const actions = {
	initializeCardCache ({commit, rootState, state, getters}, {type, id, func, flag=false}) {
		//类型参数不存在 退出
		if(type == undefined && id == undefined) return;
		//该类型不在选择器配置地图中 退出
		const config = getters.cardMap.get(type);
		if(config == undefined) return;
		//该选择器数据已存在 执行回掉函数 退出(当FLAG为True时强制刷新)
		// const data = state.cache[type];
		// if(data != undefined && !flag) {
		// 	if(func) func(data);
		// 	return;
		// }
		//若存在请求地址 请求数据 执行回掉函数 并缓存数据
		const promise = new Promise((resolve)=>{
			 resolve();
		})
		return promise.then(()=>{
		    if(config.URL) {
		      const url = rootState.status ?`${config.URL.replace(/\/, '')}/${id}` : `${config.URL}/${id}`;
		      const params = config.PARAMS ? config.PARAMS : {};
		      const data_key = config.DATA_KEY ? config.DATA_KEY : 'data'; 
		      const success = _=>{
		        const value = _[data_key];
		        if(func) func(value);
		        commit('setCardCache',{type, value});
		      }
		      rootState.axios.get(url, {params})
						.then(response=>{
							const d = response.data;
							if(d.status){
								success(d);
							}else {
							}
						})
						.catch(error=>{console.log(error)});
		    }
		}); 		
        
	},

}

export default {
	state,
	getters,
	mutations,
	actions,
}