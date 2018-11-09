export default {
    methods:{
        update() {
            this.$refs.table.update();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        closeVisible(name){
            this[name] = false;
        },
        openVisible(name){
            this[name] = true;
        },
    },
    mounted(){
        this.refresh();
    },
}