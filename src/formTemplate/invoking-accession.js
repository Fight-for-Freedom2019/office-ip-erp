// 审查基础文本声明
let count = 0;
const uniqueId = () => ++count;
const defaultCol = {
    span: 17,
    labelWidth: "0px"
}
const fieldObj = {
    'reference_spec':["reference_spec_page","reference_spec_date"],
    'reference_aclm':["reference_aclm_page","reference_aclm_date"],
    'reference_figs':["reference_figs_page","reference_figs_date"],
}
function vm(type,col = defaultCol) {
    let extendData = {};
    for (let key in fieldObj) {
        if(fieldObj.hasOwnProperty(key)){
            if(type === key){
                fieldObj[key].forEach((item)=>{
                    extendData[item] = "";
                })
            }
        }
    }
    let template = `<div class="rd_class">
            <template v-if="type === 'reference_spec'">
                <div>
                    <span>第</span><el-input v-model="extendData.${fieldObj[type][0]}"></el-input><span>页，国际阶段援引加入的时间为</span><el-date-picker value-format="yyyy-MM-dd" v-model="extendData.${fieldObj[type][1]}"></el-date-picker>
                </div>
                </template>
                <template v-else-if="type === 'reference_aclm'">
                <div>
                    <span>第</span><el-input v-model="extendData.${fieldObj[type][0]}""></el-input><span>项，国际阶段援引加入的时间为</span><el-date-picker value-format="yyyy-MM-dd" v-model="extendData.${fieldObj[type][1]}"></el-date-picker>
                </div>
                </template>
                <template v-else>
                <div>
                    <span>第</span><el-input v-model="extendData.${fieldObj[type][0]}""></el-input><span>页，国际阶段援引加入的时间为</span><el-date-picker value-format="yyyy-MM-dd" v-model="extendData.${fieldObj[type][1]}"></el-date-picker>
                </div>
            </template>
        </div>
    `;
    const options = {
        data() {
            return {
                extendData,
                type:type,
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__ia" + uniqueId(),
        col: col
    }
}

export {vm}