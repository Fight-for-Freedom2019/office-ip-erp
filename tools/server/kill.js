var shell = require("shelljs");
var exec = require('child_process').exec;
var cli = "netstat -aon|findstr 8082"
exec(cli,{encoding:'utf8',windowsHide:true},function (err,stdout,stderr){
  if (err){
    console.log("8082 port is not occupy")
    // console.log(err);
    return;
  }
  // console.log(stdout);
  if(stdout.indexOf("LISTENING") !== -1) {
    let pid = stdout.split("LISTENING")[1].match(/\d{4,5}/);
    shell.exec(`taskkill /F /PID ${Number(pid)}`);
    console.log("kill port 8082 success")
  }

})
