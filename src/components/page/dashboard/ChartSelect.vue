<!-- 图表选择器 -->
<template>
  <app-shrink :visible.sync="visible" :modal="false" :size="`middle`" title="图表自定义" ref="top" >
    <span slot="header" style="float: right">
      <app-button-loading :func="save" ref="loadingBtn" text="保存"></app-button-loading>
    </span>
    <div style="margin-top: 20px" class="root">
      <span>已显示图表</span>
      <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
          <li class="list-group-item" v-for="element in list" :key="element.name">
            <!-- <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> -->
            {{element.title}}
            <!-- <span class="badge">{{element.order}}</span> -->
          </li>
        </transition-group>
      </draggable>
    <el-button type="primary" size="small" @click="dialogVisible = true" style="margin-top:10px;">添加图表</el-button>
    </div>
    <el-dialog
      title="请选择图表"
      :visible.sync="dialogVisible"
      :modal="false"
      width="60%" >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="option in options" :label="option.title" v-bind:key="option.name"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChart">确 定</el-button>
      </span>
    </el-dialog>
  </app-shrink>
</template>


<script>
import AppShrink from "@/components/common/AppShrink";
import draggable from 'vuedraggable'
import { mapGetters } from "vuex";

const charts = [
    "待办提醒",
    "本月点数",
    "点数统计",
    "案件指标",
];

export default {
    name: "ChartSelect",
    data() {
        return {
            visible: false,
            dialogVisible: false,
            checkList: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            loading: false,
        };
    },
    props: {
        options: Array,
        selected: Array
    },
    computed: {
        ...mapGetters(["permissions"]),
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },

    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        },
        selected(val) {
            this.checkList = val.map(chart => chart.title)
            this.list = val;
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        save() {
            if (this.list.length == 0) {
                this.$message({ message: "请选择至少一个图表", type: "warning" });
                return;
            }
            const url = '/charts';
            const data = {
                charts: this.checkList.map((name, index) => {
                    let o = false;
                    this.options.forEach(option => {
                        if (option.title == name) {
                            o = option.name;
                        }
                    })
                    return o;
                })
            }
            const success = _ => {
                this.$emit("selected", this.list);
                this.visible = false;
            };
            this.$axiosPost({ url, data, success });

        },
        show() {
            this.visible = true;
        },
        addChart() {
            this.dialogVisible = false;
            this.getList();
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        getList() {
            const l = this.checkList.map((name, index) => {
                let o = false;
                this.options.forEach(option => {
                    if (option.title == name) {
                        o = option;
                    }
                })
                return o;
            });
            this.list = l;
        }
    },
    components: {
        AppShrink,
        draggable,
    }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  display: inline-block;
  width:40%;
  height: 40px;
  border:1px solid #ccc;
  /* padding: 5px 0px 0px 5px; */
  line-height: 40px;
  margin:10px 10px 0px 0px;
  text-align: center;
}
.list-group-item i {
  cursor: pointer;
}
</style>