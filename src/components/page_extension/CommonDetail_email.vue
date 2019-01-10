<template>
  <div class="main">
		<app-table :columns="columns" :data="detailMails" @row-click="handleRowClick"></app-table>
		<email-detail  ref="email_detail"></email-detail>
    <mail-add  ref="mail_add"></mail-add>
  </div>
</template>

<script>
import AppTable from '@/components/common/AppTable'
import EmailDetail from '@/components/page_extension/Email_detail'
import AppShrink from '@/components/common/AppShrink'
import MailAdd from '@/components/page/MailAdd'
import {mapGetters} from 'vuex' 
export default {
  name: 'commonDetailEmail',
  data () {
		return {
	  	columns: [
	  		// { type: 'text', label: '发件人邮箱', prop: 'from', render_simple: 'label' },
	  		{ 
	  			type: 'array', 
	  			label: '收件人邮箱', 
	  			prop: 'recipient', 
	  			render: _=>_.map(_=>_.email), 
	  			sortable: true,
          width: '260', 
	  		},
	  		{ type: 'text', label: '邮件标题', prop: 'subject', render: this.attachmentRender},
	  		{ 
          type: 'text', 
          label: '发送时间', 
          prop: 'sent_time',
          render_text: (val) => val ? val : '暂未发送',
          width: '200',
        },
        { 
          type: 'action',
          fixed: false,
          width: '100',
          btns:  [
            { 
              label: '编辑&补发',
              btn_type: 'text',
              click: this.edit,
            }
          ],
        }
	  	],
	  };
  },
  methods: {
  	handleRowClick ({id}) {
  		this.$refs.email_detail.show(id);
  	},
    edit (row) {
      this.$refs.mail_add.show('view',row.id);
    },
    sendMail ({id}) {
      this.$emit('sendMail', id);
    },
    attachmentRender (h,item,row) {
      return (
       <span>
          { row.attach?<i class="el-icon-my-attachment"></i>: <i></i> } 
            <span>{ item }</span>
        </span>
      )
    },
  },
  computed: {
    ...mapGetters([
      'detailMails',
    ]),
  },
  components: { 
  	AppTable, 
  	EmailDetail,
    MailAdd, 
    AppShrink,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>