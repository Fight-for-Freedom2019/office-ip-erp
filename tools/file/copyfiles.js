var fs = require('fs'); // 引入fs模块
var path = require('path');

function deleteall(path) {
  var files = [];
  if (fs.existsSync(path)) {
    if (!fs.statSync(path).isDirectory()) {
      fs.unlinkSync(path);
      return
    } else {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteall(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
    fs.rmdirSync(path);
  }
}

function copyDir(src, dist, callback) {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err)
        } else {
          paths.forEach(function (path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

deleteall(path.resolve('F:\\wamp64\\www\\zhiquan_b\\public\\static'));
deleteall(path.resolve('F:\\wamp64\\www\\zhiquan_b\\public\\index.html'));
copyDir(path.resolve("F:\\zhiquan_f\\dist"), path.resolve("F:\\wamp64\\www\\zhiquan_b\\public\\"),function (err) {
  if(err) throw err
  console.log("success")
});