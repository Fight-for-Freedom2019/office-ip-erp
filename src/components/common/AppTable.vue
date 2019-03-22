<template>
  <el-table
    ref="table"
    stripe
    :data="tableData"
    :border="border"
    :row-key="rowKey"
    :default-sort="defaultSort"
    :highlight-current-row="highlightCurrentRow"
    :height="tableHeight"
    :max-height="maxHeight"
    :span-method="spanMethod"
    :show-summary="showSummary"
    :show-header="showHeader"
    :summary-method="sumFunc"
    @selection-change="handleSelectionChange"
    @sort-change="_=>{$emit('sort-change', _)}"
    @row-click="handleRowClick"
    @cell-click="handleCellClick"
    @cell-mouse-enter="handleMouseEnter"
    @header-dragend="handleHeaderDragend"
  >
    <template v-if="expand">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline style="margin-left: 48px" class="table-expand">
            <template v-for="i in computeRow">
              <el-row :gutter="20">
                <template v-for="(field,index) in expandFields">
                  <el-col :span="expandsSpan" v-if="(i-1)*expandsCol<=index && index<i*expandsCol">
                    <el-form-item :label="field.label">
                      <!--<span>{{ props.row[field.prop] }}</span>-->
                      <template v-if="field.type==='array'">
                        <template v-for="(item, i) in scope.row[field.prop]">
                          <el-tag
                              style="margin-left: 5px;"
                              disable-transitions
                              size="small"
                              :key="i"
                              v-if="typeof(item) === 'string'"
                          >{{ item }}</el-tag>
                          <el-tag
                              style="margin-left: 5px;"
                              disable-transitions
                              size="small"
                              :key="i"
                              :class="item && item.classname ? item.classname :''"
                              v-else
                          >{{ item && item.name ? item.name : '' }}</el-tag>
                        </template>
                      </template>
                      <template v-else-if="field.render&&field.type==='text'">
                        <table-render :render="field.render" :scope="scope" :prop="field.prop"></table-render>
                      </template>
                      <template v-else-if="!field.render&&field.type==='text'">
                        <span>{{handleExpandFields(scope.row,field,scope)}}</span>
                      </template>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
          </el-form>
        </template>
      </el-table-column>
    </template>
    <template v-for="(col, index) in columns">
      <template v-if="col.type == 'selection'">
        <el-table-column type="selection"></el-table-column>
      </template>

      <!--         <template v-else-if="col.type == 'expand'">
      <el-table-column type="expand">
        <template scope="scope">
          <slot name="expand" :row="scope.row">
          </slot>
        </template>
      </el-table-column>
      </template>-->
      <template v-else-if="col.type == 'text'">
        <template v-if="col.render ? true : false">
          <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :align="col.align !== undefined ? col.align :'left'"
            :header-align="col.header_align !== undefined ? col.header_align :'left'"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="col.render_text ? true : false ">
          <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span class="table-column-render">{{ col.render_text(scope.row[col.prop],scope.row) }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="col.map_key ? true : false ">
          <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span class="table-column-render">{{ mapRender(scope,col) }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="col.render_simple ? true : false ">
          <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop" 
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span class="table-column-render">{{ handleSimple(scope.row, col) }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-else>
          <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
            :align="col.align !== undefined ? col.align :'left'"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <!-- <template v-if="col.default !== undefined" scope="scope">{{ scope.row[col.prop] ? scope.row[col.prop] : col.default }}</template> -->
          </el-table-column>
        </template>
      </template>
      <template v-else-if="col.type == 'text-copy'">
        <el-table-column
            :label="col.label"
            :prop="col.prop"
            :key="col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :align="col.align !== undefined ? col.align :'left'"
            :header-align="col.header_align !== undefined ? col.header_align :'left'"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span>{{scope.row[col.prop]}}</span>
              <el-button type="text" @click="copyText(scope, $event)" v-if="scope.row[col.prop]" style="margin-left:10px;padding:0px 20px;">复制</el-button>
            </template>
          </el-table-column>
      </template>
      <template v-else-if="col.type == 'text-btn'">
        <template v-if="col.render_text_btn ? true : false">
          <el-table-column
            :label="col.label"
            :prop="col.render ? `${col.prop}__render` : col.prop"
            :key="col.render ? `${col.prop}__render` : col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
            :align="col.align !== undefined ? col.align :'left'"
            :header-align="col.header_align !== undefined ? col.header_align :'left'"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                style="padding: 0;"
                @click="handleActionCommand(col.click, scope, $event)"
              >{{col.render_text_btn(scope.row)}}</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="col.custom_text ? true : false">
          <el-table-column
            :label="col.label"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader:null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                style="padding: 0;"
                @click="handleActionCommand(col.click, scope, $event)"
              >{{col.custom_text}}</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :label="col.label"
            :prop="col.render ? `${col.prop}__render` : col.prop"
            :key="col.render ? `${col.prop}__render` : col.prop"
            :width="col.width ? col.width : ''"
            :min-width="col.min_width ? col.min_width : ''"
            :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
            :class-name="col.className? col.className : ''"
          >
            <!--:render-header="col.render_header ? handleRenderHeader : null"-->
            <template slot="header" slot-scope="scope">
              <span>{{col.label}}</span>
              <el-popover
                placement="bottom"
                v-model="filterComponentPopover[scope.column.property]"
                @show="showPopover(scope.column.property)"
                v-if="col.render_header !== undefined"
              >
                <lists-filter
                  @order="order"
                  v-if="filterComponent[scope.column.property]"
                  :activePop="activePop"
                  :field="col.prop"
                  :listType="listType"
                  @hide="hidePopover"
                ></lists-filter>
                <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                style="padding: 0;"
                @click="handleActionCommand(col.click, scope, $event)"
              >{{scope.row[col.prop]}}</el-button>
            </template>
          </el-table-column>
        </template>
      </template>

      <template v-else-if="col.type == 'array'">
        <el-table-column
          :label="col.label"
          :prop="col.render ? `${col.prop}__render` : col.prop"
          :key="col.render ? `${col.prop}__render` : col.prop"
          :width="col.width ? col.width : ''"
          :min-width="col.min_width ? col.min_width : ''"
          :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true"
          :class-name="col.className? col.className : ''"
        >
          <!--:render-header="col.render_header ? handleRenderHeader:null"-->
          <template slot="header" slot-scope="scope">
            <span>{{col.label}}</span>
            <el-popover
              placement="bottom"
              v-model="filterComponentPopover[scope.column.property]"
              @show="showPopover(scope.column.property)"
              v-if="col.render_header !== undefined"
            >
              <lists-filter
                @order="order"
                v-if="filterComponent[scope.column.property]"
                :activePop="activePop"
                :field="col.prop"
                :listType="listType"
                @hide="hidePopover"
              ></lists-filter>
              <el-button slot="reference" type="text" icon="el-icon-my-filter-btn"></el-button>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <template v-for="(item, i) in scope.row[scope.column.property]">
              <el-tag
                style="margin-left: 5px;"
                disable-transitions
                size="small"
                :key="i"
                v-if="typeof(item) === 'string'"
              >{{ item }}</el-tag>
              <el-tag
                style="margin-left: 5px;"
                disable-transitions
                size="small"
                :key="i"
                :class="item && item.classname ? item.classname :''"
                v-else
              >{{ item && item.name ? item.name : '' }}</el-tag>
            </template>
          </template>
        </el-table-column>
      </template>

      <template v-else-if="col.type == 'action'">
        <el-table-column
          type="action"
          :label="col.label ? col.label : '操作'"
          :width="col.width ? col.width : ''"
          :min-width="col.min_width ? col.min_width : ''"
          header-align="center"
          :fixed="col.fixed === false ? false : 'right'"
          :class-name="col.className? col.className : ''"
        >
          <template slot-scope="scope">
            <template v-if="col.btns_render ? true : false">
              <slot name="row_action" :row="scope.row"></slot>
            </template>
            <template
              v-else
              v-for="(btn, index) in col.btns"
              v-if="btn.btn_if ? btn.btn_if(scope.row) : true"
            >
              <el-dropdown
                v-if="btn.type == 'dropdown'"
                :key="index"
                trigger="click"
                menu-align="start"
              >
                <el-button
                  class="table-header-btn"
                  :type="btn.btn_type ? btn.btn_type : ''"
                  :size="btn.size ? btn.size : 'mini'"
                  :icon="btn.icon ? btn.icon : ''"
                >
                  {{ btn.label }}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu v-if="btn.items">
                  <el-dropdown-item
                    v-for="(item,index2) in btn.items"
                    :key="index2"
                    :divided="item.divided"
                  >
                    <div
                      @click="handleCommand(item.click, $event)"
                      style="margin: 0 -10px; padding: 0 10px;"
                    >{{ item.text }}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                v-else-if="btn.type == 'confirm'"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="edit"
                @click="handleActionCommand(btn.click, scope, $event)"
              >确认</el-button>

              <el-button
                v-else-if="btn.type == 'edit'"
                :disabled="handleBtnBoolean(btn, scope.row, 'btn_disabled')"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="edit"
                @click="handleActionCommand(btn.click, scope, $event)"
              >编辑</el-button>

              <el-button
                v-else-if="btn.type == 'detail'"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="information"
                @click="handleActionCommand(btn.click, scope, $event)"
              >详情</el-button>

              <el-button
                v-else-if="btn.type == 'delete'"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="delete"
                @click="handleActionCommand(btn.click, scope, $event)"
              >删除</el-button>

              <el-button
                v-else-if="btn.type == 'download'"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="my-download"
                @click="handleActionCommand(btn.click, scope, $event)"
              >下载</el-button>

              <el-button
                v-else-if="btn.type == 'view' && (scope.row.isView || scope.row.is_view || scope.row.file && scope.row.file.is_view)"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                icon="view"
                @click="handleActionCommand(btn.click, scope, $event)"
              >查看</el-button>

              <el-button
                v-else-if="btn.type == undefined || btn.type == 'custom'"
                :disabled="handleBtnBoolean(btn, scope.row, 'btn_disabled')"
                :type="btn.btn_type ? btn.btn_type : 'text'"
                :key="index"
                :size="btn.size ? btn.size : 'mini'"
                :icon="btn.icon"
                @click="handleActionCommand(btn.click, scope, $event)"
              >{{ btn.label }}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
  <!-- <view-pop type="add" :visible="viewVisible" v-model="fields" @close="v=>{viewVisible = v}"></view-pop> -->
</template>
<script>
import { mapGetters } from "vuex";
import FilterValue from "@/components/common/FilterValue";
import ListsFilter from "@/components/common/ListsFilter";
import ViewPop from "@/components/common/ViewPop";
import { map as filterConfig } from "@/const/headerFilterConfig";
import { mapActions } from "vuex";
const labelMap = new Map();
export default {
    name: "appTable",
    props: {
        listType: {
            type: String,
            default: ""
        },
        filterVisible: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Boolean, Array]
            // required: true,
        },
        border: {
            type: Boolean,
            default: false
        },
        rowKey: {
            type: null,
            default: "id"
        },
        merge: {
            type: Array,
            default() {
                return [];
            }
        },
        defaultSort: {
            type: Object,
            default() {
                return {};
            }
        },
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number]
        },
        columns: {
            type: Array,
            required: true
        },
        expands: {
            type: Array,
            default() {
                return [];
            }
        },
        data: {
            type: Array,
            required: true
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        sumFunc: {
            type: Function
        },
        tableSelected: {
            type: Array,
            default() {
                return [];
            }
        },
        maxHeight: {
            type: [String, Number]
        },
        type: {
            type: String,
            default: ""
        },
        // 展开数据列数
        expandsCol: {
            type: Number,
            default() {
                return 3
            },
        },
        // 展开数据每一列的宽度(按elementui的row-col布局计算)
        expandsSpan: {
            type: Number,
            default() {
                return 4
            },
        },
    },
    data() {
        return {
            filterComponent: {},
            filterComponentPopover: {},
            showFilterPopover: false,
            initPop: true,
            activePop: "",
            selected: [],
            filters: {},
            headerClass: "header_wrap",
            filterComponentVisible: false,
            spanArr: [], // 合并行策略数组
            unknownData: [],
            saveLabel: "",
            viewVisible: false
            // re_render: true,
        };
    },
    computed: {
        ...mapGetters(["innerHeight", "breadHeaderHeight"]),
        fields: {
            set(val) {
                let v = this.$tool.deepCopy(this.value);
                v = val;
                this.$emit("input", v);
            },
            get() {
                if (this.value && this.value instanceof Array) {
                    return this.value;
                } else {
                    return [];
                }
            }
        },
        expand() {
            return this.expands != undefined && this.expands.length > 0
                ? true
                : false;
        },
        expandFields() {
            return this.expands != undefined ? this.expands : [];
        },
        computeRow() {
            return Math.ceil(this.expandFields.length / this.expandsCol)
        },

        filterSetting() {
            //自定义筛选配置项
            const data = filterConfig.get(this.type);
            return data ? data : [];
        },
        filterSettingMap() {
            //自定义筛选配置项映射
            const map = new Map();
            this.filterSetting.forEach(v => {
                map.set(v.id, v);
            });
            return map;
        },
        source() {
            //  其中一个配置项的值
            const val = this.filterSettingMap.get();
            return val ? val : null;
        },
        tableData() {
            //这里对得到的数据进行一些额外的处理,element-ui中难以操控:
            const r = this.data;
            //  .暂时将array类型的render处理放到这里,因为如果放到v-for里面会被多次重复执行
            this.columns.forEach(_ => {
                if (_.prop) {
                    this.initPop ? this.$set(this.filterComponent, _.prop, false) : "";
                    this.initPop
                        ? this.$set(this.filterComponentPopover, _.prop, false)
                        : "";
                }
                if (_.type == "array" && _.render) {
                    r.forEach(d_c => {
                        const p = _.prop;
                        d_c[`${p}__render`] = _.render(d_c[p]);
                    });
                }
            });
            this.initPop = false;
            if (Object.keys(this.merge).length !== 0) {
                this.getSpanArr(r);
            }
            return r;
        },
        tableHeight() {
            let height = "";
            const hk = this.height;
            if (hk !== undefined) {
                if (hk == "default") {
                    height = this.innerHeight - 150;
                    height = height < 300 ? 300 : height;
                } else if (hk == "default2") {
                    height = this.innerHeight - 180;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default3") {
                    height = this.innerHeight - 100;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default4") {
                    height = this.innerHeight - 55;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default5") {
                    height = this.innerHeight - 120;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default6") {
                    height = (this.innerHeight - 285) / 2;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default7") {
                    height = (this.innerHeight - 256) / 2;
                    height = height < 300 ? 300 : height;
                } else if (hk === "default8") {
                    height = (this.innerHeight - 100) / 2;
                    height = height < 300 ? 300 : height;
                } else if (hk === "customerList") {
                    // 客户管理详情模块
                    height = this.innerHeight - 232;
                    height = height < 300 ? 300 : height;
                } else if (hk === "userList") {
                    height = this.innerHeight - 200;
                    height = height < 300 ? 300 : height;
                } else if (hk === "noPagination") {
                    height = this.innerHeight - this.breadHeaderHeight;
                    height = height < 300 ? 300 : height;
                } else if (hk === "flowActions") {
                    height = this.innerHeight - 280;
                    height = height < 300 ? 300 : height;
                } else if (hk === "userManage") {
                    height = this.innerHeight - 110;
                    height = height < 300 ? 300 : height;
                } else if (hk === "payment_detail") {
                    height = this.innerHeight - 350;
                    height = height < 300 ? 300 : height;
                } else if (hk === "voucher_fee_select") {
                    height = this.innerHeight - 180;
                    height = height < 300 ? 300 : height;
                } else if (hk === "voucher_edit") {
                    height = this.innerHeight - 490;
                    height = height < 300 ? 300 : height;
                } else {
                    height = hk;
                }
            } else {
                height = "auto";
            }
            return height;
        },
        ...mapGetters(['getHashMaps']),
    },
    mounted() {
        // if(this.filterVisible) {
        //   this.handleDynamicData();
        // }
        // this.$nextTick(_=>{
        // console.log('挂载数据完成')
        // })
    },

    methods: {
        ...mapActions(["fillListFilter", "addListFilter", "clearFilter"]),
        // handleDynamicData () {
        //   this.filterSetting.forEach(_=>{
        //     // const item = this.getDefaultValue(_.id);
        //     this.$set(this.filters,_.id,false);
        //   });
        //   return this.filters;
        // },
        toggle() {
            this.filterComponentVisible = !this.filterComponentVisible;
        },
        handleRowClick(row, event, column) { 
            console.log(event);
            event.stopPropagation();
            if (column.type == "expand" || column.type == "selection" || column.type == "action") return false;

            this.$emit("row-click", row, event, column);
        },
        handleCellClick(row, column, cell, event) {
            event.stopPropagation();
            if (column.type == "expand" || column.type == "selection" || column.type == "action") return false;
            this.$emit("cell-click", row, column, cell, event);
        },
        handleHeaderDragend(nw, ow, column, event) {
            this.$emit("header-dragend", nw, ow, column, event);
        },
        handleMouseEnter(row, column, cell, event) {
            this.$emit("cell-mouse-enter", row, column, cell, event);
        },
        handleSelectionChange(s) {
            this.selected = s;
            this.$emit("update:tableSelected", s);
        },
        getSelected(flag = false) {
            const s = this.selected;
            if (!flag) {
                if (s.length == 0) {
                    this.$message({ message: "请至少选择一项！", type: "warning" });
                    return false;
                }
            }

            return s;
        },
        setCurrentRow(row) {
            this.$refs.table.setCurrentRow(row);
        },
        handleActionCommand(func, scope, event) {
            event.stopPropagation();
            if (func) {
                func(scope.row, event, scope.column);
            }
        },
        mapRender(scope, col) {
            const map = this.getHashMaps.get(col.map_key);
            let v = '';
            const item = scope.row[col.prop];
            map.options.map(function (o) {
                if (item && o.id === item) {
                    v = o.name;
                }
            });
            return v;
        },
        copyText(scope, event) {
            event.stopPropagation();
            const _this = this;
            this.$copyText(scope.row[scope.column.property]).then(function (e) {
                _this.$message({ message: '已成功复制到剪贴板!', type: 'success' })
            }, function (e) {
                _this.$message({ message: '复制失败!', type: 'warning' })
            })
        },
        handleExpandFields(row, field) {
            let text = "";
            if (field.prop.indexOf(".") !== -1) {
                let keys = field.prop.split(".");
                text = row[keys[0]] ? row[keys[0]][keys[1]] : "";
            } else if (field.render_simple) {
                text = this.handleSimple(row, field)
            } else if (field.render) {
                let fun = field.render;
                // text = fun(this.$createElement,1)
            } else {
                text = row[field.prop];
            }
            return text
        },
        getDefaultValue(key) {
            const item = this.filterSettingMap.get(key);
            let val = "";
            const multiple = item.multiple !== undefined ? item.multiple : true;
            if (
                item.components == "static_select" ||
                item.components == "remote_select" ||
                item.components == "jump_select"
            ) {
                val = multiple ? [] : "";
            } else if (item.components == "date") {
                val = ["", ""];
            } else if (item.components == "input") {
                val = "";
            }
            return val;
        },
        clearRenderHeaderField(key) {
            this.filters[key] = this.getDefaultValue(key);
        },
        handleSimple(row, col) {
            const key = col.render_key
                ? col.render_key
                : col.render_obj
                    ? col.render_obj
                    : col.prop;
            if (row[key]) {
                if (!col.render_obj) {
                    return row[key][col.render_simple];
                } else {
                    if (col.prop && row[key][col.prop]) {
                        return row[key][col.prop][col.render_simple];
                    } else {
                        return "";
                    }
                }
            } else {
                return "";
            }
        },
        showPopover(property) {
            // console.log("property",property);
            // this.showFilterPopover = true;
            this.filterComponent[property] = true;
            this.activePop = property;
            this.filterComponentPopover[property] = true;
        },
        order(val) {
            this.$emit("order", val);
        },
        hidePopover(property) {
            this.filterComponentPopover[property] = false;
        },
        handleHeaderClose(key) {
            /*（hack）调用element-ui底层的方法来关闭poper,因为通过v-model绑值处理会出现生成两个一样的*/
            this.$refs.table.$refs.tableHeader.$refs[`popover-${key}`].doClose();
        },
        handleBtnBoolean(btn, row, key) {
            return btn[key] ? btn[key](row) : false;
        },
        handleRenderHeader(h, { column, $index }, func) {
            let self = this;
            let item = column.label;
            let property = "";
            let sindex = "";
            if (column.property) {
                sindex = column.property.indexOf("__");
                if (sindex !== -1) {
                    property = column.property.substring(0, sindex);
                } else {
                    property = column.property;
                }
            }

            if (func) {
                func();
            } else if (column.type == "action") {
                // return h('el-dropdown',{
                //     style: {
                //     paddingLeft: '0',
                //     paddingRight: '0',
                //     },
                //     attrs: {
                //       trigger: 'click',
                //     },
                //     on: {
                //       command(command) {
                //         if(command == 'view') {
                //           self.viewVisible = true;
                //         }
                //       },
                //     },
                //   },[h('el-button',{
                //   style: {
                //     float: 'left',
                //     height: '14px',
                //     lineHeight: '14px',
                //     paddingTop: '0',
                //     paddingBottom: '0',
                //   },
                //   attrs: {
                //     type: 'text',
                //     icon: 'el-icon-more'
                //   },
                // },''),h('el-dropdown-menu',{
                //   style: {
                //     paddingLeft: '0',
                //     paddingRight: '0',
                //   },
                //   slot: 'dropdown',
                // },[h('el-dropdown-item',{
                //   attrs: {
                //     command: 'view',
                //   },
                // },'新增视图')])])
            } else {
                const source =
                    this.filterSettingMap.get(property) !== undefined
                        ? this.filterSettingMap.get(property)
                        : null;
                const data = {
                    props: {
                        field: property,
                        labelMap,
                        listType: self.listType,
                        filterConditionVisible: self.filterConditionVisible
                    },
                    on: {
                        popover(val) {
                            // self.filterConditionVisible = false;
                            labelMap.clear();
                            self.handleHeaderClose(property);
                        },
                        order(val) {
                            self.$emit("order", val);
                        }
                    },
                    nativeOn: {
                        click(e) {
                            // 阻止表头默认点击事件
                            e.stopPropagation();
                        }
                    }
                };
                const btnClick = {
                    nativeOn: {
                        click(e) {
                            // 用一个全局变量存储当前点击的位置作为标志，区分出不同点击的位置，判断出popover的显隐状态
                            labelMap.clear();
                            const propertyFlag = e.target.className.split(" ")[1];
                            if (self.saveLabel != propertyFlag) {
                                self.saveLabel = propertyFlag;
                                // self.filterConditionVisible = true;
                            } else {
                                // self.filterConditionVisible = false;
                            }

                            // 阻止表头默认点击事件
                            e.stopPropagation();
                            /*（hack）调用element-ui底层的方法来关闭poper,因为通过v-model绑值处理会出现生成两个一样的*/
                            const refObj = self.$refs.table.$refs.tableHeader.$refs;
                            for (let k in refObj) {
                                if (k !== `popover-${property}`) {
                                    self.$refs.table.$refs.tableHeader.$refs[k].doClose();
                                } else {
                                    labelMap.set(property, true);
                                }
                            }
                            self.$refs.table.$refs.tableHeader.$refs[
                                `popover-${property}`
                            ].doToggle();
                        }
                    }
                };
                return source != null ? (
                    <span style={{ width: "100%", display: "inline-block" }}>
                        <span>{item}</span>
                        <el-popover
                            width="100%"
                            placement="bottom-end"
                            trigger="manual"
                            ref={`popover-${property}`}
                        >
                            <div style={{ width: "100%" }}>
                                <ListsFilter {...data} />
                            </div>
                            <el-button
                                style={{
                                    float: "right",
                                    paddingTop: "0",
                                    paddingBottom: "0",
                                    lineHeight: "23px",
                                    height: "23px"
                                }}
                                type="text"
                                icon={"el-icon-my-filter-btn " + property}
                                slot="reference"
                                {...btnClick}
                            />
                        </el-popover>
                    </span>
                ) : (
                        <span>{item}</span>
                    );
            }
        },
        getDescendantantProp(obj, desc) {
            // 深层遍历对象属性获取属性值
            let arr = desc.split(".");
            let copy = this.$tool.deepCopy(arr);
            while (arr.length && obj[copy.shift()]) {
                obj = obj[arr.shift()];
            }
            return typeof obj === "number" ? obj : 0;
        },
        getSpanArr(data) {
            // 根据merge.KEY获取spanArr
            let fun = this.getDescendantantProp;
            this.merge.forEach(_ => {
                const { col, key, prop } = _;
                const keys = key.split(".");
                let index;
                this.columns.forEach((o, i) => {
                    if (o.prop === prop) {
                        index = i;
                    }
                })
                let pos = 0;
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    if (i === 0) {
                        arr.push(1);
                        pos = 0;
                    } else {
                        if (
                            fun(data[i], key) === fun(data[i - 1], key) &&
                            fun(data[i], key) !== 0
                        ) {
                            arr[pos] += 1;
                            arr.push(0);
                        } else {
                            arr.push(1);
                            pos = i;
                        }
                    }
                }
                index = this.expand ? index + 1 : index;
                this.spanArr[index] = arr;
            });
            console.log(this.spanArr);
        },
        spanMethod({ row, column, rowIndex, columnIndex }) {
            let span = {
                rowspan: 1,
                colspan: 1
            };
            // 官方合并方法稍加改造
            if (Object.keys(this.merge).length === 0) return span;
            if (this.spanArr[columnIndex] != undefined) {
                span.rowspan = this.spanArr[columnIndex][rowIndex];
            }
            return span;
        }
    },
    watch: {
        tableHeight(val) {
            this.$emit('refreshHeight', val);
        },
    },
    components: {
        TableRender: {
            render: function (h) {
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
        FilterValue,
        ListsFilter,
        ViewPop
    }
};
</script>
<style lang="scss">
// .header_wrap {
//   background-color: #e1e1e1;
// }
.el-table__header-wrapper .cell {
  padding: 0px 6px;
}
.el-table__expand-column .cell {
  width: 50px;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>
