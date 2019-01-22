import menu from "../../const/menuConst";

let url = "/userinfo";

const state = {
  data: null,
  loading: false
};

const nodePermissionMap = new Map([
  ["/task", "Pages.Tasks.Index"],
  ["/task/pending", "Pages.Tasks.Index"],
  ["/task/all", "Pages.Patents.Save"],
  ["/task/review", "Pages.Tasks.Index"],
  ["/task/review/sent", "Pages.Tasks.Index"],
  ["/task/review/my", "Pages.Tasks.Index"],
  ["/task/monitor", "Pages.Tasks.Index"],
  ["/task/monitor/assigner", "Pages.Tasks.Save"],
  ["/task/monitor/agent", "Pages.Tasks.Index"],
  ["/task/monitor/assistant", "Pages.Tasks.Index"],
  ["/task/monitor/first_reviewer", "Pages.Tasks.Index"],
  ["/task/monitor/final_reviewer", "Pages.Tasks.Index"],
  ["/task/monitor/representative", "Pages.Tasks.Index"],
  ["/task/finished", "Pages.Tasks.Index"],
  ["/task/finished/my", "Pages.Tasks.Index"],
  ["/task/finished/team", "Pages.Tasks.Index"],
  ["/task/btn/save", "Pages.Tasks.Save"],
  ["/task/btn/delete", "Pages.Tasks.Delete"],
  ["/task/btn/close", "Pages.Processes.Close"],
  ["/task/btn/transfer", "Pages.Processes.Transfer"],
  ["/task/btn/reject", "Pages.Processes.Reject"],
  ["/patent", "Pages.Patents.Index"],
  ["/patent/read", "Pages.Patents.Read"],
  ["/patent/list", "Pages.Patents.Index"],
  ["/patent/draftbox", "Pages.Patents.Save"],
  ["/patent/notice", "Pages.Notices.Index"],
  ["/patent/btn/save", "Pages.Role.Flow"],
  ["/patent/btn/delete", "Pages.Role.Flow"],
  ["/patent/btn/active", "Pages.Role.Flow"],
  ["/patent/btn/active/amendment", "Pages.Role.Flow"],
  ["/patent/btn/active/biblo", "Pages.Role.Flow"],
  ["/patent/btn/active/division", "Pages.Role.Flow"],
  ["/patent/btn/assign", "Pages.Role.Flow"],
  ["/patent/btn/assign/agency", "Pages.Role.Flow"],
  ["/patent/btn/assign/withdraw", "Pages.Role.Flow"],
  ["/patent/btn/assign/change", "Pages.Role.Flow"],
  ["/trademark", "Pages.Trademarks.Index"],
  ["/trademark/list", "Pages.Trademarks.Index"],
  ["/trademark/draftbox", "Pages.Trademarks.Save"],
  ["/trademark/notice","Pages.Trademarks.Index"],
  ["/trademark/btn/update/","Pages.Trademarks.Update"],
  ["/trademark/btn/delete", "Pages.Trademarks.Delete"],
  ["/trademark/read","Pages.Trademarks.Read"],
  ["/trademark/btn/filters", "Pages.Trademarks.Filters"],
  ["/copyright/draftbox", "Pages.Copyrights.Save"],
  ["/copyright", "Pages.Copyrights.Index"],
  ["/copyright/list", "Pages.Copyrights.Index"],
  ["/copyright/btn/update","Pages.Copyrights.Update"],
  ["/copyright/btn/delete","Pages.Copyrights.Delete"],
  ["/copyright/read","Pages.Copyrights.Read"],
  ["/copyright/btn/filters","Pages.Copyrights.Filters"],
  ["/copyright/notice","Pages.Copyrights.Index"],
  ["/crm", "Pages.Customers.Save"],
  ["/crm/customers", "Pages.Customers.Index"],
  ["/crm/customers/btn/save", "Pages.Customers.Save"],
  ["/crm/customers/btn/delete", "Pages.Customers.Delete"],
  ["/crm/orders", "Pages.Orders.Index"],
  ["/crm/orders/btn/save", "Pages.Orders.Save"],
  ["/crm/orders/btn/delete", "Pages.Orders.Delete"],
  ["/crm/orders/btn/submit", "Pages.Orders.Submit"],
  ["/crm/contracts", "Pages.Contracts.Index"],
  ["/crm/contracts/btn/save", "Pages.Contracts.Save"],
  ["/crm/contracts/btn/delete", "Pages.Contracts.Delete"],
  ["/crm/data", "Pages.Applicants.Save"],
  ["/crm/data/applicants", "Pages.Applicants.Index"],
  ["/crm/data/applicants/btn/save", "Pages.Applicants.Save"],
  ["/crm/data/applicants/btn/delete", "Pages.Applicants.Delete"],
  ["/crm/data/inventors", "Pages.Inventors.Index"],
  ["/crm/data/inventors/btn/save", "Pages.Inventors.Save"],
  ["/crm/data/inventors/btn/delete", "Pages.Inventors.Delete"],
  ["/crm/data/contacts", "Pages.Contacts.Index"],
  ["/crm/data/contacts/btn/save", "Pages.Contacts.Save"],
  ["/crm/data/contacts/btn/delete", "Pages.Contacts.Delete"],
  ["/crm/data/remarks", "Pages.CustomerRemarks.Index"],
  ["/crm/data/remarks/btn/save", "Pages.CustomerRemarks.Save"],
  ["/crm/data/remarks/btn/delete", "Pages.CustomerRemarks.Delete"],
  ["/crm/data/invoice_targets", "Pages.InvoiceTargets.Index"],
  ["/crm/data/invoice_targets/btn/save", "Pages.InvoiceTargets.Save"],
  ["/crm/data/invoice_targets/btn/delete", "Pages.InvoiceTargets.Delete"],
  ["/crm/data/quotations", "Pages.Quotations.Save"],
  ["/crm/data/quotations/btn/save", "Pages.Quotations.Save"],
  ["/crm/data/quotations/btn/delete", "Pages.Quotations.Delete"],
  ["/crm/suppliers", "Pages.Suppliers.Delete"],
  ["/crm/suppliers/lists", "Pages.Suppliers.Index"],
  ["/crm/suppliers/lists/btn/save", "Pages.Suppliers.Save"],
  ["/crm/suppliers/lists/btn/delete", "Pages.Suppliers.Delete"],
  ["/finance", "Pages.Bonuses.Index"],
  ["/finance/revenue", "Pages.Fees.Index"],
  ["/finance/revenue/btn/save", "Pages.Fees.Save"],
  ["/finance/revenue/btn/delete", "Pages.Fees.Delete"],
  ["/finance/revenue/btn/invoice", "Pages.Invoices.Save"],
  ["/finance/revenue/btn/invoice/save", "Pages.Invoices.Save"],
  ["/finance/revenue/btn/invoice/add_to_existed", "Pages.Invoices.Save"],
  ["/finance/revenue/all", "Pages.Fees.Index"],
  ["/finance/revenue/ready_to_request", "Pages.Fees.Index"],
  ["/finance/revenue/payment_requests", "Pages.Invoices.Index"],
  ["/finance/revenue/payment_requests/btn/delete", "Pages.Invoices.Save"],
  ["/finance/revenue/payments_recevied", "Pages.ReceivedPayments.Index"],
  [
    "/finance/revenue/payments_recevied/btn/save",
    "Pages.ReceivedPayments.Save"
  ],
  [
    "/finance/revenue/payments_recevied/btn/delete",
    "Pages.ReceivedPayments.Delete"
  ],
  ["/finance/outgo", "Pages.Fees.Index"],
  ["/finance/outgo/all", "Pages.Fees.Index"],
  ["/finance/outgo/btn/save", "Pages.Fees.Save"],
  ["/finance/outgo/btn/delete", "Pages.Fees.Delete"],
  ["/finance/outgo/btn/invoice", "Pages.Invoices.Save"],
  ["/finance/outgo/btn/invoice/save", "Pages.Invoices.Save"],
  ["/finance/outgo/btn/invoice/add_to_existed", "Pages.Invoices.Save"],
  ["/finance/outgo/ready_to_pay", "Pages.Fees.Index"],
  ["/finance/outgo/payments", "Pages.Invoices.Index"],
  ["/finance/outgo/payments/btn/save", "Pages.Invoices.Save"],
  ["/finance/outgo/payments/btn/delete", "Pages.Invoices.Delete"],
  ["/finance/renewal_fees", "Pages.RenewalFees.Index"],
  ["/finance/renewal_fees/lists", "Pages.RenewalFees.Index"],
  ["/finance/renewal_fees/btn/sheet", "Pages.ConfirmationSheets.Save"],
  ["/finance/renewal_fees/btn/sheet/create", "Pages.ConfirmationSheets.Save"],
  [
    "/finance/renewal_fees/btn/sheet/addFees",
    "Pages.ConfirmationSheets.AddFees"
  ],
  [
    "/finance/renewal_fees/confirmation_sheets",
    "Pages.ConfirmationSheets.Index"
  ],
  [
    "/finance/renewal_fees/confirmation_sheets/btn/delete",
    "Pages.ConfirmationSheets.Delete"
  ],
  ["/finance/vouchers", "Pages.Vouchers.Index"],
  ["/finance/vouchers/lists", "Pages.Vouchers.Index"],
  ["/finance/vouchers/lists/btn/save", "Pages.Vouchers.Save"],
  ["/finance/vouchers/lists/btn/delete", "Pages.Vouchers.Delete"],
  ["/finance/vouchers/received", "Pages.Vouchers.Index"],
  ["/finance/points", "Pages.Bonuses.Index"],
  ["/finance/points/lists", "Pages.Bonuses.Index"],
  ["/finance/points/btn/save", "Pages.Bonuses.Save"],
  ["/finance/points/btn/delete", "Pages.Bonuses.Delete"],
  ["/finance/points/settled", "Pages.BonusReports.Index"],
  ["/exchange", "Pages.Mails.Index"],
  ["/exchange/document", "Pages.Files.SaveOa"],
  ["/exchange/document/oa", "Pages.Files.SaveOa"],
  ["/exchange/document/voucher", "Pages.Files.SaveVoucher"],
  ["/exchange/document/other", "Pages.Files.SaveOther"],
  ["/exchange/document/cpc", "Pages.Files.SaveCpc"],
  ["/exchange/client", "Pages.CpcNotices.Index"],
  ["/exchange/client/notices", "Pages.CpcNotices.Index"],
  ["/exchange/client/archives", "Pages.CpcArchives.Index"],
  ["/exchange/mails", "Pages.Mails.Index"],
  ["/setting", "Pages.UserConfigs.Index"],
  ["/setting/my", "Pages.UserConfigs.Index"],
  ["/setting/users", "Pages.Users.Save"],
  ["/setting/classifications", "Pages.Classifications.Save"],
  ["/setting/products", "Pages.Products.Save"],
  ["/setting/field", "Pages.Role.Admin"],
  ["/setting/mail_templates", "Pages.MessageTemplates.Save"],
  ["/setting/flow", "Pages.Role.Admin"],
  ["/setting/flow/definitions", "Pages.Role.Admin"],
  ["/setting/flow/flows", "Pages.Role.Admin"],
  ["/setting/flow/actions", "Pages.Role.Admin"],
  ["/setting/flow/forms", "Pages.Role.Admin"],
  ["/setting/flow/fields", "Pages.Role.Admin"],
  ["/setting/data", "Pages.PaymentAccounts.Save"],
  ["/setting/data/payment_accounts", "Pages.PaymentAccounts.Save"],
  ["/setting/data/fee_codes", "Pages.FeeCodes.Save"],
  ["/setting/data/file_types", "Pages.FileTypes.Save"],
  ["/setting/data/stages", "Pages.ProjectStages.Admin"],
  ["/setting/data/services", "Pages.Services.Save"],
  ["/setting/data/tags", "Pages.Tags.Save"],
  ["/setting/bonus", "Pages.Role.Partner"],
  ["/setting/bonus/ratio", "Pages.Role.Partner"],
  ["/setting/bonus/rules", "Pages.Role.Partner"],
  ["/setting/agencies", "Pages.Role.Partner"],
  ["/setting/agencies/lists", "Pages.Role.Partner"],
  ["/setting/agencies/agents", "Pages.Role.Partner"],
  ["/setting/system", "Pages.Role.Admin"],
  ["/role/flow", "Pages.Role.Flow"],
  ["/role/admin", "Pages.Role.Admin"],
  ["/role/partner", "Pages.Role.Partner"],
  ["/role/finance", "Pages.Role.Finance"]
]);

