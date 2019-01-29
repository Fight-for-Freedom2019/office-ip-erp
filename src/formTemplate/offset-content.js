import OffsetContent from './formComponents/OffsetContent'

const template = `
<div>
<el-button style="margin-bottom: 10px" size="small" type="primary" @click="add" plain>新增</el-button>
<el-table border :data="extendData.amendments">
    <el-table-column
        prop="filename"
        label="文件名称"
        min-width="120">
    </el-table-column>
    <el-table-column
        prop="position"
        label="文件当中的位置"
        width="180">
    </el-table-column>
    <el-table-column
        prop="beforeAmendment"
        label="补正前"
        width="240">
    </el-table-column>
    <el-table-column
        prop="afterAmendment"
        label="补正后"
        width="240">
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
<el-dialog :visible.sync="isVisible" custom-class="offset_dialog" :append-to-body="true" :modal="false" title="新增/编辑补正内容"><!--:append-to-body="true"-->
    <!--<offset-content ref="addOffset" @save="save" :rowData="rowData" @controlDialog="controlDialog"></offset-content>-->
    
    <el-form ref="form" :model="offset_content">
        <el-form-item label="文件名称" prop="filename">
            <el-select v-model="offset_content.filename" allow-create filterable default-first-option>
                <el-option
                        v-for="item in file_names"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文件当中的位置" prop="position">
            <el-input v-model="offset_content.position"></el-input>
        </el-form-item>
        <el-form-item label="补正前" prop="beforeAmendment">
            <el-input v-model="offset_content.beforeAmendment"></el-input>
        </el-form-item>
        <el-form-item label="补正后" prop="afterAmendment">
            <el-input v-model="offset_content.afterAmendment"></el-input>
        </el-form-item>
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
    isVisible: false,
    extendData: {
      amendments: [],
    },
    rowData: {},
    type: "add",
    index: null,
    offset_content: {
      filename: "",
      position: "",
      beforeAmendment: "",
      afterAmendment: "",
    },
    file_names: [
      {value: '权利要求书', label: '权利要求书'},
      {value: '说明书', label: '说明书'},
      {value: '说明书摘要', label: '说明书摘要'},
      {value: '摘要附图', label: '摘要附图'},
      {value: '专利代理委托书', label: '专利代理委托书'},
      {value: '国际申请进入中国国家阶段声明（PCT）', label: '国际申请进入中国国家阶段声明（PCT）'},
    ],
  },
  methods: {
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    handleEdit(row, index) {
      this.type = "edit";
      this.index = index;
      this.offset_content = this.copyObj(row);
      this.controlDialog("block");

    },
    add() {
      this.index = null;
      this.type = "add";

      this.controlDialog("block");
      this.clear();
    },
    copyObj(obj) {
      return Object.assign({}, obj);
    },
    cancel() {
      this.controlDialog("none");
    },
    clear() {
      this.$refs.form?this.$refs.form.resetFields():"";
    },
    save() {
      console.log(this.type,this.index);
      if (this.type === "edit") {
        for (let key in this.offset_content) {
          if (this.offset_content.hasOwnProperty(key)) {
            this.extendData.amendments[this.index][key] = this.offset_content[key];
          }
        }
      } else {
        this.extendData.amendments.push(this.offset_content);
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