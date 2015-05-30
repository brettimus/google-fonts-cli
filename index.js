#! /usr/bin/env node

var Program = require("./src/program");
var args = process.argv.splice(2);

(new Program(args)).run();