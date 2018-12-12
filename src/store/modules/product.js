import Vue from 'vue'
let url = '/products';
const state = {
	data: [],
}

const getMap = (data) => {
	const map = new Map();
	a(data);
	return map;

	function a(arr) {
		for(let d of arr) {
			map.set(d.id, d);
			if(d.children && d.children.length) {
				a(d.children);
			}
		}
	}
}

const setTreeData = (data, pId, res) => {
	console.log(data)
	const len = data.length;
	for (let i=0; i < len; i++) {
		const td = data[i];
		if(data[i].children == undefined) {
			Vue.set(data[i], 'children', []);
		}
		if(td.id === pId ) {
			if(Array.isArray(res)) {
				for(let item of res) {
					console.log(item)
					data[i].children.push(item.data);
				}
			}else {
				data[i].children.splice(len, 0, res);
			}
			break;
		}else {
			if(td.children && td.children.length != 0) {
				setTreeData(td.children, pId, res);
			}
		}
	}
}

const getters = {
	productData: state=>state.data,
	productMap: state=>{
		return getMap(state.data);
	},
	productOptions: (state, getters)=>{
		const map = getters.productMap;
		const arr = [...map.values()];

		return arr;
	}
}

const mutations = {
	setProduct (state, d) {
		state.data = d;
	},
	addproduct (state, {n,pd,cd}) {
		if (!pd.children) {
          Vue.set(pd, 'children', []);
        }
        // 数据有了但视图没有刷新，这里手动调用element底层方法强制刷新当前树子节点
      	pd.children.push(cd);
        const oldChildren = n.childNodes;
        oldChildren.splice(0,oldChildren.length);
        n.doCreateChildren(pd.children);
	},
	addFirstproduct (state, d) {
		state.data.push(d);
	},
	removeproduct (state, {n, d}) {
		console.log(n)
	  	const parent = n.parent;
        const children = parent.data.children || parent.data;
     	const index = children.findIndex(_ => _.id === d.id);
      	children.splice(index, 1);   
	},
	updateproduct (state, {d, res}) {
		console.log(d)
		return d.name = res;
	},	
}

const actions = {
	refreshProduct ({commit, rootState},{success} = {}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setProduct', d.Products);
					if (success) {success(d)};
				}else {
					// alert('请求产品分类数据失败');
				}
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}