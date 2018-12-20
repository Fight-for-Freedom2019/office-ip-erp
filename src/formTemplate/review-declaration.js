// 审查基础文本声明
let count = 0;
const uniqueId = () => ++count;
const defaultCol = {
    span: 17,
    labelWidth: "0px"
}
const fieldObj = {
    'exam_basis_spec': ["exam_basis_spec_original_page", "exam_basis_spec_chapter2_page", "exam_basis_spec_article2841_page"],
    'exam_basis_aclm': ["exam_basis_aclm_original_page", "exam_basis_aclm_article19_page", "exam_basis_aclm_chapter2_page", "exam_basis_aclm_article2841_page"],
    'exam_basis_figs': ["exam_basis_figs_original_page", "exam_basis_figs_chapter2_page", "exam_basis_figs_article2841_page"],
    'exam_basis_seq': ["exam_basis_se_original_page", "exam_basis_seq_chapter2_page", "exam_basis_seq_article2841_page"],
}

function vm(type, col = defaultCol) {
    let extendData = {};
    for (let key in fieldObj) {
        if (fieldObj.hasOwnProperty(key)) {
            if (type === key) {
                fieldObj[key].forEach((item) => {
                    extendData[item] = "";
                })
            }
        }
    }
    let template = `<div class="rd_class">
        <template v-if="type === 'exam_basis_spec' || type === 'exam_basis_figs' || type === 'exam_basis_seq'">
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][0]}"></el-input><span>页，按原始国际申请文件中的译文</span>
            </div>
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][1]}""></el-input><span>页，按专利性国际初步报告（PCT第二章）附件的中文译文</span>
            </div>
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][2]}""></el-input><span>页，按专利合作条约第28/41条提出的修改</span>
            </div>
        </template>
        <template v-if="type === 'exam_basis_aclm'">
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][0]}"></el-input><span>项，按原始国际申请文件中的译文</span>
            </div>
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][1]}"></el-input><span>项，按专利合作条约第19条修改的中文译文</span>
            </div>
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][2]}"></el-input><span>项，按专利性国际初步报告（PCT第二章）附件的中文译文</span>
            </div>
            <div>
                <span>第</span><el-input v-model="extendData.${fieldObj[type][3]}"></el-input><span>项，按专利合作条约第28/41条提出的修改</span>
            </div>
        </template>
        </div>
    `;
    const options = {
        data: {
            extendData,
            type: type,
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__rd" + uniqueId(),
        col: col
    }
}

export {vm}