export default {
  data () {
    return {
      id: '',
      type: '',
      btn_disabled: false,
      dialogVisible: false,
    }
  },
  computed: {
    title () {
      const t = this.type;
      const tex = this.$options.REMINDER_TEXT;

      return t == 'add' ? `新增${tex}` : t == 'confirm'? `确认收文` : `编辑${tex}`;
    }
  },
  methods: {
    show ( type='add', data ) {
      this.type = type;
      this.dialogVisible = true;
      this.$nextTick(_=>{
        this.$refs.form.resetFields();  
      
        if(type === 'edit' || type === 'confirm') {
          if(data instanceof Object) {
            const copy = this.$tool.deepCopy(data);
            this.id = copy.id; 
            this.setForm ? this.setForm(data) : this.$tool.coverObj(this.form, copy);
            data.attachments?this.attachments = [...this.form.attachments]:"";
          }else if(data instanceof String || data instanceof Number) {
            data -= 0;
          }         
        }
      });
    },
    confirmCallback () {
      this.$message({message:'已确认收文',type:'success'});
      this.dialogVisible = false;
    },
    add () {
      const url = this.$options.URL;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.addForm 
                    ? this.addForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      
      const success = _=>{
        this.$message({message: `添加${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'add',this.form,_);
        this.$emit('onItemAdded', _.data);
      }
      const complete = _=>{
        this.btn_disabled = false;
      }
      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPost({url, data, success, complete});
        }
      })      
    },
    edit () {
      const url = `${this.$options.URL}/${this.id}`;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.editForm 
                    ? this.editForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      const success = _=>{
        this.$message({message: `编辑${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'edit',this.form,_);
      }
      const complete = _=>{
        this.btn_disabled = false;
      }

      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPut({url, data, success, complete});        
        }  
      })
    }
  }
}