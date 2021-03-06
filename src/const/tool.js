export default {
	deepCopy (obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	shallowCopy (obj, {date, array, skip} = {}) {
		
		const data = {};
		if( date === undefined ) date = false;
		if( array === undefined ) array = false;
		if( skip === undefined ) skip = [];

		for(let k in obj) {
      const d = obj[k];
      if(date && d instanceof Date) {
        data[k] = this.getDate(d);
      }else if(array && d instanceof Array) {
      	data[k] = d.join(',');
      }else if(skip.length != 0 && skip.indexOf(k) >= 0) {
      	continue;
      }else {
        data[k] = d;
      }
    }

    return data;
	},
	/**
	* 正向过滤对象
	*@param { Object } obj { Array } stay
	*@return { Object } data 
	*/
	normalFilter (obj,{stay} = {}) {
		const data = {};
		if(stay === undefined ) stay = [];
		for (let k in obj) {
			const d = obj[k];
			if(stay.length != 0 && obj.hasOwnProperty(k) && stay.indexOf(k) >= 0) {
				data[k] = d;
			}else{
				continue;
			}
		}
		return data;
	},
	clearObj (obj) {
		for(let key in obj) {
			if(typeof obj[key] === 'object') {
				obj[key] = [];
			}else {
				obj[key] = '';
			}
		}
		return obj;
	},
	getDate (date) {
		if(date instanceof Date) {
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		}else {
			return date;
		}
		
	},
	checkDate(str) {
		// 检查字符串是否为日期格式
		return strDateTime1(str) || strDateTime2(str) || strDateTime3(str);
		// 时间 如 15:26:02
		function strDateTime1(str) {
			const a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
			if (a == null) { return false; }
			if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
				return false
			}
			return true;
		}
		// 日期 如 2019-03-06
		function strDateTime2(str) {
			const r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (r == null) return false;
			const d = new Date(r[1], r[3] - 1, r[4]);
			return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
		}
		// 日期 如 2019-03-06 15:28:30
		function strDateTime3(str) {
			const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
			const r = str.match(reg);
			if (r == null) return false;
			const d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
			return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5]
			 && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
		}
	},
	coverObj (a1, a2, { obj, skip, date } = {}) {
		
		const objMap = new Map();
		const dateMap = new Map();
		const skipMap = new Map();
		
		if(obj) {
			obj.forEach( _ => { objMap.set(_, true)} );
		}
		if(date) {
			date.forEach( _ => { dateMap.set(_, true)} );
		}
		if(skip) {
			skip.forEach( _ => { skipMap.set(_, true)} );	
		}

		for (let key in a1) {
			const v = a2[key];

			if(v === undefined || skipMap.get(key)) continue;

			if( obj && typeof v == 'object' && objMap.get(key) ) {
				if( Array.isArray(v) ) {
					a1[key] = v.map(_=>_.id !== undefined ? _.id : '');
				}else {
					a1[key] = v?v.id !== undefined ? v.id : '':'';
				}
			}else if(date && dateMap.get(key)) {
				a1[key] = v ? new Date(v) : v;
			}else {
				a1[key] = v;	
			}
				
		}
		return a1;
	},
	searchTree (arr, id) {

		return f(arr);

		function f(a) {
			let i = a.length;
			while( i-- ) {
				const d = a[i];
				if(d.id == id) {
					return {arr: a, index: i};
				}else if(d.children && d.children.length != 0) {
					const o  = f(d.children);
					if(o) {
						return o;
					}
				}
			}
		}
	},
	splitObj (arr, keys) {
		let result;
		if(keys instanceof Array) {
			result = {};
			for(let k of keys) {
				result[k] = [];
			}

			for(let a of arr) {
				for(let k of keys) {
					result[k].push(a[k]);
				}
			}	
		}else if(typeof keys == 'string') {
			result = [];
			for(let a of arr) {
				result.push(a[keys]);
			}
		}
		

		return result;
	},
	getUrlParams (obj) {
		// URI编码，实现url参数序列化
		const arr = [];
		for(let k in obj) {

			const d = obj[k];
			if(d instanceof Array) {
				if(typeof d[0] == 'object') {
					d.forEach(e => {
						const arr2 = [];
						for (let i in e) {
							arr2.push(`${encodeURIComponent('"' + i + '"')}:${encodeURIComponent('"' + e[i] + '"')}`)  
						}
						arr.push(`${ encodeURIComponent(k) }[]=${encodeURIComponent('{'+arr2+'}')}`)
					});
				}else{
					d.forEach(_ => { arr.push(`${encodeURIComponent(k)}[]=${encodeURIComponent(_)}`)});
				}
			} else {
				arr.push(`${encodeURIComponent(k)}=${encodeURIComponent(d)}`)	
			}			
		}

		return arr.join('&');
	},
	setCookie (name,value) {
		if( name === undefined || !(typeof name === 'string') ) { return;}

	    var Days = 30;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie (name) {
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
	    if(arr=document.cookie.match(reg)){
	      return unescape(arr[2]);
	    }
	    else{
	     return null;
	    }
	},
	delCookie (name) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    // var cval=getCookie(name);
	    // if(cval!=null){
	      document.cookie= name + "="+";expires="+exp.toGMTString();
	    // }
	},
	setLocal (name, value) {
		if( name === undefined || !(typeof name === 'string') ) return;

		window.localStorage.setItem(name, escape(value));
	},
	getLocal (name) {
		if(window.localStorage.getItem(name)) {
			return unescape(window.localStorage.getItem(name));
		}else {
			return null;
		}
	},
	deleteLocal (name) {
		window.localStorage.removeItem(name);
	},
	windowChangeUrl (string) {
		if (!window.location.origin) {
        	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    	}

    	window.location.href = `${window.location.origin}/${string}`;
	},
	detectionTime (time) {
		let str = '';
		if(time) {

			const now_time = new Date().getTime();
			const in_time = new Date(time.split(' ')[0]).getTime() + 8.64e7;
			const n = in_time - now_time;

			str = (n > 8.64e7 && n < 3*8.64e7 && 'danger') || (n < 8.64e7 && 'warning') || 'safety';
		}

		return str;
	},
	getObjLength (obj) {
		let i = 0;
		for(let k in obj)  i++; 

		return i;
	},
	singleObject (arr, key) {
		if(arr.length == 0 || !key ) return arr;

		const map = new Map();
		arr.forEach( _=>{map.set(_[key],_)} );
		return [...map.values()]; 
	},
	funcBefore (fn, beforefn) {

		return function(){
			beforefn.apply( this, arguments );
			return fn.apply( this, arguments );
		}
	},
	funcAfter (fn, afterfn) {

		return function() {
			const result = fn.apply( this, arguments );
			afterfn.apply( this, arguments );
			return result;
		}
	},
	getDateRange (startCount, endCount) {
		const arr = [];
		let count = null;
		if(startCount == undefined && endCount == undefined){
			return;
		}else if (startCount && endCount == undefined) {
			count = [startCount, ""]
		}else if (startCount == undefined && endCount) {
			count = [endCount, ""]
		}else{
			count = [startCount , endCount].sort();
		}

		for (let k  of  count) {
			let dd, y, m, d = "";
			if(k !== "") {
				dd = new Date();
				dd.setDate(dd.getDate() + k);//获取天startCount, endeCount前后的日期
				y = dd.getFullYear();
				m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
				d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
				arr.push(y + "-" + m + "-" + d);
			}else {
				if(count[0] && count[0] < 0 ) {
					arr.push(k);
				}else{
					arr.unshift(k);
				}
			}
		}
		return arr.join(',')
	},
	// 数组去重 (普通数组 和对象数组)
 	rmDuplicate (arr) {

		if (!arr) return;

		if(typeof arr[0] === 'string' || typeof arr[0] === 'number' ) {
			return [...new Set(arr)];
		}else {
			let unique = {};
		   	arr.forEach(function(item){
		     unique[JSON.stringify(item)]=item;//键名不会重复
		   })

		   arr = Object.keys(unique).map(function(u){ 
		   //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
		     return JSON.parse(u);
		   })
		   return arr;
		}
	},
  getObjValue(obj, desc) {
    let arr = desc.split(".");
    let o = obj;
    while (arr.length && o) {
      o = o[arr.shift()];
    }
    return o;
  },

}