export default (url) => ({
  props: {
    param:{
      type:[String,Number,Object],
      default(){
        return ""
      },
    },
    is_request:{
      type: Boolean,
      default(){
        return false
      },
    }
  },
  data(){
    return {
      is_show: false,
    }
  },
  methods:{
    getRequestData(){
      const success = _ =>{
        this.coverObj(_.data.data[0])
      }
      this.$axiosGet({url:url,data:{id:this.param},success})
    },
    show(){
      this.is_show = true;
    },
    hide(){
      this.is_show = false;
    },
  },
  watch: {
    param:{
      handler:function () {
        this.is_request?this.getRequestData():"";
      },
      immediate:true
    },
  },
})