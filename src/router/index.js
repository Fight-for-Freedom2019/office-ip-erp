import Vue from 'vue'
import Router from 'vue-router'
const Home                     = () => import('@/components/page/Home')
const Proposal                 = () => import('@/components/page/Proposal')
const InventorList             = () => import('@/components/page/InventorList')
const ContactsList             = () => import('@/components/page/ContactsList')
const CustomerRemarks             = () => import('@/components/page/CustomerRemarks')
const ContractsList             = () => import('@/components/page/ContractsList')
const ApplicantList            = () => import('@/components/page/ApplicantList')
const BillingInfo            = () => import('@/components/page/BillingInfo')
const ProposalCommon           = () => import('@/components/page/ProposalCommon')
const CheckProposal            = () => import('@/components/page/CheckProposal')
const TaskCommon               = () => import('@/components/page/TaskCommon')
const TaskExpiring             = () => import('@/components/page/TaskExpiring')
const TaskExpiringControl      = () => import('@/components/page/TaskExpiringControl')
const PatentList               = () => import('@/components/page/PatentList')
const CustomerList             = () => import('@/components/page/CustomerList')
const PatentCertificate        = () => import('@/components/page/PatentCertificate')
const PatentAward              = () => import('@/components/page/PatentAward')
const ApplyingPatent           = () => import('@/components/page/ApplyingPatent')
const PatentAdd                = () => import('@/components/page/PatentAdd')
const NoticeCommon             = () => import('@/components/page/NoticeCommon')

//CRM模块账款管理
const WaitForPayment             = () => import('@/components/page/WaitForPayment')     //待请费用
const PaymentManage             = () => import('@/components/page/PaymentManage')     //请款管理
const InvoiceManage             = () => import('@/components/page/InvoiceManage')     //发票管理
const PaymentRecevied             = () => import('@/components/page/PaymentRecevied')     //回款管理

// CRM模块通知发文
const ExpressManage             = () => import('@/components/page/ExpressManage')     //快递

// const TrademarkNotice          = () => import('@/components/page/NoticeCommon')
const TrademarkStatistics      = () => import('@/components/page/TrademarkStatistics')
const CopyrightList            = () => import('@/components/page/CopyrightList')
const CopyrightAdd             = () => import('@/components/page/CopyrightAdd')
const UserList                 = () => import('@/components/page/UserList')
const UserManage               = () => import('@/components/page/UserManage')
const Technology               = () => import('@/components/page/Technology')
const Branch                   = () => import('@/components/page/Branch')
const FeeCommon                = () => import('@/components/page/FeeCommon')
const DispatchAdministration   = () => import('@/components/page/DispatchAdministration')
const InvoiceCommon            = () => import('@/components/page/InvoiceCommon')
const ClassificationCommon     = () => import('@/components/page/ClassificationCommon')
const MailList                 = () => import('@/components/page/MailList')
const SystemMessage            = () => import('@/components/page/SystemMessage')
const SystemMessageDetail      = () => import('@/components/page/SystemMessageDetail')
const MailAdd                  = () => import('@/components/page/MailAdd')
const RenewalFee               = () => import('@/components/page/RenewalFee')
const RenewalEstimate          = () => import('@/components/page/RenewalEstimate')
const Report                   = () => import('@/components/page/Report')
const ReportAdd                = () => import('@/components/page/ReportAdd')
//###################
const CommonDetail             = () => import('@/components/page/CommonDetail')
const Babel                    = () => import('@/components/page_extension/CommonDetail_base')
const Control                  = () => import('@/components/page_extension/CommonDetail_control')
const Notice                   = () => import('@/components/page_extension/CommonDetail_notice')
const Fee                      = () => import('@/components/page_extension/CommonDetail_fee')
const Email                    = () => import('@/components/page_extension/CommonDetail_email')
const Documents                = () => import('@/components/page_extension/CommonDetail_documents')
//#################

