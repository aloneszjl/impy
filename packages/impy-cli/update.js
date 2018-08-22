const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function(params, color, cmd) {
  const param = params.split("=");
  const package = require(resolveApp("package.json"));
  //   console.log(require("./package.json"));
  console.log("before check: impy-redux=" + chalk.blue(param[1]));
  console.log(
    "after check: impy-redux=" + chalk.green(package.dependencies["impy-redux"])
  );
};
