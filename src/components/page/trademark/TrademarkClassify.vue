<template>
	<div>
		<el-button type="primary" @click="trademarkJson" size='small'>商标分类表（参照）</el-button>
		<el-dialog title="商标分类（请选择并复制粘贴至“商标小类”文本框中）" :visible.sync='dialogVisible' :modal-append-to-body="false" top='4%' >
	        <div class="search" style="width: 200px;position: absolute;right: 50px;top: 15px">
	                <el-input
	                  placeholder="请输入关键字"
	                  icon="search"
	                  v-model="inputValue"
	                  :on-icon-click="searchDetail"
	                  @keyup.enter.native="searchDetail"
	                  >
	                </el-input>
	        </div>
	        <div class="link_drop" id="linkDrop" style="height: 90px;overflow-y: auto; border: 1px solid #ccc;padding: 10px;">
	            <div class="anchor" v-for="(item,index) in classifyContent">
	                <a :href="`#fl${index}`" @click="highLightColors('linkDrop','a',$event)">{{ `第${index+1}类` }}</a>
	            </div>
	        </div>

	        <div style="height: 300px; overflow-y: auto; border: solid 1px #ccc;margin-top: 10px; padding: 10px;" id="classifyContent">
	            <div class="classify_content"  v-for="(item,index) in classifyContent" :id="`fl${index}`">
	                <div class="left_side">
	                    <div class="classify_num">
	                        <p>{{ item.name }}</p>
	                    </div>
	                    <div class="comment">
	                        <p>{{ item.description }}</p>
	                    </div>
	                </div>
	                <div class="right_side">
	                    <ul >
	                        <li v-for = "(group,index2) in item['groups']" @click="showSortDetial(index,index2)">{{group.name}}</li>
	                    </ul>
	                </div>
	            </div>
	        </div>

	        <div class="classify_detail" style="height: 200px; overflow-y: auto; border: solid 1px #ccc; margin-top: 10px; padding: 10px;" >
	            <div class="detail_click" v-if="flag">
	                <div class="con_detail" v-html="detailContent"></div>
	                <div class="con_description" v-html="descriptionContent" style="color: red;"></div>    
	            </div>
	            <div class="detail_search" v-else>
	                <span v-for="item in newArr2" class="searchContent" v-html="item"></span>
	            </div>
	        </div>
	    </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'trademarkclassify',
  data() {
  	return {
  	  dialogVisible: false,
  	  flag:false,
      classifyContent: [],
      groups:[],
      detailContent:'',
      descriptionContent:'',
      inputValue:'',
      newArr:[],
      newArr2:[],
  	}
  },
  methods: {
  	trademarkJson () {
      
      this.dialogVisible = true;
      
      if(this.classifyContent.length == 0) {
          const url = '/static/js/categories.json';

          this.$axios.get(url).then(res=>{
              this.classifyContent = res.data;
          }).catch(_=>{});    
      }

  	},
  	highLightColors(id,tagName,event) {                //点击标签颜色高亮
		var pId = document.getElementById(id);
		var aList = pId.getElementsByTagName(tagName);
		for (var i = 0;i < aList.length; i++ ) {
		    aList[i].style.color = '#000';
		}
		event.target.style.color = '#58B7FF';
	},
    showSortDetial (i1,i2) {
	    // console.log(this.classifyContent[i1]['groups'][i2]['description']);
	    // 展示商标分类详情
	    this.flag = true;
	    this.highLightColors('classifyContent','li',event);
	    let con_detail = this.classifyContent[i1]['groups'][i2]['detail'];
	    let con_description = this.classifyContent[i1]['groups'][i2]['description'];
	    if(con_detail){
	         this.detailContent = con_detail ;
	    }else{
	        this.detailContent = "";
	    }
	    if(con_description){
	         this.descriptionContent = con_description;
	    }else{
	        this.descriptionContent = "";
	    }
	},
     searchDetail () {
      // console.log(this.classifyContent);
      if(!this.inputValue){
       return this.newArr = [];
      }else{
          this.flag = false;
          let total = this.classifyContent;
          this.newArr = [];
          for(var i=0; i < total.length; i++){    //第一次遍历全部数据
              let group = total[i].groups;
              for(var j=0; j < group.length; j++){    //第二次遍历每一类的数据
                  if(group[j].detail.indexOf(this.inputValue) > -1){    //检索匹配字符串
                      this.newArr.push(group[j]['detail']);        
                  }
              }
          }
          this.newArr2 = [];
          for(var k = 0;k < this.newArr.length; k++){
              //用正则表达式将检索字段标红
              this.newArr2.push(this.newArr[k].replace(new RegExp(this.inputValue,'g'),'<span style="color:red;">'+this.inputValue+'</span>'));    
              // console.log(123);
              
          }
      }
      // console.log(this.newArr);
  },
  },
}
</script>
<style lang="scss" scoped>
 .link_drop {
        .anchor a {
            line-height: 26px;
            color: #000;
            text-decoration: none;
            float: left;
            padding: 0 6px;
            &:hover {
                color: #58B7FF !important;
            }
        }
    }
    .classify_content {
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        margin-top: 10px;
        padding: 5px 10px;
        border: 1px solid #e1e1e1;
        height: auto;
        .left_side {
            width: 400px;
            height: auto;
            margin-bottom: -3000px;
            padding-bottom: 3000px;
            .classify_num {
                font-size: 16px;
                font-weight: bold;
            }
            .comment {
                font-size: 14px;
            }
        }
        .right_side {
            width:600px;
            height: auto;
            margin-bottom: -3000px;
            padding-bottom: 3000px;
            ul li {
                list-style: none;
            }
        }
        .right_side li {
            cursor: pointer;
        }
        .right_side li:hover {
            color: #58B7FF !important;
        }
        .detail_search .searchContent{
            display: inline-block;
        }
    }
</style>