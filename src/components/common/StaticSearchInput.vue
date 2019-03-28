<!--
父组件通过@filterData获取过滤后的tableData
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
      // 过滤用的数据，不能为原始数据，需copy一份
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
      * value:快捷输入过滤的关键字,可省略
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
      getObjValue(obj, desc) {
        let arr = desc.split(".");
        let o = obj;
        while (arr.length && o) {
          o = o[arr.shift()];
        }
        return o;
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
            let keyword = _this.getObjValue(o, i.field);
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