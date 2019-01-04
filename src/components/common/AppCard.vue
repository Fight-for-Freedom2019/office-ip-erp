<template>
 	<span class="card-list">
 		<el-popover
 		 	v-for="(tag, index) in value"
 		 	:key="index"
 		 	width="400"
			placement="right"
			trigger="manual"
			:ref="`popover_${tag.id}`"
			v-model="tag.visible"
			@show.once="handleCardDetails(tag)"
 		>
			<el-row>
				<el-col :span="24">		
				  	<el-card :body-style="{padding:'0px',}">
				  		<div class="name_card">
				  			<img src="../../assets/head_img.png">
				  			<div class="name_email">
					  			<span class="detail-item"></span>
							</div>
				  		</div>
				  		<el-form label-width="80px" label-position="left" style="padding: 0 20px">
				  			<template v-for="(item, index) in cardFields">
				  				<template v-if="item.render ? true : false">
				  					<el-form-item :label="item.label">
										<card-render 
										:render="item.render" 
										:scopeForm="cardForm" 
										:field-key="item.key"
										>
										</card-render>				  						
				  					</el-form-item>
				  				</template>
				  				<template v-else>
									<el-form-item :label="item.label">
										<span class="detail-item">{{ cardForm[item.key] }}</span>
									</el-form-item>
				  				</template>
				  			</template>
						</el-form>
					</el-card>	
				</el-col>
			</el-row>
			<el-tag
		        closable
		        disable-transitions
		        @close="handleCloseTag(index)"
		        style="margin-right: 5px; cursor: pointer; max-width: 120px;"
		        slot="reference"
		        @click.native="(e)=>{handleCardVisible(tag,e)}"
	    	>
	    		<span v-if="type == 'inventor' && tag.share!=undefined">{{ `${tag.name};贡献率：${tag.share}%` }}</span>
	    		<span v-else-if="type == 'relateProjects'" :title="tag['id']['name']">{{ tag['id']['name'] }}</span>
	      		<span v-else :title="tag.name">{{tag.name}}</span>
	    	</el-tag>
		</el-popover>					
	</span>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "appCard",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    type: String
  },
  data() {
    return {
      cardForm: {},
      saveIndentity: ""
    };
  },
  computed: {
    ...mapGetters(["cardCache", "cardMap"]),
    staticCardData() {
      const val = this.type ? this.cardMap.get(this.type) : {};
      return val;
    },
    cardFields() {
      const fields =
        this.staticCardData != undefined ? this.staticCardData["FIELDS"] : [];
      return fields;
    }
  },
  created() {
    this.handleDynamicForm();
  },
  watch: {
    // value (val) {
    // 	val.forEach(_=>{
    // 		if(!_.visible)  this.$set( _, 'visible', false );
    // 		this.$set(_, 'type', this.type);
    // 	});
    // 	return val;
    // },
  },
  methods: {
    ...mapActions(["initializeCardCache"]),
    handleCloseTag(tag) {
      this.$emit("handleCloseTag", tag);
    },
    handleCardVisible(tag, e) {
      if (this.cardFields && this.cardFields.length != 0) {
        //手动关闭el-popover，还存在缺陷，无法关闭不是同一个字段,因为$refs只有当前字段的
        for (let k in this.$refs) {
          if (k !== `popover_${tag.id}`) {
            this.$refs[k][0].doClose();
          }
        }
        this.$refs[`popover_${tag.id}`][0].doToggle();
      } else {
        return false;
      }
      // return	this.cardFields && this.cardFields.length != 0 ? tag.visible = !tag.visible : false;
    },
    setForm(data) {
      for (let k in this.cardForm) {
        if (k == "province_city") {
          this.cardForm[k] = `${data["province_name"]}/${data["city_name"]}`;
        } else {
          this.cardForm[k] = data[k];
        }
      }
    },
    async handleCardDetails({ id }) {
      await this.initializeCardCache({ type: this.type, id: id });
      // await this.setForm(this.cardCache[this.type]);
      setTimeout(() => {
        this.setForm(this.cardCache[this.type]);
      }, 100);
    },
    handleDynamicForm() {
      if (this.cardFields && this.cardFields.length != 0) {
        this.cardFields.forEach(_ => {
          this.$set(this.cardForm, _.key, "");
        });
      }
    }
  },
  components: {
    CardRender: {
      render: function(h) {
        return this.render(h, this.scopeForm[this.fieldKey]);
      },
      props: {
        render: null,
        fieldKey: {
          type: String,
          default: ""
        },
        scopeForm: null
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.name_card {
  height: 200px;
  background: url("../../assets/card.jpg") center center no-repeat;
  position: relative;
  text-align: center;
  width: 100%;
}
.name_card img {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin-left: -50px;
  margin-top: -50px;
}
.name_card .name_email {
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 10%;
  color: #fff;
}
</style>
