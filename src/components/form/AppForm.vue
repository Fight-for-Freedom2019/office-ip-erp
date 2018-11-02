<template>
	<el-form :model="form" :label-width="labelWidth" :label-position="labelPosition" :rules="rules" ref="form">
		<slot></slot>
		<template v-for="(item, index) in source">
			<template v-if="item.components == 'static_select'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<static-select 
						ref="static-select"
						:type="item.type"
						:multiple="item.multiple"
						v-model="form[item.field_type]"
						@input="handleInput"
					>
					</static-select>
				</el-form-item>
			</template>			
			<template v-else-if="item.components == 'remote_select'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<remote-select 
						ref="remote-select"
						:multiple="item.multiple"
						v-model="form[item.field_type]"
						@input="handleInput"
						:type="item.type"
					>
					</remote-select>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'date'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<el-date-picker
						ref="date"
						v-model="form[item.field_type]"
						@input="handleInput"
						:type="item.type"
						:placeholder="item.placeholder"
					>
					</el-date-picker>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'input'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<el-input
						ref="input"
						v-model="form[item.field_type]"
						@input="handleInput"
						:type="item.type"
						:placeholder="item.placeholder"
					>
					</el-input>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'switch'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<app-switch
						ref="switch"
						v-model="form[item.field_type]"
						@input="handleInput"
						:type="item.type"
					>
					</app-switch>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'slider'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<el-slider
						ref="slider"
						v-model="form[item.field_type]"
						@input="handleInput"
						show-input
					>
					</el-slider>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'upload'">
				<el-form-item :label="item.label" :prop="item.field_type" :key="index">
					<upload 
						ref="upload"
						v-model="form[item.field_type]"
						@input="handleInput"
					>
					</upload>
				</el-form-item>
			</template>
		</template>
		<slot name="app-button"></slot>
	</el-form>
</template>
<script>
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import AppSwitch from '@/components/form/AppSwitch'
import Upload from '@/components/form/Upload'

export default {
	name: 'appForm',
	props: {
		'source': {
			type: Array,
			default () {
				return []
			}
		},
		'labelWidth': {
			type: String,
			default: '80px',
		},
		'labelPosition': {
			type: String,
			default: 'right',
		},
		'rules': {
			type: Object,
			default () {
				return {}
			},
		}	
	},
	data () {
		return {
			form: {},
		}
	},
	computed: {
		allKeys () {
			if(this.source) {
				const keys = this.$tool.splitObj(this.source, 'field_type');
				console.log(keys);
				return keys;
			}
		},
	},
	methods: {
		handleInput (val) {
			this.$emit('input',val);
			this.$emit('formData',this.form);
		},
		initializeForm () {
			let val = null;
			this.source.forEach((_)=>{
				if(_.components == 'remote_select' || _.components == 'static_select') {
					val = _.multiple ? [] : '';
				}else if (_.components == 'upload'){
					val = [];
				}else {
					val = '';
				}
				this.$set(this.form, _.field_type, val);
			});
		},
	},
	mounted () {
		this.initializeForm();
	},
	watch: {
		source() {
			this.initializeForm();
		},
	},
	components: { StaticSelect, RemoteSelect, JumpSelect, AppSwitch, Upload, }
}
</script>
<style lang="scss" scoped>
</style>