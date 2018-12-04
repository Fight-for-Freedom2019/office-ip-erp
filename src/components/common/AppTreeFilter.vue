<template>
  <div class="app-tree-filter">
    <static-select :type="selectedType" v-model="field_key"></static-select>
    <el-tree
      style="margin-top: 10px;"
      :data="data"
      :props="defaultProps"
      highlight-current
      @node-click="refreshTable"
      ref="filterTree"
    >
    </el-tree>
  </div>
</template>

<script>
import StaticSelect from '@/components/form/StaticSelect'
import { strainerConfig } from '@/const/fieldConfig' 
const urlMap = new Map([
  ['process',{ URL: '/processes/filters' }],
  ['patent',{ URL: '/patents/filters' }],
  ['applicants',{ URL: '/filters/applicants' }],
  ['inventors',{ URL: '/filters/inventors' }],
  ['contacts',{ URL: '/filters/contacts' }],
  ['remarks',{ URL: '/filters/remarks' }],
  ['contracts',{ URL: '/filters/contracts' }],
  ['invoice_targets',{ URL: '/filters/invoice_targets' }],
  ['fees',{ URL: '/filters/fees' }],
  ['invoices',{ URL: '/filters/invoices' }],
  ['received_payments',{ URL: '/filters/received_payments' }],
  ['invoice_request',{ URL: '/filters/vouchers' }],
]);
export default {
  name: 'filterTree',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    strainerMap () {
      const map = new Map(strainerConfig);
      return map;
    },
    selectedType () {
      const singleStrainer = this.type ? this.strainerMap.get(this.type) : [];
      console.log(singleStrainer)
      return {
        placeholder: '请选择过滤属性',
        options: singleStrainer,
      }
    },
    config () {
      const val = this.type ? urlMap.get(this.type) : undefined;
      return val;
    },
    defaultParams () {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
  },
  methods: {
    refreshTreeData () {
      const url = this.config.URL;
      const data = Object.assign({}, {filter_key: this.field_key}, this.defaultParams) ;
      const success = _=>{
        console.log(_);
        if(_) this.data = _.data;
      };
      this.$axiosGet({ url, data, success })
    },
    refreshTable (data,node) {
      this.$emit('refresh',data.query);
    },
  },
  data () {
		return {
		  field_key: '',
      data: [],
      defaultProps: {
        children: 'children',
        label(d) {
          return `${d.name}(${d.count})`
        },  
      },
		}
  },
  created () {
    this.strainerMap.get(this.type).filter((v,i,arr)=>{
      if(v['default']) this.field_key = v.id;
    })
  },
  watch: {
    field_key: {
      handler (val) {
        this.refreshTreeData();
      },
      deep: true
    },
  },
  components: { StaticSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-tree-filter {
  background: #fff;
  border: 1px solid #ebeef5;
  margin-right: 6px;
}
</style>