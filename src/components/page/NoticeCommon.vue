<template>
  <div class="main">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      @refreshTableData="refreshTableData"
      ref="table"
    ></table-component>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import Strainer from "@/components/page_extension/NoticeCommon_strainer";
import AxiosMixins from "@/mixins/axios-mixins";

const config = [
  [
    "patent",
    {
      URL: "/notices",
      import_type: "patent_notice",
      // tree_type: "patent_notices",
      // upload_type: 'patent_notice',
    }
  ],
  [
    "trademark",
    {
      URL: "/notices",
      import_type: "trademark_notice",
      // tree_type: "trademark_notices",
    }
  ],
  [
    "copyright",
    {
      URL: "/notices",
      import_type: "copyright_notice",
      // tree_type: "copyright_notices",
    }
  ]
];
const map = new Map(config);

export default {
  name: "noticeCommon",
  mixins: [AxiosMixins],
  data() {
    return {
      tableOption: {
        header_btn: [
          // { type: 'custom', label: '筛选', icon: '', click: ()=>{alert("筛选")} },
          // { type: 'custom', label: '统计', icon: '', click: ()=>{alert("统计")} },
          { type: "delete", map_if: "/role/admin" },
          { type: "export" },
          // { type: 'import', label: 'CPC通知书导入' },
          // { type: 'batch_upload', label: '一般通知书上传' },
          { type: "control", label: "字段" }
          // { type: 'custom', label: '上传', icon: '', click: ()=>{alert("上传")} },
          // { type: 'custom', label: '批量上传', icon: '', click: ()=>{alert("批量上传")}},
        ],
        height: "default",
        url: "",
        import_type: "",
        // 'upload_type': '',
        is_list_filter: true,
        list_type: "patent_notices",
        treeFilter: "notices",
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "是否发送",
            prop: "is_sent",
            width: "100",
            render: (h, item) => {
              item = item ? "是" : "否";
              return h("span", item);
            },
            render_header: true
          },
          {
            type: "text",
            label: "所属客户",
            prop: "customer",
            render_obj: "project",
            render_simple: "name",
            width: "160",
            render_header: true
          },
          {
            type: "text",
            label: "案号",
            prop: "serial",
            width: "160"
            // render_header: true
          },
          {
            type: "text",
            label: "客户案号",
            prop: "project.customer_serial",
            width: "135",
            is_import: true
          },
          {
            type: "text",
            label: "通知书名称",
            prop: "file_type",
            render_simple: "name",
            width: "150",
            is_import: true,
            render_header: true
          },
          { type: 'text', label: '操作', prop: 'downloadUrl', width: '110', render:(h,item,row)=>{
            return (
              <span>
              {row.is_view ? <a target="_blank" href={row.viewUrl}>查看</a> : ''}
              <a target="_blank" style="margin-left: 5px;" href={row.downloadUrl}>下载</a>
              </span>
              )
          }},
          {
            type: "text",
            label: "案件名称",
            prop: "title",
            width: "200",
            is_import: true
          },
          {
            type: "text",
            label: "申请号",
            prop: "application_number",
            width: "130",
            is_import: true
          },
          {
            type: "text",
            label: "申请日",
            prop: "application_date",
            width: "110",
            is_import: true
          },
          {
            type: "text",
            label: "发文日",
            prop: "mail_date",
            width: "110",
            is_import: true,
            render_header: true,
          },
          {
            type: "text",
            label: "发文序列号",
            prop: "mail_serial",
            width: "160",
            is_import: true
          },
          {
            type: "text",
            label: "官方绝限",
            prop: "legal_deadline",
            width: "110"
          },

          {
            type: "text",
            label: "上传日",
            prop: "creation_time",
            width: "110",
            render_header: true,
          },
          {
            type: "text",
            label: "上传用户",
            prop: "creator_user",
            render_simple: "name",
            width: "110"
          },

          {
            type: "text",
            label: "发送时间",
            prop: "customer_remind_date",
            width: "140"
          },
          // { type: 'text', label: '审查员', prop: 'examiner', width: '200' },
          // { type: 'text', label: '审查部门', prop: 'examiner_dept', width: '200' },
          // { type: 'text', label: '处理状态', prop: 'status', width: '200' },
          // { type: 'text', label: '备注', prop: 'remark', width: '200' },
          // {
          //   type: "action",
          //   label: "操作",
          //   width: "100",
          //   fixed: false,
          //   btns: [
          //     {
          //       type: "view",
          //       btn_type: "text",
          //       click: ({ viewUrl }) => {
          //         window.open(viewUrl);
          //       }
          //     },
          //     {
          //       type: "download",
          //       btn_type: "text",
          //       click: ({ downloadUrl }) => {
          //         window.open(downloadUrl);
          //       }
          //     }
          //   ]
          // }
        ],
        import_columns: [
          // {
          // 	type: 'array',
          // 	label: '费用',
          // 	prop: 'fees',
          // 	width: '400',
          // 	render: _=>{
          // 		return _.map(_=>`${_.name}(${_.fee})`)
          // 	},
          // }
        ]
      },
      tableData: [],
      filter: {}
    };
  },
  computed: {
    defaultParams() {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
    type() {
      let type = this.$route.meta.type;

      return type ? type : "";
    },
    config() {
      if (map.get(this.type)) {
        return map.get(this.type);
      } else {
        return this.type;
      }
    },
    projectType () {
      const en = ['patent', 'trademark', 'copyright']
      const zh = ['专利', '商标', '版权']
      const index = en.findIndex(v=> v==this.type)
      return index != -1 ? zh[index] : '' 
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh();
    },
    refreshTableData(option) {
      const url = this.config.URL;
      const project_type = this.projectType;
      const data = Object.assign({}, option, { project_type }, this.defaultParams);
      const success = _ => {
        if (option.format == "excel") {
          window.location.href = _.list.downloadUrl;
        } else {
          this.tableData = _.notices;
        }
      };

      this.axiosGet({ url, data, success });
    }
  },
  created() {
    this.tableOption.import_type = this.config.import_type;
    // this.tableOption.treeFilter = this.config.tree_type;
    this.tableOption.upload_type = this.config.upload_type;
    this.tableOption.url = this.config.URL;
  },
  mounted() {
    this.refresh();
  },
  components: {
    TableComponent,
    Strainer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>