
import echarts from 'echarts'

export default {
  install(Vue) {
    Vue.prototype.$chart = {
      get() {
        return {
          draw: function (id, options) {
            var chart = echarts.init(document.getElementById(id));
            chart.clear();
            chart.setOption(options);
          }
        }
      }
    };
  }
};


//------------------默认配置项start-------------------------


//------------------默认配置项end-------------------------

