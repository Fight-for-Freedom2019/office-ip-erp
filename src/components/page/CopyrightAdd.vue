<template>
  <div class="main">
     <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> 基本信息</span>  
        <copyright-base ref="base" :page-type="pageType"></copyright-base>
    </el-tab-pane>
     <el-tab-pane>
          <span slot="label"><i class="el-icon-menu"></i> 著作权信息</span> 
           <copyright-work ref="work" :page-type="pageType"></copyright-work> 
    </el-tab-pane>
    <el-tab-pane>
          <span slot="label"><i class="el-icon-setting"></i> 软件功能和技术特点</span>  
          <copyright-func ref="func" :page-type="pageType"></copyright-func>
    </el-tab-pane>
    <el-tab-pane>
          <span slot="label"><i class="el-icon-menu"></i> 分类信息</span>     
          <copyright-classify ref="classify" :page-type="pageType"></copyright-classify>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-share"></i> 委案信息</span>  
      <copyright-case ref="case" :page-type="pageType"></copyright-case>
    </el-tab-pane>
    <el-tab-pane v-if="pageType == 'add'">
      <span slot="label"><i class="el-icon-document"></i> 任务</span>  
      <task :type="type" ref="task" category="3"></task>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import Task from '@/components/page_extension/PatentAdd_task'
import CopyrightBase from '@/components/page/copyright/CopyrightBase'
import CopyrightCase from '@/components/page/copyright/CopyrightCase'
import CopyrightClassify from '@/components/page/copyright/CopyrightClassify'
import CopyrightFunc from '@/components/page/copyright/CopyrightFunc'
import CopyrightWork from '@/components/page/copyright/CopyrightWork'

import {mapActions} from 'vuex'
const messageMap =new Map([
  ['base', '请正确填写基本信息',],
  ['case', '请正确填写委案信息',],
  ['classify', '请正确填写分类信息',],
  ['func', '请正确填写软件功能与技术特点信息',],
  ['work', '请正确填写著作权信息',],
]); 
const getKeys = ['base', 'case', 'classify', 'func', 'work']; 
const URL = '/copyrights'

export default {
  name: 'copyrightAdd',
  props: ['pageType'],
  data () {
    return {
      id: '',
      btn_disabled: false,
    }
  },
  computed: {
    type () {
      return this.pageType ? this.pageType : this.$route.meta.pageType;
    },
    detail () {
      return this.$store.getters.detailBaseCopyright;
    },
    user () {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    ...mapActions([
      'refreshUser',
    ]),
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
            this.$message({ message: "新建版权成功", type: "success" });
            this.dialogVisible = false;
            this.$router.push("/copyright/draftbox");
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
  created () {
    this.refreshForm(this.detail);
  },
  watch: {
    detail (val) {
      this.refreshForm(val);
    }
  },
  components: { CopyrightClassify, CopyrightBase, CopyrightCase, CopyrightFunc, CopyrightWork, Task}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>