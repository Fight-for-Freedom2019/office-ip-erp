<template>
  <div>
		<el-row class="filter-sort" v-if="source.sortable == undefined ? true : source.sortable">
			<el-col :span="24">
			  	<span style="display: block; width: 100%;height: 30px;line-height: 30px;font-size: 14px;" @click="handleSort('asc')"><i class="iconfont">&#xe63c;</i>升序</span>
			  	<span style="display: block; width: 100%;height: 30px;line-height: 30px;font-size: 14px;" @click="handleSort('desc')"><i class="iconfont">&#xe639;</i>降序</span>
			</el-col>
		</el-row>
		<el-row class="common" v-if="source.type!='date'">
			<el-col :span="24">
	  	 		<static-select type="text_filter_relate" v-model="contain_relate"></static-select>
	  	</el-col>
		</el-row>				
		<el-row class="common">
			<el-col :span="24">
				<filter-condition  :source="source" :label-map="labelMap" v-model="filters[source.id]" :field="field" ref="filterCondition"></filter-condition>
	  	 </el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button type="primary" size="small" @click="handleFilter">确定</el-button>
				<el-button @click="cancle" size="small">取消</el-button>
			</el-col>
		</el-row>
  </div>	
</template>
<script>
import StaticSelect from '@/components/form/StaticSelect'
import FilterCondition from '@/components/common/FilterCondition'
import {map as filterConfig } from '@/const/headerFilterConfig'	
import {mapActions} from 'vuex'

export default {
  name: 'listsFilter',
  props:{
  	listType: {
  		type: String,
  		default: '',
  	},
  	field: {
  		type: String,
  		default: '',
  	},
    activePop:{
  	  type:String,
    },
  	/*filterConditionVisible: {
  		type: Boolean,
  		default: false,
  	},*/
    labelMap: {
      type: Map,
    }
  },
  data () {
  	return {
  	  	contain_relate: '', 
  	  	value:'',
  	  	filters:{},
  	}
  },
  computed: {
	filterSetting () { //自定义筛选配置项
		const data = filterConfig.get(this.listType);
		return data ? data : []
	},
	filterSettingMap () { //自定义筛选配置项映射
		const map = new Map();
		this.filterSetting.forEach(v => {
			map.set(v.id, v)
		})
		return map
	},
	source () {
		//  其中一个配置项的值
		const val = this.filterSettingMap.get(this.field);
		return val ? val : null;
	},
  },
  methods: {
  	...mapActions([
  		'addListFilter',
  		'fillListFilter',
  	]),
    handleDynamicData () {
    	// 初始化filters对象
      this.filterSetting.forEach(_=>{
        const item = this.getDefaultValue(_.id);
        this.$set(this.filters,_.id,item);
      });
      // console.log(this.filters);
      return this.filters;
    },  	
  	handleSort (order) {
  		const sort = `${this.handleField(this.field)}-${order}`;
  		this.$emit('order',sort);
  	},
  	handleInput (val) {
  		const key = this.source.id;
  		this.filters[key] = val;
  	},
    clearRenderHeaderField (key) {
      console.log(key)
      console.log(this.filters)
      this.filters[key] = this.getDefaultValue(key);
      this.$refs.filterCondition.clearField(key);
      // console.log(this.filters[key])
    },
    // 如果字段使用的是.语法，使用这个方法获取最后一个关键字
    handleField(field){
  	    if(/\./.test(field)) {
  	        let fields = field.split(".");
  	        return fields[fields.length - 1];
        }else {
  	        return field;
        }
    },
  	handleFilter () {
  		const obj = {};
  		const name = this.source.name;
  		const key =  this.handleField(this.field);
      let extraOption = '';
			let [label,value]= [null,null];
			const filterValue = this.filters[this.source.id];

			if((this.source.type == "date" || this.source.type == "text") && 
			(filterValue instanceof Array &&  filterValue[0] !== "" || filterValue[1] !== "") &&  filterValue) {

				value = this.filters[this.source.id];
				label = this.$refs.filterCondition.getLabel();

			}else if((this.source.type == 'static_select' || this.source.type == 'remote_select') 
			&& this.$refs.filterCondition != undefined ) {

				const nodeArr =	this.$refs.filterCondition.getCheckedNodes();
				if(nodeArr.length != 0) {

					value = this.$tool.splitObj(nodeArr,'id');
					label = this.$tool.splitObj(nodeArr,'name');
				}else{
					return this.$message({ message: '筛选字段不能为空', type: 'warning'});	
				}
			}else{
					return this.$message({ message: '筛选字段不能为空', type: 'warning'});
			}
			if(this.source.type != 'date'){
				extraOption = { operation: this.contain_relate };
				obj[key] = { name, key, label, value,extraOption };
			}else {
				extraOption = { operation: 1 };
				obj[key] = { name, key, label, value, extraOption };
			}
			this.fillListFilter(obj);
			this.$nextTick(()=>{
				this.cancle();
			})
	},
    getDefaultValue (key) {
      const item = this.filterSettingMap.get(key)
      let val = ''
  	  if(item.type == 'date' ) {
          val = ['','']
      } else if(item.type == 'text') {
          val = ''
      } else if(item.type == 'static_select' || item.type == 'remote_select') {
          val = []
      }
      return val
    },		
	cancle() {
		this.$emit('hide',this.activePop);
	},
  },
  created () {
    window.listHeaderFilter.set(this.field,this);
  	this.handleDynamicData();
  	// window.listHeaderFilter = this;
  },
  destroyed() {
    window.listHeaderFilter.clear();
    // window.listHeaderFilter = null;
  }, 
  watch: {
    'source': {
      handler (val) {
        // window.listHeaderFilter = this;
       return val.type === 'text' ? this.contain_relate = 3 : this.contain_relate = 1;
      },
      immediate: true,
    },
    // filters: {
    //   handler(form) {
    //     console.log(form);
    //   },
    //   deep: true,
    // }
  },
  components:{
  	StaticSelect,
  	FilterCondition,
  }	
}
</script>
<style lang="scss" scoped>
.common {
	margin: 10px 0;
}
.filter-sort span:hover {
	background-color: #eef1f6;
	cursor: pointer;
}
</style>