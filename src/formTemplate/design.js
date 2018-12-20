// 相似设计和成套设计
let count = 0;
const uniqueId = () => ++count;

function vm(label, type) {
    const template = `
        <div>
            <template v-if="type === 'similar'">
                <el-checkbox v-model="extendData.similar_design">
                    <span>本案为同一产品的相似外观设计，其所包含的项数为</span>
                    <el-input v-model="extendData.similar_design_count" placeholder="请输入相似设计项数"></el-input>
                </el-checkbox>
            </template>
            <template v-if="type === 'set'">
                <el-checkbox v-model="extendData.set_design">
                    <span>本案为同一产品的相似外观设计，其所包含的项数为</span>
                    <el-input v-model="extendData.set_design_count" placeholder="请输入成套设计项数"></el-input>
                </el-checkbox>
            </template>
        </div>
    `;
    let extendData = {};
    if (type === 'similar') {
        extendData = {
            similar_design: false,
            similar_design_count: false,
        }
    } else {
        extendData = {
            set_design: false,
            set_design_count: false,
        }
    }
    const options = {
        data: {
            extendData,
            type: type
        },
    };

    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__tmp" + uniqueId(),
    }
}

export {vm}
