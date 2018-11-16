<template>
  <div title="文件上传">
    <file-upload :type="type"></file-upload>
  </div>
</template>

<script>
import FileUpload from '@/components/common/FileUpload'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'Other',
  mixins: [  ],
  props: {
  },
  data () {
    return {
      type:'other',
    }
  },
  computed: {
    ...mapGetters([
      'menusMap',
    ]),
    config () {
      const config = map.get(this.type);
      return config ? config : this.type;
    },
  },
  methods: {
    ...mapActions([
    ]),
    
    
  },
  created () {
  },
  watch: {

  },
  components: { 
    FileUpload,   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>