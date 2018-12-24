// 题录信息

function vm() {
    const template = `
<div>
        <el-button type="text" @click = "add">新增</el-button>
        <el-table :data="extendData.amendments">
            <el-table-column prop="group" label="分组"></el-table-column>
            <el-table-column prop="serial" label="序号"></el-table-column>
            <el-table-column prop="field_value" label="字段及值"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="isVisible" title="编辑著录项目变更理由证明题录信息" custom-class="citations_information_dialog" :append-to-body="true" :modal="false">
            <el-form :model="form" label-width="120px" label-position="left">
                <el-form-item label="分组序号">
                    <el-select v-model="form.group" @change="changeGroup">
                        <el-option v-for="item in groupOptions" :value="item.id" :label="item.name" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="序号">
                            <el-select v-model="form.serial" @change="changeSerial">
                                <el-option v-for="item in serialOptions" :value="item.id" :label="item.name" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="">
                            <el-input v-model="form.serial_value" :placeholder="serialPlaceholder"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="字段">
                            <el-select v-model="form.field" @change="changeField">
                                <el-option v-for="item in fieldOptions" :value="item.id" :label="item.name" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="">
                            <el-input v-model="form.field_value" :placeholder="fieldPlaceholder"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                amendments: [],
            },
            isVisible: false,
            form: {
                group: "",
                serial: "",
                serial_value: "",
                field: "",
                field_value: "",
            },
            groupOptions: [],
            serialOptions: [],
            fieldOptions: [],
            serialPlaceholder: "",
            fieldPlaceholder: "",
            //citations_info:citations_info,
        },
        methods: {
            reset() {
                this.form.group = null;
                this.form.serial = null;
                this.form.field = null;
                this.form.serial_value = null;
                this.form.field_value = null;
                this.serialPlaceholder = "";
                this.fieldPlaceholder = "";
            },
            add() {
                this.reset();
                let info = window.$fc_citations_info;
                if (!info) {
                    this.$message({type: "warning", message: "请先选中变更项目"})
                    return
                }
                this.groupOptions = info.child;
                this.controlDialog("block");
            },
            controlDialog(c) {
                this.isVisible = c === 'block' ? true : false
                const parent = document.getElementsByClassName('citations_information_dialog')[0].parentNode
                parent.style.display = c
            },
            changeGroup(val) {
                let checkedGroup = this.groupOptions.filter((item) => {
                    if (item.id === val) {
                        return true
                    }
                })[0]
                this.serialOptions = checkedGroup.child.serial;
                this.fieldOptions = checkedGroup.child.fields;

            },
            changeSerial(val) {
                this.serialPlaceholder = `请输入${this.getName(this.serialOptions, 'serial')}`;

            },
            changeField(val) {
                this.fieldPlaceholder = `请输入${this.getName(this.fieldOptions, 'field')}`;
            },
            save() {
                let group, serial, field;
                group = this.getName(this.groupOptions, 'group');
                serial = this.getName(this.serialOptions, 'serial');
                field = this.getName(this.fieldOptions, 'field');
                if (!this.form.serial_value || !this.form.field_value) {
                    this.$message({type: "warning", message: "请输入序号和字段"});
                    return
                }
                this.extendData.amendments.push({
                    group: group,
                    serial: `${serial}:${this.form.serial_value}`,
                    field_value: `${field}:${this.form.field_value}`
                })
                this.controlDialog("none")
            },
            getName(arr, key) {
                if (!arr || arr.length === 0) return
                let name = "";
                arr.forEach((item) => {
                    if (item.id === this.form[key]) {
                        name = item.name;
                    }
                });
                return name
            },
            deleteRow(index) {
                this.extendData.amendments.splice(index, 1);
            },
        },
        watch: {
            'form.group': function (val, oldVal) {
                this.form.serial = null;
                this.form.field = null;
                this.serialPlaceholder = "";
                this.fieldPlaceholder = "";
            }
        }

    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "题录信息",
        field: "__ci",
    };
}

export {vm}