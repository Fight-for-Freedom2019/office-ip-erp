let fs = require("fs")
// process.env.npm_config_report = "test"
fs.readFile("./config/index.js","utf8",function (err,res) {
  let result;
  let bool = isPro(res);
  if (process.env.npm_config_report === 'line'){
    if(bool) {
      console.log("\x1b[31mis pro");
      return
    }
    result = res.replace("// target: 'https://zhiquan.hongjianguo.com'","target: 'https://zhiquan.hongjianguo.com'");
    result = result.replace("target: 'https://test.hongjianguo.com'","// target: 'https://test.hongjianguo.com'");
  }else {
    if(!bool) {
      console.log("\x1b[31mis test");
      return
    }
    result = res.replace("// target: 'https://test.hongjianguo.com'","target: 'https://test.hongjianguo.com'");
    result = result.replace("target: 'https://zhiquan.hongjianguo.com'","// target: 'https://zhiquan.hongjianguo.com'");
  }
  fs.writeFile("./config/index.js", result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log("\x1b[32msuccessful change\x1b[32m")
  });
});
function isPro(res) {
  if (res.indexOf("// target: 'https://zhiquan.hongjianguo.com'") !== -1) {
    return false
  }else {
    return true
  }
}