<template>
	<div class="app-transfer-panel">
      <p class="app-transfer-panel__header">{{ `${title} 共 ${data.length} 项`}}<slot name="tips"></slot></p>
      <div class="app-transfer-panel__body">
        <el-input
          :placeholder="placeholder"
          v-model="search"
          suffix-icon="el-icon-search"
          size="small"
          class="app-transfer-panel__filter"
        >
        </el-input>
        <el-checkbox-group :value="value" @input="handleInput" class="el-transfer-panel__list">
        	<template v-for="(item, index) in dataShow">
	        	<div class="app-transfer-panel__drag1"
              :data-index="index" 
              :key="item.key" 
              draggable="true" 
              @dragstart="drag" 
              @drop="drop" 
              @dragover="allowDrop" 
              @click="selected(item.key)"
              @dragend="indexCache = ''"
              >
		          <el-checkbox 
                @change="handleChange(index, item)"
		          	:class="{active: item.key == activeKey,'app-transfer-panel__item': true}"
		          	:label="item.value"
		          >{{ item.label }}
              </el-checkbox>
		        </div>
		        <!-- <div class="app-transfer-panel__drag2" :data-index="index + 1"  @dragover="allowDrop"></div> -->
	      	</template>
        </el-checkbox-group>
      </div>
      <p class="app-transfer-panel__footer">
      	<el-checkbox v-model="checkAll" :indeterminate="indeterminate" style="padding-left: 20px; color: #8391a5;">{{ btnLabel }}</el-checkbox>
        <span>
          <el-button size="mini" type="text" @click="top(checkedIndex, checkedItem)">置顶</el-button>
          <el-button size="mini" type="text" @click="up(checkedIndex, checkedItem)">上移</el-button>
          <el-button size="mini" type="text" @click="down(checkedIndex, checkedItem)">下移</el-button>
          <el-button size="mini" type="text" @click="bottom(checkedIndex, checkedItem)">置底</el-button>
        </span>
      </p>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
	name: 'appTransferPanel',
	props: ['title', 'placeholder', 'value', 'data',],
	data () {
		return {
			search: '',
      indexCache: '',
      checkedIndex: null,
      checkedItem: '',
      activeKey: '',
      btnLabel: '全选',
		}
	},
	computed: {
		dataShow () {
			const s = this.search;
			if(s) {
				return this.data.filter(_=>{
					return _.label.indexOf(s) > -1;
				})
			}else {
				return this.data;
			}
		},
		checkAll: {
			set (val) {
				if(val) {
          this.handleInput(this.data.map(_=>_.value));
          this.btnLabel = '全不选';
				}else {
          this.handleInput([]);
          this.btnLabel = '全选';
				}
			},
			get () {
				
				if(this.data.length == 0) {
					return false;
				}

				if(this.value.length < this.data.length) {
					return false;
				}else {
					return true;
				}
			}
		},
		indeterminate () {
			if(this.value.length != 0 && this.value.length != this.data.length) {
				return true;
			}else {
				return false;
			}
		}
	},
	methods: {
		drag (e) {
      // var img = new Image();
      // e.dataTransfer.setDragImage(img,0,0);
			this.indexCache = e.target.dataset.index;
    },
		drop (e) {
			if(this.search) return;
      const target = $(e.target).parents('div.app-transfer-panel__drag1')[0];
			
      const start = this.indexCache - 0;
			const end = target.dataset.index - 0;
			const d = this.$tool.deepCopy(this.data);

			const item = d.splice(start, 1)[0];
			
			d.splice(end, 0, item)

			this.$emit('update:data', d);
		},
		allowDrop (e) {
			if(this.search) return;
      const target = $(e.target).parents('div.app-transfer-panel__drag1')[0];

			const i = target.dataset.index; 
			const i2 = this.indexCache;
      
			if(i2 && i != i2 ) {
				e.preventDefault();
			}
    },
    checkNull () {
      return new Promise((resolve)=>{
        const info = ()=>{
          this.$message({message: '请鼠标点击其中一项', type: 'warning'})
          return false;
        }
        if(this.checkedIndex == null || this.value.length == 0) {
          resolve(info())
        } else{
          resolve(true)
        }
      })
    },
    async up (index, item) {
      const flag = await this.checkNull();
      if(flag){
        if(index == 0) {
          return this.$message({ type: 'warning', message: '到顶了'})
        }
        // 在上一项插入该项
        this.dataShow.splice(index-1,0,(this.dataShow[index]));
        //删除后一项
        this.dataShow.splice(index+1,1);
        this.checkedIndex = index -1;
      }
    },
    async down (index, item) {
      const flag = await this.checkNull();
      if(flag) {
        if(index == this.dataShow.length-1) {
          return this.$message({ type: 'warning', message: '到底了'})
        }
        //在下一项插入该项
        this.dataShow.splice(index+2,0,(this.dataShow[index]));
        //  删除前一项
        this.dataShow.splice(index,1);
        this.checkedIndex = index + 1;
      }
    },
    async top (index, item) {
      const flag = await this.checkNull();
      if(flag) {
        if(index == 0 ) {
          return this.$message({ type: 'warning', message: '到顶了'})
        }
        this.dataShow.unshift(this.dataShow[index]);
        this.dataShow.splice(index+1,1);
        this.checkedIndex = 0;
      }
    },
    async bottom (index, item) {
      const flag = await this.checkNull();
      if(flag) {
        if(index == this.dataShow.length-1) {
         return this.$message({ type: 'warning', message: '到底了'})
        }
        this.dataShow.push(this.dataShow[index]);
        this.dataShow.splice(index,1);
        this.checkedIndex = this.dataShow.length-1;
      }
    },
		handleInput (val) {
			this.$emit("input", val);
    },
    handleChange (index, item) {
      this.checkedIndex = index;
      this.checkedItem = item;
    },
    selected (key) {
      this.activeKey = key; 
    },  
  },
} 
</script>

