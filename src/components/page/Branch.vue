<template>
  <div class="main">
  	
  		 <div style="overflow: hidden;display: flex;just-content: flex-start;">
				<div style="width: 400px; min-width:330px;">

          <div class="left-tree-header" style="padding: 0 20px; ">
            <span style="font-size: 15px; font-weight: bold;">部门</span>
            <el-tag v-if="!!branchUpdate" style="margin-left: 15px;">最后更新时间：{{ branchUpdate }}</el-tag>
            <div style="float: right;">
              <!-- <el-button icon="el-icon-plus" size="mini" title="添加部门" @click="addPop"></el-button> -->
              <el-button icon="el-icon-edit" size="mini" title="编辑部门" style="margin-left: 0;" @click="editPop"></el-button>
              <!-- <el-button icon="el-icon-delete" size="mini" title="删除部门" style="margin-left: 0;" @click="branchDelete"></el-button> -->
            </div>
          </div>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="input-no-radius"
            style="border-radius: 0;">
          </el-input>
					<el-tree
						:data="branchData"
						:props="props"
						highlight-current
						:expand-on-click-node="false"
						@node-click="nodeClick"
            :style="`height: ${innerHeight - 137}px; overflow: auto;border-top: 0;`"
            :filter-node-method="filterNode"
            node-key="id"
            :current-node-key="nodeKey"
            ref="tree"
					>
					</el-tree>
				</div>
  
		  		<el-form label-width="120px" style="">
		  			
            <el-form-item label="部门名称">
		  			  {{ currentNode ? currentNode.name : '' }}
		  			</el-form-item>
		  			
            <!-- <el-form-item label="部门描述">
		  			  {{ currentNode ? currentNode.description ? currentNode.description : '暂无描述' : ''}}
		  			</el-form-item> -->

            <el-form-item label="部门简称">
		  			  {{ currentNode ? currentNode.abbr ? currentNode.abbr : '' : ''}}
		  			</el-form-item>
		  			
            <el-form-item label="默认IPR">
		  				<template v-if="currentNode">
                <el-tooltip v-if="currentNode.ipr">
                  <div slot="content">{{ currentNode.ipr.name }}<br/>{{ currentNode.ipr.mobile }}<br/>{{ currentNode.ipr.email }}</div>
                  <el-tag>{{ currentNode.ipr.name }}</el-tag>
                </el-tooltip>
                <span v-else>暂未设置默认IPR</span>
              </template>
		  			</el-form-item>

		  			<el-form-item label="拥有查看权限">
		  				<template v-if="currentNode">
                <template v-if="currentNode.board">
                  <el-tooltip v-for="item in currentNode.board" :key="item.id">
                    <div slot="content">{{ item.name.split('-')[0] }}<br/>{{ item.name.split('-')[1] }}</div>
                    <el-tag style="margin-right: 5px">{{ item.name.split('-')[0] }}</el-tag>
                  </el-tooltip>
                </template>
                <span v-else>无人拥有查看权限</span>
              </template>
		  			</el-form-item>
		  		  
            <el-form-item v-if="!!currentNode" style="margin-bottom: 0px;">
              <el-button type="primary" @click="transferPop">移交部门专利</el-button>
            </el-form-item>
          </el-form>	  		
  		</div>

      <el-dialog title="移交部门专利" :visible.sync="dialogVisible">
        <div style="margin-bottom: 5px;">将<span style="color: red; font-size: 14px; font-weight: bold; padding: 0 5px;">{{ currentNode.name }}</span>的专利移交至</div>
        <static-select type="branch" v-model="transfer" style="margin-bottom: 5px;"></static-select>
        <el-button @click="transferAxios" type="primary">确认移交</el-button>
      </el-dialog>

      <pop ref="pop" @refresh="handlePopRefresh"  :current-id="currentNode.id"></pop> 	
  </div>
</template>

<script>
// 部门管理组件
import Pop from '@/components/page_extension/Branch_pop' 
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

const url = '/branches';
export default {
  name: 'branch',
  data () {
		return {
		  props: {
		  	label: 'name',
		  	children: 'children'
		  },
      currentNode: '',
      dialogVisible: false,
      transfer: '',
      filterText: '',
      nodeKey: '',
		}
  },
  computed: {
    ...mapGetters([
      'innerHeight',
      'branchData',
      'branchUpdate',
      'branchMap'
    ]),
  },
  methods: {
    ...mapActions([
      'refreshBranch',
    ]),
  	nodeClick (a) {
      this.currentNode = a;
  	},
    addPop () {
      if(!this.currentNode) {
        this.$message({message: '请选择添加部门的挂载项', type: 'warning'});
        return;
      }

      this.$refs.pop.show('add');
    },
    editPop () {
      if(!this.currentNode) {
        this.$message({message: '请选择需要编辑的部门', type: 'warning'});
        return;
      }

      const d = this.$tool.deepCopy(this.currentNode);
      d.ipr = d.ipr ? d.ipr.id : '';
      this.$refs.pop.show('edit', d);
    },
    branchDelete () {
      const c = this.currentNode;

      if(!c) {
        this.$message({message: '请选择需要删除的部门', type: 'warning'});
        return;
      }

      if(c.id == 1) {
        this.$message({message: '根节点不可删除', type: 'warning'});
        return;
      }

      this.$confirm(`删除后不可恢复，确认删除‘${c.name}’？`, '提示', {type: 'warning'})
        .then(_=>{
          const url = `${url}/${this.currentNode.id}`;
          const success = _=>{
            this.$message({message: _.info,type: 'success'});
            this.refresh();

          }
          this.$axiosDelete({
            url, 
            success,
          })
        })
        .catch(_=>{});      
    },
    handlePopRefresh (str,val) {
      if(str == 'edit') {
        this.refreshBranch({
          success: _=>{
            this.filterText = '';
            this.$nextTick(_=>{
              const key = this.currentNode.id;
              this.currentNode = this.branchMap.get(key);
              this.filterText = this.currentNode.name;
              this.nodeKey = key;
            })
          }
        })    
      }
    },
    refresh () {
      this.refreshBranch();
      this.currentNode = '';
    },
    transferPop () {
      if(this.currentNode) {
        this.transfer = '';
        this.dialogVisible = true;
      }
    },
    transferAxios () {
      if(!this.transfer) {
        this.$message({message: '请选择目标部门', type: 'warning'});
        return;
      }

      const url = '/branches/transfer';
      const data = {
        id: this.currentNode.id,
        target: this.transfer,
      }
      const success = _=>{
        this.$message({'message': '移交成功'});
        this.dialogVisible = false;
      }

      this.$axiosPost({url, data, success});
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  components: { 
    RemoteSelect, 
    StaticSelect,
    Pop, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>