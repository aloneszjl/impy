#!/usr/bin/env node
const chalk = require("chalk");
const program = require("commander");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const shell = require("shelljs");

program
  .command("check")
  .description("check for update")
  .action(function() {
    const package = require(resolveApp("package.json"));
    const impy = `impy-redux=${package.dependencies["impy-redux"]}`;
    shell.exec("ncu impy-redux -a --packageFile package.json", code => {
      if (code === 0) {
        shell.exec(`impy update --params=${impy} --color=true`);
      }
    });
  });

program
  .command("update")
  .description("update packages")
  .action(require("./update.js"))
  .option("--params", "package version")
  .option("--color", "use chalk color");

program.parse(process.argv);
