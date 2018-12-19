// 变更内容
let count = 0;
const uniqueId = () => ++count;

function vm(label) {
    const template = `
        <el-button type="text" @click="add">新增</el-button>
        <el-table border :data="extendData.priority">
    <el-table-column
        prop="priority_area"
        label="在先申请地区"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="priority_number"
        label="在先申请号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="priority_date"
        label="在先申请日"
        width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="handleDelete(scope.$index,extendData.priority)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
    <el-dialog title="新增优先权" :visible.sync="isVisible" custom-class="priority_dialog" :append-to-body="true" :modal="false">
        <el-form :model="form" label-position="left" label-width="110px">
            <el-form-item label="优先权国家">
                <el-select v-model="form.priority_area">
                    <el-option 
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请号">
                <el-input v-model="form.priority_number"></el-input>
            </el-form-item>
            <el-form-item label="申请号">
                <el-date-picker value-format="yyyy-MM-dd" v-model="form.priority_date"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    amendment_notice: false,
                    notice_date: "",
                    notice_name: "",
                    notice_serial: "",
                },
            }
        },
        methods: {
            add() {
            },
        }
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__cr" + uniqueId(),
    };
}

export {vm}