
<template>
  <div class="select_list">
    <app-card :value="selectedItems" :type="type" @handleCloseTag="handleCloseTag"></app-card>
    <el-button
      type="text"
      @click="selectVisible = true"
      style="line-height: 16px;"
      :class="[selectedValue.length!=0? 'btn' : '']"
    >{{ pageType == 'add' ? '添加' : '修改' }}</el-button>
    <el-dialog :visible.sync="selectVisible" :modal="false" title="编辑">
      <slot></slot>
      <el-select
        :value="value2"
        @input="handleInput"
        filterable
        remote
        :placeholder="PLACEHOLDER"
        :disabled="disabled"
        :remote-method="remoteMethod"
        :loading="loading"
        :allow-create="allowCreate"
        :default-first-option="choose.defaultFirstOption !== undefined ? choose.defaultFirstOption : false"
        :multiple="!single"
        ref="select"
        @change="handleChange"
        @visible-change.once="initialization"
      >
        <el-option v-for="item in option_in" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-form :label-position="`top`" v-if="addType !== ''">
        <el-form-item style="margin-top:10px;">
          如果下拉菜单中没选项，请：
          <a href="#" @click="add">新增</a>
        </el-form-item>
        <family-add @onItemAdded="onItemAdded" ref="family"></family-add>
      </el-form>
      <el-row style="margin-top: 20px;">
        <el-button type="primary" @click="handleAddTag">确认</el-button>
        <el-button @click="selectVisible = false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import AppCard from "@/components/common/AppCard";
import FamilyAdd from "@/components/page_extension/FamilyAdd";
import map from "@/const/remoteConfig";

export default {
  name: "remoteSelect",
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
    pageType: String,
    addType: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      keyword: "",
      selectVisible: false,
      isUserInput: false,
      initialized: false,
      selected: [],
      selectedValue: [],
      selectedItems: [],
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
    add() {
      switch (this.addType) {
        case "patent_family":
          this.$refs.family.show(0, "add");
          break;
      }
    },
    onItemAdded(item) {
      this.value2 = item;
    },
    handleInput(val) {
      this.isUserInput = true;
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
    handleAddTag() {
      this.selectedItems = this.$tool.deepCopy(this.selected);
      this.selectVisible = false;
    },
    handleCloseTag(index) {
      if (this.value instanceof Array && this.value.length != 0) {
        this.value.splice(index, 1);
        this.selectedItems.splice(index, 1);
      } else {
        let arr = [];
        arr.push(this.value);
        arr.splice(index, 1);
        this.selectedItems.splice(index, 1);
        return (this.value2 = arr);
      }
    },
    initialization() {
      this.remoteMethod("");
    },
    getSelected() {
      return this.selected;
    },
    refreshSelected(val) {
      val = this.single ? [val] : val;

      if (this.staticMap.length > 0) {
        this.static_map = this.staticMap;
      }
      if (val[0] && val[0] instanceof Object) {
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
        let list = null;
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
    value2: {
      get() {
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
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  watch: {
    value2: {
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
      handler(val) {
        // 多选时调的element底层的属性来关闭下拉框
        if (!this.single && this.selectVisible) {
          this.$refs.select.visible = false;
        }
        this.refreshSelected(val);
      },
      deep: true
    },
    value: {
      handler(val) {
        if (!this.isUserInput) {
          //如果不是用户输入导致的值变化，需要同步显示
          this.selectedItems = this.selected;
        }
      }
    },
    selectVisible: {
      handler(val) {
        this.isUserInput = false;
      }
    },
    type(val) {
      if (val) {
        this.remoteMethod("");
      }
    },
    para() {
      this.remoteMethod("");
    },
    selected(val) {
      this.selectedValue = val;
    }
  },
  created() {
    if (
      (this.value instanceof String || this.value instanceof Array) &&
      this.value.length == 0
    ) {
      return;
    }
    if (this.value instanceof Array && this.value[0].visible) {
      return;
    }

    const v = this.value instanceof Object ? [this.value] : this.value;
    this.refreshSelected(v);
  },
  mounted() {},
  updated() {},
  components: { AppCard, FamilyAdd }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<style>
.header_wrap .select_list .el-select__tags {
  max-height: 36px;
  overflow-x: hidden;
  overflow-y: auto;
}
.select_list .el-select__tags::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.select_list .el-select__tags::-webkit-scrollbar-track {
  background: #f6f6f6;
  border-radius: 2px;
  display: none;
}
.select_list .el-select__tags::-webkit-scrollbar-thumb {
  background-color: #eef1f6;
  border-radius: 2px;
}
.select_list .el-select__tags::-webkit-scrollbar-thumb:hover {
  background: #bec8d7;
}
.select_list .el-select__tags::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
.select_list {
  display: table;
  /*  display: -webkit-flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;*/
}
.select_list .btn {
  position: relative;
  top: -10px;
}
.select_list .el-tag {
  min-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 20px 0 5px;
  position: relative;
  max-width: 78%;
}
.select_list .el-select .el-tag {
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
.select_list .el-tag .el-icon-close {
  border-radius: 50%;
  text-align: center;
  position: absolute;
  cursor: pointer;
  font-size: 12px;
  -ms-transform: scale(0.75, 0.75);
  transform: scale(0.75, 0.75);
  height: 18px;
  width: 18px;
  line-height: 18px;
  vertical-align: middle;
  top: 5px;
  right: 0px;
}
.select_list .el-select__input {
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