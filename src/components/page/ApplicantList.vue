<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>

        <!-- 新建申请人 -->
        <app-shrink :visible.sync="isApplicantAddPanelVisible" :modal='formType==="add"' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType == 'add'" size="small">新建</el-button>
				<el-button type="primary" @click="saveAdd" v-if="formType == 'edit'" size="small">保存</el-button>
      </span>
            <applicant-list-add ref="applicantAdd" :type='formType' :applicant='applicant' @refresh="refresh" @update="update"></applicant-list-add>
        </app-shrink>

    </div>
</template>

<script>

    import AxiosMixins from '@/mixins/axios-mixins'
    import TableComponent from '@/components/common/TableComponent'
    import ApplicantListAdd from '@/components/page_extension/ApplicantListAdd'
    import AppShrink from '@/components/common/AppShrink'
    import Config from '@/const/selectConfig'
    const config = new Map(Config);
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
                    'url': '/applicants',
                    'is_list_filter': true,
                    'list_type': 'applicants',
                    'treeFilter':'applicants',
                    'height': 'default',
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'rowClick': this.handleRowClick,
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer', render_header:true, width: '250',render:(h,item)=>{return h("span",item?item.name:"")}},
                        {type: 'text', label: '申请人姓名', prop: 'name', render_header:true,sortable: true, width: '250'},
                        {type: 'text', label: '国籍', prop: 'citizenship',render_header:true},
                        {
                            type: 'text',
                            label: '申请人类型',
                            prop: 'applicant_type',
                            render_header:true,
                            width: '200',
                            render_text:(item)=>{
                                let name;
                                config.get("applicant_type").options.map(function (o) {
                                    if(o.id === item){
                                        name = o.name;
                                    }
                                })
                                return name
                            }
                        },
                        {type: 'text', label: '证件号码', prop: 'identity', render_header:true, width: '240'},
                        {type: 'text', label: '邮编', prop: 'postcode', render_header:true, width: '145'},
                        {type: 'text', label: '邮箱', prop: 'email_address', render_header:true, width: '145'},
                        {type: 'text', label: '电话号码', prop: 'phone_number', render_header:true, width: '145'},
                        {
                            type: 'text', label: '住所所在地', prop: 'residence', render_header:true, width: '175',
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
                        {type: 'text', label: '详细地址', prop: 'address', render_header:true, width: '260'},
                        {
                            type: 'text',
                            label: '费用备案',
                            prop: 'is_fee_discount',
                            render_header:true,
                            width: '145',
                            render: (h, item) => h('span', item ? '已完成' : '未完成')
                        },
                        {type: 'text', label: '英文姓名', prop: 'english_name',render_header:true, width: '175'},
                        {type: 'text', label: '英文地址', render_header:true,prop: 'english_address', width: '260'},
                        {
                            type: 'text',
                            label: '是否默认申请人',
                            prop: 'is_default',
                            sortable: true,
                            render_header:true,
                            width: '145',
                            render: (h, item) => h('span', item ? '是' : '否')
                        },
                    ],
                },
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
        methods: {
            add() {
                this.formType = 'add';
                this.appPanelTitle = '新建申请人';
                this.isApplicantAddPanelVisible = true;
                this.$refs.applicantAdd?this.$refs.applicantAdd.clear():"";
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
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _ => {
                    if (this.formType === "add") this.isApplicantAddPanelVisible = false;
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
