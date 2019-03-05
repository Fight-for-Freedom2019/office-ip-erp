function vm(type, field, label) {
  const template = `
        <div>
            <el-button type="text" @click="addLine">增行</el-button>
            <el-button type="text" @click="minusLine">减行</el-button>
            <el-row>
                <el-col :span="5">文件名称</el-col>
                <el-col :span="5">更正项目</el-col>
                <el-col :span="6">文件中的位置</el-col>
                <el-col :span="4">更正前</el-col>
                <el-col :span="4">更正后</el-col>
            </el-row>
            <el-row v-for="(item,index) in extendData.amendments" :key="index">
                <el-col :span="5"><el-input v-model="item.filename"></el-input></el-col>
                <el-col :span="5"><el-input v-model="item.item"></el-input></el-col>
                <el-col :span="6"><el-input v-model="item.position"></el-input></el-col>
                <el-col :span="4"><el-input v-model="item.before"></el-input></el-col>
                <el-col :span="4"><el-input v-model="item.after"></el-input></el-col>
            </el-row>
        </div>
    `;
  const options = {
    data: {
      extendData: {
          amendments: [],
      },
      amendments: [
        {
          filename: "",
          item: "",
          position: "",
          before: "",
          after: "",
        }
      ],
    },
    /*computed: {
      extendData: function () {
        return {amendments: this.amendments};
      }
    },*/
    created(){
      console.log(this.extendData);
      // this.amendments = this.extendData.amendments;
    },
    methods: {
      addLine() {
        let obj = {
          filename: "",
          item: "",
          position: "",
          before: "",
          after: "",
        };
        this.extendData.amendments.push(obj);
      },
      minusLine() {
        this.extendData.amendments.length !== 0 ? this.extendData.amendments.pop() : "";
      },
    },
  };
  return {
    custom: true,
    vm: options,
    template: template,
    label: "更正内容",
    field: "__cc",
  };
}

export {vm}