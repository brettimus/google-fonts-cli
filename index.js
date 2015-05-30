#! /usr/bin/env node

var Program = require("./program");
var args = process.argv.splice(2);

(new Program(args)).run();