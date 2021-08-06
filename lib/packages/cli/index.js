"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../src");
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var program = new commander_1.Command();
program
    .command("generate [template]")
    .description("generate a testcase")
    .action(generateTestCase);
program
    .option("-n, --num [num]", "number of testcases")
    .option("-e, --extension [extension]", "file extension")
    .option("-s, --source [source]", "template source");
program.parse(process.argv);
function generateTestCase(template) {
    return __awaiter(this, void 0, void 0, function () {
        var options, extension, testcase, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = program.opts();
                    extension = "in";
                    if (options.extension)
                        extension = options.extension;
                    if (!(!template && options.source)) return [3, 2];
                    return [4, fs_1.default.readFileSync(options.source, "utf8")];
                case 1:
                    template = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!template) return [3, 10];
                    if (!options.num) return [3, 7];
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= options.num)) return [3, 6];
                    testcase = core_1.Generator.generate(template);
                    return [4, core_1.Exportor.writeFile(i + "." + extension, testcase)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    testcase = core_1.Generator.generate(template);
                    return [4, core_1.Exportor.writeFile("testcase." + extension, testcase)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    console.log("Generate Testcase Success!");
                    return [3, 11];
                case 10:
                    console.log("Cannot generate testcase (Template is not exist)");
                    _a.label = 11;
                case 11: return [2];
            }
        });
    });
}
