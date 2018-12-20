// 专利类型
function vm(label) {
    const template = `
        <div class="custom-checkbox">
            <el-checkbox v-model="extendData.utility">实用新型名称<el-input v-model="extendData.utility_title" placeholder="请输入实用新型名称"></el-input></el-checkbox>
            <el-checkbox v-model="extendData.design">外观设计名称<el-input v-model="extendData.design_title" placeholder="请输入实用新型名称"></el-input></el-checkbox>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                utility: false,
                design: false,
                utility_title: "",
                design_title: "",
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__pt",
    };
}

export {vm}