//-------------------设置 begin-----------------
const SettingAgent            = () => import('@/components/page/SettingAgent')
const SettingAgentDetail      = () => import('@/components/page/SettingAgentDetail')           
const SettingAgency            = () => import('@/components/page/SettingAgency')
const SettingAgencyDetail      = () => import('@/components/page/SettingAgencyDetail')
const SettingCase              = () => import('@/components/page/SettingCase')
const SettingJurisdiction      = () => import('@/components/page/SettingJurisdiction')
const SettingRule              = () => import('@/components/page/SettingRule')
const SettingField             = () => import('@/components/page/FieldVisible')
const PaymentAccount             = () => import('@/components/page/PaymentAccount')
const SettingTemplate          = () => import('@/components/page/SettingTemplate')
const SettingTemplateEdit      = () => import('@/components/page/SettingTemplateEdit')
const OfferList                = () => import('@/components/page/OfferList')
const SettingUser              = () => import('@/components/page/SettingUser')
const SettingFeeCode           = () => import('@/components/page/setting/data/FeeCode')

//#################
const SettingIndividual        = () => import('@/components/page/SettingIndividual')
const SI_Base                  = () => import('@/components/page_extension/SettingIndividual_base')
const SI_Notice                = () => import('@/components/page_extension/SettingIndividual_notice')
const SI_Email                 = () => import('@/components/page_extension/SettingIndividual_email')
//#################
const SettingSystem            = () => import('@/components/page/SettingSystem')
const SS_Base                  = () => import('@/components/page_extension/SettingSystem_base')
const SS_Email                 = () => import('@/components/page_extension/SettingSystem_email')
const SS_Number                = () => import('@/components/page_extension/SettingSystem_number')
const SS_Case                  = () => import('@/components/page_extension/SettingSystem_case')
const SS_Fee                   = () => import('@/components/page_extension/SettingSystem_fee')
//-------------------设置 end---------------------

