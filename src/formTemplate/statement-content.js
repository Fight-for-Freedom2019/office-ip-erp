// 声明内容
function vm(label) {
    const template = `
        <div class="custom-checkbox">
            <el-checkbox v-model="extendData.article44" label="article44">根据专利法第44条第1款第2项的规定，专利权人声明放弃上述专利权。</el-checkbox>
            <el-checkbox v-model="extendData.article9" label="article9">根据专利法第9条第1款的规定，专利权人声明放弃上述专利权。注：同样的发明创造申请号为<el-input placeholder="请输入申请号" v-model="extendData.patent_apn_one"></el-input></el-checkbox>
            <el-checkbox v-model="extendData.article9_invalid" label="article9_invalid">无效宣告程序中，根据专利法第9条第1款的规定，专利权人声明放弃上述专利权。注：同样的发明创造申请号为<el-input placeholder="请输入申请号" v-model="extendData.patent_apn_two"></el-input></el-checkbox>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                article44: false,
                article9: false,
                article9_invalid: false,
                patent_apn_one:"",
                patent_apn_two:"",
            },
        },

    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__sm",
    };
}

export {vm}