<template>
  <el-form label-width="120px" ref="form">
    <el-form-item label="部门">
      <branch v-model="form.organization_unit" count-type="trademark"></branch>
      <!-- <span v-else>{{ branchName ? branchName : '暂未归属某个部门' }}</span> -->
    </el-form-item>
    <!-- <el-form-item label="产品分类">
      <product v-model="form.products" count-type="patent" multiple></product>
    </el-form-item>
    <el-form-item label="技术分类">
      <classification v-model="form.classification" count-type="patent"></classification>
    </el-form-item>-->
    <el-row>
      <el-col :span="8">
        <el-form-item label="代理人">
          <jump-select type="user" v-model="form.agent" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="8">
        <el-form-item label="代理人助理">
          <jump-select type="user" v-model="form.assistant"></jump-select>
        </el-form-item>
      </el-col>-->
      <el-col :span="8">
        <el-form-item label="对外代理人">
          <jump-select type="user" v-model="form.representative" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="派案人">
          <jump-select type="user" v-model="form.assigner" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="初核人">
          <jump-select type="user" v-model="form.first_reviewer" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="复核人">
          <jump-select type="user" v-model="form.final_reviewer" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财务">
          <jump-select type="user" v-model="form.finance" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="顾问">
          <jump-select type="user" v-model="form.consultant" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售">
          <jump-select type="user" v-model="form.sales" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="流程">
          <jump-select type="user" v-model="form.flow" add-type="user"></jump-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Branch from "@/components/form/Branch";
import Product from "@/components/form/Product";
import Classification from "@/components/form/Classification";
import StaticSelect from "@/components/form/StaticSelect";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";

export default {
  name: "trademarkPerson",
  data() {
    return {
      form: {
        organization_unit: "",
        // products: [],
        // classification: "",
        agent: "",
        // assistant: "",
        representative: "",
        assigner: "",
        first_reviewer: "",
        final_reviewer: "",
        finance: "",
        consultant: "",
        sales: "",
        flow: ""
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
    Branch,
    Product,
    Classification,
    StaticSelect,
    RemoteSelect,
    JumpSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>