Vue.use(Router);
const router = new Router({
  // mode: 'history',
  routes: [
    //###重定向###
    { path: '/', redirect: '/task/pending' },
    { path: '/proposal', redirect: '/proposal/list' },
    { path: '/task', redirect: '/task/pending' },
    { path: '/patents', redirect: '/patent/list' },
    { path: '/trademarks', redirect: '/trademark/list' },
    { path: '/copyrights', redirect: '/copyright/list' },
    { path: '/crm', redirect: '/crm/customers' },
    { path: '/news', redirect: '/news/mailList' },
    { path: '/dispatch', redirect: '/dispatch/administration' },
    { path: '/fee', redirect: '/fee/bonus/all' },
    { path: '/setting', redirect: '/setting/individual' },
    { path: '/renewal', redirect: '/renewal/fee' },
    { path: '/report', redirect: '/report/task' },
    { path: '/test', redirect: '/test/form' },
    { path: '/statistics', redirect: '/task/pending' },
    { path: '/patent/certificate', redirect: '/patent/certificate/invention' },
    //###重定向###
    {
      path: '/statistics',
      name: 'Home',
      component: Home
    },
    {
      path: '/crm/customers',
      name: 'CustomerList',
      component:  CustomerList,
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
      path: '/crm/data/bill_info',
      name: 'BillingInfo',
      component: BillingInfo
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
      name: 'WaitForPayment',
      component: WaitForPayment
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
      path: '/crm/notice/express',
      name: 'ExpressManage',
      component: ExpressManage
    },
    {
      path: '/setting/applicantList',
      name: 'ApplicantList',
      component: ApplicantList
    },
    {
      path: '/task/pending/check',
      name: 'CheckProposal',
      component: CheckProposal
    },

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
      path: '/task/review/send',
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
      path: '/task/review/check',
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
      path: '/task/expiring',
      name: 'TaskExpiring',
      component: TaskExpiring,
    },
    {
      path: '/task/expiringControlNew',
      name: 'TaskExpiringControlNew',
      component: TaskExpiringControl,
      meta: {
        params: { stage: 1 },
      }
    },
    {
      path: '/task/expiringControlOa',
      name: 'TaskExpiringControlOa',
      component: TaskExpiringControl,
      meta: {
        params: { stage: 2 },
      }
    },
    {
      path: '/task/custom/:id',
      name: 'TaskCustom',
      component: TaskCommon,
      meta: {
        status: 0,
        custom: true,
      },
    },
    
//################### 任务路由 end #####################

//################### 提案路由 begin ###################
    {
      path: '/proposal/list',
      name: 'Proposal',
      component: Proposal,
    },
    {
      path: '/proposal/creatTime/month',
      name: 'ProposalMonth',
      component: Proposal,
      meta: {
        params: { create_time: 'thismonth' },
      }
    },
    {
      path: '/proposal/creatTime/quarter',
      name: 'ProposalQuarter',
      component: Proposal,
      meta: {
        params: { create_time: 'thisseason' },
      }
    },
    {
      path: '/proposal/creatTime/year',
      name: 'ProposalYear',
      component: Proposal,
      meta: {
        params: { create_time: 'thisyear' },
      },
    },
    {
      path: '/proposal/novelty/yes',
      name: 'ProopsalExistent',
      component: Proposal,
      meta: {
        params: { novelty: 1 },
      },
    },
    {
      path: '/proposal/novelty/no',
      name: 'ProopsalNonExistent',
      component: Proposal,
      meta: {
        params: { novelty: 0 },
      },
    },
    {
      path: '/proposal/add',
      name: 'ProposalCommon',
      component: ProposalCommon,
      alias: ['/proposal/detail', '/task/pending/proposal_check', '/proposal/edit'],
    },
    {
      path: '/proposal/custom/:id',
      name: 'ProposalCustom',
      component: Proposal,
      meta: {
        custom: true,
      },
    },
//################### 提案路由 end #####################

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
      path: '/patent/award',
      name: 'PattentAward',
      component: PatentList,
      meta: {
        params: { awards: 1 },
      }
    },
    { 
      path: '/patent/stage/new',
      name: 'PatentStageNew',
      component: PatentList,
      meta: {
        params: { stage: 1 },
      }
    },
    { 
      path: '/patent/stage/receipt',
      name: 'PatentStageReceipt',
      component: PatentList,
      meta: {
        params: { stage: 2 },
      }
    },
    { 
      path: '/patent/stage/pre_exam_ok',
      name: 'PatentStagePreExamOk',
      component: PatentList,
      meta: {
        params: { stage: 3 },
      }
    },
    { 
      path: '/patent/stage/public',
      name: 'PatentStagePublic',
      component: PatentList,
      meta: {
        params: { stage: 4 },
      }
    },
    { 
      path: '/patent/stage/subexam',
      name: 'PatentStageSubexam',
      component: PatentList,
      meta: {
        params: { stage: 5 },
      }
    },
    { 
      path: '/patent/stage/amendment',
      name: 'PatentStageAmendment',
      component: PatentList,
      meta: {
        params: { stage: 6 },
      }
    },
    { 
      path: '/patent/stage/oa',
      name: 'PatentStageOa',
      component: PatentList,
      meta: {
        params: { stage: 7 },
      }
    },
    { 
      path: '/patent/stage/reexam',
      name: 'PatentStageReexam',
      component: PatentList,
      meta: {
        params: { stage: 8 },
      }
    },
    { 
      path: '/patent/stage/grant',
      name: 'PatentStageGrant',
      component: PatentList,
      meta: {
        params: { stage: 9 },
      }
    },
    { 
      path: '/patent/stage/valid',
      name: 'PatentStageValid',
      component: PatentList,
      meta: {
        params: { stage: 10 },
      }
    },
    { 
      path: '/patent/stage/expired',
      name: 'PatentStageExpired',
      component: PatentList,
      meta: {
        params: { stage: 11 },
      }
    },
    { 
      path: '/patent/stage/rejected',
      name: 'PatentStageRejected',
      component: PatentList,
      meta: {
        params: { stage: 12 },
      }
    },
    { 
      path: '/patent/stage/invalid',
      name: 'PatentStageInvalid',
      component: PatentList,
      meta: {
        params: { stage: 15 },
      }
    },
    { 
      path: '/patent/stage/closed',
      name: 'PatentStageClosed',
      component: PatentList,
      meta: {
        params: { stage: 19 },
      }
    },
    { 
      path: '/patent/stage/pct_search',
      name: 'PatentStagePctSearch',
      component: PatentList,
      meta: {
        params: { stage: 20 },
      }
    },
    { 
      path: '/patent/stage/pct_national',
      name: 'PatentStagePctNational',
      component: PatentList,
      meta: {
        params: { stage: 21 },
      }
    },
    { 
      path: '/patent/stage/pct_public',
      name: 'PatentStagePctPublic',
      component: PatentList,
      meta: {
        params: { stage: 22 },
      }
    },
    { 
      path: '/patent/stage/other',
      name: 'PatentStageOther',
      component: PatentList,
      meta: {
        params: { stage: 0 },
      }
    },
    {
      path: '/patent/level/a',
      name: 'PatentLvelA',
      component: PatentList,
      meta: {
        params: { level: 'A' },
      }
    },
    {
      path: '/patent/level/b',
      name: 'PatentLvelB',
      component: PatentList,
      meta: {
        params: { level: 'B' },
      }
    },
    {
      path: '/patent/level/c',
      name: 'PatentLvelC',
      component: PatentList,
      meta: {
        params: { level: 'C' },
      }
    },
    {
      path: '/patent/level/d',
      name: 'PatentLvelD',
      component: PatentList,
      meta: {
        params: { level: 'd' },
      }
    },
    {
      path: '/patent/area/cn',
      name: 'PatentAreaCn',
      component: PatentList,
      meta: {
        params: { area: 'CN' },
      }
    },
    {
      path: '/patent/area/pct',
      name: 'PatentAreaPct',
      component: PatentList,
      meta: {
        params: { area: 'PCT' },
      }
    },
    {
      path: '/patent/area/other',
      name: 'PatentAreaOther',
      component: PatentList,
      meta: {
        params: { area: 'Other' },
      }
    },
    {
      path: '/patent/duration/priority_this_month',
      name: 'PatentDurationProprityThisMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'priority_expire_date', period:'this_month' },
      }
    },
    {
      path: '/patent/duration/priority_next_month',
      name: 'PatentDurationProprityNextMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'priority_expire_date', period:'next_month' },
      }
    },
    {
      path: '/patent/duration/modification_this_month',
      name: 'PatentDurationModificationThisMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'active_supplement_expire_date', period:'this_month' },
      }
    },
    {
      path: '/patent/duration/modification_next_month',
      name: 'PatentDurationModificationNextMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'active_supplement_expire_date', period:'next_month' },
      }
    },
    {
      path: '/patent/duration/pct_this_month',
      name: 'PatentDurationPctThisMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'pct_national_stage_expire_date',period:'this_month' },
      }
    },
    {
      path: '/patent/duration/pct_next_month',
      name: 'PatentDurationPctNextMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'pct_national_stage_expire_date',period:'next_month' },
      }
    },
    {
      path: '/patent/duration/pct19_this_month',
      name: 'PatentDurationPct19ThisMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'pct_19_expire_date', period:'this_month' },
      }
    },
    {
      path: '/patent/duration/pct19_next_month',
      name: 'PatentDurationPct19NextMonth',
      component: PatentList,
      meta: {
        params: { reminder: 'pct_19_expire_date', period:'next_month' },
      }
    },
    {
      path: '/patent/applying',
      name: 'ApplyingPatent',
      component: ApplyingPatent
    },
    {
      path: '/patent/add',
      name: 'PatentAdd',
      component: PatentAdd,
      props: { pageType: 'add' },
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
    {
      path: '/patent/notice/thisweek',
      name: 'PatentNoticeThisweek',
      component: NoticeCommon,
      meta: {
        params: { create_time: 'thisweek' },
        type: 'patent'
      }
    },
    {
      path: '/patent/notice/lastweek',
      name: 'PatentNoticeLastWeek',
      component: NoticeCommon,
      meta: {
        params: { create_time: 'lastweek' },
        type: 'patent'
      }
    },
    {
      path: '/patent/notice/thismonth',
      name: 'PatentNoticeThisMonth',
      component: NoticeCommon,
      meta: {
        params: { create_time: 'thismonth' },
        type: 'patent'
      }
    },
    {
      path: '/patent/notice/lastmonth',
      name: 'PatentNoticeLastMonth',
      component: NoticeCommon,
      meta: {
        params: { create_time: 'lastmonth' },
        type: 'patent'
      }
    },
    {
      path: '/patent/notice/earlier',
      name: 'PatentNoticeEarlier',
      component: NoticeCommon,
      meta: {
        params: { create_time: 'earlier' },
        type: 'patent'
      }
    },
    // {
    //   path: '/news/patent_notice',
    //   name: 'PatentNotice',
    //   meta: { type: 'patent' },
    //   component: NoticeCommon,
    // },
    {
      path: '/patent/custom/:id',
      name: 'PatentCustom',
      component: PatentList,
      meta: {
        custom: true,
      },
    },
    {
      path: '/patent/certificate/:id',
      name: 'PatentCertificate',         //专利证书
      component: PatentCertificate,
    },

//################### 专利路由 end #####################

//################### 版权路由 begin ###################
    {
      path: '/copyright/list',
      name: 'CopyrightList',
      component: CopyrightList
    },
    {
      path: '/copyright/stage/application',
      name: 'CopyrightStageApplication',
      component: CopyrightList,
      meta: {
        params: { stage: 1 },
      }
    },
    {
      path: '/copyright/stage/oa',
      name: 'CopyrightStageOa',
      component: CopyrightList,
      meta: {
        params: { stage: 2 },
      }
    },
    {
      path: '/copyright/stage/authorization',
      name: 'CopyrightStageAuthorization',
      component: CopyrightList,
      meta: {
        params: { stage: 4 },
      }
    },
    {
      path: '/copyright/area/cn',
      name: 'CopyrightAreaCn',
      component: CopyrightList,
      meta: {
        params: { area: 'CN' },
      }
    },
    {
      path: '/copyright/area/other',
      name: 'CopyrightAreaOther',
      component: CopyrightList,
      meta: {
        params: { area: 'other' },
      }
    },
    {
      path: '/copyright/custom/:id',
      name: 'CopyrightCustom',
      component: CopyrightList,
      meta: {
        custom: true,
      },
    },
    {
      path: '/copyright/add',
      name: 'CopyrightAdd',
      meta: { pageType: 'add' },
      component: CopyrightAdd
    },
    {
      path: '/copyright/list/detail/:id',
      redirect: '/copyright/list/detail__/:id',
    },
    {
      path: '/copyright/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: CopyrightAdd, meta: { pageType: 'edit' } },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/news/copyright_notice',
      name: 'CopyrightNotice',
      meta: { type: 'copyright' },
      component: NoticeCommon,
    },
//################### 版权路由 end #####################
//################### 费用路由 begin ###################
    {
      path: '/fee/bonus/all',
      name: 'FeeCommonAll',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 1
        }
      }
    },
    {
      path: '/fee/bonus/application',
      name: 'FeeCommonApplication',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'application'
        }
      }
    },
    {
      path: '/fee/bonus/grant',
      name: 'FeeCommonGrant',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'grant'
        }
      }
    },
    {
      path: '/fee/bonus/license',
      name: 'FeeCommonLicense',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'license'
        }
      }
    },
    {
      path: '/fee/bonus/year',
      name: 'FeeCommonYear',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'year'
        }
      }
    },
    {
      path: '/fee/bonus/special',
      name: 'FeeCommonSpecial',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'specical'
        }
      }
    },
    {
      path: '/fee/bonus/utility',
      name: 'FeeCommonUtility',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          bonus: 'utility'
        }
      }
    },
    {
      path: '/fee/oa/official',
      name: 'FeeCommonOfficial',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          fee_type: 3
        }
      }
    },
    {
      path: '/fee/oa/agency',
      name: 'FeeCommonAgency',
      component: FeeCommon,
      props: {
        debit: 0,
        defaultParams: {
          fee_type: 2
        }
      }
    },
    {
      path: '/fee/subsidy/huangpu',
      name: 'FeeCommonsubH',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 1,
          gov: 'dis',
        }
      }
    },    
    {
      path: '/fee/huangpu/patent',
      name: 'FeeCommonNP',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 1,
          gov: 'dis',
        }
      }
    },
    {
      path: '/fee/huangpu/trademark',
      name: 'FeeCommonNT',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 2,
          gov: 'dis',
        }
      }
    },
    {
      path: '/fee/huangpu/copyright',
      name: 'FeeCommonNC',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 3,
          gov: 'dis',
        }
      }
    },
    {
      path: '/fee/subsidy/guangzhou',
      name: 'FeeCommonsubG',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 1,
          gov: 'city',
        }
      }
    },    
    {
      path: '/fee/guangzhou/patent',
      name: 'FeeCommonSP',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 1,
          gov: 'city',
        }
      }
    },
    {
      path: '/fee/guangzhou/trademark',
      name: 'FeeCommonST',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 2,
          gov: 'city',
        }
      }
    },
    {
      path: '/fee/guangzhou/copyright',
      name: 'FeeCommonSC',
      component: FeeCommon,
      props: {
        debit: 1,
        defaultParams: {
          category: 3,
          gov: 'city',
        }
      }
    },
    {
      path: '/fee/income/submit',
      name: 'InvoiceCommonSubmit',
      component: InvoiceCommon,
      props: {
        debit: 1,
        defaultParams: {
          status:1
        }
      }
    },
    {
      path: '/fee/income/wating_for_payment',
      name: 'InvoiceCommonWaitingForPayment',
      component: InvoiceCommon,
      props: {
        debit: 1,
        defaultParams: {
          status:5
        }
      }
    },
    {
      path: '/fee/income/confirmed',
      name: 'InvoiceCommonconfirmed',
      component: InvoiceCommon,
      props: {
        debit: 1,
        defaultParams: {
          status:4
        }
      }
    },
    {
      path: '/fee/income/cancelled',
      name: 'InvoiceCommonCancelled',
      component: InvoiceCommon,
      props: {
        debit: 1,
        defaultParams: {
          status:3
        }
      }
    },
    {
      path: '/fee/invoice/to_be_reviewed',
      name: 'InvoiceCommonAC',
      component: InvoiceCommon,
      props: {
        debit: 0,
        defaultParams: {
          status: 1
        }
      }
    },
    {
      path: '/fee/invoice/voucher_upload',
      name: 'InvoiceCommonAU',
      component: InvoiceCommon,
      props: {
        debit: 0,
        defaultParams: {
          voucher: 0,
          status: 2
        }
      }
    },
    {
      path: '/fee/invoice/paying',
      name: 'InvoiceCommonAP',
      component: InvoiceCommon,
      props: {
        debit: 0,
        defaultParams: {
          status: 5
        }
      }
    },
    {
      path: '/fee/account/paid',
      name: 'InvoiceCommonAPD',
      component: InvoiceCommon,
      props: {
        debit: 0,
        defaultParams: {
          status: 4
        }
      }
    },
    {
      path: '/fee/invoice/rejected',
      name: 'InvoiceCommonAR',
      component: InvoiceCommon,
      props: {
        debit: 0,
        defaultParams: {
          status: 3
        }
      }
    },
    {
      path: '/fee/renewal/pay',
      name: 'RenewalFeeRP',
      component: RenewalFee,
      props: {
        defaultParams: {
          status: 0,
        }
      }
    },
    {
      path: '/fee/renewal/paid',
      name: 'RenewalFeeRPD',
      component: RenewalFee,
      props: {
        defaultParams: {
          status: 10,
        }
      }
    },
    {
      path: '/fee/renewal/withdrawn',
      name: 'RenewalFeeRR',
      component: RenewalFee,
      props: {
        defaultParams: {
          status: 3,
        }
      }
    },
