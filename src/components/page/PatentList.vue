 <template>
  <div class="main" v-loading="loading">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      @refreshTableData="refreshTableData"
      ref="table"
      :refresh-proxy="refreshProxy"
    >
      <!-- <el-button v-if="!!(menusMap && menusMap.get('/patent/download') )" slot="download" :loading="downloadLoading" icon="share" @click="downloadPop" type="primary" style="margin-left: 5px;">批量下载</el-button> -->
      <!-- <el-button type="primary" slot="test" @click="toggle">测试</el-button> -->
    </table-component>

    <common-detail
      :title="currentRow.title"
      ref="detail"
      :status="defaultStatus"
      @editSuccess="refresh"
      @sendEmail="handleSendMail"
    ></common-detail>

    <patent-add page-type="add" ref="patentAdd" @addSuccess="handleAddSuccess"></patent-add>

    <app-shrink
      :visible.sync="mailVisible"
      :modal="true"
      :modal-click="false"
      :is-close="false"
      title="发送邮件"
    >
      <mail-edit
        style="margin-top: 10px; "
        ref="mailEdit"
        @sendSuccess="mailCallBack"
        @cancelSending="mailCallBack"
      ></mail-edit>
    </app-shrink>

    <el-dialog title="批量下载" :visible.sync="downloadVisible">
      <el-form>
        <el-form-item label="文件类型">
          <static-select type="file_type" v-model="downloadFileType" multiple></static-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="downloadAxios">下载</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="案件类型" :visible.sync="caseVisible">
      <el-form ref="caseForm" :model="caseForm">
        <el-form-item
          label="案件类型"
          prop="caseType"
          :rules="{type: 'number',required: true, message: '案件类型不能为空', trigger: 'change'}"
        >
          <static-select type="relative_projects_type" v-model="caseForm.caseType"></static-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dropAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="摘要附图详情" :visible.sync="figureVisible">
      <app-table :columns="figureColumns" :data="figures"></app-table>
    </el-dialog>
  </div>
</template>

<script>
import AppFilter from "@/components/common/AppFilter";
import TableComponent from "@/components/common/TableComponent";
import AppTable from "@/components/common/AppTable";
import AppTree from "@/components/common/AppTree";
import AppDatePicker from "@/components/common/AppDatePicker";
import AppShrink from "@/components/common/AppShrink";
import CommonDetail from "@/components/page_extension/Common_detail";
import StaticSelect from "@/components/form/StaticSelect";
import RemoteSelect from "@/components/form/RemoteSelect";
import MailEdit from "@/components/common/MailEditForm";
import AppDate from "@/components/common/AppDate";
import PatentAdd from "@/components/page/PatentAdd";
import { mapGetters, mapActions } from "vuex";

const URL = "/patents";
const PATENT_TYPE = ["发明专利", "实用新型", "外观设计"];

// const renderMap = new Map([["serial", this.serialRender]]);

