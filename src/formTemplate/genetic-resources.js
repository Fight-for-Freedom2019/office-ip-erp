// 遗传资源获取途径

function vm() {
    let template = `<div>
        <el-row>
            <el-col :span="4">
                直接来源
            </el-col>
            <el-col :span="12">
                获取时间
            </el-col>
            <el-col :span="8">
                <el-date-picker v-model="extendData.direct_gather_time" placeholder="请输入获取时间"></el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8">非采集方式</el-col>
                    <el-col :span="16">	提供者名称（或姓名）</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.nongather_provider" placeholder="请输入提供者名称（或姓名）"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8"><span style="display: block;height: 36px;"></span></el-col>
                    <el-col :span="16">	提供者所处国家或地区</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.nongather_provider_area" placeholder="请输入提供者所处国家或地区"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8"><span style="display: block;height: 36px;"></span></el-col>
                    <el-col :span="16">	提供者联系方式</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.nongather_provider_contact" placeholder="请输入提供者联系方式"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8">采集方式</el-col>
                    <el-col :span="16">	采集地（国家、省（市））</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.gather_address" placeholder="请输入采集地（国家、省（市））"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8"><span style="display: block;height: 36px;"></span></el-col>
                    <el-col :span="16">	采集者名称（或姓名）</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.gatherer" placeholder="请输入采集者名称（或姓名）"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8"><span style="display: block;height: 36px;"></span></el-col>
                    <el-col :span="16">	采集者联系方式</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.gatherer_contact" placeholder="请输入采集者联系方式"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                原始来源
            </el-col>
            <el-col :span="8">
                采集者名称（或姓名）
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.gatherer_name" placeholder="请输入采集者名称（或姓名）"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                 <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="8">
                采集者联系方式
            </el-col>
            <el-col :span="8">
                <el-input v-model="extendData.gatherer_contact2" placeholder="请输入采集者联系方式"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                 <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="8">
                获取时间
            </el-col>
            <el-col :span="8">
                <el-date-picker value-format="yyyy-MM-dd" v-model="extendData.original_source_time" placeholder="请选择获取时间"></el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                 <span style="display: block;height: 36px;"></span>
            </el-col>
            <el-col :span="8">
                获取地点（国家、省（市））
            </el-col>
            <el-col :span="8">
                <el-input value-format="yyyy-MM-dd" v-model="extendData.original_source_address" placeholder="请输入获取地点（国家、省（市））"></el-input>
            </el-col>
        </el-row>
    </div>
    `;
    const options = {
        data: {
            extendData: {
                direct_gather_time: "",
                nongather_provider_area: "",
                nongather_provider: "",
                nongather_provider_contact: "",
                gather_address: "",
                gatherer: "",
                gatherer_contact: "",
                gatherer_name: "",
                gatherer_contact2: "",
                original_source_time: "",
                original_source_address: "",
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__gr",
        col: {
            labelWidth: "0px"
        }
    }
}

export {vm}