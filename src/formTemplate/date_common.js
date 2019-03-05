// 日期通用类型
let count = 0;
const uniqueId = () => ++count;
function vm({field,label}) {
  const template = `
        <div>
          <el-date-picker value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="extendData.${field}">${label}</el-date-picker>
        </div>
    `;
  const options = {
    data: {
      extendData: {
        [field]:"",
      },
    },
  };
  return {
    custom: true,
    vm: options,
    template: template,
    label: label,
    field: "__date" + uniqueId(),
  };
}

export {vm}