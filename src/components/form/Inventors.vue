<template>
  <div>
<!--     <el-tag
      v-for="(tag ,index) in inventorTags"
      :key="index"
      closable
      disable-transitions
      @close="handleCloseTag(index)"
      style="margin-right: 5px;"
    >
      <span>{{ `${tag.name};贡献率：${tag.share}%` }}</span>
    </el-tag> -->
    <app-card :value="inventorTags" type="inventor" @handleCloseTag="handleCloseTag"></app-card>
    <el-dialog :visible.sync="inventorVisible" :modal="false" :title="`${title}发明人`" > 
    	<inventor v-for="(item, index) in value" :key="index" style="margin-bottom: 5px" :value="value[index]" @input="(val)=>{handleInput({val, index});handleAdd();}" is-delete @deleteInventor="dataDelete(index);handleDelete();" :disabled="disabled"></inventor>
      <el-row>
        <el-button type='text' @click="add({'share': '', 'id': ''});handleAdd()" v-if="!disabled">添加发明人</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="handleAddTag">确认</el-button>
        <el-button @click="inventorVisible = false">取消</el-button>
      </el-row>
    </el-dialog>
    <el-button type="text" @click="inventorVisible = true">{{ pageType == 'add' ? '添加' : '修改' }}</el-button>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import Inventor from '@/components/form/Inventor'
import AppCard from '@/components/common/AppCard'
export default {
  name: 'inventors',
  mixins: [ Multiline ],
  data () {
    return {
      inventorVisible: false,
      inventorTags: [],
    } 
  },
  computed: {
   title () {
      return this.pageType && this.pageType == 'add' ? '添加' : '编辑';
   },
  },
  methods: {
  	handleAdd () {
  		this.$emit('addInventor');
  	},
  	handleDelete (index) {
  		this.$emit('deleteInventor', index);
  	},
  	handleInput ({val, index}) {
  		const copy = this.$tool.deepCopy(this.value);
  		copy[index] = val;
  		this.$emit('input', copy);
  	},
    handleAddTag () {
      this.inventorTags = this.$tool.deepCopy(this.value);
      this.inventorVisible = false;
    },
    handleCloseTag (index) {
      this.inventorTags.splice(index,1);
      this.$emit('input',this.inventorTags);
    },
  },
  watch: {
    value (v) {
       this.inventorTags = v;
    },
  },
  // mounted () {
  //     setTimeout(()=>{
  //       console.log(this.value);
  //        this.inventorTags = this.value;
  //     },0)
  // },
  components: { Inventor, AppCard }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
