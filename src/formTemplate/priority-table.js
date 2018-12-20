/*
* 优先权
* */
import axios from 'axios'

const template = `
<div>
    <el-button style="margin-bottom: 10px" size="small" type="primary" @click="add" plain>新增</el-button>
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
</div>
`

const options = {
    data: {
        extendData: {
            priority: [],
        },
        // priority_options: [],
        options: [],
        isVisible: false,
        type: 'add',
        index: null,
        form: {
            priority_area: '',
            priority_number: '',
            priority_date: '',
        }
    },
    computed: {},
    methods: {
        add() {
            this.type = 'add';
            this.index = null;
            this.controlDialog('block')
            const url = '/static/js/area.json'
            axios.get(url).then(response => {
                this.options = eval(`${response.data}`);
            })
        },
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        handleEdit(row, index) {
            this.form = Object.assign({}, row);
            this.type = 'edit';
            this.index = index;
            this.controlDialog("block");
        },
        save() {
            if (this.type === "edit") {
                for (let key in this.form) {
                    if (this.form.hasOwnProperty(key)) {
                        this.extendData.priority[this.index][key] = this.form[key];
                    }
                }
            } else {
                this.extendData.priority.push(this.form);
            }

            this.controlDialog('none');
        },
        verifyValue(value) {
            let bool = true
            this.priority_options.forEach((item) => {
                if (item.value === value) {
                    bool = false
                }
            })
            return bool
        },
        cancel() {
            this.controlDialog('none')
        },
        controlDialog(c) {
            this.isVisible = c === 'block' ? true : false
            const parent = document.getElementsByClassName('priority_dialog')[0].parentNode
            parent.style.display = c
        },
    },
}

const vm = {
    custom: true,
    vm: options,
    template: template,
    label: '优先权声明',
    field: 'priority_vm',
}

export {vm}
