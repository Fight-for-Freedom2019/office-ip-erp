<template>
  <div style="display: flex;">
  	<template>
      <classification-tree @deliver="receive" ref="classification_tree"></classification-tree>
    </template>
    <template style="flex:1;">
      <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table" style="overflow: auto;">
        <span slot="bread_mark">{{ mark }}</span>
      </table-component>
    </template>
    <common-detail
        :title="currentRow.title"
        :visible.sync="shrinkVisible" 
        type="patent" 
        :id="currentRow.id" 
        ref="detail"
        @editSuccess="refresh"
    >
    </common-detail>
  </div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'	
import ClassificationTree from '@/components/page_extension/ClassificationTree'
import CommonDetail from '@/components/page_extension/Common_detail'
const URL = '/patents'
export default {
  name: 'tech-pro-classifition',
  data () {
  	return {
      shrinkVisible: false,
  	  option: {
        'url': '/patents',
  	  	'name': 'tech-pro-classifition',
  	  	'height': 'default3',
  	  	'is_pagination': false,
        'list_type': 'patent',
  	  	'is_search': false,
        'rowClick': this.handleRowClick,
  	  	'columns': [
  	  	   { type: 'selection' },
          { type: 'text', label: '案号', prop: 'serial', is_agency: true,  width: '160',render: this.serialRender, render_header: true},
          { type: 'text', label: '标题', prop: 'title',  is_import: true, width: '200', is_agency: true, render_header: true},
          { type: 'text', label: '英文标题', prop: 'english_title',  is_import: true, width: '200', is_agency: true, render_header: true},
  
          { type: 'text', label: '案件类型', prop: 'subtype', is_agency: true, render_simple: 'name', is_import: true, width: '120',render_header:true},
          { type: 'text', label: '申请国家', prop: 'area',  is_import: true, width: '120', render_simple: 'name', is_agency: true, render_header: true },
          { type: 'array', label: '申请人', prop: 'applicants', width: '200', is_import: true,render: _=>{ return _.map(_=>_.name);},render_header: true},
          { type: 'text', label: '申请号', prop: 'application_number',  is_import: true, width: '140', is_agency: true, render_header: true},
          { type: 'text', label: '申请日', prop: 'application_date',  is_import: true, width: '123', is_agency: true,render_header: true},
  
          { type: 'text', label: 'IPR', prop: 'ipr', render_simple: 'name',  is_import: true, width: '90', is_agency: true, render_header: true},
          { type: 'text', label: '客户', prop: 'customer', render_simple: 'name',  is_import: true, width: '90', is_agency: true, render_header: true},
          { type: 'text', label: '客户案号', prop: 'customer_serial',  width: '140', render_header: true },
          { type: 'text', label: '提案标题', prop: 'proposal_title',  width: '140', render_header: true },
          { type: 'array', label: '发明人', width: '238', prop: 'inventors', is_import: true, is_agency: true, render: _=>{ return _.map(_=>`${_.name}_${_.email}:${_.share}%`)},render_header: true},          
          { type: 'text', label: '代理人', width: '90', prop: 'agent', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '代理人助理', width: '130', prop: 'assistant', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '联系人', width: '90', prop: 'contact', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '初审人', width: '90', prop: 'first_reviewer', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '复审人', width: '90', prop: 'final_reviewer', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '代表人', width: '90', prop: 'representative', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '顾问', width: '90', prop: 'consultant', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '销售', width: '90', prop: 'sales', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '订单号', width: '160', prop: 'order', render_simple: 'serial', is_import: true, render_header: true},
          { type: 'text', label: '案件状态', width: '130', prop: 'project_state', render_simple: 'name', is_import: true, render_header: true},
          { type: 'text', label: '承办部门', width: '130', prop: 'organization_unit', render_simple: 'name', is_import: true, render_header: true},

          // { type: 'text', label: '技术理解评分', prop: 'tech_rank', is_import: true,  width: '130', show: true, render_header: true},
          // { type: 'text', label: '撰写质量评分', prop: 'draft_rank', is_import: true, width: '130', show: true, render_header: true},
          // { type: 'text', label: '服务态度评分', prop: 'service_rank', is_import: true,  width: '130', show: true, render_header: true},
          // { type: 'text', label: '特别评价', prop: 'negative_flag', is_import: true, width: '110', show: true, render_header: true},
          // { type: 'text', label: '评价详情', prop: 'negative_comment', is_import: true, width: '110', show: true, render_header: true},
          { type: 'text', label: '摘要', prop: 'abstract',  width: '200', render_header: true},
          { type: 'text', label: '公开日', prop: 'public_date',  is_import: true, width: '110',  render_header: true},
          { type: 'text', label: '公开号', prop: 'public_number',  is_import: true, width: '110',  render_header: true},
          { type: 'text', label: '初审合格日', prop: 'pre_exam_ok_date',  width: '140',  render_header: true},
          { type: 'text', label: '进入实审日', prop: 'sub_exam_start_date',  width: '140',  render_header: true},
          { type: 'text', label: '公告日', prop: 'issue_date',  is_import: true, width: '110',  render_header: true},
          { type: 'text', label: '公告号', prop: 'issue_number',  is_import: true, width: '110',  render_header: true},
          { type: 'text', label: '主国际分类号', prop: 'main_ipc',  width: '160',  render_header: true},
          { type: 'text', label: '国际申请日', prop: 'pct_application_date',  width: '140',  render_header: true},
          { type: 'text', label: '国际申请号', prop: 'pct_application_number',  width: '140',  render_header: true},
          { type: 'text', label: '国际优先权日', prop: 'pct_priority_date',  width: '160',  render_header: true},
          { type: 'text', label: '国际公开日', prop: 'pct_publication_date',  width: '140',  render_header: true},
          { type: 'text', label: '国际公开语言', prop: 'pct_publication_language',  width: '160',  render_header: true},
          { type: 'text', label: '国际公开号', prop: 'pct_publication_number',  width: '140',  render_header: true},
          // { type: 'text', label: '复审委内编号', prop: 'board_number',  width: '160',  render_header: true},
          // { type: 'text', label: '证书编号', prop: 'certificate_no',  width: '160',  render_header: true},
          { type: 'text', label: '说明书字数', prop: 'words_count',  width: '140',  render_header: true},
          { type: 'text', label: '权利要求项数', prop: 'claims_count',  width: '140',  render_header: true},
          // { type: 'array', label: '标签', prop: 'tags', render: _=>_.map(_=>_.name), is_import: true, width: '123',render_header: true},
          { type: 'text', label: '案件等级', prop: 'level', render_simple: 'name',width: '100', render_header: true},

          { type: 'text', label: '技术分类', width: '160' , prop: 'classification',  is_import: true, render_simple: 'name',render_header: true},
          { type: 'array', label: '优先权', prop: 'priorities', width: '145',render: _=>_.map(_=>_.number), render_header: true},
          { type: 'array', label: '产品分类', width: '160', prop: 'products',  render: _=>_.map(_=>_.name), render_header: true,},
          { type: 'array', label: '案件引用', prop: 'references', width: '200',  render_header: true,},
          { type: 'text', label: '委案日', prop: 'entrusting_time',  render_header: true, is_import: true, width: '123',         
            render: (h,item)=>{
              let t = item;
              if(t) {
                t = this.$tool.getDate(new Date(t));
              }
              return h('span', t);
            },
          },
          { type: 'text', label: '摘要附图', prop: 'figure_file', is_import: true, width: '160',}, 
          { type: 'text', label: '是否申请实质审查', prop: 'is_subexam_request', is_import: true, width: '160', render_header: true,}, 
          // { type: 'text', label: '返发明人稿时间', prop: 'first_edition_to_inventor_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核时间', prop: 'inventor_review_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核次数', prop: 'inventor_review_times', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人评分', prop: 'inventor_rank', is_import: true, render: this.rateRender, width: '160', show: false , render_header: true},
          // { type: 'text', label: '返IPR稿时间', prop: 'first_edition_to_ipr_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR定稿时间', prop: 'ipr_final_edition_time', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR审核次数', prop: 'ipr_review-times', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR首次评分', prop: 'first_ipr_rank', is_import: true, render: this.rateRender, width: '160', show: false},
          // { type: 'text', label: 'IPR终稿评分', prop: 'final_ipr_rank', is_import: true, render: this.rateRender, width: '160', show: false},
          // { type: 'text', label: '代理人撰稿耗时', prop: 'agent_drafting_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '发明人审核耗时', prop: 'inventor_review_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: 'IPR审核耗时', prop: 'ipr_review_period', is_import: true, width: '160', show: false , render_header: true},
          // { type: 'text', label: '代理人修改耗时', prop: 'amending_period', is_import: true, width: '170', show: false , render_header: true},
          // { type: 'text', label: '详细状态', prop: 'flownode',  width: '180', is_agency: true, render_simple: 'name' , render_header: true},
          { type: 'text', label: '备注', prop: 'remark',  width: '123'  , render_header: true},
          // { type: 'array', label: '项目/奖项名称', prop: 'awards',  render: _=>{ return _.map(_=>_.name);}, width: '200' , render_header: true},
          { type: 'text', label: '主动修改届满日', prop: 'active_supplement_expire_date',  width: '145'  , render_header: true},
          // { type: 'text', label: '委案类型', prop: 'agency_type',  width: '145' , render_simple: 'name' , render_header: true},
          // { type: 'text', label: '代理人修改时间', prop: 'agent_amending_period',  width: '160' , render_header: true },
          // { type: 'text', label: '立案时间', prop: 'create_time',  width: '145'  , render_header: true},
          { type: 'text', label: 'DAS码', prop: 'das',  width: '145' , render_header: true },
          // { type: 'text', label: '专利族号', prop: 'family_number',  width: '145'  , render_header: true},
          // { type: 'text', label: '群组号', prop: 'group_number',  width: '145' , render_header: true },
          // { type: 'text', label: 'IPR审核次数', prop: 'ipr_review_times',  width: '145'  , render_header: true},
          { type: 'text', label: 'PCT19条修改届满日', prop: 'pct19_expire_date',  width: '198'  , render_header: true},
          { type: 'text', label: 'PCT国家阶段届满日', prop: 'pct_national_stage_expire_date',  width: '198'  , render_header: true},
          { type: 'text', label: 'PCT国际初步审查届满日', prop: 'pct_pre_exam_expire_date',  width: '198' , render_header: true },
          { type: 'text', label: '国际检索日', prop: 'pct_search_date',  width: '145'  , render_header: true},
          { type: 'text', label: '优先权届满日', prop: 'priority_expire_date',  width: '178'  , render_header: true},
          // { type: 'text', label: '项目名称', prop: 'project_name',  width: '145'  , render_header: true},
          // { type: 'text', label: '项目编号', prop: 'project_serial',  width: '145' , render_header: true },
          { type: 'text', label: '首次年费年度', prop: 'start_year',  width: '145'  , render_header: true},
          // { type: 'text', label: '详细类型', prop: 'type_name',  width: '145' },
          { type: 'text', label: '是否变更', prop: 'is_amended',  width: '178', render:this.booleanRender , render_header: true},         
          { type: 'text', label: '生物相关', prop: 'is_biological',  width: '198', render:this.booleanRender,render_header: true , render_header: true},          
          { type: 'text', label: '分案申请', prop: 'is_division',  width: '178',render:this.booleanRender , render_header: true},         
          { type: 'text', label: '连续案', prop: 'is_continuation',  width: '178', render:this.booleanRender , render_header: true},         
          { type: 'text', label: '遗传相关', prop: 'is_genetic',  width: '198', render:this.booleanRender , render_header: true},         
          { type: 'text', label: '不丧失新颖性公开', prop: 'is_leakage',  width: '198', render:this.booleanRender , render_header: true},         
          // { type: 'text', label: '是否许可备案', prop: 'is_licensed',  width: '145',render:this.booleanRender , render_header: true},         
          { type: 'text', label: '提前公开', prop: 'is_pre_publication',  width: '145',render:this.booleanRender , render_header: true},          
          { type: 'text', label: '要求优先权', prop: 'is_priority',  width: '178', render:this.booleanRender , render_header: true},          
          { type: 'text', label: '保密审查', prop: 'is_secure_examination',  width: '145',render:this.booleanRender , render_header: true},         
          { type: 'text', label: '序列表', prop: 'is_sequence',  width: '145', render:this.booleanRender , render_header: true},          
          { type: 'text', label: '同日申请发明/新型', prop: 'is_utility_or_invention',  width: '178', render:this.booleanRender , render_header: true},   
  	  	],
  	  },
  	  tableData: [],
      mark: '',
      filter_id: 1,
      currentRow: '',
  	}
  },
  computed: {
    pageType () {
      const path = this.$route.path;
      return /classification/.test(path) ? 'classification' : 'product';
    },
  },
  methods: {
    receive (val) {
      console.log(val)
      this.mark = val.fullname +':' + val.description;
      this.filter_id = val.id;
    },
    handleRowClick (row) {
      this.shrinkVisible = true;
      this.currentRow = row;
    },
  	refreshTableData(option) {
      const t = this.pageType;
	    const url = URL;
      let extraParams = {};
      extraParams[`is_${t}_child`] = 0;
      extraParams[`${t}_id`] = this.filter_id;
	    const data = Object.assign({},option, extraParams,{listRows: 10000});
	   
	    const success = _=>{
	        console.log(_)
	        this.tableData = _.patents.data;
	    };
	    this.$axiosGet({ url, data, success });
  	}, 	
  	refresh () {
      this.$refs.table.refresh();
    },
  },
  mounted () {
  	this.refresh();
  },
  watch: {
    filter_id () {
      this.refresh();
    }
  },
  components: {
  	TableComponent,
    ClassificationTree,
    CommonDetail,
  },
}	
</script>
<style lang="scss" scoped>
</style>