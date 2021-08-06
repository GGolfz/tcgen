import {
  Input,
  StringInput,
  FloatInput,
  IntegerInput,
  RegexInput,
} from "../@types/Input";
import { Extractor } from "./Extractor";
const RandExp = require("randexp");

export class Generator {
  static generate(template: string) {
    const inputsList: Array<Array<Input>> = Extractor.extract(template);
    let result: string = "";
    let resultArray:Array<string> = [];
    for (let i = 0; i < inputsList.length; i++) {
      let line = inputsList[i] ?? [];
      let lineResult: Array<string> = [];
      for (let j = 0; j < line.length; j++) {
        let val = line[j];
        if (val) {
          switch (val.type) {
            case "string":
              let stringInput: StringInput = val as StringInput;
              lineResult.push(this.generateFromString(stringInput));
              break;
            case "float":
              let floatInput: FloatInput = val as FloatInput;
              lineResult.push(this.generateFromFloating(floatInput));
              break;
            case "integer":
              let integerInput: IntegerInput = val as IntegerInput;
              lineResult.push(this.generateFromInteger(integerInput));
              break;
            case "regex":
              let regexInput: RegexInput = val as RegexInput;
              lineResult.push(this.generateFromRegex(regexInput.regex));
              break;
          }
        }
      }
      resultArray.push(lineResult.join(" "));
    }
    result = resultArray.join("\n");
    return result;
  }

  static generateFromString(input: StringInput): string {
    let result: string = "";
    result = this.generateFromRegex(
      `[a-zA-Z]{${input.minLength},${input.maxLength}}`
    );
    return result;
  }
  static generateFromInteger(input: IntegerInput): string {
    let result: string = "";
    let min: number = input.minValue;
    let max: number = input.maxValue;
    let random: number = Math.random() * (max - min) + min;
    result = Math.round(random).toString();
    return result;
  }
  static generateFromFloating(input: FloatInput): string {
    let result: string = "";
    let min: number = input.minValue;
    let max: number = input.maxValue;
    let digits: number = input.digits;
    let random: number = Math.random() * (max - min) + min;
    let str: string = random.toFixed(digits);
    result = str;
    return result;
  }
  static generateFromRegex(regex: string): string {
    let result: string = "";
    try {
      result = new RandExp(regex).gen();
    } catch (err) {}
    return result;
  }
}
