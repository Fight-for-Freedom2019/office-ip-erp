<!-- table表格公共组件 -->
<template>
  <div class="hjg-table">
    <slot name="bread_mark"></slot>
    <div
      class="table-header"
      v-if="tableOption.is_header === undefined ? true : tableOption.is_header"
      ref="table_header"
    >
      <div class="table-header-left">
        <el-popover
          placement="right"
          width="800"
          trigger="click"
          :value="screenVisible"
          :open-delay="300"
          v-if="tableOption.is_filter ? true : false"
        >
          <app-filter
            :data="filters"
            v-if="tableOption.is_filter === undefined ? true : tableOption.is_filter"
          ></app-filter>
          <el-button
            slot="reference"
            size="small"
            type="primary"
            class="table-header-btn"
            style="margin-right: 5px;"
          >快速筛选</el-button>
        </el-popover>

        <template v-for="btn in tableOption.header_btn">
          <template v-if="headerBtnIf(btn)">
            <template v-if="btn.type == 'custom'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                :icon="btn.icon ? btn.icon : ''"
                @click="handleCommand(btn.click, $event)"
              >{{ btn.label }}</el-button>
            </template>

            <template v-else-if="btn.type == 'control'">
              <!-- <el-dropdown trigger="click" :hide-on-click="false" menu-align="start" > -->
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                :icon="btn.icon ? btn.icon : 'el-icon-menu'"
                @click="dialogControl = true"
              >{{ btn.label ? btn.label : '字段'}}</el-button>
              <!--             <el-dropdown-menu slot="dropdown" style="max-height: 500px; overflow-y: auto; overflow-x:  hidden;">
              <el-dropdown-item style="padding: 0 20px; line-height: 25px;" v-for="(col, index) in tableControl" :key="index" v-if="col.type != 'selection' && col.type != 'action' && col.type != 'expand' && col.show_option">
                <el-checkbox :label="col.label" v-model="col.show" @change="handleControlChange"></el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
              </el-dropdown>-->
            </template>
            <!-- 下拉列表配置 -->
            <template v-else-if="btn.type == 'dropdown'">
              <el-dropdown
                trigger="click"
                placement="bottom-start"
                @visible-change="handleDropdown(btn.click,$event)"
              >
                <el-button
                  class="table-header-btn"
                  size="small"
                  type="primary"
                  :icon="btn.icon ? btn.icon : ''"
                >
                  {{ btn.label }}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <template v-if="btn.items">
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in btn.items"
                      :key="index"
                      :divided="item.divided"
                    >
                      <div
                        @click="handleDelete(item.click, $event)"
                        style="margin: 0 -20px; padding: 0 20px;"
                        v-if="item.type == 'delete'"
                      >删除</div>
                      <div
                        @click="handleCommand(item.click, $event)"
                        style="margin: 0 -20px; padding: 0 20px; font-size: 14px; line-height: 28px;"
                        v-else
                      >
                        <i
                          v-if="!!item.icon"
                          :class="`el-icon-${item.icon}`"
                          style="margin-right: 5px; font-size: 12px; color: #8492A6;"
                        ></i>
                        {{ item.text }}
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>

            <template v-else-if="btn.type == 'date'">
              <div style="display: inline-block; margin-left: 10px;">
                <app-date-picker size="mini" v-model="date"></app-date-picker>
                <el-button size="mini" @click="timeSearch(btn)">搜索</el-button>
                <el-button size="mini" @click="timeClear(btn)" style="margin: 0px;">清空</el-button>
              </div>
            </template>

            <template v-else-if="btn.type == 'add'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="handleCommand(btn.click, $event)"
              >{{ btn.label ? btn.label : '添加' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'edit'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="handleCommand(btn.click, $event)"
              >{{ btn.label ? btn.label : '编辑' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'delete'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-delete"
                @click="handleDelete(btn.click, $event, btn.callback)"
              >{{ btn.label ? btn.label : '删除' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'filter'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="handleCommand(btn.click, $event)"
              >{{ btn.label ? btn.label : '筛选' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'export'">
              <el-dropdown
                trigger="click"
                placement="bottom-start"
                @command="handleExportCommand($event, btn.click)"
              >
                <el-button
                  class="table-header-btn"
                  size="small"
                  type="primary"
                  icon="el-icon-upload2"
                  :loading="exportLoading"
                >{{ exportLoading ? '导出中...' : '导出' }}
                <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all" style="font-size: 14px; line-height: 28px;"><i class="el-icon-d-arrow-right" style="margin-right: 5px; font-size: 12px; color: #8492A6;"></i>导出全部</el-dropdown-item>
                <el-dropdown-item command="choose" divided style="font-size: 14px; line-height: 28px;"><i class="el-icon-check" style="margin-right: 5px; font-size: 12px; color: #8492A6;"></i>导出勾选项</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </template>

            <template v-else-if="btn.type == 'export2'">
              <el-dropdown
                trigger="click"
                placement="bottom-start"
                @command="handleExportCommand1"
              >
                <el-button
                  class="table-header-btn"
                  size="small"
                  type="primary"
                  icon="el-icon-upload2"
                >导出
                <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all" style="font-size: 14px; line-height: 28px;"><i class="el-icon-d-arrow-right" style="margin-right: 5px; font-size: 12px; color: #8492A6;"></i>导出全部</el-dropdown-item>
                <el-dropdown-item command="choose" divided style="font-size: 14px; line-height: 28px;"><i class="el-icon-check" style="margin-right: 5px; font-size: 12px; color: #8492A6;"></i>导出勾选项</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </template>

            <template v-else-if="btn.type == 'import'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-document"
                @click="handleImport(btn.click, $event)"
              >{{ btn.label ? btn.label : '导入' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'batch_upload'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-upload"
                @click="handleBatchUpload(btn.click, $event)"
              >{{ btn.label ? btn.label : '文件上传' }}</el-button>
            </template>

            <template v-else-if="btn.type == 'batch_update'">
              <el-button
                class="table-header-btn"
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="handleBatchUpdate(btn.click, $event)"
              >批量更新</el-button>
            </template>

            <template v-else-if="btn.type == 'report'">
              <el-button
                class="table-header-btn"
                type="primary"
                icon="el-icon-my-report"
                @click="handleBatchUpdate(btn.click, $event)"
              >报表</el-button>
            </template>
          </template>
        </template>

        <el-button
          class="table-header-btn"
          v-if="tableOption.is_list_filter && tableOption.list_type"
          title="筛选"
          style="margin-left: 5px;"
          type="primary"
          size="small"
          @click="_=>{filterVisible = true;setTrigger('btn')}"
        >高级筛选</el-button>
        <template v-if="tableOption.header_slot ? true : false">
          <slot v-for="item in tableOption.header_slot" :name="item"></slot>
        </template>
      </div>
      <div class="table-header-right">
        <template v-if="tableOption.filterFields !== undefined">
          <static-search-input :tableData="data" @input="handleStaticFilterInput" :fields="tableOption.filterFields" @filterTableData="filterTableData" :placeholder="tableOption.search_placeholder == undefined ? '搜索...' : tableOption.search_placeholder"></static-search-input>
        </template>
        <template v-else>
          <search-input
              v-model="search_value"
              :placeholder="tableOption.search_placeholder == undefined ? '搜索...' : tableOption.search_placeholder"
              class="table-search"
              @enter="handleSearch"
              @clear="handleClearInput"
              clearable
              v-if="tableOption.is_search == undefined ? true : tableOption.is_search"
          ></search-input>
        </template>
      </div>
    </div>
    <div class="table-body">
      <div class="table-body-left">
        <template v-if="!!tableOption.treeFilter">
          <app-tree-filter
            :style="tableOption.is_view ?{height: tableHeight/2+ 'px',width: '200px'}:{height: tableHeight - 2 + 'px',width: '200px'}"
            :height="filterHeight"
            :type="tableOption.treeFilter"
            @refresh="handleRefreshTree"
            ref="appTreeFilter"
          ></app-tree-filter>
        </template>
        <template v-if="tableOption.is_view != undefined">
          <app-view
            v-model="fields"
            :columns="optionColumns"
            :list-type="tableOption.list_type"
            @deliver="handleViewData"
            @reset="handleResetView"
            :height="tableHeight/2"
            :style="{maxHeight: tableHeight/2+ 'px',width: '200px',}"
          ></app-view>
        </template>
      </div>
      <template class="table-body-right">
        <app-table
          v-if="refreshRender"
          :class="tableOption.empty_text_position == 'topLeft' ? 'empty-top-left' : ''"
          :style="tableStyle"
          :merge="tableOption.merge === undefined?[]:tableOption.merge"
          :data="!static_search_input?tableData:filter_data"
          v-model="fields"
          :listType="tableOption.list_type!=undefined?tableOption.list_type: ''"
          :expandsCol="tableOption.expandsCol!=undefined?tableOption.expandsCol: 3"
          :expandsSpan="tableOption.expandsSpan!=undefined?tableOption.expandsSpan: 4"
          :showSummary="tableOption.show_summary!=undefined?tableOption.show_summary: false"
          :sumFunc="sumFunc"
          :filterVisible="filterValueVisible"
          :type="tableOption.list_type"
          :border="tableOption.is_border != undefined ? tableOption.is_border : true"
          :default-sort="tableOption.default_sort ? tableOption.default_sort : {}"
          :height="tableOption.height"
          :highlight-current-row="tableOption.highlightCurrentRow !== undefined ? tableOption.highlightCurrentRow : false"
          :columns="columns"
          :expands="expands"
          :table-selected.sync="selected"
          @refreshHeight="_=>{this.tableHeight = _}"
          @sort-change="handleSortChange"
          @update.once="update"
          @row-click="handleRowClick"
          @cell-click="handleCellClick"
          @order="handleSort"
          ref="table"
        >
          <template slot="row_action" slot-scope="scope">
            <slot name="row_action" :row="scope.row"></slot>
          </template>
        </app-table>
      </template>
    </div>
    <div
      class="table-footer"
      v-if="tableOption.is_footer === undefined ? false : tableOption.is_footer"
    >
      <template v-for="btn in tableOption.footer_btn">
        <template v-if="btn.type == 'verify'">
          <el-button
            class="table-header-btn"
            size="medium"
            type="primary"
            @click="handleVerify(btn.click, $event, btn.callback)"
          >{{ btn.label ? btn.label : '确定' }}</el-button>
        </template>
      </template>
    </div>

    <!--v-if="totalNumber > pageSize"-->
    <el-pagination
      v-if="tableOption.is_pagination == undefined ? true : tableOption.is_pagination"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page.sync="page"
      :page-size="pagesize"
      :page-sizes="pagesizes"
      layout="sizes, prev, pager, next, jumper, total"
      :total="totalNumber"
    ></el-pagination>

    <app-import
      v-if="!!tableOption.import_type"
      :visible.sync="dialogImportVisible"
      :columns="import_columns"
      :type="tableOption.import_type"
      @import-success="handleImportSuccess"
    ></app-import>

    <el-dialog
      class="dialog-small"
      v-if="tableOption.update_type !== undefined"
      :visible.sync="dialogUpdateVisible"
      title="批量更新"
    >
      <batch-update :type="tableOption.update_type" @success="handleBatchUpdateSuccess"></batch-update>
    </el-dialog>

    <file-upload
      v-if="tableOption.upload_type !== undefined"
      :type="tableOption.upload_type"
      @uploadSuccess="refresh"
      ref="file_upload"
    ></file-upload>

    <el-dialog
      width="650px"
      :visible.sync="dialogControl"
      title="字段控制"
      @close="transferValue = control; $refs.transfer.clear();"
    >
      <div
        style="margin-bottom: 10px;
    padding-left: 50px;
    color: rgb(132, 146, 166);"
      >提示：可拖动字段调整顺序</div>
      <app-transfer
        ref="transfer"
        title1="未显示"
        title2="已显示"
        placeholder="查询字段..."
        v-model="transferValue"
        style="text-align: center;"
      ></app-transfer>
      <div style="margin-top: 20px;margin-left: 20px;">
        <el-button type="primary" @click="controlSave">保存</el-button>
        <el-button type="danger" @click="dialogControl = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-if="exportType"
      :title="exportType.title"
      :visible.sync="dialogExport"
      class="dialog-small"
    >
      <app-export
        :url="tableOption.url"
        :fields="transferValue[1]"
        :default="default_choose"
        :response-key="exportType.key"
        @success="dialogExport = false"
        :filter="requesOption"
        :selected="selected"
        :export-way="exportWay"
      ></app-export>
    </el-dialog>
    <list-filter
      v-if="tableOption.is_list_filter && tableOption.list_type"
      :type="tableOption.list_type"
      :visible.sync="filterVisible"
      :refresh="refresh"
      ref="listFilter"
    ></list-filter>
  </div>
</template>

<script>
import AppDatePicker from "@/components/common/AppDatePicker";
import AppFilter from "@/components/common/AppFilter";
import AppImport from "@/components/common/AppImport";
import FileUpload from "@/components/common/FileUpload";
import SearchInput from "@/components/common/SearchInput";
import AppTransfer from "@/components/common/AppTransfer";
import BatchUpdate from "@/components/common/BatchUpdate";
import AppTable from "@/components/common/AppTable";
import AppExport from "@/components/common/AppExport";
import ListFilter from "@/components/common/AppListFilter";
import AppTreeFilter from "@/components/common/AppTreeFilter";
import AppView from "@/components/common/AppView";
// import {fieldExceptMap} from '@/const/fieldConfig'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "tableComponent",
  // inject:['reload'],
  props: [
    "tableOption",
    "data",
    "tableStyle",
    "refreshProxy",
    // "filter",  //没用到
    "refreshTableData",
    // "feeBonus",
    // "filterVisibles"
  ],
  data() {
    const data = {
      testDate: [],
      pageData: [],
      pageSize: 5,
      pagesizes: [10, 20, 40, 100, 500],
      currentPage: 1,
      //tableSelect 当前列表如果有checkbox,已选择的行数据
      tableSelect: [],
      // expands: [],
      searchClass: "table-search",
      date: [],
      search_value: "",
      page: 1,
      sort: { field: null, order: null },
      fieldSort: "",
      dialogImportVisible: false,
      dialogUpdateVisible: false,
      exportLoading: false,
      dialogControl: false,
      control: "",
      transferValue: "",
      refreshRender: true,
      dialogExport: false,
      fields: "",
      optionColumns: "",
      selected: [],
      exportWay: '',
      filterVisible: false,
      filterValueVisible: false,
      strainerParams: {},
      tableHeight: "",
      static_search_input:"",
      filter_data:[],
    };

    return data;
  },
  computed: {
    ...mapGetters([
      "filterLock",
      "screenVisible",
      "filterForm",
      "pagesize",
      "menusMap"
    ]),
    expands() {
      const expands = [];
      this.columns.forEach(_ => {
        if (_.expanded != undefined && _.expanded) {
          expands.push(_);
        }
      });
      return expands;
    },
    sumFunc() {
      return this.tableOption.sumFunc != undefined
        ? this.tableOption.sumFunc
        : _ => {
            return false;
          };
    },
    filterHeight() {
      const h = this.tableOption.is_view
        ? this.tableHeight / 2
        : this.tableHeight;
      return parseInt(h);
    },
    default_choose() {
      return this.control[1].map(_ => _.key);
    },
    path() {
      return this.$route.path;
    },
    tableData() {
      const d = this.data;
      let r;

      if (!d) return [];

      if (d instanceof Array) {
        r = d;
      } else {
        r = d.data ? d.data : [];
      }

      return r;
    },
    exportType() {
      const e = this.tableOption.import_type;
      if (!e) return "";

      const map = new Map([
        ["patent", { key: "patents",  title: "导出专利"}],
        ["trademark", { key: "trademarks",  title: "导出商标"}],
        ["copyright", { key: "copyrights",  title: "导出版权"}],
        ["process", { key: "processes", title: "导出工作流"}],
        ["certificate", { key: "certificates", title: "导出专利证书"}],
        ["fees_in", { key: "data", title: "导出应收费用"}],
        ["fees_out", { key: "data", title: "导出应付费用"}],
        ["renewal_fees", { key: "data", title: "导出年费"}],
      ]);

      const o = map.get(e);
      return o ? o : e;
    },
    totalNumber() {
      const d = this.data;
      if (d instanceof Array) {
        return d.length;
      } else {
        return d.total ? d.total : 0;
      }
    },
    filters() {
      const d = this.data;
      let filter = [];

      if (d && d.filters) {
        filter = d.filters;
      }

      return filter;
    },
    requesOption() {
      const obj = {
        page: this.page,
        listRows: this.pagesize
      };
      //查询关键字
      if (this.search_value) {
        obj.keyword = this.search_value;
      }
      //排序参数
      if (this.sort.field) {
        const field = this.sort.field;
        const order = this.sort.order == "descending" ? "desc" : "asc";
        obj.sort = `${field}-${order}`;
      }
      if (this.fieldSort) {
        obj.sort = this.fieldSort;
      }
      return obj;
    },
    url() {
      return this.tableOption.url ? this.tableOption.url : "";
    },
    import_if() {
      const h = this.tableOption.header_btn;
      let flag = false;
      if (h) {
        h.forEach(_ => {
          if (_.type == "import" && _.click == undefined) flag = true;
        });
      }

      return flag;
    },
    import_columns() {
      const c = this.optionColumns;
      const a = c.filter(_ => _.is_import);
      if (this.tableOption.import_columns) {
        a.push(...this.tableOption.import_columns);
      }

      return a;
    },
    bread_header_height() {
      // 计算出面包屑和table-header所在宽度
      return this.$refs.table_header
        ? this.$refs.table_header.clientHeight + 62
        : "";
    },
    //计算列表项
    columns() {
      let cols = this.optionColumns;
      if (cols) {
        const c = this.control[1]; //字段控制器
        const o = {}; //hash映射
        let s = ""; //暂存selection项
        let a = ""; //暂存action项
        const static_arr = []; //暂存不可调控的字段项
        //分离特殊项
        cols.forEach(_ => {
          if (_.prop) {
            o[_.prop] = _;
          }
          if (_.show_option == false) {
            static_arr.push(_);
          }
          if (_.type == "selection") {
            s = _;
          }
          if (_.type == "action") {
            a = _;
          }
        });

        //按顺序调整字段

        let arr = [];
        c.forEach(_ => {
          const item = o[_.key];
          if (item) {
            arr.push(item);
          }
        });
        //无论论如何调整 selection总在最前 action总在最后
        //static_arr代表配置限制不可调整顺序的字段(通过show_option控制)
        if (a) {
          arr.push(a);
        }
        if (static_arr.length != 0) {
          arr = [...static_arr, ...arr];
        }
        if (s) {
          arr.unshift(s);
        }
        // console.log(c)
        // console.log('+++++++columns')
        // console.log(arr)
        return arr;
      } else {
        return [];
      }
    },
    searchRadius() {
      const filter =
        this.tableOption.is_list_filter === undefined
          ? false
          : this.tableOption.is_list_filter;
      return filter ? "border-radius: 0 4px 4px 0;" : "border-radius: 4px;";
    },
    filterRadius() {
      const search =
        this.tableOption.is_search === undefined
          ? true
          : this.tableOption.is_search;
      return search ? "border-radius: 4px 0 0 4px;" : "border-radius: 4px;";
    }
  },
  methods: {
    ...mapMutations(["setPageSize", "setBreadHeaderHeight"]),
    ...mapActions(["clearFilter", "fillListFilter", "setTrigger"]),
    handleResetView() {
      this.$tool.delCookie(this.path);
      this.initControl();
      this.clearFilter(true);
      this.refreshRender = false;
      this.$nextTick(_ => {
        this.refreshRender = true;
      });
    },
    handleViewData(val) {
      // 存在cookie
      this.clearFilter(true);
      const obj = this.$tool.shallowCopy(val.param, { skip: ["allFields"] });
      this.$tool.setCookie(this.path, JSON.stringify(obj));

      this.initControl();
      this.refreshRender = false;
      this.$nextTick(_ => {
        this.refreshRender = true;
      });
    },
    handleRefreshTree(val) {
      this.strainerParams = val;
    },
    handleClearInput(val) {
      this.search_value = "";
      this.$nextTick(() => {
        this.handleSearch();
      });
    },
    handleExportCommand(e, func) {
      console.log(e);
      console.log(func)
      this.exportWay = e;
      if(e == 'all') {
        this.handleExport(func, e);
      }else{
       const flag = this.getSelected();
        if(flag) {
          this.handleExport(func, e);
        }
      }
    },
    handleExportCommand1(command) {
      this.exportWay = command;
      if(command == 'all') {
       this.dialogExport = true;
      }else{
       const flag = this.getSelected();
        if(flag) {
           this.dialogExport = true; 
        }
      }
    },
    handleInput(val) {},
    initOptionColumns() {
      let columns = this.tableOption.columns;
      if (this.tableOption.name) {
        // const exceptName = fieldExceptMap.get(this.tableOption.name);
        // if(exceptName) {
        //   const except = this.$store.getters[exceptName];
        //   const exceptMap = new Map();
        //   except.forEach(v => {exceptMap.set(v, true)});
        //   columns = columns.filter(v => !exceptMap.get(v.prop));
        // }
      }
      const routerPath = this.$route.path;
      const task_finish = /finished/.test(routerPath) ? 1 : 0;
      if (task_finish) {
        columns = columns.filter(v => !(v.prop === "flownode"));
      }
      this.optionColumns = columns;
    },
    initView() {
      let fields = [];
      let cols = this.optionColumns;
      for (let c of cols) {
        let show_option = c.show_option !== undefined ? c.show_option : true;
        if (
          show_option &&
          (c.type == "text" || c.type == "array" || c.type == "text-btn")
        ) {
          const item = { key: c.prop, value: c.prop, label: c.label };
          fields.push(item);
        }
      }
      this.fields = fields;
    },
    initControl() {
      let cols = "";
      let obj = {};
      const viewCookie = JSON.parse(this.$tool.getCookie(this.path));
      const q = viewCookie && viewCookie.query ? viewCookie.query : [];
      const v =
        viewCookie && viewCookie.selectedFields
          ? viewCookie.selectedFields.split(",")
          : [];
      if (v && v.length != 0) {
        const o = {};
        const arr = [];
        this.optionColumns.forEach(_ => {
          if (_.prop) {
            o[_.prop] = _;
          }
        });
        v.forEach(_ => {
          const item = o[_];
          if (item) {
            arr.push(item);
          }
        });
        cols = arr;
        q.forEach(_ => {
          obj[_.key] = _;
        });
        this.fillListFilter(obj);
      } else {
        cols = this.optionColumns;
      }

      let tableCookie = JSON.parse(this.$tool.getLocal(this.tableOption.name));
      // if(this.certificate && this.tableOption.certificate_columns) {
      //     console.log(...this.tableOption.certificate_columns);
      //     cols.push(...this.tableOption.certificate_columns);
      // }
      // 控制某一页面下字段显示
      if (/bonus/.test(this.feePath)) {
        cols = cols.filter(_ => _.is_bonus);
      } else if (/subsidy/.test(this.feePath)) {
        cols = cols.filter(_ => _.is_subsidy);
      } else if (/oa/.test(this.feePath)) {
        cols = cols.filter(_ => _.is_oa);
      }
      //获取控制器
      let control = [[], []];
      for (let c of cols) {
        let show = c.show == undefined ? true : c.show;
        let show_option = c.show_option !== undefined ? c.show_option : true;
        if (
          show_option &&
          (c.type == "text" || c.type == "array" || c.type == "text-btn")
        ) {
          const item = { key: c.prop, value: c.prop, label: c.label };
          if (show) {
            control[1].push(item);
          } else {
            control[0].push(item);
          }
        }
      }

      //控制器合并获得fields集合
      let fields = [...control[1], ...control[0]];

      //检测缓存中是否存在控制器
      if (tableCookie) {
        const cookieO = {};
        const localO = {};

        //一些本地缓存的异常检测
        const error = (_ => {
          //老版本缓存
          if (!(tableCookie[0] instanceof Array)) {
            return true;
          }

          //字段统一性验证

          tableCookie.forEach(_ => {
            _.forEach(d => {
              cookieO[d.key] = false;
            });
          });

          fields.forEach(d => {
            localO[d.key] = d;
          });

          const cache = Object.assign({}, localO, cookieO);
          if (this.$tool.getObjLength(localO) != this.$tool.getObjLength(cache))
            return true;
          for (let key in cache) {
            if (cache[key]) {
              return true;
            }
          }
        })();

        //若存在错误,则将本地缓存清空,无错误则替换原有控制器
        if (error) {
          this.$tool.deleteLocal(this.tableOption.name);
        } else {
          tableCookie.forEach(_ => {
            _.forEach(d => {
              d.label = localO[d.key]["label"];
            });
          });
          control = tableCookie;
        }
      }
      this.control = control;
      this.transferValue = control;
    },
    getPageData(c) {
      const d = this,
        start = (c - 1) * d.pageSize,
        end = c * d.pageSize;

      return d.tableData.slice(start, end);
    },
    getSelection() {
      return this.$refs.table.selected;
    },
    headerBtnIf(_) {
      if (_.map_if) {
        if (this.menusMap && this.menusMap.get(_.map_if)) {
          if (_.btn_if) {
            if (/draftbox/.test(this.path)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    handleRowClick(row, event, column) {
      // if(c.fixed) return false;
      const func = this.tableOption.rowClick;
      if (func) func(row, event, column);
    },
    handleCellClick(row, column, cell, event) {
      const func = this.tableOption.cellClick;
      if (func) func(row, column, cell, event);
    },
    handleExport(func, e) {
      // const fields = this.tableControl.filter(_=>{
      //   if(_.show && _.prop) {
      //     return true;
      //   }
      // }).map(_=>_.prop);

      if (func) {
        func(e);
      } else {
        //合并获得导出请求的请求参数
        const ids = this.exportWay == 'all' ? undefined : this.selected.map(_=>_.id);
        if (this.refreshTableData) {
          this.refreshTableData(
            Object.assign({}, this.getRequestOption(), this.filterForm, {
              format: "excel",
              ids,
            })
          );
        }
        this.$emit(
          "refreshTableData",
          Object.assign({}, this.getRequestOption(), this.filterForm, {
            format: "excel",
            ids,
          })
        );
        //Vue Api.
        this.$nextTick(_ => {
          if (this.refreshProxy) {
            this.exportLoading = true;
            this.refreshProxy.then(_ => {
              window.setTimeout(_ => {
                this.exportLoading = false;
              }, 500);
            });
          }
        });

        // if(a) { a.then(_=>{console.log('exportExcess')}) };
      }
    },
    handleImport(func, e) {
      if (func) {
        func(e);
      } else {
        // this.$message({message: '导入接口开发中', type: 'warning'})
        this.dialogImportVisible = true;
      }
    },
    handleBatchUpload(func, e) {
      if (func) {
        func(e);
      } else {
        this.$refs.file_upload.show();
      }
    },
    handleBatchUpdate(func, e) {
      if (func) {
        func(e);
      } else {
        this.dialogUpdateVisible = true;
      }
    },
    handleBatchUpdateSuccess() {
      this.dialogUpdateVisible = false;
      this.update();
    },
    handleVerify(func, e, callback) {
      if (func) {
        func(e);
      } else {
        const s = this.getSelect(true);
        this.$emit("getRowData", s);
      }
    },
    handleDelete(func, e, callback) {
      const s = this.getSelect(true);
      if (func) {
        func(e, s); // 自定义方法可能也会选中行id
      } else {
        if (s.length == 0) {
          this.$message({ message: "请选择需要删除的列表项", type: "warning" });
        } else {
          this.$confirm("删除后不可恢复，确认删除？", "删除确认", {
            type: "warning"
          })
            .then(_ => {
              const url = this.url;
              const data = { id: this.$tool.splitObj(s, "id") }; // 见/const/tool.js splitObj函数的注释
              const success = _ => {
                this.$message({ type: "success", message: "删除成功" });
                this.update();

                if (callback) {
                  callback(_);
                }
              };
              this.$axiosDelete({ url, data, success });
            })
            .catch(_ => {
              console.log(_);
            });
        }
      }
    },
    handleCommand(func, event) {
      if (func) {
        func(event);
      }
    },

    handleDropdown(func, event) {
      if (func) {
        func(event);
      }
    },

    arrayRender(row, col) {
      const arr = row[col.prop];
      return col.render ? col.render(arr) : arr;
    },
    handleCurrentChange(currentPage) {
      const func = this.tableOption.currentChange;
      if (func) {
        func(currentPage);
      }

      this.update();
    },
    handleSizeChange(size) {
      this.setPageSize(size);
      const func = this.tableOption.sizeChange;
      if (func) {
        func(size);
      }

      this.reset();
    },
    handleSort(val) {
      this.fieldSort = val;
      this.reset();
    },
    handleSortChange({ column, prop, order }) {
      this.sort.field = prop;
      this.sort.order = order;
      const func = this.tableOption.sortChange;
      if (func) {
        func(column, prop, order);
      }

      this.reset();
    },
    handleSearch() {
      const func = this.tableOption.handleSearch;

      if (func) {
        func(this.search_value);
      } else {
        this.reset();
      }
    },
    filterTableData(val){
      this.filter_data = val;
    },
    handleStaticFilterInput(val){
      this.static_search_input = val;
    },
    timeSearch({ search }) {
      if (search) {
        search();
      }

      this.reset();
    },
    timeClear({ clear }) {
      if (clear) {
        clear();
      }

      this.date = [];
      this.reset();
    },
    //获取列表参数,包括page,listRows,查询关键字,排序参数
    getRequestOption() {
      const copy = this.$tool.deepCopy(this.requesOption);
      return copy;
    },
    getSelect(flag = false) {
      return this.$refs.table.getSelected(flag);
    },
    getSelected(flag = false) {
      return this.$refs.table.getSelected(flag);
    },
    update() {
      if (this.refreshTableData) {
        this.refreshTableData(
          Object.assign(
            {},
            this.getRequestOption(),
            this.filterForm,
            this.strainerParams
          )
        );
      }
      if (this.$refs.appTreeFilter) {
        this.$refs.appTreeFilter.refreshTreeData();
      }
      this.$emit(
        "refreshTableData",
        Object.assign(
          {},
          this.getRequestOption(),
          this.filterForm,
          this.strainerParams
        )
      );
    },
    search(val) {
      this.page = 1;
      this.search_value = val;
      this.update();
    },
    reset() {
      this.page = 1;
      this.update();
    },
    refresh() {
      this.page = 1;
      // this.search_value = "";
      this.update();
    },
    handleImportSuccess() {
      this.$message({ message: "导入成功", type: "success" });
      this.dialogImportVisible = false;
      this.refresh();
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    controlSave() {
      this.refreshRender = false;
      this.control = this.transferValue;
      this.dialogControl = false;

      //存入cookie
      this.$tool.setLocal(this.tableOption.name, JSON.stringify(this.control));

      //element-ui的table插件因为一些缓存的设计在这里会发生错误,使用vue的v-if特性强制重新渲染table
      this.$nextTick(_ => {
        this.refreshRender = true;
      });
    }
  },
  watch: {
    requesOption: {
      handler: function() {},
      deep: true
    },
    strainerParams() {
      this.update();
    },
    filterForm(val) {
      if (this.filterLock) return;
      this.refresh();
    }
    // filterValueVisible(val) {
    // if(val == false) {
    //   // 因为关闭测试筛选时，视图数据无法及时更新，则强制刷新当前路由加载数据
    //    this.reload();
    // }
    // hack 重新渲染tabel
    // this.refreshRender = false;
    // this.$nextTick(_ => {
    //   this.refreshRender = true;
    // });
    // }
  },
  beforeDestroy() {
    // this.clearFilter();
    // this.filterValueVisible = false;
  },
  mounted() {
    this.setBreadHeaderHeight(this.bread_header_height);
    this.tableHeight = this.$refs.table.tableHeight;
  },
  created() {
    // window.setTimeout(() => {
    //   console.log('yanshi')
    //   this.filterValueVisible = true;
    // }, 0);
    this.initOptionColumns();
    this.initView();
    this.initControl();
  },
  components: {
    TableRender: {
      render: function(h) {
        return this.render(
          h,
          this.scope.row[this.prop],
          this.scope.row,
          this.prop
        );
      },
      props: {
        render: null,
        scope: null,
        simple: {
          type: Boolean,
          default: false
        },
        prop: {
          type: String,
          default: ""
        }
      }
    },
    AppDatePicker,
    AppFilter,
    AppImport,
    FileUpload,
    SearchInput,
    AppTransfer,
    BatchUpdate,
    AppTable,
    AppExport,
    ListFilter,
    AppTreeFilter,
    AppView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.table-header i.el-icon-menu {
  font-size: 13px;
}
.el-badge {
  vertical-align: initial;
}
/*.el-table__expand-column {
  display: none;
}*/
/*.hjg-table {
  -moz-user-select:none; 
  -webkit-user-select:none; 
  -ms-user-select:none; 
  -khtml-user-select:none; 
  user-select:none;
}*/
/*.table-header-btn {
  margin: 0;
  margin-right: 10px;
}*/
</style>
<style scoped lang="scss">
.table-header {
  margin-bottom: 10px;
  display: flex;
}
.table-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.table-header-left {
  flex: 1;
  line-height: 40px;
}
.table-header-right {
}
.table-search {
  width: 250px;
}
.el-button + .el-dropdown {
  margin-left: 10px;
}
.el-dropdown + .el-button {
  margin-left: 10px;
}
.el-dropdown + .el-dropdown {
  margin-left: 10px;
}
.table-body {
  display: flex;
}
.table-body-left {
  // flex: 1;
  flex-direction: column;
}
.table-body-right {
  flex: 1;
}
</style>