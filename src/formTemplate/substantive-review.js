// 请求内容
// TODO 样式要改
import {handlePadding, handleSingle} from "../formConfig/handle/handle";
function vm() {
    const template = `
        <div>
            <el-checkbox-group class="custom-checkbox">
                <el-checkbox @change="change('pct_full_fee')" v-model="extendData.pct_full_fee" label="pct_full_fee">该申请为PCT国际申请，实质审查费不予减免 </el-checkbox>
                <el-checkbox @change="change('pct_discount20')" v-model="extendData.pct_discount20" label="pct_discount20">该申请为PCT国际申请，已由欧洲专利局、日本专利局、瑞典专利国作出国际检索报告，实质审查费减免20%  </el-checkbox>
                <el-checkbox @change="change('pct_discount100')" v-model="extendData.pct_discount100" label="pct_discount100">该申请为PCT国际申请，已由中国作出国际检索报告及专利性国际初步报告，实质审查费减免100% </el-checkbox>
                <el-checkbox @change="change('pct_other')" v-model="extendData.pct_other" label="pct_other">其他情况：<el-input v-model="extendData.other_detail"></el-input></el-checkbox>
            </el-checkbox-group>
        </div>
`;
    const options = {
        data(){
            return {
                extendData:{
                    pct_full_fee:false,
                    pct_discount20:false,
                    pct_discount100:false,
                    pct_other:false,
                    other_detail:"",
                },
                checked:"",
                checkboxKey:["pct_full_fee","pct_discount20","pct_discount100","pct_other"],
            }
        },
        methods:{
            change:handleSingle,
        },
        created(){
            handlePadding(this);
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "备注",
        field: "__sr",

    }
}

export {vm}