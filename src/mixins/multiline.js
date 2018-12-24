export default {
	props: {
		'value': Array,
    'pageType': String,
    'disabled': {
      type: Boolean,
      default: false,
    }
	},
	methods: {
		handleInput (val, key, index, func) {
      console.log(val);
  		const arr = this.$tool.deepCopy(this.value);
  		arr[index][key] = func ? func(val) : val;
  		this.$emit('input', arr);
  	},
  	dataDelete (index) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr.splice(index, 1);
  		this.$emit('input', arr);
  	},
  	add (obj) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr.push(obj);
  		this.$emit('input', arr);
  	}
  }
}