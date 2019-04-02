<template>
  <div class="app-tree-filter">
    <static-select
      :type="selectedType"
      v-model="field_key"
      ref="strainerTree"
      :square="true"
      border="bottom"
    ></static-select>
    <el-tree
      :style="{height: (parseInt(height) - 40) + 'px', 'overflow-y':'auto'}"
      :data="data"
      :props="defaultProps"
      highlight-current
      @node-click="refreshTable"
      ref="filterTree"
    ></el-tree>
  </div>
</template>

<script>
import StaticSelect from "@/components/form/StaticSelect";
import { strainerConfig } from "@/const/fieldConfig";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
    name: "filterTree",
    props: {
        type: {
            type: String,
            default: ""
        },
        height: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapGetters(["filterForm", "navLabel"]),
        strainerMap() {
            const map = new Map(strainerConfig);
            return map;
        },
        selectedType() {
            const singleStrainer = this.type ? this.strainerMap.get(this.type)['DATA'] : [];
            return {
                placeholder: "请选择过滤属性",
                options: singleStrainer
            };
        },
        configUrl() {
            const val = this.type ? this.strainerMap.get(this.type)['URL'] : undefined;
            return val;
        },
        defaultParams() {
            const params = this.$route.meta.params;
            return params ? params : {};
        }
    },
    methods: {
        ...mapActions([
            "fillListFilter",
            "closeTag",
        ]),
        refreshTreeData() {

            const url = this.configUrl;
            const data = Object.assign(
                {},
                { filter_key: this.field_key },
                this.defaultParams,
                this.filterForm
            );
            const success = _ => {
                if (_) this.data = _.data;
            };
            this.$axiosGet({ url, data, success });
        },
        refreshTable(data, node) {
            // console.log(this.navLabel)
            // 此方法用来实现点击树筛选以及再次点击去掉对应的筛选条件
            const labelKeys = this.$tool.splitObj(this.navLabel, ['key','cnLabel', 'value'])  
            // console.log(labelKeys) 
            const obj = {};
            const s = this.$refs.strainerTree.getSelected();
            const label = data.name;
            const name = s[0].name;
            const key = s[0].id;
            const value = data.query[key];
            const extraOption = { operation: 1 };

            obj[key] = { label, name, key, value, extraOption };
            const index = labelKeys['key'].indexOf(key)
            if(labelKeys['key'].includes(key) && labelKeys['cnLabel'][index].includes(label)) {
                Array.isArray(labelKeys['cnLabel'][index]) ? false : labelKeys['cnLabel'][index] = labelKeys['cnLabel'][index].split('，');
                if(Array.isArray(labelKeys['cnLabel'][index]) && labelKeys['cnLabel'][index].length > 0 ) {
                    // 分别过滤出不包含当前点击值得label value
                    let value2 = []
                    if(Array.isArray(labelKeys['value'][index])) {
                       value2 = labelKeys['value'][index].filter(item => item !== value)
                    }
                    const label2 = labelKeys['cnLabel'][index].filter(item => item !== label)
                    const obj2 = {}
                    label2 && label2.length != 0 ?  
                    obj2[key] = {label: label2, name, key, value: value2, extraOption}:
                    obj2[key] = false;
                    this.fillListFilter(obj2)
                }else {
                    const closeItem = this.navLabel.filter(_=> _.key == key)
                    this.closeTag(closeItem[0])
                }
            }else{
                this.fillListFilter(obj);
                // this.$emit('refresh',data.query);
            }
        },
    },
    data() {
        return {
            field_key: "",
            data: [],
            defaultProps: {
                children: "children",
                label(d) {
                    return `${d.name}(${d.count})`;
                }
            }
        };
    },
    created() {
        this.strainerMap.get(this.type)['DATA'].filter((v, i, arr) => {
            if (v["default"]) this.field_key = v.id;
        });
    },
    watch: {
        field_key: {
            handler(val) {
                this.refreshTreeData();
            },
            deep: true
        }
    },
    components: { StaticSelect }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-tree-filter {
  background: #fff;
  border: 1px solid #ebeef5;
  margin-right: 6px;
}
</style>
<style lang="scss">
#app .app-tree-filter .static_select .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
#app .app-tree-filter .static_select .el-input__inner:hover {
  border-color: rgb(192, 196, 204);
}
#app .app-tree-filter .static_select .el-input__inner:focus {
  border-color: #409eff;
}
</style>