import OffsetContent from './formComponents/OffsetContent'

const template = `
<div>
<el-button style="margin-bottom: 10px" size="small" type="primary" @click="add" plain>新增</el-button>
<el-table border :data="extendData.amendments">
    <el-table-column
        prop="filename"
        label="文件名称"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="position"
        label="文件当中的位置"
        width="180">
    </el-table-column>
    <el-table-column
        prop="beforeAmendment"
        label="补正前"
        width="180">
    </el-table-column>
    <el-table-column
        prop="afterAmendment"
        label="补正后"
        width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="handleDelete(scope.$index,extendData.amendments)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
<el-dialog :visible.sync="isVisible" custom-class="offset_dialog" :append-to-body="true" :modal="false" title="新增/编辑补正内容">
    <offset-content ref="addOffset" @save="save" :rowData="rowData" @controlDialog="controlDialog"></offset-content>
</el-dialog>

</div>
`;
const options = {
    data: {
        isVisible: false,
        extendData: {
            amendments: [],
        },
        rowData: {},
        type: "add",
        index: null,
    },
    methods: {
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        handleEdit(row, index) {
            this.type = "edit";
            this.index = index;
            this.rowData = row;
            this.controlDialog("block");
        },
        add() {
            this.index = null;
            this.type = "add";
            this.$refs.addOffset ? this.$refs.addOffset.clear() : "";
            this.controlDialog("block");
        },
        save(val) {
            if (this.type === "edit") {
                for (let key in val) {
                    if (val.hasOwnProperty(key)) {
                        this.extendData.amendments[this.index][key] = val[key];
                    }
                }
            } else {
                this.extendData.amendments.push(val);
            }
            this.controlDialog('none');
        },
        controlDialog(c) {
            this.isVisible = c === "block" ? true : false;
            const parent = document.getElementsByClassName("offset_dialog")[0].parentNode;
            parent.style.display = c;
        },
    },
    components: {
        OffsetContent,
    },
};
const vm = {
    custom: true,
    vm: options,
    template: template,
    label: "补正内容",
    field: "offset_content_vm",
}
export {vm}