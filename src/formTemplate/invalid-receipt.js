import {handlePadding, handleSingle} from '../formConfig/handle/handle'

function vm(label = "") {
    const template = `
        <div class="custom-checkbox">
            <el-checkbox @change="change('oral_exam_join')" v-model="extendData.oral_exam_join" label="oral_exam_join">参加<el-date-picker value-format="yyyy-MM-dd" placeholder="日期" v-model="extendData.oral_exam_date"></el-date-picker>日<el-input v-model="extendData.oral_exam_hour" placeholder="时间"></el-input>时举行的口头审理</el-checkbox>
            <el-checkbox @change="change('oral_exam_not_join')" v-model="extendData.oral_exam_not_join" label="notice_supplemental">不能参加口头审理</el-checkbox>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                oral_exam_join: false,
                oral_exam_not_join: false,
                oral_exam_date: "",

            },
            checked: "",
            checkboxKey: ["oral_exam_join", "oral_exam_not_join"],
        },
        methods: {
            change: handleSingle
        },
        created() {
            handlePadding(this);
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__ir",
    };
}

export {vm}