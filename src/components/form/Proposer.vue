<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入技术联系人关键词"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
	>
		<el-option
			v-for="item in options"
			:key="item.id"
			:label="item.name"
			:value="item.id"
		>
		</el-option>
	</el-select>
</template>

	<script>
	export default {
	  name: 'proposer',
	  props: {
	  	'value': [Number, String],
	  	'defaultOptions': {
	  		type: Array,
	  	},
	  	'disabled': {
	  		type: Boolean,
	  		default: false,
	  	}
	  },
	  data () {
			return {
				query: '',
				options: [],
				loading: false,
			}
	  },
	  methods: {
	  	handleInput (val) {
	  		this.$emit('input', val);
	  	},
	  	remoteMethod (keyword) {
	  		const params = { keyword };

	  		this.loading = true;
	  		this.$axios.get('/members', {params}).then(response=>{
	  			this.loading = false;
	  			this.options = response.data.members.data.map(d=>{return {id: d.uid, name: d.username}});
	  		});
	  	}
	  },
	  created () {
	  	this.remoteMethod('');
	  },
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>