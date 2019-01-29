<template>
    <div class="main" id="trademarkAdd">
        <el-tabs type="border-card">
        	<el-tab-pane>
            	<span slot="label"><i class="el-icon-information"></i> 商务信息</span>
				<trademark-bussiness ref="bussiness" :page-type="pageType"></trademark-bussiness>		            
            </el-tab-pane>
            <el-tab-pane>
           		<span slot="label"><i class="el-icon-information"></i> 基本信息</span>
				<trademark-base ref="base" :page-type="pageType"></trademark-base>		            
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-share"></i> 日期&号码</span>
                <trademark-date ref="date" :page-type="pageType"></trademark-date>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-share"></i> 人员信息</span>
                <trademark-person ref="person" :page-type="pageType"></trademark-person>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-more"></i> 其他信息</span>
               	<trademark-other ref="other" :page-type="pageType"></trademark-other>
            </el-tab-pane>
            <!-- <el-tab-pane v-if="pageType == 'add'">
                <span slot="label"><i class="el-icon-document"></i> 任务</span>
                <task :type="pageType" ref="task" category="2" @isTaskChanged="onIsTaskChanged"></task>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Task from '@/components/page_extension/PatentAdd_task'
import TrademarkBase from '@/components/page/trademark/TrademarkBase'
import TrademarkDate from '@/components/page/trademark/TrademarkDate'
import TrademarkOther from '@/components/page/trademark/TrademarkOther'
import TrademarkBussiness from '@/components/page/trademark/TrademarkBussiness'
import TrademarkPerson from '@/components/page/trademark/TrademarkPerson'

import {mapActions} from 'vuex'

const URL = '/trademarks'
const messageMap =new Map([
	['bussiness', '请正确填写商务信息',],
	['base', '请正确填写基本信息',],
	['date', '请正确填写日期号码',],
	['person', '请正确填写人员信息',],
	['other', '请正确填写其他信息',],
]); 
const getKeys = ['bussiness', 'base', 'date', 'person', 'other']; 
export default {
    name: 'trademarkAdd',
    props: {
        'pageType': {
            type: String,
            default: 'add',
        },
    },
    data () {
        return {
          id: '',
          btn_disabled: false,
		  isTask:false,
        }
    },
    computed: {
        ...mapGetters([
            'detailBaseTrademark',
            'detailBase',
        ]),
        detail () {
        	return this.detailBaseTrademark;
        },
        title () {
        	return this.detailBaseTrademark ? this.detailBaseTrademark.title : '';
        },
    },
    methods:{
        ...mapActions([
            'refreshUser',
        ]),
		onIsTaskChanged(val) {
			this.isTask = val;
			console.log(val);
		},
      	async add(form) {
	      const flag = await this.checkForm();
	      if (flag) {
	        const url = URL;
	        const data = Object.assign(
	          ...getKeys.map(_ =>
	            this.$refs[_] !== undefined ? this.$refs[_].submitForm() : false
	          ),
	        );

	        const success = _ => {
	          this.$message({ message: "新建商标成功", type: "success" });
	          this.dialogVisible = false;
	          this.$router.push("/trademark/draftbox");
	          this.$emit("addSuccess");
	        };
	        const complete = _ => {
	          this.btn_disabled = false;
	        };

	        this.$axiosPost({ url, data, success });
	      }
    	},
      	async edit() {
	      const flag = await this.checkForm();
	      if (flag) {
	        const url = `${URL}/${this.id}`;
	        const data = Object.assign(
	          ...getKeys.map(d =>
	            typeof this.$refs[d] !== "undefined"
	              ? this.$refs[d].submitForm()
	              : ''
	          )
	        );
	        console.log(data);
	        const success = _ => {
	          this.$message({
	            message: _.info,
	            type: "success"
	          });
	          this.$emit("editSuccess");
	        };
	        const complete = _ => {
	          this.btn_disabled = false;
	        };

	        this.btn_disabled = true;
	        return this.$axiosPut({ url, data, success, complete });
	      }
      	},
      checkForm () {
         return new Promise(resolve => {
        //递归检测
        const check = index => {
          const key = getKeys[index];
          if (key && typeof this.$refs[key] !== "undefined") {
            this.$refs[key].checkForm(_ => {
              if (_) {
                check(index + 1);
              } else {
                this.$message({ message: messageMap.get(key), type: "warning" });
                resolve(false);
              }
            });
          } else {
            resolve(true);
          }
        };

        check(0);
      });
      },
      refreshForm (val) {
        if (this.pageType == "edit" && this.$tool.getObjLength(val) != 0) {
	        const copy = this.$tool.deepCopy(val);
	        this.id = copy.id;
	        this.title = val.serial + "-" + val.title;
	        this.$nextTick(_ => {
	          getKeys.map(_ => this.$refs[_].setForm(copy));
	        });
      	}
      },
      clear() {
      	getKeys.map(d =>
	        typeof this.$refs[d] !== "undefined"
	        ? this.$refs[d].$refs.form.resetFields()
	        : ''
	    )
      },
    },
    mounted () {
        this.refreshForm(this.detail);
    },
    watch: {
     detail: {
      handler: function(val) {
        this.refreshForm(val);
      }
    },
    },
    components:{ 
        Task,
        TrademarkBase,
        TrademarkDate,
        TrademarkBussiness,
        TrademarkPerson,
        TrademarkOther,
    },
}
</script>
<style scoped lang="scss">
</style>
