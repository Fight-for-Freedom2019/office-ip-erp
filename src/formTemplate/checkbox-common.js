import {handleSingle, handlePadding} from "../formConfig/handle/handle";

let count = 0;
const uniqueId = () => ++count;
let defaultCol = {
    labelWidth: "0px",
};

function vm(field, formItemLabel = "", func = "", col = {}, hasCustomClass = true) {
    let checkbox = "";
    let extendData = {};
    let checkboxKey = [];
    for (let key in field) {
        if (field.hasOwnProperty(key)) {
            checkboxKey.push(key);
            checkbox += `<el-checkbox v-model="extendData.${key}" @change="change('${key}')" label="${key}">${field[key]}</el-checkbox>`;
            extendData[key] = false;
        }
    }
    let template = `<div :class="{'custom-checkbox':hasCustomClass}">${checkbox}</div>`;

    const options = {
        data: {
            extendData,
            hasCustomClass,
            checked: "",
            checkboxKey,
        },
        methods: {
            change: !func ? handleSingle : func,
        },
        created() {
            handlePadding(this)
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: formItemLabel,
        field: "__checkbox" + uniqueId(),
        col: Object.keys(col).length !== 0 ? col : defaultCol,
    }
}

export {vm}
