<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>

        <!-- 新建申请人 -->
        <app-shrink :visible.sync="isApplicantAddPanelVisible" :modal='hasMask' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType == 'add'" size="small">新建</el-button>
				<el-button type="primary" @click="saveAdd" v-if="formType == 'edit'" size="small">保存</el-button>
      </span>
            <applicant-list-add ref="applicantAdd" :type='formType' :applicant='applicant'
                                @editSuccess="refreshTableData" @addSuccess="refreshTableData"></applicant-list-add>
        </app-shrink>

    </div>
</template>

<script>

    import AxiosMixins from '@/mixins/axios-mixins'
    import TableComponent from '@/components/common/TableComponent'
    import ApplicantListAdd from '@/components/page_extension/ApplicantListAdd'
    import AppShrink from '@/components/common/AppShrink'

    const URL = '/applicants';

    export default {
        name: 'applicantList',
        mixins: [AxiosMixins],
        data() {
            return {
                isApplicantAddPanelVisible: false,
                appPanelTitle: '新建申请人',
                formType: 'add',
                applicant: {},
                option: {
                    'name': 'applicant',
                    'url': '/api/applicants',
                    'height': 'default',
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'rowClick': this.handleRowClick,
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '申请人姓名', prop: 'name', sortable: true, width: '250'},
                        {type: 'text', label: '国籍', prop: 'citizenship'},
                        {
                            type: 'text',
                            label: '申请人类型',
                            prop: 'applicant_type',
                            sortable: true,
                            width: '200',
                            render: this.renderApplicantType
                        },
                        {type: 'text', label: '证件号码', prop: 'identity', sortable: true, width: '240'},
                        {type: 'text', label: '邮编', prop: 'postcode', sortable: true, width: '145'},
                        {type: 'text', label: '邮箱', prop: 'email_address', sortable: true, width: '145'},
                        {type: 'text', label: '电话号码', prop: 'phone_number', sortable: true, width: '145'},
                        {
                            type: 'text', label: '住所所在地', prop: 'residence', sortable: true, width: '175',
                            render: (h, item) => {
                                const d = this.areaMap.get(item);
                                return h('span', d ? d : '');
                            }
                        },
                        {
                            type: 'text', label: '省份', prop: 'province_code', sortable: true, width: '175',
                            render: (h, item) => {
                                const d = this.provinceMap.get(Number.parseInt(item));
                                return h('span', d ? d : '');
                            }
                        },
                        {
                            type: 'text', label: '城市', prop: 'city_code', sortable: true, width: '175',
                            render: (h, item) => {
                                const d = this.cityMap.get(item+"");
                                return h('span', d ? d : '');
                            }
                        },
                        {type: 'text', label: '详细地址', prop: 'address', sortable: true, width: '260'},
                        {
                            type: 'text',
                            label: '费用备案',
                            prop: 'is_fee_discount',
                            sortable: true,
                            width: '145',
                            render: (h, item) => h('span', item ? '已完成' : '未完成')
                        },
                        {type: 'text', label: '英文姓名', prop: 'english_name', sortable: true, width: '175'},
                        {type: 'text', label: '英文地址', prop: 'english_address', sortable: true, width: '260'},
                        {
                            type: 'text',
                            label: '是否默认申请人',
                            prop: 'is_default',
                            sortable: true,
                            width: '145',
                            render: (h, item) => h('span', item ? '是' : '否')
                        },
                        // {
                        // 	type: 'action',
                        //   width: '150',
                        // 	btns: [
                        // 		{ type: 'edit', click: this.handleRowClick },
                        // 		{ type: 'delete', click: this.applicantDelete },
                        // 	]
                        // }
                    ],
                },
                hasMask:true,
                tableData: [],
                filter: {}
            }
        },
        computed: {
            provinceMap() {
                return this.$store.getters.provinceMap;
            },
            cityMap() {
                return this.$store.getters.cityMap;
            },
            areaMap() {
                return this.$store.getters.areaMap;
            }
        },
        watch:{
            formType(val){
                val==="add"?this.hasMask = true:this.hasMask = false;
            }
        },
        methods: {
            add() {
                this.formType = 'add';
                this.appPanelTitle = '新建申请人';
                this.applicant = {};
                this.isApplicantAddPanelVisible = true;
            },
            saveAdd() {
                this.$refs.applicantAdd.save(this.formType);
            },
            handleRowClick(row) {
                let copy = this.$tool.deepCopy(row);
                copy.applicant_type === 0 ? copy.applicant_type = "" : ""
                this.applicant = copy;
                this.formType = 'edit';
                copy.province_city = [copy.province_code - 0, copy.city_code + ""];
                this.appPanelTitle = '编辑申请人>' + copy.name;
                this.isApplicantAddPanelVisible = true;
            },
            // applicantDelete ({id, name} ) {
            // 	console.log("这个删除的id",id)
            // 	this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, {type: 'warning'})
            // 		.then(_=>{
            // 			const url = `${URL}/${id}`;
            // 			const success = _=>{
            // 				this.$message({message: '删除申请人成功', type: 'success'});
            // 				this.update();
            // 			}
            // 			this.axiosDelete({url, success});
            // 		})
            // 		.catch(_=>{});
            // },
            renderApplicantType(h, text, row) {
                let str = "";
                switch (row.applicant_type) {
                    case 1:
                        str = "大专院校"
                        break;
                    case 2:
                        str = "科研单位"
                        break;
                    case 3:
                        str = "工矿企业"
                        break;
                    case 4:
                        str = "事业单位"
                        break;
                    case 5:
                        str = "个人"
                        break;
                    default:
                        break;
                }
                return h("span", str);
            },
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                // TODO 申请人applicant_type保存不成功
                const success = _ => {
                    if (this.formType === "add") this.isApplicantAddPanelVisible = false
                    this.tableData = _.data
                };
                this.axiosGet({url, data, success});
            },
            refresh() {
                this.$refs.table.refresh();
            },
            update() {
                this.$refs.table.update();
            }
        },
        mounted() {
            this.refresh();
        },
        components: {
            TableComponent,
            ApplicantListAdd,
            AppShrink
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
