<!--
单独使用当前组件时
父组件通过@filterData获取过滤后的tableData
如果是在TableComponent中使用则无需做任何改动
TableComponent中需配置filterFields
与当前组件props中的fields配置相同
使用filterFields后，动态搜索则失效
-->

<template>
  <div>
    <el-autocomplete
        class="inline-input"
        v-model="state"
        :fetch-suggestions="querySearch"
        :placeholder="placeholder"
        @select="handleSelect"
        clearable
        @input="handleInput"
    ></el-autocomplete>
  </div>
</template>

<script>
  const filterRule = [
    /*
    * 如果要过滤0或1这类的数据需要在此定义搜索字段代表的值
    * 需要完整的关键字才能匹配,比如:已开票，要输入已开票才能检索出数据
    * 建议在搜索建议中直接写下完整的关键字，
    * */
    ["是", 1],
    ["否", 0],
  ];
  export default {
    name: "StaticSearchInput",
    data() {
      return {
        state: "",
        restaurants: [],
        rule: new Map(filterRule),
    }
    },
    props: {
      // 过滤用的数据，单独使用组件时不能为原始数据，需copy一份
      tableData: {
        type: Array,
        default() {
          return []
        },
      },
      /*
      * 哪些字段过滤
      * [
      *   {field:"feecode.name",value:"代理费"},
      *   {field:"is_voucher"},
      * ]
      * field:过滤的table字段
      * value:快捷输入过滤的关键字(搜索建议),可省略
      * */
      fields: {
        type: Array,
        default() {
          return []
        },
      },
      // placeholder
      placeholder:{
        type: String,
        default(){
          return "请输入内容"
        },
      },
    },
    mounted() {
      this.restaurants = this.fields.filter((i)=>i.value);
    },
    methods: {
      handleInput(value){
        this.$emit('input', value);
      },
      querySearch(val, cb) {
        val === "" ? this.$emit("filterTableData", this.tableData) : this.handleSearch(val);
        let restaurants = this.restaurants;
        let results = val ? restaurants.filter(this.createFilter(val)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.field.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSearch(val) {
        this.$emit("filterTableData", this.filterData(val, this.tableData, this.fields))
      },
      handleSelect(val) {
        this.handleSearch(val.value);
      },
      filterData(val, data, fields) {
        let _this = this;
        if(this.rule.get(val) !== undefined) {
          fields = fields.filter((f)=>f.value === val);
          val = this.rule.get(val);
        }
        return data.filter((o) => {
          let bool = false;
          fields.some((i) => {
            let keyword = _this.$tool.getObjValue(o, i.field);
            if(keyword || keyword === 0 || keyword === false) {
              bool = keyword.toString().indexOf(val) !== -1;
            }else {
              bool = false
            }
            return bool;
          })
          return bool;
        })
      },
    },
  }
</script>

<style scoped>

</style>