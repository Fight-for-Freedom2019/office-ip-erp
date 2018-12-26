// 题录信息

function vm() {
    const template = `
<div>
        <el-button type="text" @click = "add">新增</el-button>
        <el-table :data="amendments">
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
                    <el-select v-model="form.group" value-key="id" @change="changeGroup">
                        <el-option v-for="item in groupOptions" :value="item" :label="item.name" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="序号">
                            <el-select v-model="form.serial" value-key="id" @change="changeSerial">
                                <el-option v-for="item in serialOptions" :value="item" :label="item.name" :key="item.id"></el-option>
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
                            <el-select v-model="form.field" value-key="id" @change="changeField">
                                <el-option v-for="item in fieldOptions" :value="item" :label="item.name" :key="item.id"></el-option>
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
            amendments:[],
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
            type:"",
            //citations_info:citations_info,
        },
        created(){
            this.extendData.amendments.forEach((item)=>{
                this.amendments.push({
                    group:item.group,
                    serial:`${item.serial}:${item.serial_value}`,
                    field_value:`${item.field}:${item.field_value}`
                })
            })
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
            clear(){
                this.$refs.form?this.$refs.form.resetFields():"";
            },
            add() {
                this.reset();
                let info = window.$fc_citations_info;
                if (!info) {
                    this.$message({type: "warning", message: "请先选中变更项目"})
                    return
                }
                this.type = info.id.toString().substr(0,1);
                this.groupOptions = info.child;
                this.controlDialog("block");
            },
            controlDialog(c) {
                this.isVisible = c === 'block' ? true : false
                const parent = document.getElementsByClassName('citations_information_dialog')[0].parentNode
                parent.style.display = c
                c === "block"?this.clear():"";
            },
            changeGroup(val) {
                let checkedGroup = this.groupOptions.filter((item) => {
                    if (item.id === val.id) {
                        return true
                    }
                })[0]
                this.serialOptions = checkedGroup.child.serial;
                this.fieldOptions = checkedGroup.child.fields;

            },
            changeSerial(val) {
                this.serialPlaceholder = `请输入${val.name}`;

            },
            changeField(val) {
                this.fieldPlaceholder = `请输入${val.name}`;
            },
            save() {
                if (!this.form.serial_value || !this.form.field_value) {
                    this.$message({type: "warning", message: "请输入序号和字段"});
                    return
                }
                //console.log("form",this.form);
                this.extendData.amendments.push({
                    group:this.form.group.name,
                    serial:this.form.serial.name,
                    field:this.form.field.name,
                    serial_value:this.form.serial_value,
                    field_value:this.form.field_value,
                    type:this.type,
                });
                this.amendments.push({
                    group: this.form.group.name,
                    serial: `${this.form.serial.name}:${this.form.serial_value}`,
                    field_value: `${this.form.field.name}:${this.form.field_value}`
                })
                console.log(this.extendData.amendments);
                this.controlDialog("none")
            },
            deleteRow(index) {
                this.extendData.amendments.splice(index, 1);
                this.amendments.splice(index, 1);
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