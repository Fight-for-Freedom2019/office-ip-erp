<template>
  <div class="select_jump_list">
    <el-select
      :value="value2"
      @input="handleInput"
      filterable
      remote
      :placeholder="PLACEHOLDER"
      :disabled="disabled"
      :remote-method="remoteMethod"
      :loading="loading"
      :value-key="valueKey"
      :allow-create="allowCreate"
      :default-first-option="choose.defaultFirstOption !== undefined ? choose.defaultFirstOption : false"
      :multiple="!single"
      ref="select"
      @change="handleChange"
      @visible-change.once="initialization"
    >
      <el-option v-for="item in option_in" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import map from "@/const/remoteConfig";

export default {
  name: "jumpSelect",
  mixins: [AxiosMixins],
  props: {
    value: [Number, String, Array, Object],
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    type: [String, Object],
    para: {
      type: Object,
      default() {
        return {};
      }
    },
    single: {
      type: Boolean,
      default: false
    },
    staticMap: {
      type: Array,
      default() {
        return [];
      }
    },
    valueKey: {
      type: String
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      keyword: "",
      selected: [],
      static_map: [],
      numberHandle: [
        "member",
        "applicant",
        "inventor",
        "agent",
        "agency",
        "project",
        "proposal",
        "patent",
        "copyright",
        "bill",
        "pay"
      ] //需要做number类型处理的数据集合
    };
  },
  methods: {
    handleInput(val) {
      if (!this.multiple && !this.single) {
        let v = "";
        if (val[0] && val[1]) {
          v = val[1];
        }
        if (val[0] && !val[1]) {
          v = val[0];
        }
        this.$emit("input", v);
      } else {
        this.$emit("input", val);
      }
    },
    handleChange(val) {
      this.$emit("change", this.map.get(val));
    },
    initialization() {
      this.remoteMethod("");
    },
    getSelected() {
      return this.selected;
    },
    refreshSelected(val) {
      val = val instanceof Array ? val : [val];
      if (this.staticMap.length > 0) {
        this.static_map = this.staticMap;
      }
      if (val[0] && val[0] instanceof Object) {
        //过滤掉id为空的值
        // const v = val.filter(_=>{return _.id && _.name});

        this.static_map = val;
        const arr = val.map(_ => _.id);

        if (this.multiple) {
          this.$emit("input", arr);
        } else {
          this.$emit("input", arr[0]);
        }
      } else {
        //selected通过map映射
        const arr = [];
        val.forEach(_ => {
          //在map中搜索, 若不存在，则自定义
          const v = this.map.get(_);

          if (v) {
            arr.push(v);
          } else {
            arr.push({ id: _, name: _ });
          }
        });

        this.selected = arr;
      }
    },
    remoteMethod(keyword) {
      this.keyword = keyword;
      const s = { keyword, listOnly: "1" };
      const os = this.PARAMS;
      const key = this.DATA_KEY;
      const url = this.URL;
      const data = os ? Object.assign({}, s, os) : s;
      const success = d => {
        // const list = d[key]?data[key]:data[key]['data'];    // 不知道为啥又改了
        let list = [];
        if (d[key] instanceof Array) {
          list = d[key];
        } else {
          list = d[key]["data"];
        }
        if (!list) return (this.options = []);
        if (list[0] && list[0]["label"] && list[0]["value"]) {
          list.forEach(_ => {
            _.name = _.label;
            _.id = _.value;
          });
        }

        if (this.digitalHandle) {
          list.forEach(_ => {
            _.id = _.id - 0;
          });
        }

        this.options = list;
      };
      const complete = _ => {
        this.loading = false;
      };

      this.loading = true;
      this.$axiosGet({ url, data, success, complete });
    },
    clear(flag = true) {
      this.selected = [];
      this.static_map = [];
      this.multiple ? this.$emit("input", []) : this.$emit("input", "");
      if (flag) {
        this.remoteMethod("");
      }
    }
  },
  computed: {
    //是否数字化处理
    digitalHandle() {
      if (!this.type) return false;
      return this.numberHandle.indexOf(this.type) >= 0;
    },
    choose() {
      if (typeof this.type == "string") {
        return map.get(this.type);
      } else {
        return this.type;
      }
    },
    allowCreate() {
      if (this.choose.allowCreate) {
        return true;
      }

      if (this.choose.dynamicCreate && this.options.length == 0) {
        return true;
      }

      return false;
    },
    URL() {
      return this.choose.URL;
    },
    DATA_KEY() {
      return this.choose.DATA_KEY;
    },
    PLACEHOLDER() {
      return this.choose.PLACEHOLDER;
    },
    PARAMS() {
      let obj = {};

      if (this.para) {
        Object.assign(obj, this.para);
      }
      if (this.choose.PARAMS) {
        Object.assign(obj, this.choose.PARAMS);
      }

      return obj;
    },
    option_in() {
      //由于一部分的val可能是通过object传入,单纯的options只含有动态部分
      //所以取select_map和options的并集,取得selected的静态部分选项
      const arr = this.keyword
        ? [...this.options]
        : [...this.static_map, ...this.options];
      //以ID为唯一值 进行去重处理 ||邮箱的选项框因为多个人可以键入同一个邮箱 因此会有一定问题(暂未对这种情况进行处理)
      const single = this.$tool.singleObject(arr, "id");
      return single;
    },
    map() {
      //map分为静态和动态俩部分，静态部分由value类型为Object时提供，之后将value转换为数值类型
      const map = new Map();
      this.static_map.forEach(_ => map.set(_.id, _));
      this.options.forEach(_ => map.set(_.id, _));
      return map;
    },
    value2() {
      let val;
      //将单项统一处理为数组 single时保留原状
      if (!this.multiple && !this.single) {
        // console.log(this.value == "" || (this.value instanceof Object && this.$tool.getObjLength(this.value) == 0 ) ? [] : [ this.value ]);
        val =
          this.value == "" ||
          (this.value instanceof Object &&
            this.$tool.getObjLength(this.value) == 0)
            ? []
            : !this.value
            ? []
            : [this.value]; //空字符串 空对象处理
      } else {
        val = this.value;
      }

      //数字化处理
      if (this.digitalHandle) {
        if (val instanceof Array && typeof val[0] == "string") {
          val = val.map(_ => {
            return typeof _ == "string" && _ ? val - 0 : val;
          });
        } else if (typeof val == "string" && val) {
          val = val - 0;
        }
      }

      return val;
    }
  },
  watch: {
    value2(val) {
      // 通过监听value2的变化来对remote-select因tag文字超出input变大样式的hack
      // var aEle=document.getElementsByTagName('input');
      // for(var i=0;i<aEle.length;i++){
      //     if(aEle[i].classList.contains('el-select__input')){
      //       if(val && val.length == 0) {
      //         aEle[i].classList.remove('add_position');
      //       }else {
      //         aEle[i].classList.add('add_position');
      //       }
      //     }
      // }

      //value类型为对象时，添加静态映射，并将其值转为id
      if (!this.single) {
        // if( !this.multiple && !this.single && this.$refs.select) {
        this.$refs.select.visible = false;
      }
      this.refreshSelected(val);
    },
    para: {
      handler: function() {
        this.remoteMethod("");
      },
      deep: true
    }
  },
  created() {
    this.value2 ? this.refreshSelected(this.value2) : "";
    this.remoteMethod("");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<style>
.header_wrap .select_jump_list .el-select__tags {
  max-height: 36px;
  overflow-x: hidden;
  overflow-y: auto;
}
.select_jump_list .el-select__tags::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.select_jump_list .el-select__tags::-webkit-scrollbar-track {
  background: #f6f6f6;
  border-radius: 2px;
  display: none;
}
.select_jump_list .el-select__tags::-webkit-scrollbar-thumb {
  background-color: #eef1f6;
  border-radius: 2px;
}
.select_jump_list .el-select__tags::-webkit-scrollbar-thumb:hover {
  background: #bec8d7;
}
.select_jump_list .el-select__tags::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
/*.select_jump_list .el-select__tags>span{
    min-height: 24px; 
    text-overflow: ellipsis;
    overflow: hidden;
  }*/
.select_jump_list .el-select .el-tag {
  height: auto;
  min-height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  margin: 3px 0 3px 6px;
  max-width: 100%;
  /*word-wrap: break-word;*/
  /*word-break: break-all;*/
  position: relative;
}
/*.select_jump_list .el-tag .el-icon-close {
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    -ms-transform: scale(.75,.75);
    transform: scale(.75,.75);
    height: 18px;
    width: 18px;
    line-height: 18px;
    vertical-align: middle;
    position: absolute;
    top: 5px;
    right: 2px;
}*/
.select_jump_list .el-select__input {
  border: none;
  outline: 0;
  padding: 0;
  margin-left: 10px;
  color: #666;
  font-size: 14px;
  vertical-align: baseline;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 16px;
  background-color: transparent;
}
.add_position {
  position: absolute;
  top: 10px;
  /*right:-28px;*/
}
</style>