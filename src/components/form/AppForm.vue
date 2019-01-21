<template>
  <el-form
    :model="form"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :rules="rules"
    ref="form"
  >
    <slot></slot>
    <template v-for="(item, index) in source">
      <template v-if="shouldDisplay(item.if)">
        <template v-if="item.components == 'static_select'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <static-select
              ref="static-select"
              :type="item.type"
              :multiple="item.multiple"
              v-model="form[item.key]"
              @input="handleInput"
            ></static-select>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'remote_select'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <remote-select
              ref="remote-select"
              :multiple="item.multiple"
              v-model="form[item.key]"
              @input="handleInput"
              :type="item.type"
            ></remote-select>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'date'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <el-date-picker
              ref="date"
              v-model="form[item.key]"
              @input="handleInput"
              :type="item.type"
              :placeholder="item.placeholder"
            ></el-date-picker>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'input'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <el-input
              ref="input"
              v-model="form[item.key]"
              @input="handleInput"
              :type="item.type"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'switch'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <app-switch
              ref="switch"
              v-model="form[item.key]"
              @input="handleInput"
              :type="item.type"
            ></app-switch>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'slider'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <el-slider ref="slider" v-model="form[item.key]" @input="handleInput" show-input></el-slider>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'upload'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <upload ref="upload" v-model="form[item.key]" @input="handleInput"></upload>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'panel'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <a
              ref="panel"
              style="cursor: pointer"
              v-model="form[item.key]"
              @click="showPanel(item.type)"
              :type="item.type"
              disabled="isDetailEnabled"
            >{{"点我查看" + item.name}}</a>
          </el-form-item>
        </template>
        <template v-else-if="item.components == 'points'">
          <el-form-item :label="item.name" :prop="item.key" :key="index">
            <el-input
              ref="input"
              v-model.number="form[item.key]"
              @mousewheel.native.prevent
              @input="handleInput"
              :type="item.type"
              :placeholder="item.placeholder"
            ></el-input>
            <span>注意此点数是原始点数，实际点数需要计算成熟度</span>
          </el-form-item>
        </template>
      </template>
    </template>
    <slot name="app-button"></slot>
    <order-detail ref="order" @loaded="panelLoaded" v-if="map['order_detail'] != undefined"></order-detail>
    <!-- 订单详情 -->
    <contract-detail ref="contract" @loaded="panelLoaded" v-if="map['contract_detail'] != undefined"></contract-detail>
    <!-- 合同详情 -->
    <invoice-detail ref="payment_request" @loaded="panelLoaded" v-if="map['payment_request_detail'] != undefined"></invoice-detail>
    <!-- 账单详情 -->
    <voucher-detail ref="voucher" @loaded="panelLoaded" v-if="map['voucher_detail'] != undefined"></voucher-detail>
    <!-- 发票详情 -->
    <renewal-fee ref="renewal_fee" v-if="map['renewal_fee_detail'] != undefined"></renewal-fee>
    <!-- 年费详情 -->
    <renewal-estimate-detail ref="renewal_estimate_detail" v-if="map['renewal_estimate_detail'] != undefined"></renewal-estimate-detail>
    <!-- 年费评估单详情 -->
    <patent-add ref="patent_add" :title="row.title" :status="0" v-if="map['patent_add'] != undefined"></patent-add>
    <!-- 专利基本信息 -->
    <common-detail ref="common_detail" :title="row.title" v-if="map['patent'] != undefined"></common-detail>
    <!-- 专利、商标、版权详情 -->
    <cpc-editor ref="cpc_editor" :id="row.model_id" :process="process" v-if="map['cpc_editor'] != undefined"></cpc-editor>
    <!-- 延期记录 -->
    <postpone ref="postpone" :id="row.model_id" v-if="map['postpone'] != undefined"></postpone>
    <!-- CPC编辑器 -->
    <!-- <template v-else-if="this.type == 'cpc_editor'">
				<cpc-editor type="pay" ref="detail" :id="row.model_id"></cpc-editor>
			</template>
			<template v-else-if="this.type == 'payment_request'">
				<payment-manage-detail type="pay" ref="detail" :id="row.model_id"></payment-manage-detail>
			</template>
			<template v-else-if="this.type == 'outgo_payment'">
				<cusotmer-payment-detail type="pay" ref="detail" :id="row.model_id"></cusotmer-payment-detail>
			</template>
			<template v-else-if="this.type == 'contract'">
				<contract-detail type="pay" ref="detail" :id="row.model_id"></contract-detail>
			</template>
			<template v-else-if="this.type == 'voucher'">
				<invoice-manage-detail type="pay" ref="detail" :id="row.model_id"></invoice-manage-detail>
			</template>
			<template v-else-if="this.type == 'sensitive_operation'">
				<sensitive-operation type="pay" ref="detail" :id="row.model_id"></sensitive-operation>
    </template>-->
  </el-form>
