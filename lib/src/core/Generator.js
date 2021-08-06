"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
var Extractor_1 = require("./Extractor");
var RandExp = require("randexp");
var Generator = (function () {
    function Generator() {
    }
    Generator.generate = function (template) {
        var _a;
        var inputsList = Extractor_1.Extractor.extract(template);
        var result = "";
        var resultArray = [];
        for (var i = 0; i < inputsList.length; i++) {
            var line = (_a = inputsList[i]) !== null && _a !== void 0 ? _a : [];
            var lineResult = [];
            for (var j = 0; j < line.length; j++) {
                var val = line[j];
                if (val) {
                    switch (val.type) {
                        case "string":
                            var stringInput = val;
                            lineResult.push(this.generateFromString(stringInput));
                            break;
                        case "float":
                            var floatInput = val;
                            lineResult.push(this.generateFromFloating(floatInput));
                            break;
                        case "integer":
                            var integerInput = val;
                            lineResult.push(this.generateFromInteger(integerInput));
                            break;
                        case "regex":
                            var regexInput = val;
                            lineResult.push(this.generateFromRegex(regexInput.regex));
                            break;
                    }
                }
            }
            resultArray.push(lineResult.join(" "));
        }
        result = resultArray.join("\n");
        return result;
    };
    Generator.generateFromString = function (input) {
        var result = "";
        result = this.generateFromRegex("[a-zA-Z]{" + input.minLength + "," + input.maxLength + "}");
        return result;
    };
    Generator.generateFromInteger = function (input) {
        var result = "";
        var min = input.minValue;
        var max = input.maxValue;
        var random = Math.random() * (max - min) + min;
        result = Math.round(random).toString();
        return result;
    };
    Generator.generateFromFloating = function (input) {
        var result = "";
        var min = input.minValue;
        var max = input.maxValue;
        var digits = input.digits;
        var random = Math.random() * (max - min) + min;
        var str = random.toFixed(digits);
        result = str;
        return result;
    };
    Generator.generateFromRegex = function (regex) {
        var result = "";
        try {
            result = new RandExp(regex).gen();
        }
        catch (err) { }
        return result;
    };
    return Generator;
}());
exports.Generator = Generator;
