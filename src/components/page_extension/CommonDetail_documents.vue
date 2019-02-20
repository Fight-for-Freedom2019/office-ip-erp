<template>
  <div class="main">
    <table-component :tableOption="option" :data="tableData" ref="table"></table-component>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import SearchInput from "@/components/common/SearchInput";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "commonDetailDocuments",
  props: ["searchValue"],
  data() {
    return {
      option: {
        is_search: false,
        height: "default6",
        is_pagination: false,
        columns: [
          { type: "text", label: "文件名称", prop: "name", min_width: "220" },
          // {
          //   type: "text",
          //   label: "文件类型",
          //   prop: "file_type",
          //   render_simple: "name"
          // },
          // { type: "text", label: "文件格式", prop: "ext" },
          // { type: "text", label: "文件大小", prop: "size",width:"70" },
          {
            type: "text",
            label: "上传人",
            prop: "uploader",
            render_simple: "name",
            width: "80"
          },
          {
            type: "text",
            label: "上传时间",
            prop: "creation_time",
            width: "160"
          },
          {
            type: "action",
            width: "178",
            fixed: false,
            btns: [
              {
                type: "download",
                text: "下载",
                click: ({ downloadUrl }) => {
                  window.open(downloadUrl);
                }
              },
              {
                type: "view",
                text: "查看",
                click: ({ viewUrl }) => {
                  window.open(viewUrl);
                }
              },
              { type: "delete", click: this.handleDelete }
            ]
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["detailDocuments"]),
    tableData() {
      if (this.searchValue == "") {
        return this.detailDocuments;
      } else {
        return this.search(this.searchValue);
      }
    }
  },
  methods: {
    ...mapActions(["refreshDetailData"]),
    search(keyword) {
      let newArr = [];
      if (keyword) {
        this.detailDocuments.filter((val, i, arr) => {
          for (let k in arr[i]) {
            if (
              typeof arr[i][k] == "string" &&
              arr[i][k].indexOf(keyword) != -1 &&
              (k == "type" || k == "name")
            ) {
              newArr.push(arr[i]);
            }
          }
        });
        return this.$tool.rmDuplicate(newArr);
      }
    },
    handleDelete({ id, name }) {
      const url = `/files/${id}`;
      const success = _ => {
        this.$message({ message: `删除${name}成功！`, type: "success" });
        this.refreshDetailData();
      };

      this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, "删除确认", {
        type: "warning"
      })
        .then(_ => {
          this.$axiosDelete({ url, success });
        })
        .catch(_ => {});
    }
  },
  components: { TableComponent, SearchInput }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>