//################### 费用路由 end #####################
//################### 报表路由 begin ###################
    {
      path: '/report/task',
      name: 'TaskReport',
      component: Report,
      meta: { 'type': 'task' },
    },
    {
      path: '/report/task/add',
      name: 'TaskReportAdd',
      component: ReportAdd,
      meta: { 'type': 'task' },
    },
    {
      path: '/report/proposal',
      name: 'ProposalReport',
      component: Report,
      meta: {'type': 'proposal'},
    },
    {
      path: '/report/proposal/add',
      name: 'ProposalReportAdd',
      component: ReportAdd,
      meta: {'type': 'proposal'},
    },
    {
      path: '/report/patent',
      name: 'PatentReport',
      component: Report,
      meta: { 'type': 'patent' },
    },
    {
      path: '/report/patent/add',
      name: 'PatentReportAdd',
      component: ReportAdd,
      meta: {'type': 'patent'},
    },
    {
      path: '/report/copyright',
      name: 'CopyrightReport',
      component: Report,
      meta: { 'type': 'copyright' },
    },
    {
      path: '/report/copyright/add',
      name: 'CopyrightReportAdd',
      component: ReportAdd,
      meta: {'type': 'copyright'},
    },
    {
      path: '/report/fee',
      name: 'FeeReport',
      component: Report,
      meta: {'type': 'fee'},
    },
    {
      path: '/report/fee/add',
      name: 'FeeReportAdd',
      component: ReportAdd,
      meta: {'type': 'fee'},
    },
    {
      path: '/report/invoice',
      name: 'InvoiceReport',
      component: Report,
      meta: {'type': 'invoice'},
    },
    {
      path: '/report/invoice/add',
      name: 'InvoiceReportAdd',
      component: ReportAdd,
      meta: {'type': 'invoice'},
    },
