"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extractor = void 0;
var Input_1 = require("../@types/Input");
var Extractor = (function () {
    function Extractor() {
    }
    Extractor.extract = function (input) {
        var _this = this;
        var lines = input.split("\n");
        var inputsList = [];
        lines.forEach(function (line) {
            var arr = [];
            var inputs = line.split(" ");
            inputs.forEach(function (token) {
                var extractValue = token.replace(/[\<\>]/g, "").split(";");
                var type = extractValue[0];
                switch (type) {
                    case "string":
                        arr.push(_this.extractString(extractValue));
                        break;
                    case "float":
                        arr.push(_this.extractFloat(extractValue));
                        break;
                    case "integer":
                        arr.push(_this.extractInteger(extractValue));
                        break;
                    case "regex":
                        arr.push(_this.extractRegex(token));
                        break;
                }
            });
            inputsList.push(arr);
        });
        return inputsList;
    };
    Extractor.extractRegex = function (value) {
        var _a;
        var regex = (_a = value.split("<regex;")[1]) !== null && _a !== void 0 ? _a : "";
        regex = regex.substring(0, regex.length - 1);
        return new Input_1.RegexInput("regex", regex);
    };
    Extractor.extractString = function (value) {
        var _a;
        var maxLength = 100;
        var minLength = 1;
        if (value.length == 3 && typeof value[2] == "string") {
            maxLength = parseInt(value[2]);
        }
        if (value.length >= 2 && typeof value[1] == "string") {
            minLength = parseInt(value[1]);
        }
        return new Input_1.StringInput((_a = value[0]) !== null && _a !== void 0 ? _a : "", minLength, maxLength);
    };
    Extractor.extractFloat = function (value) {
        var _a;
        var maxValue = 100000;
        var minValue = 0;
        var digits = 2;
        if (value.length == 4 && typeof value[3] == "string") {
            digits = parseInt(value[3]);
        }
        if (value.length >= 3 && typeof value[2] == "string") {
            maxValue = parseInt(value[2]);
        }
        if (value.length >= 2 && typeof value[1] == "string") {
            minValue = parseInt(value[1]);
        }
        return new Input_1.FloatInput((_a = value[0]) !== null && _a !== void 0 ? _a : "", maxValue, minValue, digits);
    };
    Extractor.extractInteger = function (value) {
        var _a;
        var maxValue = 100000;
        var minValue = 0;
        if (value.length == 3 && typeof value[2] == "string") {
            maxValue = parseInt(value[2]);
        }
        if (value.length >= 2 && typeof value[1] == "string") {
            minValue = parseInt(value[1]);
        }
        return new Input_1.IntegerInput((_a = value[0]) !== null && _a !== void 0 ? _a : "", maxValue, minValue);
    };
    return Extractor;
}());
exports.Extractor = Extractor;