</template>
<script>
import StaticSelect from "@/components/form/StaticSelect";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import AppSwitch from "@/components/form/AppSwitch";
import Upload from "@/components/form/Upload";
import AppShrink from "@/components/common/AppShrink";
import OrderDetail from "@/components/page/crm/orders/OrderDetail";
import InvoiceDetail from "@/components/page_extension/PaymentManageDetail";
import CustomerPaymentDetail from "@/components/page/crm/suppliers/Payments";
import VoucherDetail from "@/components/page_extension/InvoiceManageDetail";
import ContractDetail from "@/components/page/crm/contracts/ContractsListAdd";
import SensitiveOperation from "@/components/page/common/SensitiveOperation";
import CpcEditor from "@/components/page/cpc/CpcEditor";
import PatentAdd from "@/components/page_extension/Common_detail";
import CommonDetail from "@/components/page_extension/Common_detail";
import RenewalEstimateDetail from "@/components/page_extension/RenewalEstimate_detail";
import RenewalFee from "@/components/page_extension/RenewalFee_pop";
import Postpone from "@/components/page_extension/TaskCommonPostpone";

export default {
  name: "appForm",
  props: {
    source: {
      type: Array,
      default() {
        return [];
      }
    },
    map: {
      type: Object,
      default() {
        return {};
      }
    },
    opinion: {
      type: String,
      default: "pass"
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    labelPosition: {
      type: String,
      default: "right"
    },
    rules: {
      type: Object,
      default() {
        return {};
      }
    },
    row: {
      type: Object,
      default: {}
    },
    process: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {},
      id: 0,
      isDetailEnabled: true,
      type: "",
      conditions: {}
    };
  },
  computed: {
    allKeys() {
      if (this.source) {
        const keys = this.$tool.splitObj(this.source, "key");
        return keys;
      }
    }
  },
  methods: {
    shouldDisplay(vif) {
      if (vif === undefined) return true;
      return eval(vif);
    },
    panelLoaded() {
      this.isDetailPanelEnabled = true;
    },
    handleInput(val) {
      this.$emit("input", val);
      this.$emit("formData", this.form);
    },
    showPanel(type) {
      this.isDetailEnabled = false;
      this.type = type;
      console.log(
        "task detail panel is clicked, type:" +
          type +
          " id: " +
          this.row.model_id
      );
      switch (type) {
        case "order":
          this.$refs.order.show(this.row.model_id, "edit");
          break;
        case "contract":
          this.$refs.contract.show(this.row.model_id, "edit");
          break;
        case "payment_request":
          this.$refs.payment_request.show(this.row.model_id, "edit");
          break;
        case "voucher":
          this.$refs.voucher.show(this.row.model_id, "edit");
          break;
        case "cpc_editor":
          this.$refs.cpc_editor.showApplicationEditor(this.row.task.id);
          break;
        case "patent_add":
          this.$refs.patent_add.show(this.row.model_id);
          break;
        case "patent":
          this.$refs.common_detail.show(this.row.model_id, type);
          break;
        case "renewal_estimate":
          this.$refs.renewal_estimate_detail.show(this.row.model_id);
          break;
        case "renewal_fee":
          this.$refs.renewal_fee.show("edit", this.row);
          break;
        case "postpone":
          this.$refs.postpone.show('edit', this.row.model_id);
          break;
      }
    },
    initializeForm() {
      let val = null;
      this.source.forEach(_ => {
        if (
          _.components == "remote_select" ||
          _.components == "static_select"
        ) {
          val = _.multiple ? [] : _.default !== undefined ? _.default : "";
        } else if (_.components == "upload") {
          val = [];
        } else if (this.process[_.key] !== undefined && _.key != 'remark') {
          val = this.process[_.key];
        }else {
          val = "";
        }
        this.$set(this.form, _.key, val);
      });
    }
  },
  mounted() {
    this.initializeForm();
  },
  watch: {
    source() {
      this.initializeForm();
      this.$nextTick(_ => {
        this.$refs["upload"][0].clearFiles();
      });
    }
  },
  components: {
    StaticSelect,
    RemoteSelect,
    JumpSelect,
    AppSwitch,
    Upload,
    OrderDetail,
    AppShrink,
    InvoiceDetail,
    VoucherDetail,
    ContractDetail,
    SensitiveOperation,
    CpcEditor,
    CustomerPaymentDetail,
    PatentAdd,
    CommonDetail,
    RenewalEstimateDetail,
    RenewalFee,
    Postpone
  }
};
</script>
<style lang="scss" scoped>
</style>