<!-- 点数统计 -->
<template>
  <div class="BonusReport">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @update="update"
      @refresh="refresh"
      @refreshTableData="refreshTableData"
    ></table-component>
    <points-monthly-detail ref="details" @update="update"></points-monthly-detail>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import TableMixins from "@/mixins/table-mixins";
import PointsMonthlyDetail from "@/components/page_extension/PointsMonthlyDetail"
import { mapActions } from "vuex";

export default {
    name: "BonusReport",
    mixins: [TableMixins],
    data() {
        return {
            URL: "/bonus_reports",
            tableOption: {
                name: "BonusReportList",
                url: "/bonus_reports",
                height: "default",
                highlightCurrentRow: true,
                is_search: true,
                is_list_filter: true,
                list_type: "bonus_report",
                treeFilter: "bonus_report",
                search_placeholder: "用户名称、月份",
                'rowClick': this.handleRowClick,
                header_btn: [
                    // {type: 'add', click: this.add},
                    // {type: 'delete'},
                    // {type: 'export'},
                    { type: "control" }
                ],
                columns: [
                    { type: "selection" },
                    {
                        type: "text",
                        label: "用户",
                        prop: "user",
                        render_simple: "name",
                        min_width: "150",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "月份",
                        prop: "month",
                        min_width: "100",
                        render_header: true
                    },
                    { type: "text", label: "总点数", prop: "points", min_width: "100" },
                    // {type: 'text', label: '绩效点数', prop: 'points_bonus', min_width: '100'},
                    // {type: 'text', label: '总点数', prop: 'sum', min_width: '100'},
                    { type: "text", label: "月度排名", prop: "rank", min_width: "100" },
                    { type: "text", label: "备注", prop: "remark", min_width: "100" }
                ]
            },
            compileType: "add",
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
            this.$refs.details.show('edit', row.id);
        },
    },
    components: {
        TableComponent,
        AppShrink,
        PointsMonthlyDetail,

    }
};
</script>

<style scoped>
</style>