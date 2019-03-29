import {handleLayout} from './handle/handle'
import table_100039 from './table_100039'
import table_100601 from './table_100601'
import table_100009 from './table_100009'
import table_100006 from './table_100006'
import table_110101 from './table_110101'
import table_100904 from './table_100904'
import table_100007 from './table_100007'
import table_100905 from './table_100905'
import table_100907 from './table_100907'
import table_101001 from './table_101001'
import table_101002 from './table_101002'
import table_101003 from './table_101003'
import table_101004 from './table_101004'
import table_110301 from './table_110301'
import table_100901 from './table_100901'
import table_110401 from './table_110401'
import table_120101 from './table_120101'
import table_130002 from './table_130002'
import table_130101 from './table_130101'
import table_100107 from './table_100107'
import table_100902 from './table_100902'
import table_100903 from './table_100903'
import table_100701 from './table_100701'
import table_100018 from './table_100018'
import table_100010 from './table_100010'
import table_100013 from './table_100013'
import table_100015 from './table_100015'
import table_100017 from './table_100017'
import table_100027 from './table_100027'
import table_100040 from './table_100040'
import table_150101 from './table_150101'
import table_150102 from './table_150102'
import table_100023 from './table_100023'
import table_100104 from './table_100104'
import table_100906 from './table_100906'
import table_100016 from './table_100016'
import table_100012 from './table_100012'
import table_100021 from './table_100021'
import table_100108 from './table_100108'
import table_130001 from './table_130001'
import table_100011 from './table_100011'

/*
* 如需自定义单个form的布局，则需像表单100009那样使用，并指定isLayout = true
* */


const config = new Map([
    [100011,{obj:table_100011,name:"意见陈述书（关于费用）"}],
    [130001,{obj:table_130001,name:"外观设计图片或照片"}],
    [100108,{obj:table_100108,name:"其它证明文件"}],
    [100021,{obj:table_100021,name:"专利代理委托书（中英文）"}],
    [100012,{obj:table_100012,name:"意见陈述书"}],
    [100016,{obj:table_100016,name:"著录项目变更申报书"}],
    [100906,{obj:table_100906,name:"复审程序延长期限请求书"}],
    [100104,{obj:table_100104,name:"著录项目变更理由证明"}],
    [100015,{obj:table_100015,name:"更正错误请求书"}],
    [100023,{obj:table_100023,name:"遗传资源来源披露登记表"}],
    [150102,{obj:table_150102,name:"国际申请进入中国国家阶段声明（PCT）[新型]"}],
    [150101,{obj:table_150101,name:"国际申请进入中国国家阶段声明（PCT）[发明]"}],
    [100601,{obj:table_100601,name:"放弃专利权声明"}],
    [100039,{obj:table_100039,name:"纸件申请转电子申请请求书"}],
    [100009,{obj:handleLayout(table_100009,{labelWidth:"140px", span:24}),name:"延长期限请求书",isLayout:true}],
    [100006,{obj:table_100006,name:"补正书"}],
    [110101,{obj:table_110101,name:"发明专利请求书"}],
    [100904,{obj:table_100904,name:"复审无效宣告程序补正书"}],
    [100007,{obj:table_100007,name:"专利代理委托书"}],
    [100905,{obj:table_100905,name:"复审程序恢复权利请求书"}],
    [100907,{obj:table_100907,name:"复审程序授权委托书"}],
    [101001,{obj:table_101001,name:"专利无效宣告请求书"}],
    [101002,{obj:table_101002,name:"无效宣告请求口头审理通知书回执"}],
    [101003,{obj:table_101003,name:"专利权无效宣告程序授权委托书"}],
    [101004,{obj:table_101004,name:"无效宣告案件加快审查请求书（不公开）"}],
    [110301,{obj:table_110301,name:"发明专利请求提前公布声明"}],
    [100901,{obj:table_100901,name:"复审请求书"}],
    [110401,{obj:table_110401,name:"实质审查请求书"}],
    [120101,{obj:table_120101,name:"实用新型专利请求书"}],
    [130002,{obj:table_130002,name:"外观设计简要说明"}],
    [130101,{obj:table_130101,name:"外观设计专利请求书"}],
    [100107,{obj:table_100107,name:"信函"}],
    [100902,{obj:table_100902,name:"复审无效宣告程序意见陈述书"}],
    [100903,{obj:table_100903,name:"复审请求口头审理通知书回执"}],
    [100701,{obj:table_100701,name:"专利权评价报告请求书"}],
    [100018,{obj:table_100018,name:"撤回优先权声明"}],
    [100010,{obj:handleLayout(table_100010,{labelWidth:"140px", span:24}),name:"恢复权利请求书"}],
    [100013,{obj:table_100013,name:"撤回专利申请声明"}],
    [100017,{obj:table_100017,name:"中止程序请求书"}],
    [100027,{obj:table_100027,name:"向外国申请专利保密审查请求书"}],
    [100040,{obj:handleLayout(table_100040,{labelWidth:"130px"}),name:"优先权文件数字接入服务（DAS）请求书"}],
]);


const layout = {labelWidth:"120px", span:24};
[...config.values()].forEach((item)=>{
    if(!item.isLayout){
        handleLayout(item.obj,layout);
    }
});
export default config
