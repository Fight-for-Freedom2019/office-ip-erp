<!-- 收款账户 -->
<template>
  <div class="Points">
    <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh" @refreshTableData="refreshTableData" ></table-component>
    <points-edit ref="PointsEdit" @update="update" @refresh="refresh"></points-edit>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import PointsEdit from "@/components/page/finance/PointsEdit";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";
import { mapActions } from "vuex";

const config = new Map(Config);

export default {
    name: "Points",
    mixins: [TableMixins],
    data() {
        return {
            URL: "/bonuses",
            tableOption: {
                name: "PointsList",
                url: "/bonuses",
                height: "default",
                highlightCurrentRow: true,
                is_search: true,
                is_list_filter: true,
                list_type: "points",
                treeFilter: "points",
                search_placeholder: "案号、关键字",
                rowClick: this.handleRowClick,
                header_btn: [
                    { type: "add", click: this.add },
                    { type: "delete" },
                    // {type: 'export'},
                    { type: "control" }
                ],
                columns: [
                    { type: "selection" },
                    { type: "text", label: "案号", prop: "serial", min_width: "150" },
                    { type: "text", label: "标题", prop: "title", min_width: "200" },
                    { type: "text", label: "客户", prop: "customer", width: "178", render_simple: "name", render_header: true},
                    { type: "text", label: "案件类型", prop: "project_type", render_simple: "name", width: "90", render_header: true },
                    { type: "text", label: "案件子类型", prop: "subtype", render_simple: "name", width: "110", render_header: true },
                    { type: "text", label: "国家/地区", prop: "area", render_simple: "name", width: "100", render_header: true },
                    { type: "text", label: "管制事项", prop: "process", render_simple: "name", width: "120", render_header: true },
                    { type: "text", label: "点数", prop: "points", width: "80" },
                    { type: "text", label: "返稿日", prop: "process.customer_edition_time", width: "110" },
                    { type: "array", label: "案件标签", prop: "project_tags", min_width: "120", render: _ => _.map(_ => _.name) },
                    { type: "array", label: "管制事项标签", prop: "process_tags", min_width: "120", render: _ => _.map(_ => _.name) },
                    { type: "text", label: "点数类型", prop: "bonus_type", render_simple: "name", width: "110", render_header: true },
                    { type: "text", label: "用户", prop: "user", render_simple: "name", width: "80", render_header: true },
                    { type: "text", label: "状态", prop: "status", render_simple: "name", width: "80", render_header: true },
                    { type: "text", label: "申请日", prop: "application_date", width: "100", render_header: true },
                    { type: "text", label: "申请号", prop: "application_number", width: "145" },
                    { type: "text", label: "修改用户", prop: "last_modifier_user", render_simple: "name", width: "80" },
                    { type: "text", label: "修改时间", prop: "last_modification_time", width: "160" },
                    { type: "text", label: "流程节点", prop: "task", render_simple: "name", width: "80" },
                    { type: "text", label: "备注", prop: "remark", width: "80" }
                ]
            },
            compileType: "add",
            isPanelVisible: false,
            tableData: [],
            rowID: null,
            rowData: null,
            title: ""
        };
    },
    created() {
        this.refreshTags();
    },
    methods: {
        ...mapActions([
            // 'refreshExtends', //extend-field
            "refreshTags" //product
        ]),
        refreshTableData(option) {
            const success = _ => {
                this.compileType === "add" ? this.closeVisible("isPanelVisible") : "";
                this.tableData = _.data;
            };
            const data = Object.assign({}, option);
            this.$axiosGet({
                url: this.URL,
                data: data,
                success
            });
        },
        handleRowClick(row) {
            this.$refs.PointsEdit.show('edit', row)
        },
        add() {
            this.$refs.PointsEdit.show('add')
        },
    },
    components: {
        TableComponent,
        AppShrink,
        PointsEdit
    }
};
</script>

<style scoped>
</style>