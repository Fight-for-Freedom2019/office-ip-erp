import Vue from 'vue'
import Router from 'vue-router'
//首页
const Home                     = () => import('@/components/page/Home')

//工作流
const TaskCommon               = () => import('@/components/page/TaskCommon')

//专利
const PatentList               = () => import('@/components/page/PatentList')
const NoticeCommon             = () => import('@/components/page/NoticeCommon')

// const CheckProposal            = () => import('@/components/page/CheckProposal')
// const PatentAdd                = () => import('@/components/page/PatentAdd')
// const Proposal                 = () => import('@/components/page/Proposal')
// const ProposalCommon           = () => import('@/components/page/ProposalCommon')
// const TaskExpiring             = () => import('@/components/page/TaskExpiring')
// const TaskExpiringControl      = () => import('@/components/page/TaskExpiringControl')
// const PatentCertificate        = () => import('@/components/page/PatentCertificate')
// const PatentAward              = () => import('@/components/page/PatentAward')
// const ApplyingPatent           = () => import('@/components/page/ApplyingPatent')

//CRM基础数据
const CustomerList             = () => import('@/components/page/CustomerList')
const Orders                   = () => import('@/components/page/crm/Orders')
const CustomerQuotation        = () => import('@/components/page/crm/data/Quotation')     //报价管理
const ApplicantList            = () => import('@/components/page/ApplicantList')
const InventorList             = () => import('@/components/page/InventorList')
const ContactsList             = () => import('@/components/page/ContactsList')
const CustomerRemarks          = () => import('@/components/page/CustomerRemarks')
const ContractsList            = () => import('@/components/page/ContractsList')
const InvoiceTargets           = () => import('@/components/page/InvoiceTargets')

//CRM模块账款管理
const RequestPayout             = () => import('@/components/page/RequestPayout')     //待请费用
const PaymentManage            = () => import('@/components/page/PaymentManage')     //请款管理
const InvoiceManage            = () => import('@/components/page/InvoiceManage')     //发票管理
const PaymentRecevied          = () => import('@/components/page/PaymentRecevied')     //回款管理

// CRM模块通知发文
const CustomerNotices          = () => import('@/components/page/crm/sending/Notices')     //官文
const CustomerReports          = () => import('@/components/page/crm/sending/Reports')     //报表
const CustomersRenewals        = () => import('@/components/page/crm/sending/Renewals')     //年费
const ExpressManage            = () => import('@/components/page/ExpressManage')     //快递

//CRM 供应商管理
const Suppliers                = () => import('@/components/page/crm/suppliers/Suppliers')     //供应商管理
const SuppliersFee             = () => import('@/components/page/crm/suppliers/Fees')     //待付费用
const SuppliersPayment         = () => import('@/components/page/crm/suppliers/Payments')     //付款管理
const SuppliersQuotation       = () => import('@/components/page/crm/suppliers/Quotations')     //报价管理

//财务模块路由
const FeeCommon                = () => import('@/components/page/FeeCommon')
const RenewalFee               = () => import('@/components/page/RenewalFee')

// 交互
const ExchangeNotices          = () => import('@/components/page/exchange/client/Notices')     //通知书
const ExchangeArchives         = () => import('@/components/page/exchange/client/Archives')     //递交包
const ExchangeMails            = () => import('@/components/page/exchange/Mails')     //递交包

// const TrademarkNotice          = () => import('@/components/page/NoticeCommon')
const CopyrightList            = () => import('@/components/page/CopyrightList')


// const RenewalEstimate          = () => import('@/components/page/RenewalEstimate')
// const UserList                 = () => import('@/components/page/UserList')
// const Branch                   = () => import('@/components/page/Branch')
// const CopyrightAdd             = () => import('@/components/page/CopyrightAdd')
// const TrademarkStatistics      = () => import('@/components/page/TrademarkStatistics')
// const Technology               = () => import('@/components/page/Technology')
// const DispatchAdministration   = () => import('@/components/page/DispatchAdministration')
// const InvoiceCommon            = () => import('@/components/page/InvoiceCommon')

// const MailList                 = () => import('@/components/page/MailList')
// const SystemMessage            = () => import('@/components/page/SystemMessage')
// const SystemMessageDetail      = () => import('@/components/page/SystemMessageDetail')
// const MailAdd                  = () => import('@/components/page/MailAdd')

// const Report                   = () => import('@/components/page/Report')
// const ReportAdd                = () => import('@/components/page/ReportAdd')

