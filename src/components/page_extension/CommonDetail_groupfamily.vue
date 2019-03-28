<template>
<div>
	<app-table :columns="columns" :data="families" height="default7" v-loading='familyLoading' element-loading-text="专利族数据加载中..."></app-table>
	
	<app-table :columns="columns2" :data="patents" height="default8" v-loading='projectsLoading' element-loading-text="同族专利数据加载中..." style="margin-top:10px;"></app-table>
	<family-add @update="reload" ref="family"></family-add>
</div>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import FamilyAdd from '@/components/page_extension/FamilyAdd'
import { mapGetters } from 'vuex'
export default {
    name: 'groupFamily',
    data() {
        return {
            columns: [
                { type: 'text', label: '专利族号', prop: 'serial' },
                { type: 'text', label: '专利族名称', prop: 'name' },
                { type: 'text', label: '专利族类型', prop: 'family_type', render_simple: 'name' },
                {
                    type: "action",
                    label: "操作",
                    width: "90",
                    // fixed: false,
                    btns: [
                        { type: "detail", click: this.loadProjects },
                        { type: "edit", click: this.editFamily },
                    ]
                }
            ],
            columns2: [
                {
                    type: 'text-btn',
                    label: '案号',
                    prop: 'serial',
                    click: this.togglePatent,
                    render_text_btn: row => {
                        return row.serial ? row.serial : "";
                    }
                },
                { type: 'text', label: '标题', prop: 'title' },
                { type: 'text', label: '地区', prop: 'area', render_simple: 'name' },
                { type: 'text', label: '案件类型', prop: 'subtype', render_simple: 'name' },
            ],
            familyLoading: false,
            projectsLoading: false,
            patents: [],
            families: [],
        };
    },
    computed: {
        ...mapGetters([
            'detailBasePatent',
            'detailGroup',
            'detailFamily',
            'areaMap',
        ]),
    },
    methods: {
        reload() {
            this.familyLoading = true;
            const url = '/families?project=' + this.detailBasePatent.id;
            const data = {};
            const success = _ => {
                this.familyLoading = false;
                this.families = _.data.data;
                if (this.families.length > 0) {
                    this.loadProjects(this.families[0]);
                }
            };
            this.$axiosGet({ url, data, success });
        },
        loadProjects(row) {
            this.projectsLoading = true;
            const url = '/patents?families=' + row.id;
            const data = {};
            const success = _ => {
                this.projectsLoading = false
                this.patents = _.patents.data;
            };
            this.$axiosGet({ url, data, success });
        },
        editFamily(row) {
            this.$refs.family.show(row, 'edit')
        },
        togglePatent(row) {
            this.$emit('toggle', row.id);
        }
    },
    components: {
        AppTable,
        FamilyAdd
    }
}
</script>