// 标准CheckBox
let count = 0;
const uniqueId = () => ++count;

function vm(field, label, col = {}, formItemLabel = "",obj) {
    const template = `<el-checkbox @change="change" v-model="extendData.${field}">${label}</el-checkbox>`;
    const options = {
        data: {
            extendData: {
                [field]: false,
            },
        },
        methods:{
            change(val){
                if(obj){
                    val?this.add():this.remove();
                }
            },
            add(){
                this._parentVue.formTypeCollection.push(obj.id);
                this._parentVue.formList.push(obj);
            },
            remove(){
                this._parentVue.formList.forEach((item,index)=>{
                    if(item.id === obj.id) {
                        this._parentVue.handleRemove(index,item.id);
                    }
                })
            },
        }
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: formItemLabel,
        field: "__tmp" + uniqueId(),
        col: col,
    }
}

export {vm}