//###################
// const CommonDetail             = () => import('@/components/page/CommonDetail')
// const Babel                    = () => import('@/components/page_extension/CommonDetail_base')
// const Control                  = () => import('@/components/page_extension/CommonDetail_control')
// const Notice                   = () => import('@/components/page_extension/CommonDetail_notice')
// const Fee                      = () => import('@/components/page_extension/CommonDetail_fee')
// const Email                    = () => import('@/components/page_extension/CommonDetail_email')
// const Documents                = () => import('@/components/page_extension/CommonDetail_documents')
// const SettingAgent            = () => import('@/components/page/SettingAgent')
// const SettingAgentDetail      = () => import('@/components/page/SettingAgentDetail')           
// const SettingAgency            = () => import('@/components/page/SettingAgency')
// const SettingAgencyDetail      = () => import('@/components/page/SettingAgencyDetail')
// const SettingCase              = () => import('@/components/page/SettingCase')
// const SettingJurisdiction      = () => import('@/components/page/SettingJurisdiction')
// const SettingTemplate          = () => import('@/components/page/SettingTemplate')
// const SettingTemplateEdit      = () => import('@/components/page/SettingTemplateEdit')
// const OfferList                = () => import('@/components/page/OfferList')
// const SettingUser              = () => import('@/components/page/SettingUser')
// const SettingRule              = () => import('@/components/page/SettingRule')
//#################

//交互模块
const ExchangeDocumentOa       = () => import('@/components/page/exchange/document/Oa')
const ExchangeDocumentVoucher  = () => import('@/components/page/exchange/document/Voucher')
const ExchangeDocumentOther    = () => import('@/components/page/exchange/document/Other')
const ExchangeDocumentCpc      = () => import('@/components/page/exchange/document/Cpc')

//-------------------设置 begin-----------------
const SettingIndividual        = () => import('@/components/page/SettingIndividual')
const UserManage               = () => import('@/components/page/UserManage')
const TechProClassification    = () => import('@/components/page/TechProClassification')
const SettingField             = () => import('@/components/page/FieldVisible')
const PaymentAccount             = () => import('@/components/page/PaymentAccount')
const SettingFeeCode           = () => import('@/components/page/setting/data/FeeCode')
const SettingFileType           = () => import('@/components/page/setting/data/FileType')
const SettingProjectStage           = () => import('@/components/page/setting/data/ProjectStage')
const SettingDefinitions           = () => import('@/components/page/setting/data/Definitions')
const SettingFlows           = () => import('@/components/page/setting/data/Flows')
const SettingActions           = () => import('@/components/page/setting/data/Actions')
const SettingEntityChange           = () => import('@/components/page/setting/data/EntityChange')
const SettingServiceProject           = () => import('@/components/page/setting/ServiceProject')
const SettingMailTemplate           = () => import('@/components/page/setting/MailTemplate')
const SettingSystem            = () => import('@/components/page/setting/SystemSetting')

//#################
// const SI_Base                  = () => import('@/components/page_extension/SettingIndividual_base')
// const SI_Notice                = () => import('@/components/page_extension/SettingIndividual_notice')
// const SI_Email                 = () => import('@/components/page_extension/SettingIndividual_email')
//#################
// const SS_Base                  = () => import('@/components/page_extension/SettingSystem_base')
// const SS_Email                 = () => import('@/components/page_extension/SettingSystem_email')
// const SS_Number                = () => import('@/components/page_extension/SettingSystem_number')
// const SS_Case                  = () => import('@/components/page_extension/SettingSystem_case')
// const SS_Fee                   = () => import('@/components/page_extension/SettingSystem_fee')
//-------------------设置 end---------------------

