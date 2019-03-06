/*
* 优先权
* */
import axios from 'axios'

function vm(isDAS) {
  const template = `
    <div>
    <el-button style="margin-bottom: 10px" size="small" type="primary" @click="add" plain>新增</el-button>
<el-table border :data="extendData.priority">
    <el-table-column
        prop="area"
        label="原受理机构名称"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="apn"
        label="在先申请号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="apd"
        label="在先申请日"
        width="180">
    </el-table-column>
    <template v-if="isDAS">
        <el-table-column
            prop="code"
            label="接入码"
            width="180">
        </el-table-column>
    </template>
    
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="handleDelete(scope.$index,extendData.priority)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
    
    
    <el-dialog title="新增/编辑补正内容" :visible.sync="isVisible" custom-class="priority_dialog" :append-to-body="true" :modal="false">
        <el-form :model="form" label-position="left" label-width="110px">
            <el-form-item label="原受理机构名称">
                <el-select v-model="form.area">
                    <el-option 
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请号">
                <el-input placeholder="请输入申请号" v-model="form.apn"></el-input>
            </el-form-item>
            <el-form-item label="申请日">
                <el-date-picker placeholder="请选择申请日" value-format="yyyy-MM-dd" v-model="form.apd"></el-date-picker>
            </el-form-item>
            <template v-if="isDAS">
                <el-form-item label="接入码">
                    <el-input placeholder="请输入接入码" v-model="form.code"></el-input>
                </el-form-item>
            </template>
            
             
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
    `;
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
      isDAS: isDAS,
      form: {
        area: '',
        apd: '',
        apn: '',
        code: '',
      }
    },
    computed: {},
    created(){
      const url = '/static/js/area.json'
      axios.get(url).then(response => {
        this.options = eval(`${response.data}`);
      })
    },
    methods: {
      add() {
        this.type = 'add';
        this.index = null;
        this.controlDialog('block')
        /*const url = '/static/js/area.json'
        axios.get(url).then(response => {
          this.options = eval(`${response.data}`);
        })*/
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
  };
  return {
    custom: true,
    vm: options,
    template: template,
    label: '申请人声明撤回下列优先权',
    field: 'priority_vm',
  };
}

export {vm}
