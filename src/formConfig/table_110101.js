//发明专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from '../formTemplate/priority'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
import {vm as checkbox_vm} from '../formTemplate/checkbox'

const address = [
    {label: 'ABC-高级生物技术中心', address: '意大利', value: 'ABC'},
    {label: 'ATCC-美国典型培养物保藏中心', address: '美国', value: 'ATCC'},
    {label: 'BCCM-比利时微生物协调保藏中心', address: '比利时', value: 'BCCM'},
    {label: 'BEA-西班牙海藻数据', address: '西班牙', value: 'BEA'},
    {label: 'CBA-澳大利亚玛丽•费尔法克斯女士细胞银行', address: '西班牙', value: '澳大利亚'},
    {label: 'CBS-真菌菌种保藏中心', address: '荷兰', value: 'CBS'},
    {label: 'CCAP-藻类和原生动物保藏中心', address: '英国', value: 'CCAP'},
    {label: 'CChRGM-智利微生物遗传资源中心', address: '智利', value: 'CChRGM'},
    {label: 'CCM-捷克微生物保藏中心', address: '捷克', value: 'CCM'},
    {label: 'CCTCC-中国典型培养物中心', address: '中国湖北省武汉市武汉大学', value: 'CCTCC'},
    {label: 'CCY-酵母菌保藏中心', address: '斯洛伐克', value: 'CCY'},
    {label: 'CECT-西班牙典型培养物保藏中心', value: 'CECT', address: '西班牙'},
    {label: 'CGMCC-中国微生物菌种保藏管理委员会普通微生物中心', value: 'CGMCC', address: '北京市朝阳区北辰西路1号院3号 中国科学院微生物研究所'},
    {label: 'CM-CNRG-MEXICO单位', value: 'CM-CNRG', address: 'MEXICO'},
    {label: 'CNCM-国家微生物保藏中心', value: 'CNCM', address: '法国'},
    {label: 'DBVPG-工业酵母菌保藏中心', value: 'DBVPG', address: '意大利'},
    {label: 'DSMZ-德国微生物保藏中心', value: 'DSMZ', address: '德国'},
    {label: 'ECACC-欧洲动物细胞保藏中心', value: 'ECACC', address: '英国'},
    {label: 'GDMCC-广东省微生物菌种保藏中心', value: 'GDMCC', address: '广东省微生物菌种保藏中心'},
    {label: 'IAFB-IAFB工业微生物保藏中心', value: 'IAFB', address: '波兰'},
    {label: 'IDAC-加拿大国际保藏中心', value: 'IDAC', address: '加拿大'},
    {label: 'IMI-国际真菌学研究所', value: 'IMI', address: '英国'},
    {label: 'IPOD,NITE-国家高级工业科学技术学院，国际专利生物保藏中心', value: 'IPOD,NITE', address: '日本'},
    {label: 'IZSLER-Isituto Zooprofilattico Sperimentale della Lombardia', value: 'IPOD,NITE', address: '意大利'},
    {label: 'KACC-韩国农业文化保藏中心', value: 'KACC', address: '韩国'},
    {label: 'KCCM-韩国微生物保藏中心', value: 'KCCM', address: '韩国'},
    {label: 'KCLRF-韩国细胞系研究基金会', value: 'KCLRF', address: '韩国'},
    {label: 'KCTC-韩国典型培养物保藏中心', value: 'KCTC', address: '韩国'},
    {label: 'MCC-微生物保藏中心', value: 'MCC', address: '美国'},
    {label: 'MSCL-拉脱维亚微生物菌种保藏中心', value: 'MSCL', address: '拉脱维亚'},
    {label: 'MTCC-微生物典型培养物保藏和基因银行', value: 'MTCC', address: '印度'},
    {label: 'NBIMCC-国家工业微生物和细胞保藏中心', value: 'NBIMCC', address: '保加利亚'},
    {label: 'NCAIM-国家农业和工业微生物保藏中心', value: 'NCAIM', address: '匈牙利'},
    {label: 'NCIMB-国家工业、食品和和海洋微生物保藏有限公司', value: 'NCIMB', address: '英国'},
    {label: 'NCMA-Provasoli-Guillard国家海洋藻类和微生物保藏中心', value: 'NRRL', address: '美国'},
    {label: 'NCTC-国家典型培养物保藏中心', value: 'NCTC', address: '英国'},
    {label: 'NCYC-国家酵母菌保藏中心', value: 'NCYC', address: '英国'},
    {label: 'NIBSC-国家生物标准和控制学会', value: 'NIBSC', address: '英国'},
    {label: 'NMI-国家度量学会', value: 'NMI', address: '澳大利亚'},
    {label: 'NPMD-国家技术评估学会，专利微生物保藏中心', value: 'NPMD', address: '日本'},
    {label: 'NRCA-国家抗生素研究中心', value: 'NRCA', address: '俄罗斯'},
    {label: 'NRRL-农业研究机构培养物保藏中心', value: 'NRRL', address: '美国'},
    {label: 'PCM-波兰微生物保藏中心', value: 'PCM', address: '波兰'},
    {label: 'VKM-俄罗斯微生物保藏中心', value: 'VKM', address: '俄罗斯'},
    {label: 'VKPM-俄罗斯国家工业微生物保藏中心', value: 'VKPM', address: '俄罗斯'},
    {label: 'VTTCC-VTT保藏中心', value: 'VTTCC', address: '芬兰'},
]
const novelty_claims = {
    novelty_exception_exhibition:"已在中国政府主办或承认的国际展览会上首次展出",
    novelty_exception_published:"已在规定的学术会议或技术会议上首次发表",
    novelty_exception_leakage:"他人未经申请人同意而泄露其内容",
}
function handleLinkage(checked) {
    address.forEach((item) => {
        if (item.value === checked) {
            content.rule.forEach((i) => {
                if (i.field === "address") {
                    i.value = item.address;
                }
            })
        }
    })
}
function clearAddress() {
    content.rule.forEach((i) => {
        if (i.field === "bio_desposit_address") {
            i.value = "";
        }
    })
}

