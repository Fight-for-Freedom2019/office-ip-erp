<template>
  <!-- <app-collapse col-title="分类信息"> -->
  <el-form label-width="120px">
    <el-form-item label="部门">
      <branch v-model="form.organization_unit" count-type="patent"></branch>
      <!-- <span v-else>{{ branchName ? branchName : '暂未归属某个部门' }}</span> -->
    </el-form-item>
    <el-form-item label="产品分类">
      <product v-model="form.products" count-type="patent" multiple></product>
    </el-form-item>
    <el-form-item label="技术分类">
      <classification v-model="form.classification" count-type="patent"></classification>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="代理人">
          <remote-select type="user" v-model="form.agent"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <!-- <el-form-item label="代理人助理">
          <remote-select type="user" v-model="form.assistant"></remote-select>
        </el-form-item>-->
      </el-col>
      <el-col :span="8">
        <el-form-item label="对外代理人">
          <remote-select type="user" v-model="form.representative"></remote-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="初审人">
          <remote-select type="user" v-model="form.first_reviewer"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="复审人">
          <remote-select type="user" v-model="form.final_reviewer"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财务">
          <remote-select type="user" v-model="form.finance"></remote-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="客服">
          <remote-select type="user" v-model="form.consultant"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售">
          <remote-select type="user" v-model="form.sales"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="流程">
          <remote-select type="user" v-model="form.flow"></remote-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="送件代理所">
          <remote-select type="agency" v-model="form.agency"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="送件代理人">
          <remote-select type="agent" v-model="form.patent_agent"></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="技术挖掘人">
          <remote-select type="user" v-model="form.digger"></remote-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- </app-collapse> -->
</template>

<script>
import AppCollapse from "@/components/common/AppCollapse";
import Branch from "@/components/form/Branch";
import Product from "@/components/form/Product";
import Classification from "@/components/form/Classification";
import StaticSelect from "@/components/form/StaticSelect";
import RemoteSelect from "@/components/form/RemoteSelect";

export default {
  name: "patentAddClassification",
  data() {
    return {
      form: {
        organization_unit: "",
        products: [],
        classification: "",
        agent: "",
        digger: "",
        assistant: "",
        first_reviewer: "",
        final_reviewer: "",
        representative: "",
        consultant: "",
        sales: "",
        agency: "",
        finance: "",
        flow: "",
        patent_agent: ""
      }
    };
  },
  methods: {
    setForm(data) {
      this.$tool.coverObj(this.form, data, {
        obj: ["organization_unit", "products", "classification"]
      });
    },
    submitForm() {
      return this.form;
    },
    checkForm(callback) {
      callback(true);
    }
  },
  components: {
    AppCollapse,
    Branch,
    Product,
    Classification,
    StaticSelect,
    RemoteSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>