const getters = {
  getUser: state => state.data,
  menusMap: state => {
    let map = new Map();
    if (state.data == null) return map;

    const permissions = state.data.permissions ? state.data.permissions : [];
    permissions.forEach(_ => {
      map.set(_, true);
    });

    let menuMap = new Map();
    nodePermissionMap.forEach(function(value, key) {
      const n = map.get(value);
      if (n != undefined) {
        menuMap.set(key, true);
      }
    });
    console.log(menuMap);
    return menuMap;
  },
  currentUser: state => state.data,
  username: state => {
    const user = state.data;

    const name = user ? (user.name ? user.name : user.username) : "";
    return name;
  },
  userid: state => {
    const user = state.data;
    const id = user ? user.id : "";
    return id;
  },
  isAdmin: state => {
    const user = state.data;
    const isAdmin = user ? user.is_admin : false;
    return isAdmin;
  },
  useridentity: state => {
    const user = state.data;
    const i = user ? user.identity : "";
    return i;
  },
  userrole: state => {
    const user = state.data;
    const i = user ? user.role : "";
    return i;
  },
  usergroups: state => {
    const user = state.data;
    let groups = [];
    if (user && user.groups) {
      groups = user.groups.map(v => v.id);
    }
    return groups;
  },
  pendingTaskCount: state => {
    const user = state.data;
    const count = user ? user.pendingTaskCount : 0;
    return count;
  },
  pausedTaskCount: state => {
    const user = state.data;
    const count = user ? user.pausedTaskCount : 0;
    return count;
  },
  monitoredTaskCount: state => {
    const user = state.data;
    const count = user ? user.monitoredTaskCount : 0;
    return count;
  },
  allTaskCount: state => {
    const user = state.data;
    const count = user ? user.allTaskCount : 0;
    return count;
  },
  finishedTaskCount: state => {
    const user = state.data;
    const count = user ? user.finishedTaskCount : 0;
    return count;
  },
  expiredTaskCount: state => {
    const user = state.data;
    const count = user ? user.expiredTaskCount : 0;
    return count;
  },
  weekTaskCount: state => {
    const user = state.data;
    const count = user ? user.weekTaskCount : 0;
    return count;
  },
  nextWeekTaskCount: state => {
    const user = state.data;
    const count = user ? user.nextWeekTaskCount : 0;
    return count;
  },
  monthTaskCount: state => {
    const user = state.data;
    const count = user ? user.monthTaskCount : 0;
    return count;
  },
  nextMonthTaskCount: state => {
    const user = state.data;
    const count = user ? user.nextMonthTaskCount : 0;
    return count;
  },
  laterTaskCount: state => {
    const user = state.data;
    const count = user ? user.laterTaskCount : 0;
    return count;
  },
  applicationTaskCount: state => {
    const user = state.data;
    const count = user ? user.applicationTaskCount : 0;
    return count;
  },
  oaTaskCount: state => {
    const user = state.data;
    const count = user ? user.oaTaskCount : 0;
    return count;
  },
  reexamTaskCount: state => {
    const user = state.data;
    const count = user ? user.reexamTaskCount : 0;
    return count;
  },
  grantTaskCount: state => {
    const user = state.data;
    const count = user ? user.grantTaskCount : 0;
    return count;
  },
  invalidTaskCount: state => {
    const user = state.data;
    const count = user ? user.invalidTaskCount : 0;
    return count;
  },
  annualFeeTaskCount: state => {
    const user = state.data;
    const count = user ? user.annualFeeTaskCount : 0;
    return count;
  },
  litigationTaskCount: state => {
    const user = state.data;
    const count = user ? user.litigationTaskCount : 0;
    return count;
  },
  proposalTaskCount: state => {
    const user = state.data;
    const count = user ? user.proposalTaskCount : 0;
    return count;
  },
  patentTaskCount: state => {
    const user = state.data;
    const count = user ? user.patentTaskCount : 0;
    return count;
  },
  copyrightTaskCount: state => {
    const user = state.data;
    const count = user ? user.copyrightTaskCount : 0;
    return count;
  },
  pendingTask: state => {
    const user = state.data;
    const pendingTask = user && user.pendingTask ? user.pendingTask : null;
    return pendingTask;
  },
  userLinks: state => {
    const user = state.data;
    const links = user && user.links ? user.links : [];
    return links;
  },
  userReminders: state => {
    const user = state.data;
    const reminders = user && user.reminders ? user.reminders : [];
    return reminders;
  },
  userLoading: state => state.loading
};

const mutations = {
  setUser(state, d) {
    state.data = d;
    window.localStorage.setItem("userinfo", JSON.stringify(d));
  },
  setUserLoading(state, boolean) {
    state.loading = boolean;
  }
};

const actions = {
  refreshUser({ commit, rootState, state }) {
    url = rootState.status ? url : url;
    const params = {};
    commit("setUserLoading", true);
    const next = rootState.axios.get(url, { params });

    next
      .then(response => {
        const d = response.data;
        if (d.status) {
          commit("setUser", d.member);
        } else {
          // alert('请求Ipr数据失败');
        }

        commit("setUserLoading", false);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
