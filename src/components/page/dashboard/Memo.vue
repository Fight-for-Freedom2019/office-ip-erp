<template>
  <el-col :span="12" style="padding:0px 2px 2px 0px;">
    <el-card style="position: relative;" :style="{height:height}">
        <p slot="header" style="color: #888; margin: 0px;">{{ option.title }} 
            <el-button icon="el-icon-plus" circle @click="addMemo" size="mini"></el-button>
        </p>
        <ul :id="option.id"  ref="chart" :style="{width:'100%',height:height2}">
            <li v-for="item in data" :key="item.id" class="memo-item" style="margin-bottom:5px;line-height:24px;">
                <span>{{ item.creation_time + ':' + item.content }}</span>
                <span style="float:right;" class="close">
                    <el-button icon="el-icon-edit" type="primary" circle @click="editMemo(item)" size="mini"></el-button>
                    <el-button icon="el-icon-close" type="danger" circle @click="deleteMemo(item)" size="mini"></el-button>
                </span>
            </li>
        </ul>
    </el-card>
    <el-dialog
        title="新增备忘"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="备忘">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <app-button-loading text="确 定" @click="saveMemo" :func="saveMemo"></app-button-loading>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTable from '@/components/common/AppTable'

var moment = require('moment');

export default {
    name: 'Memo',
    data() {
        return {
            data: [],
            loading: false,
            dialogVisible: false,
            form: {
                content: '',
            },
            id: 0,
        }
    },
    props: {
        option: Object,
    },
    computed: {
        ...mapGetters([
            'innerHeight',
        ]),
        height() {
            return ((this.innerHeight - 30) / 2) + 'px';
        },
        height2() {
            return (((this.innerHeight - 30) / 2) - 70) + 'px';
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            const url = '/memos';
            const success = _ => {
                this.data = _.data;
            };
            const complete = _ => {
                this.loading = false;
            };

            this.loading = true;
            this.$axiosGet({ url, success, complete });
        },

        saveMemo() {
            const url = this.id == 0 ? '/memos' : '/memos/' + this.id;
            const data = this.form
            const success = _ => {
                this.load();
                this.dialogVisible = false;
            };
            if (this.id == 0) {
                this.$axiosPost({ url, data, success });
            } else {
                this.$axiosPut({ url, data, success });
            }
        },
        deleteMemo(row) {
            const url = '/memos/' + row.id;
            const success = _ => {
                this.load();
            };
            this.$axiosDelete({ url, success });
        },
        editMemo(row) {
            this.form.content = row.content;
            this.id = row.id;
            this.dialogVisible = true;
        },
        addMemo() {
            this.form.content = '';
            this.id = 0;
            this.dialogVisible = true;
        },
    },
    components: {
        AppTable
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.memo-item .close {
    display:none;
}
.memo-item:hover .close {
    display:inline-block;
}
.memo-item:hover {
    color:brown;
}
</style>
