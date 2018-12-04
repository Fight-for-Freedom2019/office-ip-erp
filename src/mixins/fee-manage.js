import TableMixins from '@/mixins/table-mixins'

export default (statusMap)=>({
    mixins:[TableMixins],
    data(){
        return {
            isPanelVisible: false,
            title: "",
            row: null,
            rowID: null,
        }
    },
    computed:{
        status(){
            let val = this.row?statusMap.get(this.row.status):"";
            return val?val:"add";
        },
    },
    methods:{
        handleRowClick(row) {
            this.row = row;
            this.rowID = row.id;
            this.title = `订单编号: ${row.serial}`;
            this.openVisible("isPanelVisible");
        },
        refreshTableData(data) {
            const url = this.URL;
            const success = _ => {
                this.tableData = _.invoice;
            };
            this.$axiosGet({url, data, success})
        },
        deleteBill(e,s) {
            const h = this.$createElement;
            this.$msgbox({
                title: "提示",
                message: h("el-checkbox", {
                    on: {
                        change: this.change
                    }
                }, "是否删除订单下的所有费用"),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        const url = this.d_URL;
                        const data = {
                            is_deleted: this.is_deleted,
                            id: s?this.$tool.splitObj(s, 'id'):[this.rowID]
                        };
                        const success = _ => {
                            this.$message({type: "success", message: "删除成功!"});
                            this.update();
                            this.changeState() // 成功之后在这里调用这个方法改变子组件的账单状态
                            done();
                        };
                        this.$axiosDelete({url, data, success});
                    } else {
                        done();
                    }
                }
            })
        },
        submitCommon(id,suffix,hint) {  // 提交
            this.$refs.detail.submitCommon(id,suffix,hint);
        },
        save(ref) {     // 传入组件的ref
            this.$refs[ref].save(this.rowID);
        },
        change(val) {
            val ? this.is_deleted = 1 : this.is_deleted = 0;
        },

        changeState(){     // 由于状态显示在shrink组件下的子组件中，所以还需要一个方法改变PaymentManageDetail中的form.status
            this.$refs.detail.changeState();
            this.status = "add";
        },
    },

})