Vue.use(Router);
const router = new Router({
  // mode: 'history',
  routes: [
    //###重定向###
    { path: '/', redirect: '/task/pending' },
    { path: '/task', redirect: '/task/pending' },
    { path: '/patents', redirect: '/patent/list' },
    { path: '/trademarks', redirect: '/trademark/list' },
    { path: '/copyrights', redirect: '/copyright/list' },
    { path: '/crm', redirect: '/crm/customers' },
    { path: '/setting', redirect: '/setting/my' },
    { path: '/report', redirect: '/report/task' },
    //###重定向###
    { path: '/statistics',name: 'Home',component: Home },
//################### CRM router begin ################
    { path: '/crm/customers', name: 'CustomerList',component:  CustomerList,},
  {
    path: '/crm/orders',
    name: 'Orders',
    component:  Orders,
  },
  {
    path: '/crm/data/applicants',
    name: 'ApplicantLists',
    component: ApplicantList
  },
  {
    path: '/crm/data/inventors',
    name: 'InventorList',
    component: InventorList
  },
  {
    path: '/crm/data/remarks',
    name: 'CustomerRemarks',
    component: CustomerRemarks
  },
  {
    path: '/crm/data/contacts',
    name: 'ContactsList',
    component: ContactsList
  },
  {
    path: '/crm/data/invoice_targets',
    name: 'InvoiceTargets',
    component: InvoiceTargets
  },
  {
    path: '/crm/data/quotations',
    name: 'CustomerQuotation',
    component: CustomerQuotation
  },
  {
    path: '/crm/finance/payment_request',
    name: 'PaymentManage',
    component: PaymentManage
  },
  {
    path: '/crm/finance/invoice',
    name: 'InvoiceManage',
    component: InvoiceManage
  },
  {
    path: '/crm/finance/fee',
    name: 'RequestPayout',
    component: RequestPayout,
      meta:{
        params:{
            is_debit: 1,
            status: 1
        }
      }
  },
  {
    path: '/crm/finance/payment_recevied',
    name: 'PaymentRecevied',
    component: PaymentRecevied
  },
  {
    path: '/crm/contracts',
    name: 'ContractsList',
    component: ContractsList
  },
  {
    path: '/crm/notice/notices',
    name: 'CustomerNotices',
    component: CustomerNotices
  },
  {
    path: '/crm/notice/reports',
    name: 'CustomerReports',
    component: CustomerReports
  },
  {
    path: '/crm/notice/renewals',
    name: 'CustomersRenewals',
    component: CustomersRenewals
  },
  {
    path: '/crm/notice/expresses',
    name: 'ExpressManage',
    component: ExpressManage
  },
  {
    path: '/crm/suppliers/lists',
    name: 'Suppliers',
    component: Suppliers
  },
  {
    path: '/crm/suppliers/fees',
    name: 'SuppliersFee',
    component: SuppliersFee,
    meta:{
      params:{
          status: 11
      }
    }
  },
  {
    path: '/crm/suppliers/payments',
    name: 'SuppliersPayment',
    component: SuppliersPayment
  },
  {
    path: '/crm/suppliers/quotations',
    name: 'SuppliersQuotation',
    component: SuppliersQuotation
  },

//################### CRM router end ##################

//################### Exchange router begin ##################
  {
    path: '/exchange/client/notices',
    name: 'ExchangeNotices',
    component: ExchangeNotices
  },
  {
    path: '/exchange/client/archives',
    name: 'ExchangeArchives',
    component: ExchangeArchives
  },
  {
    path: '/exchange/mails',
    name: 'ExchangeMails',
    component: ExchangeMails
  },

//################### Exchange router end ##################

//################### 任务路由 begin ###################
    {
      path: '/task/pending',
      name: 'TaskPending',
      component: TaskCommon,
      meta: { 
        params: { is_review_action: 0 }, 
      },
    },   
    {
      path: '/task/review/sent',
      name: 'TaskReviewSend',
      component: TaskCommon,
      meta: {
        params: { 
          is_review_action: 1,
          is_sender: 1,
        },
      },
    },    
    {
      path: '/task/review/my',
      name: 'TaskReviewCheck',
      component: TaskCommon,
      meta: {
        params: { 
          is_review_action: 1,
          is_sender: 0,
        },
      },
    },
    {
      path: '/task/monitor/application',
      name: 'TaskMonitorApplication',
      component: TaskCommon,
      meta: {
        params: { 
          is_oa: 0,
        },
      },
    },
    {
      path: '/task/monitor/oa',
      name: 'TaskMonitorOa',
      component: TaskCommon,
      meta: {
        params: { 
          is_oa: 1,
        },
      },
    },
    
//################### 任务路由 end #####################

//################### 专利路由 start #####################
    {
      path: '/patent/list',
      name: 'PattentList',
      component: PatentList,
      meta: {
        params: { status: 1 }
      }
    },    
    {
      path: '/patent/draftbox',
      name: 'PatentDraftbox',
      component: PatentList,
      meta: {
        params: { status: 0 }
      }
    },
    {
      path: '/patent/notice',
      name: 'PatentNotice',
      component: NoticeCommon,
      meta: {
        params: {  },
        type: 'patent'
      }
    },
//################### 专利路由 end #####################

//################### 版权路由 begin ###################
  {
    path: '/copyright/list',
    name: 'CopyrightList',
    component: CopyrightList,
    meta: {
      params: { status: 1 }
    }
  },    
  {
    path: '/copyright/draftbox',
    name: 'CopyrightDraftbox',
    component: PatentList,
    meta: {
      params: { status: 0 }
    }
  },
  {
    path: '/copyright/notice',
    name: 'CopyrightNotice',
    component: NoticeCommon,
    meta: {
      params: {  },
      type: 'patent'
    }
  },
//################### 版权路由 end #####################
//################### 财务路由 begin ###################
    {
      path: '/finance/fees_to_request',
      name: 'FeeCommonRequest',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
        }
      }
    },
    {
      path: '/finance/fees_to_pay',
      name: 'FeeCommonPay',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
        }
      }
    },
    {
      path: '/finance/renewal_fees',
      name: 'RenewalFees',
      component: RenewalFee,
      props: {
      }
    },