export default {
  name: "patentList",
  data() {
    return {
      value6: "",
      refreshProxy: "",
      caseForm: {
        caseType: ""
      },
      figures: [],
      loading: false,
      figureVisible: false,
      currentRow: "",
      selectData: [],
      shrinkVisible: false,
      caseVisible: false,
      downloadVisible: false,
      downloadIds: [],
      downloadFileType: [],
      downloadLoading: false,
      patentAddVisible: false,
      mailVisible: false,
      figureColumns: [
        { type: "text", label: "附图名称", prop: "name" },
        { type: "text", label: "附图格式", prop: "ext" },
        { type: "text", label: "附图大小 ", prop: "size" },
        {
          type: "action",
          label: "操作",
          width: "100",
          btns: [
            {
              type: "view",
              click: ({ viewUrl }) => {
                window.open(viewUrl);
              }
            },
            {
              type: "download",
              click: ({ downloadUrl }) => {
                window.open(downloadUrl);
              }
            }
          ]
        }
      ],
      tableOption: {
        name: "patentList",
        url: URL,
        height: "default",
        search_placeholder: "搜索案号、标题、申请号、提案号",
        highlightCurrentRow: true,
        rowClick: this.handleRowClick,
        // 'is_filter': true,
        is_view: true,
        is_list_filter: true,
        treeFilter: "patent",
        list_type: "patent",
        import_type: "patent",
        // 'upload_type': 'patent',
        header_btn: [
          {
            type: "add",
            click: this.add,
            map_if: "/patent/btn/save",
            btn_if: "draftbox"
          },
          { type: "delete", map_if: "/patent/btn/save" },
          // { type: 'import', map_if: '/patent/import' },
          { type: "export2", map_if: "/patent/list" },
          // { type: 'batch_upload', map_if: '/patent/upload' },
          { type: "control", label: "字段" }
          // { type: 'test', label: '测试'}
        ],
        header_slot: ["download"],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "案号",
            prop: "serial",
            is_agency: true,
            width: "160",
            render: this.serialRender
          },
          {
            type: "text",
            label: "标题",
            prop: "title",
            is_import: true,
            width: "200",
            is_agency: true
          },
          {
            type: "text",
            label: "案件类型",
            prop: "subtype",
            is_agency: true,
            render_simple: "name",
            is_import: true,
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "申请国家",
            prop: "area",
            is_import: true,
            width: "120",
            render_simple: "name",
            is_agency: true,
            render_header: true
          },
          {
            type: "text",
            label: "案件状态",
            width: "130",
            prop: "project_stage",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "任务阶段",
            prop: "process_stage",
            render_simple: "name",
            render_header: true,
            width: "110"
          },

          {
            type: "text",
            label: "申请号",
            prop: "application_number",
            is_import: true,
            width: "140",
            is_agency: true
          },
          {
            type: "text",
            label: "申请日",
            prop: "application_date",
            is_import: true,
            width: "123",
            is_agency: true,
            render_header: true
          },

          {
            type: "text",
            label: "IPR",
            prop: "ipr",
            render_simple: "name",
            is_import: true,
            width: "90",
            is_agency: true,
            render_header: true
          },
          {
            type: "text",
            label: "客户",
            prop: "customer",
            render_simple: "name",
            is_import: true,
            width: "90",
            is_agency: true,
            render_header: true
          },
          {
            type: "text",
            label: "客户案号",
            prop: "customer_serial",
            width: "140"
          },
          {
            type: "text",
            label: "提案标题",
            prop: "proposal_title",
            width: "140"
          },
          {
            type: "array",
            label: "申请人",
            prop: "applicants",
            width: "200",
            is_import: true,
            render: _ => {
              return _.map(_ => _.name);
            }
          },
          {
            type: "array",
            label: "发明人",
            width: "198",
            prop: "inventors",
            is_import: true,
            is_agency: true,
            render: _ => {
              return _.map(_ => _.name);
            }
          },
          {
            type: "text",
            label: "代理人",
            width: "90",
            prop: "agent",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          // {
          //   type: "text",
          //   label: "代理人助理",
          //   width: "130",
          //   prop: "assistant",
          //   render_simple: "name",
          //   is_import: true,
          //   render_header: true
          // },
          {
            type: "text",
            label: "联系人",
            width: "90",
            prop: "contact",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "初审人",
            width: "90",
            prop: "first_reviewer",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "复审人",
            width: "90",
            prop: "final_reviewer",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "对外代理人",
            width: "110",
            prop: "representative",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "顾问",
            width: "90",
            prop: "consultant",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "销售",
            width: "90",
            prop: "sales",
            render_simple: "name",
            is_import: true,
            render_header: true
          },
          {
            type: "text",
            label: "订单号",
            width: "160",
            prop: "order",
            render_simple: "serial",
            is_import: true
          },

          {
            type: "text",
            label: "承办部门",
            width: "130",
            prop: "organization_unit",
            render_simple: "name",
            is_import: true,
            render_header: true
          },

          // { type: 'text', label: '技术理解评分', prop: 'tech_rank', is_import: true,  width: '130', show: true, render_header: true},
          // { type: 'text', label: '撰写质量评分', prop: 'draft_rank', is_import: true, width: '130', show: true, render_header: true},
          // { type: 'text', label: '服务态度评分', prop: 'service_rank', is_import: true,  width: '130', show: true, render_header: true},
          // { type: 'text', label: '特别评价', prop: 'negative_flag', is_import: true, width: '110', show: true, render_header: true},
          // { type: 'text', label: '评价详情', prop: 'negative_comment', is_import: true, width: '110', show: true, render_header: true},
          {
            type: "text",
            label: "摘要",
            prop: "abstract",
            width: "200"
          },
          {
            type: "text",
            label: "公开日",
            prop: "publication_date",
            is_import: true,
            width: "110",
            render_header: true
          },
          {
            type: "text",
            label: "公开号",
            prop: "publication_number",
            is_import: true,
            width: "110"
          },
          {
            type: "text",
            label: "初审合格日",
            prop: "pre_exam_ok_date",
            width: "140"
          },
          {
            type: "text",
            label: "进入实审日",
            prop: "sub_exam_start_date",
            width: "140"
          },
          {
            type: "text",
            label: "公告日",
            prop: "issue_date",
            is_import: true,
            width: "110",
            render_header: true
          },
          {
            type: "text",
            label: "公告号",
            prop: "issue_number",
            is_import: true,
            width: "110"
          },
          // { type: 'text', label: '主国际分类号', prop: 'main_ipc',  width: '160',  render_header: true},
          {
            type: "text",
            label: "国际申请日",
            prop: "pct_application_date",
            width: "140"
          },
          {
            type: "text",
            label: "国际申请号",
            prop: "pct_application_number",
            width: "140"
          },
          {
            type: "text",
            label: "国际优先权日",
            prop: "pct_priority_date",
            width: "160"
          },
          {
            type: "text",
            label: "国际公开日",
            prop: "pct_publication_date",
            width: "140"
          },
          {
            type: "text",
            label: "国际公开语言",
            prop: "pct_publication_language",
            width: "160"
          },
          {
            type: "text",
            label: "国际公开号",
            prop: "pct_publication_number",
            width: "140"
          },
          // { type: 'text', label: '复审委内编号', prop: 'board_number',  width: '160',  render_header: true},
          // { type: 'text', label: '证书编号', prop: 'certificate_no',  width: '160',  render_header: true},
          {
            type: "text",
            label: "说明书字数",
            prop: "words_count",
            width: "140"
          },
          {
            type: "text",
            label: "权利要求项数",
            prop: "claims_count",
            width: "140"
          },
          // { type: 'array', label: '标签', prop: 'tags', render: _=>_.map(_=>_.name), is_import: true, width: '123',render_header: true},
          // {
          //   type: "text",
          //   label: "案件等级",
          //   prop: "level",
          //   render_simple: "name",
          //   width: "100",
          // },

          {
            type: "text",
            label: "技术分类",
            width: "160",
            prop: "classification",
            is_import: true,
            render_simple: "name",
            render_header: true
          },
          {
            type: "array",
            label: "优先权",
            prop: "priorities",
            width: "145",
            render: _ => _.map(_ => _.number)
          },
          {
            type: "array",
            label: "产品分类",
            width: "160",
            prop: "products",
            render: _ => _.map(_ => _.name),
            render_header: true
          },
          {
            type: "array",
            label: "案件引用",
            prop: "references",
            width: "200",
            render: _ => _.map(_ => _.title)
          },
          {
            type: "text",
            label: "委案日",
            prop: "entrusting_time",
            render_header: true,
            is_import: true,
            width: "90",
            render: (h, item) => {
              let t = item;
              if (t) {
                t = this.$tool.getDate(new Date(t));
              }
              return h("span", t);
            }
          },
          {
            type: "text-btn",
            label: "摘要附图",
            prop: "figure_file",
            click: this.handleFigure,
            is_import: true,
            width: "90",
            render_text_btn: row => {
              return row.figure_file ? row.figure_file.name : "";
            }
          },
          {
            type: "text",
            label: "实质审查",
            prop: "is_subexam_request",
            is_import: true,
            width: "90",
            render: this.booleanRender
          },
          // { type: 'text', label: '返发明人稿时间', prop: 'first_edition_to_inventor_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核时间', prop: 'inventor_review_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核次数', prop: 'inventor_review_times', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人评分', prop: 'inventor_rank', is_import: true, render: this.rateRender, width: '160', show: false , render_header: true},
          // { type: 'text', label: '返IPR稿时间', prop: 'first_edition_to_ipr_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR定稿时间', prop: 'ipr_final_edition_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR审核次数', prop: 'ipr_review-times', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR首次评分', prop: 'first_ipr_rank', is_import: true, render: this.rateRender, width: '160', show: false},
          // { type: 'text', label: 'IPR终稿评分', prop: 'final_ipr_rank', is_import: true, render: this.rateRender, width: '160', show: false},
          // { type: 'text', label: '代理人撰稿耗时', prop: 'agent_drafting_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核耗时', prop: 'inventor_review_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR审核耗时', prop: 'ipr_review_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '代理人修改耗时', prop: 'amending_period', is_import: true, width: '170', show: false , render_header: true},
          // { type: 'text', label: '详细状态', prop: 'flownode',  width: '180', is_agency: true, render_simple: 'name' , render_header: true},
          {
            type: "text",
            label: "备注",
            prop: "remark",
            width: "123",
            render_header: true
          },
          // { type: 'array', label: '项目/奖项名称', prop: 'awards',  render: _=>{ return _.map(_=>_.name);}, width: '200' , render_header: true},
          {
            type: "text",
            label: "主动修改届满日",
            prop: "active_supplement_expire_date",
            width: "145"
          },
          // { type: 'text', label: '委案类型', prop: 'agency_type',  width: '145' , render_simple: 'name' , render_header: true},
          // { type: 'text', label: '代理人修改时间', prop: 'agent_amending_period',  width: '160' , render_header: true },
          // { type: 'text', label: '立案时间', prop: 'create_time',  width: '145'  , render_header: true},
          {
            type: "text",
            label: "DAS码",
            prop: "das",
            width: "80"
          },
          // { type: 'text', label: '专利族号', prop: 'family_number',  width: '145'  , render_header: true},
          // { type: 'text', label: '群组号', prop: 'group_number',  width: '145' , render_header: true },
          // { type: 'text', label: 'IPR审核次数', prop: 'ipr_review_times',  width: '145'  , render_header: true},
          {
            type: "text",
            label: "PCT19条期限",
            prop: "pct19_expire_date",
            width: "198"
          },
          {
            type: "text",
            label: "PCT国家阶段期限",
            prop: "pct_national_stage_expire_date",
            width: "198"
          },
          {
            type: "text",
            label: "PCT国际初步审查期限",
            prop: "pct_pre_exam_expire_date",
            width: "198"
          },
          {
            type: "text",
            label: "国际检索日",
            prop: "pct_search_date",
            width: "145"
          },
          {
            type: "text",
            label: "优先权期限",
            prop: "priority_expire_date",
            width: "130"
          },
          // { type: 'text', label: '项目名称', prop: 'project_name',  width: '145'  , render_header: true},
          // { type: 'text', label: '项目编号', prop: 'project_serial',  width: '145' , render_header: true },
          {
            type: "text",
            label: "首次年费年度",
            prop: "start_year",
            width: "130"
          },
          // { type: 'text', label: '详细类型', prop: 'type_name',  width: '145' },
          {
            type: "text",
            label: "是否变更",
            prop: "is_amended",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "生物相关",
            prop: "is_biological",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "分案申请",
            prop: "is_division",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "连续案",
            prop: "is_continuation",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "遗传相关",
            prop: "is_genetic",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "不丧失新颖性公开",
            prop: "is_leakage",
            width: "140",
            render: this.booleanRender
          },
          // { type: 'text', label: '是否许可备案', prop: 'is_licensed',  width: '145',render:this.booleanRender , render_header: true},
          {
            type: "text",
            label: "提前公开",
            prop: "is_pre_publication",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "要求优先权",
            prop: "is_priority",
            width: "100",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "保密审查",
            prop: "is_secure_examination",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "序列表",
            prop: "is_sequence",
            width: "90",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "发明+新型",
            prop: "is_utility_or_invention",
            width: "100",
            render: this.booleanRender
          }
        ]
      },
      tableData: []
    };
  },
  computed: {
    ...mapGetters(["areaMap", "menusMap", "nextUser", "userrole"]),
    defaultParams() {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
    defaultStatus() {
      return this.defaultParams.status;
    },
    custom() {
      const custom = this.$route.meta.custom;
      return custom !== undefined ? custom : false;
    }
    // certificateParams () {
    //   const certificate = this.$route.params.id;
    //   return  certificate !== undefined ? certificate : false;
    // }
  },
  methods: {
    ...mapActions([
      "refreshDetailData",
      "initializeSelectorCache",
      "refreshFlows"
    ]),
    // toggle() {
    //   console.log('aa')
    //   this.filterVisible = !this.filterVisible;
    //   console.log(this.filterVisible)
    // },
    handleSendMail(id) {
      this.mailVisible = true;
      this.$nextTick(() => {
        this.$refs.mailEdit.initForm(id);
      });
    },
    handleAddSuccess(val) {
      this.patentAddVisible = false;
      this.refresh();
    },
    handleFigure(row) {
      this.figureVisible = true;
      // this.figures.push(row);
      this.figures.splice(row.length, 0, row.figure_file);
      console.log(this.figures);
    },
    mailCallBack() {
      this.mailVisible = false;
      this.refreshDetailData();
    },
    dropAdd() {
      this.$refs["caseForm"].validate(v => {
        if (v) {
          this.caseVisible = false;
          this.$router.push({
            path: "/patent/add",
            query: { s: this.selectData, t: this.caseForm.caseType }
          });
        } else {
          this.$message({ type: "warning", message: "案件类型不能为空" });
        }
      });
    },
    add() {
      // this.selectData = this.$refs.table.getSelection();
      // if (this.selectData.length != 0) {
      //   this.caseVisible = true;
      // }else {
      //   // this.$router.push('/patent/add');
      //   this.patentAddVisible = true;
      // }
      this.$refs.patentAdd.show("add");
    },
    saveAdd() {
      this.$refs.patentAdd.add();
    },
    ifAgency() {
      const r = this.userrole;
      if (r == 5 || r == 6) {
        const arr = this.tableOption.columns;
        let i = arr.length;
        while (i--) {
          if (!arr[i]["is_agency"]) {
            arr.splice(i, 1);
          }
        }
        this.$forceUpdate();
      }
    },
    booleanRender(h, item) {
      item == 1 ? (item = "是") : (item = "否");
      return h("span", item);
    },
    refreshTableData(option) {
      const url = URL;
      const data = Object.assign({}, option, this.defaultParams);
      const success = d => {
        if (data["format"] == "excel") {
          window.location.href = d.patents.downloadUrl;
        } else {
          this.tableData = d.patents;
        }
        this.loading = false;
      };

      this.refreshProxy = this.$axiosGet({ url, data, success });
    },
    refresh() {
      // this.$refs.table.refresh();
      this.$refs.table.update();
    },
    deletePatent({ title, id }) {
      this.$confirm(`删除后不可恢复，确认删除‘${title}’吗？`)
        .then(() => {
          const url = `${URL}/${id}`;
          const success = _ => {
            this.$refs.table.update();
          };
          this.$axiosDelete({ url, success });
        })
        .catch(() => {});
    },
    detail({ id }) {
      const path = `/patent/list/detail/${id}`;
      this.$router.push(path);
    },
    handleRowClick(row) {
      if (this.menusMap && this.menusMap.get("/patent/read")) {
        this.currentRow = row;
        this.$refs.detail.show(row.id, "patent");
      }
    },
    close() {
      this.$refs.table.setCurrentRow();
    },
    downloadPop() {
      const select = this.$refs.table.getSelect();

      if (select) {
        this.downloadIds = this.$tool.splitObj(select, "id");
        this.downloadVisible = true;
      }
    },
    downloadAxios() {
      if (this.downloadFileType == "") {
        this.$message({ message: "请选择文件类型", type: "warning" });
        return;
      }

      const url = "/patents/documents/download";
      const data = { ids: this.downloadIds, type: this.downloadFileType };
      const success = _ => {
        window.location.href = _.url;
      };
      const complete = _ => {
        this.downloadLoading = false;
      };

      this.downloadVisible = false;
      this.downloadLoading = true;
      this.$axiosPost({ url, data, success, complete });
    },
    save() {
      this.$refs.detail.edit();
    },
    rateRender(h, item) {
      item = item ? item : 0;
      // return (
      //   <el-rate
      //     value={item}
      //     disabled
      //     show-text
      //     text-color="#ff9900"
      //     text-template="{value}">
      //   </el-rate>
      // );
      return h("el-rate", {
        attrs: {
          value: item,
          disabled: true,
          // showText: true,
          textColor: "#f90",
          textTemplate: item + ""
        }
      });
    },
    serialRender(h, item, data) {
      return (
        <span>
          {data.icon && data.icon.length == 2 ? (
            <i class="el-icon-my-keyPoint" style="color: #ff2121">
              <i class="el-icon-my-award" style="color: #f2be45" />
            </i>
          ) : data.icon && data.icon.length == 1 && data.icon[0] == 1 ? (
            <i class="el-icon-my-keyPoint" style="color: #ff2121" />
          ) : data.icon && data.icon.length == 1 && data.icon[0] == 2 ? (
            <i class="el-icon-my-award" style="color: #f2be45" />
          ) : (
            <i />
          )}
          <span>{item}</span>
        </span>
      );
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm=>{
      if(from.path) {
        // vm.loading = true;
      }
    })
  },
  created() {
    this.ifAgency();
    this.initializeSelectorCache({ type: "file_type_patent_notice" });
    this.refreshFlows();
    // this.refreshTaskDefs();
  },
  mounted() {
    if (!this.custom) {
      this.refresh();
    }
  },
  components: {
    AppFilter,
    TableComponent,
    AppTree,
    AppDatePicker,
    AppShrink,
    CommonDetail,
    StaticSelect,
    RemoteSelect,
    MailEdit,
    AppDate,
    PatentAdd,
    AppTable
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
