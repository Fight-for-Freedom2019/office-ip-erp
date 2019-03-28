export default (flag)=>({
  methods:{
    filterTableData(data){
      this[flag] = data;
    }
  },
})