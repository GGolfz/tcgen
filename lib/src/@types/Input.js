"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInput = exports.IntegerInput = exports.FloatInput = exports.RegexInput = exports.Input = void 0;
var Input = (function () {
    function Input() {
    }
    return Input;
}());
exports.Input = Input;
var RegexInput = (function () {
    function RegexInput(type, regex) {
        this.type = type;
        this.regex = regex;
    }
    return RegexInput;
}());
exports.RegexInput = RegexInput;
var FloatInput = (function () {
    function FloatInput(type, minValue, maxValue, digits) {
        this.type = type;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.digits = digits;
    }
    return FloatInput;
}());
exports.FloatInput = FloatInput;
var IntegerInput = (function () {
    function IntegerInput(type, minValue, maxValue) {
        this.type = type;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    return IntegerInput;
}());
exports.IntegerInput = IntegerInput;
var StringInput = (function () {
    function StringInput(type, minLength, maxLength) {
        this.type = type;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }
    return StringInput;
}());
exports.StringInput = StringInput;