//################### 报表路由 end #####################

    {
      path: '/setting/userList',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/setting/userManage',
      name: 'UserManage',
      component: UserManage,
    },
    {
      path: '/setting/offer',
      name: 'OfferList',
      component: OfferList,
    },
    {
      path: '/news/mailList',
      name: 'MailList',
      component: MailList,
    },
    {
      path: '/news/systemMessage',
      name: 'SystemMessage',
      component: SystemMessage,
    },
    {
      path: '/news/systemMessage/detail',
      name: 'SystemMessageDetail',
      component: SystemMessageDetail,
    },
    {
      path: '/news/mailList/mailAdd',
      name: 'MailAdd',
      meta: { type: 'add' },
      component: MailAdd,
    },
    {
      path: '/news/mailList/mailEdit',
      name: 'mailEdit',
      meta: { type: 'edit' },
      component: MailAdd,
    },
    {
      path: '/setting/classification',
      name: 'Clssification',
      component: ClassificationCommon,
    },
    {
      path: '/setting/product',
      name: 'Product',
      component: ClassificationCommon,
    },
    {
      path: '/setting/branch',
      name: 'Branch',
      component: Branch,
    },
    {
      path: '/fee/fee_in/income',
      name: 'FeeIncome',
      component: FeeCommon,
    },
    {
      path: '/dispatch/administration',
      name: 'DispatchAdministration',
      component: DispatchAdministration,
    },
    {
      path: '/fee/fee_pay/pay',
      name: 'FeePay',
      component: FeeCommon,
    },
    {
      path: '/fee/fee_in/bill',
      name: 'FeeBill',
      component: InvoiceCommon,
    },
    {
      path: '/fee/fee_pay/payment',
      name: 'FeePayment',
      component: InvoiceCommon
    },
    {
      path: '/fee/renewal/fee',
      name: 'RenewalFee',
      component: RenewalFee,
    },
    {
      path: '/fee/renewal/estimate',
      name: 'RenewalEstimate',
      component: RenewalEstimate,
    },
    {
      path: '/patent/list/detail/:id',
      redirect: '/patent/list/detail__/:id',
    },
    {
      path: '/patent/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: PatentAdd, meta: {type: 'edit'} },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/commonDetail/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'babel' },
        { path: 'babel', component: Babel },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ],
    },
    { path: '/setting/agent', name: 'SettingAgent', component: SettingAgent },
    { path: '/setting/agent/detail', name: 'SettingAgentDetail', component: SettingAgentDetail },
    { path: '/setting/agency', name: 'SettingAgency', component: SettingAgency },
    { path: '/setting/agency/detail', name: 'SettingAgencyDetail', component: SettingAgencyDetail },
    { path: '/setting/case', name: 'SettingCase', component: SettingAgency },
    { path: '/setting/individual', name: 'SettingIndividual', component: SettingIndividual },
    { path: '/setting/jurisdiction', name: 'SettingJurisdiction', component: SettingJurisdiction },
    { path: '/setting/rule', name: 'SettingRule', component: SettingRule },
    { path: '/setting/field', name: 'SettingField', component: SettingField },
    { path: '/setting/data/payment_account', name: 'PaymentAccount', component: PaymentAccount },
    { path: '/setting/data/fee_codes', name: 'FeeCode', component: SettingFeeCode },
    {
      path: '/setting/system',
      name: 'SettingSystem',
      component: SettingSystem,
    },
    { path: '/setting/template', name: 'SettingTemplate', component: SettingTemplate },
    { path: '/setting/template/edit', name: 'SettingTemplateEdit', component: SettingTemplateEdit },
    { path: '/setting/user', name: 'SettingUser', component: SettingUser },
  ]
});
router.beforeEach((to, from, next) => {
  router.app.$options.store.dispatch('clearFilter');
  next();
})
export default router