let rule = [
    {
        type: 'input', title: '发明名称', field: 'title', value: '',
    },
    {
        type: 'select', title: '发明人', field: 'inventors', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: '/test',
    },
    {
        type: 'select', title: '申请人', field: 'applicants', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: '/test',
    },
    statement,
    {
        type: 'select', title: '联系人', field: 'contact', value: [],
        request: true,
        url: "/contacts", DATA_KEY: "data",
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: 'select', title: '代理机构', field: 'agency', value: [],
        request: true,
        url: '/test',
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: 'select', title: '代理人', field: 'agents', value: [],
        request: true,
        url: '/test',
        props: {
            multiple: true,
            filterable: true,
        },
    },
    checkbox_vm("poa_declaration", "声明已经与申请人签订了专利代理委托书且本表中的信息与委托书中相应信息一致", {labelWidth: "120px"}, "代理声明"),
    {
        type: 'select', title: '总委托书编号', field: 'poa', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        attrs: {
            placeholder: '请选择总委托书编号（如果有）'
        },
        request: true,
        url: '/test',
    },
    priority,
    {
        type: 'input', title: '权利要求项数', field: 'claims_count', value: '',
    },
    {
        type: 'input', title: '摘要附图图号', field: 'abstract_figure', value: '',
    },
    {
        type: 'input', title: '分案申请', field: 'division_number', value: '',
        col: {
            span: 12,
        },
    },
    {
        type: 'input', title: '', field: 'division_division_number', value: '',
        attrs: {
            placeholder: '针对的分案申请'
        },
        col: {
            span: 6,
            labelWidth: '0',
        },
    },
    {
        type: 'DatePicker', title: '', field: 'division_apd', value: "",
        col: {
            span: 6,
            labelWidth: '0',
        },
    },
    checkbox_vm("bio_alive", "是否存活", {labelWidth: "120px"}, "生物材料样品"),
    {
        type: 'select', title: '', field: 'bio_deposit_center', value: '',
        props: {
            multiple: false,
            filterable: true,
            clearable: true,
        },
        options: address,
        event: {
            change: handleLinkage,
            clear:clearAddress
        },
        attrs: {
            placeholder: '请选择生物保藏机构'
        },
        col: {
            span: 14,
            labelWidth: '110px',
        },
    },
    {
        type: 'input', title: '', field: 'bio_desposit_address', value: '',
        attrs: {
            placeholder: '请输入地址'
        },
        col: {
            span: 10,
            labelWidth: '0',
        },
    },
    {
        type: 'DatePicker', title: '', field: 'bio_deposit_date', value: "",
        attrs: {
            placeholder: '请输入保藏日期'
        },
        col: {
            span: 14,
            labelWidth: '110px',
        },
    },
    {
        type: 'input', title: '', field: 'bio_deposit_number', value: '',
        attrs: {
            placeholder: '请输入保藏编号'
        },
        col: {
            span: 5,
            labelWidth: '0',
        },
    },
    {
        type: 'input', title: '', field: 'bio_deposit_species', value: '',
        attrs: {
            placeholder: '请输入分类命名'
        },
        col: {
            span: 5,
            labelWidth: '0',
        },
    },

    checkbox_vm("squence_table", "本申请涉及核苷酸或氨基酸序列表", {labelWidth: "120px"}, "序列表"),
    checkbox_vm("inheritance", "本专利申请涉及的发明创造是依赖于遗传资源完成的", {labelWidth: "120px"}, "遗传资源"),
    checkbox_vm("is_utility", "声明本申请人对同样的发明创造在申请本发明专利的同日申请了实用新型专利", {labelWidth: "120px"}, "同日申请"),
    checkbox_vm("prepubic", "请求早日公布该专利申请", {labelWidth: "120px"}, "提前公布"),
    checkbox_common_vm(novelty_claims, "不丧失新颖性声明", "", {labelWidth: "120px"}),
    checkbox_vm("subs_exam", "同时提出实质审查请求", {labelWidth: "120px"}, "实质审查", {id: 110401, name: "实质审查请求书"}),
    checkbox_vm("confidential_exam", "向国外申请专利保密审查请求", {labelWidth: "120px"}, "保密审查", {
        id: 100027,
        name: "向外国申请专利保密审查请求书"
    }),
    // TODO 附件要配置
    {
        type: 'select', title: '附件（非必填）', field: 'attachments', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        options: [
            {'value': 104, 'label': '权利要求书'},
            {'value': 105, 'label': '说明书'},
            {'value': 106, 'label': '说明书附图'},
        ],
    },
    {
        type: 'input', title: '证明文件备案号', field: 'document_number', value: [],
        attrs: {
            placeholder: '请选择总委托书编号（如果有）'
        },
        request: true,
        url: '/test',
    },
];
const content = {
    rule
}

export default content