//################### 费用路由 end #####################
//################### 报表路由 begin ###################
    // {
    //   path: '/report/task',
    //   name: 'TaskReport',
    //   component: Report,
    //   meta: { 'type': 'task' },
    // },
//################### 报表路由 end #####################

//################### 交互模块 start ###################
    {
      path: '/exchange/document/oa',name: 'ExchangeDocumentOa',component: ExchangeDocumentOa,
    },
    {
      path: '/exchange/document/voucher',
      name: 'ExchangeDocumentVoucher',
      component: ExchangeDocumentVoucher,
    },
    {
      path: '/exchange/document/other',
      name: 'ExchangeDocumentOther',
      component: ExchangeDocumentOther,
    },
    {
      path: '/exchange/document/cpc',
      name: 'ExchangeDocumentCpc',
      component: ExchangeDocumentCpc,
    },
//################### 交互模块 End ###################

//################### 设置模块 start ###################
    { path: '/setting/my', name: 'SettingIndividual', component: SettingIndividual },
    {
      path: '/setting/users',
      name: 'UserManage',
      component: UserManage,
    },
    {
      path: '/setting/classifications',
      name: 'Clssification',
      component: TechProClassification,
    },
    {
      path: '/setting/products',
      name: 'Product',
      component: TechProClassification,
    },
    { path: '/setting/field', name: 'SettingField', component: SettingField },
    { path: '/setting/services', name: 'ServiceProject', component: SettingServiceProject },
    { path: '/setting/mail_templates', name: 'MailTemplates', component: SettingMailTemplate },
    { path: '/setting/flow/definitions', name: 'Definitions', component: SettingDefinitions },
    { path: '/setting/flow/flows', name: 'Flows', component: SettingFlows },
    { path: '/setting/flow/actions', name: 'Actions', component: SettingActions },
    { path: '/setting/data/payment_accounts', name: 'PaymentAccount', component: PaymentAccount },
    { path: '/setting/data/fee_codes', name: 'FeeCode', component: SettingFeeCode },
    { path: '/setting/data/file_types', name: 'FileType', component: SettingFileType },
    { path: '/setting/data/stages', name: 'ProjectStage', component: SettingProjectStage },
    { path: '/setting/data/entity_changes', name: 'EntityChange', component: SettingEntityChange },
    { path: '/setting/system',name: 'SettingSystem',component: SettingSystem,},

    // {
    //   path: '/patent/list/detail__/:id',
    //   component: CommonDetail,
    //   children: [
    //     { path: '', redirect: 'base',  },
    //     { path: 'base', component: PatentAdd, meta: {type: 'edit'} },
    //     { path: 'control', component: Control },
    //     { path: 'notice', component: Notice },
    //     { path: 'fee', component: Fee },
    //     { path: 'email', component: Email },
    //     { path: 'documents', component: Documents },
    //   ]
    // },
    // {
    //   path: '/commonDetail/:id',
    //   component: CommonDetail,
    //   children: [
    //     { path: '', redirect: 'babel' },
    //     { path: 'babel', component: Babel },
    //     { path: 'control', component: Control },
    //     { path: 'notice', component: Notice },
    //     { path: 'fee', component: Fee },
    //     { path: 'email', component: Email },
    //     { path: 'documents', component: Documents },
    //   ],
    // },
  ]
});
router.beforeEach((to, from, next) => {
  router.app.$options.store.dispatch('clearFilter');
  next();
})
export default router
