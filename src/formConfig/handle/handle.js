function handlePlaceholder (rules) {
    let type;
    let title;
    rules.forEach((rule) => {
        type = rule.type
        title = rule.title
        if (rule.attrs && !rule.attrs.placeholder) {
            rule.attrs.placeholder = set(type, title)
        } else if (!rule.attrs) {
            rule.attrs = {}
            rule.attrs.placeholder = set(type, title)
        }
    })
    function set (type, title) {
        let result
        if (type === 'input') {
            result = `请输入${title}`
        } else {
            result = `请选择${title}`
        }
        return result
    }
    return rules
}


function handleLayout (obj,custom) {  // typeof custom === Object
    let rules = obj.rule;
    rules.forEach((rule)=>{
        if(!rule.col){
            rule.col = custom;
        }else {
            coverAttribute(rule.col,custom);
        }
    })
    return obj
}
function coverAttribute (source,target) {
    const keys = Object.keys(source);
    for (let key in target){
        if (target.hasOwnProperty(key)){
            if(keys.indexOf(key) === -1){
                source[key] = target[key];
            }
        }
    }
}

const handleSingle = function (val) {
    if(this.checked === val) {
        this.extendData[val] = !!this.extendData[val];
        return
    }
    this.checked = val;
    this.checkboxKey.forEach((item)=>{
        this.extendData[item] = false;
    })
    this.extendData[val] = true;
}

const handlePadding = function (_this) {
    _this.checkboxKey.forEach((item)=>{
        _this.extendData[item] === true?_this.checked = item:"";
    })
}

const checkboxFunc = function (val) {
    if(val){
        Object.keys(this.extendData).forEach((item)=>{
            this.extendData[item] = false;
        })
        val.forEach((item)=>{
            this.extendData[item] = true;
        })
    }
}

export {handlePlaceholder,handleLayout,handleSingle,checkboxFunc,handlePadding}