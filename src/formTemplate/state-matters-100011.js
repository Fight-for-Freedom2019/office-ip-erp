// 陈述事项
function vm() {
    const template = `
        <div>
        <el-row>
            <el-col :span="4">
                <el-checkbox v-model="extendData.fee_return_request">退款请求</el-checkbox>
            </el-col>
            <el-col :span="6">退款情形</el-col>
            <el-col :span="14">
                <el-checkbox v-model="extendData.fee_return_law">根据专利法实施细则第94条第4款的规定请求退款</el-checkbox>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-row>
                    <el-col :span="8">费用种类</el-col>
                    <el-col :span="8">金额</el-col>
                    <el-col :span="8">收据号</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-row>
                    <el-col :span="8">
                        <el-input placeholder="费用种类" v-model="extendData.feeInfo.first.type"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="金额" v-model="extendData.feeInfo.first.money"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="收据号" v-model="extendData.feeInfo.first.receipt"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-row>
                    <el-col :span="8">
                        <el-input placeholder="费用种类" v-model="extendData.feeInfo.second.type"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="金额" v-model="extendData.feeInfo.second.money"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="收据号" v-model="extendData.feeInfo.second.receipt"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-checkbox v-model="extendData.fee_return_five">根据《财务【2018】37号》通知请求退50%实审费</el-checkbox>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">收据号</el-col>
                <el-col :span="16">
                    <el-input placeholder="收据号" v-model="extendData.fee_receipt"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span class="placeholder"></span>
            </el-col>
            <el-col :span="6">退款账户</el-col>
            <el-col :span="14">
                <el-col :span="8">开户行</el-col>
                <el-col :span="16">
                    <el-col :span="11">
                        <el-input placeholder="银行名称,例:交通银行" v-model="extendData.bank.name"></el-input>
                    </el-col>
                    <el-col :span="2" style="text-align: center;vertical-align: middle">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="支行名称,例:湖南省长沙市湘府支行" v-model="extendData.bank.branch"></el-input>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">银行账号</el-col>
                <el-col :span="16">
                    <el-input placeholder="银行账号" v-model="extendData.bank.bank_number"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">开户姓名</el-col>
                <el-col :span="16">
                    <el-input placeholder="开户姓名" v-model="extendData.bank.account_number"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <span class="placeholder"></span>
            </el-col>
            <el-col :span="6">退款审批通知书收件人</el-col>
            <el-col :span="14">
                <el-col :span="8">姓名</el-col>
                <el-col :span="16">
                    <el-input placeholder="姓名" v-model="extendData.receive.name"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <span class="placeholder"></span>
            </el-col>
            <el-col :span="14">
                <el-col :span="8">地址</el-col>
                <el-col :span="8">
                    省、自治区、直辖市
                </el-col>
                <el-col :span="8"><el-input placeholder="省、自治区、直辖市" v-model="extendData.receive.province"></el-input></el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <span class="placeholder"></span>
            </el-col>
            <el-col :span="14">
                <el-col :span="8"><span class="placeholder"></span></el-col>
                <el-col :span="8">
                    市县
                </el-col>
                <el-col :span="8"><el-input placeholder="市县" v-model="extendData.receive.city"></el-input></el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <span class="placeholder"></span>
            </el-col>
            <el-col :span="14">
                <el-col :span="8"><span class="placeholder"></span></el-col>
                <el-col :span="8">
                    城区（乡）、街道、门牌号
                </el-col>
                <el-col :span="8"><el-input placeholder="城区（乡）、街道、门牌号" v-model="extendData.receive.town"></el-input></el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">邮政编码</el-col>
                <el-col :span="16">
                    <el-input placeholder="邮政编码" v-model="extendData.receive.post"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">电话</el-col>
                <el-col :span="16">
                    <el-input placeholder="电话" v-model="extendData.receive.phone"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><span class="placeholder"></span></el-col>
            <el-col :span="14">
                <el-col :span="8">委托声明</el-col>
                <el-col :span="16">
                    <el-checkbox v-model="extendData.receive.declaration">受缴款人委托请求退款</el-checkbox>
                </el-col>
            </el-col>
        </el-row>
    </div>
    `;
    const options = {
        data: {
            extendData: {
                fee_return_request: false,
                fee_return_law: false,
                fee_return_five: false,
                feeInfo: {
                    first: {
                        type: "",
                        money: "",
                        receipt: "",
                    },
                    second: {
                        type: "",
                        money: "",
                        receipt: "",
                    }
                },
                fee_receipt: '',
                bank: {
                    name: '',
                    branch: "",
                    account_number: "",
                    bank_number: "",
                },
                receive: {
                    name: "",
                    province: "",
                    city: "",
                    town: "",
                    post: "",
                    phone: "",
                    declaration: false,
                }
            },
        },
        methods: {},
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__sm",
        col: {
            labelWidth: "1px",
        }
    };
}

export {vm}