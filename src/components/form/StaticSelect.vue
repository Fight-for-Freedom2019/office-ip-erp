<template>
  <div class="static_select">
    <slot></slot>
    <el-select
      :class="style"
      :value="value"
      @input="handleInput"
      :multiple="multiple"
      :disabled="disabled"
      :placeholder="config.placeholder"
      filterable
      :size="size"
      :allow-create="config.allowCreate !== undefined ? config.allowCreate : false"
      :default-first-option="config.defaultFirstOption !== undefined ? config.defaultFirstOption : false"
      ref="select"
      @visible-change="handleVisibleChange"
      clearable
      @change="handleChange"
    >
      <el-option v-for="item in optionsIn" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>


<script>
//-----------------------------配置数据分界线-----------------------------------------------

import AxiosMixins from "@/mixins/axios-mixins";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "staticSelect",
  mixins: [AxiosMixins],
  props: {
    value: null,
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    },
    type: null,
    filterOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    skip: {
      type: Array,
      default() {
        return [];
      }
    },
    normalFilter: {
      type: Array,
      default() {
        return [];
      }
    },
    square: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      options: []
    };
  },
  computed: {
    ...mapGetters([
      "staticSelectorMap",
      "staticSelectorCache",
      "MergeSelectorMap",
      "getHashMaps"
    ]),
    style() {
      if (this.square) {
        return "el-select-square";
      }
    },
    cacheData() {
      let obj = {};
      // 将远程获取的静态map转为对象
      for (let [k, v] of this.getHashMaps) {
        obj[k] = v.options;
      }
      // 合并两对象数组
      const cache = { ...this.staticSelectorCache, ...obj };
      return cache[this.type];
    },
    config() {
      const config = this.MergeSelectorMap.get(this.type);
      return config ? config : this.type;
    },
    map() {
      const map = new Map();
      this.options.forEach(_ => {
        map.set(_.id, _);
      });

      return map;
    },
    options_vuex() {
      let op = null;
      if (typeof this.config.options === "string") {
        op = this.$store.getters[this.config.options];
      }

      return op;
    },
    optionsIn() {
      const s = this.skip;
      const f = this.filterOptions;
      const n = this.normalFilter;
      let options = this.options;

      if (s.length != 0) {
        options = options.filter(v => {
          return s.indexOf(v.id) < 0;
        });
      }
      if (n.length != 0) {
        options = options.filter(d => {
          return n.indexOf(d.id) == 0;
        });
      }

      if (f.length != 0) {
        options = options.filter(_ => {
          for (let i = 0; i < f.length; i++) {
            const item = f[i];

            if (_[item["key"]] != item["value"]) {
              return false;
            }
          }
          return true;
        });
      }
      return options;
    }
  },
  methods: {
    ...mapActions(["initializeSelectorCache"]),
    handleInput(val) {
      this.$emit("input", val);
    },
    handleChange(val) {
      this.$emit("change", this.map.get(val));
    },
    handleVisibleChange(val) {
      this.$emit("visible-change", [val, this.type]);
    },
    getSelected(value) {
      const arr = [];
      let v = value != undefined ? value : this.value;
      let cv = this.multiple ? v : [v];

      cv.forEach(_ => {
        const val = this.map.get(_);
        if (val) {
          arr.push(val);
        } else if (_ != "") {
          arr.push({ id: _, name: _ });
        }
      });

      return arr;
    },

    setOptions() {
      let op = this.config.options;

      if (op instanceof Array) {
        //存储在配置项的下拉框数据直接使用
        this.options = op;
      } else if (typeof op === "string") {
        op = this.options_vuex;

        //存储在vuex中的数据,op代表getters的名字,
        //当数据不止在Select而是在全局中有多处被使用,或者数据在使用过程中需要保持动态更新,使用vuex存储
        if (op === undefined) {
          if (this.config.refresh) {
            this.$store.dispatch(this.config.refresh);
          }
        } else {
          this.options = op;
        }
      } else if (op === undefined && this.config.url !== undefined) {
        //尝试初始化静态数据
        this.initializeSelectorCache({ type: this.type });
        if (this.cacheData) this.options = this.cacheData;
      }
    }
  },
  created() {
    this.setOptions();
  },
  watch: {
    config() {
      this.setOptions();
    },
    options_vuex(val) {
      if (typeof this.config.options === "string") {
        this.options = val;
      }
    },
    value(val) {
      this.$refs.select.visible = false;
    },
    cacheData(val) {
      if (val) {
        this.options = val;
      }
    },
    filterOptions() {
      if (this.multiple) {
        this.$emit("input", []);
      } else {
        this.$emit("input", "");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<style>
.header_wrap .static_select .el-select__tags {
  max-height: 36px;
  overflow-x: hidden;
  overflow-y: auto;
}
.static_select .el-select__tags::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.static_select .el-select__tags::-webkit-scrollbar-track {
  background: #f6f6f6;
  border-radius: 2px;
  display: none;
}
.static_select .el-select__tags::-webkit-scrollbar-thumb {
  background-color: #eef1f6;
  border-radius: 2px;
}
.static_select .el-select__tags::-webkit-scrollbar-thumb:hover {
  background: #bec8d7;
}
.static_select .el-select__tags::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
.static_select .el-tag {
  min-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px 0 5px;
}
.static_select .el-select .el-tag {
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
.static_select .el-tag .el-icon-close {
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
.static_select .el-select__input {
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

.el-select-square .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
</style>