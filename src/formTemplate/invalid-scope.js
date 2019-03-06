// 无效宣告请求的理由、范围以及所依据的证据
import axios from 'axios'

const template = `
<div>
    <el-button style="margin-bottom: 10px" size="small" type="primary" @click="add" plain>新增</el-button>
<el-table border :data="reasons_copy">
    <el-table-column
        prop="reason"
        label="理由"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="scope"
        label="范围"
        width="180">
    </el-table-column>
    <el-table-column
        prop="evidence"
        label="依据的证据"
        width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="handleDelete(scope.$index,reasons_copy)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
    
    
    <el-dialog title="新增/编辑无效理由" :visible.sync="isVisible" custom-class="priority_dialog" :append-to-body="true" :modal="false">
        <el-form :model="form" ref="form" label-position="left" label-width="110px">
            <el-form-item label="理由">
                <div>专利法第<el-input style="width: auto" v-model="form.patlaw_article"></el-input>条，第<el-input style="width: auto" v-model="form.patlaw_paragraph"></el-input>款;</div>
                <div>实施细则第<el-input style="width: auto" v-model="form.regulation_article"></el-input>条，第<el-input style="width: auto" v-model="form.regulation_paragraph"></el-input>款;</div>
            </el-form-item>
            <el-form-item label="范围">
                <el-input v-model="form.scope"></el-input>
            </el-form-item>
            <el-form-item label="证据">
                <el-input v-model="form.evidence"></el-input>
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
      reasons: [],
    },
    reasons_copy: [],
    options: [],
    isVisible: false,
    type: 'add',
    index: null,
    form: {
      patlaw_article: '',
      patlaw_paragraph: '',
      regulation_article: '',
      regulation_paragraph: '',
      scope: "",
      evidence: "",
    }
  },
  computed: {},
  methods: {
    add() {
      this.type = 'add';
      this.index = null;
      this.controlDialog('block');
      this.form = {
        patlaw_article: '',
        patlaw_paragraph: '',
        regulation_article: '',
        regulation_paragraph: '',
        scope: "",
        evidence: "",
      }
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
      this.extendData.reasons.splice(index, 1);
    },
    handleEdit(row, index) {
      this.form = Object.assign({}, this.extendData.reasons[index]);
      this.type = 'edit';
      this.index = index;
      this.controlDialog("block");
    },
    getObj(source){
      return {
        reason: `专利法第${source.patlaw_article}条，第${source.patlaw_paragraph}款;\n实施细则第${source.regulation_article}条，第${source.regulation_paragraph}款;`,
        scope: source.scope,
        evidence: source.evidence,
      }
    },
    save() {
      if (this.type === "edit") {
        for (let key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.extendData.reasons[this.index][key] = this.form[key];
          }
        }
        this.reasons_copy.splice(this.index,1,this.getObj(this.form));
      } else {
        this.extendData.reasons.push(this.form);
        this.reasons_copy.push(this.getObj(this.form));
      }

      this.controlDialog('none');
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
  created(){
    this.extendData.reasons.forEach((item)=>{
      this.reasons_copy.push(this.getObj(item));
    })
  },
}

const vm = {
  custom: true,
  vm: options,
  template: template,
  label: '无效宣告请求的理由、范围以及所依据的证据',
  field: '__is',
}

export {vm}