<style lang="scss">
$width: 250px;

#app .dialog-control>.el-dialog {
  width: 600px;
  position: static;
  transform: initial;
  margin: 0 auto;
  margin-top: 80px;
}
.app-transfer-panel {
	text-align: left;
	border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  display: inline-block;
  width: $width;
  position: relative;
  background: #fff;
  vertical-align: middle;
  box-sizing: border-box;
  .app-transfer-panel__header {
    height: 36px;
    line-height: 36px;
    background: #fbfdff;
    margin: 0;
    padding-left: 20px;
    border-bottom: 1px solid #d1dbe5;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: 14px;
  }
  .app-transfer-panel__body {
    padding-bottom: 36px;
    // height: auto;
  }
  .app-transfer-panel__footer {
    height: 36px;
    line-height: 36px;
    background: #fff;
    margin: 0;
    padding: 0;
    border-top: 1px solid #d1dbe5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .app-transfer-panel__filter{
    margin-top: 10px;
    text-align: center;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .app-transfer-panel__filter .el-input__icon {
    right: 10px;
  }
  .app-transfer-panel__filter .el-input__inner {
    height: 22px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
  }
  .app-transfer-panel__item {
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    display: block;
    margin-left: 0;
  }
  .app-transfer-panel__item:hover {
    background: #e4e8f1;
	}
  .active {
    background: #ecf5ff;
  }
  .app-transfer-panel__item .el-checkbox__input {
    position: absolute;
    top: 9px;
  }
  .el-checkbox__inner {
    width: 14px;
    height: 14px;
    border-radius: 3px;
  }
  .el-checkbox__inner::after {
    height: 6px;
    width: 3px;
    left: 4px;
  }
  .app-transfer-panel__item .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    box-sizing: border-box;
    padding-left: 28px;
  }
  .app-transfer-panel__drag2 {
  	height: 15px;
  }
}
</style>