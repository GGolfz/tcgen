import {
  Input,
  StringInput,
  FloatInput,
  IntegerInput,
  RegexInput,
} from "../@types/Input";
export class Extractor {
  static extract(input: string) {
    let lines = input.split("\n");
    let inputsList: Array<Array<Input>> = [];
    lines.forEach((line) => {
      let arr: Array<Input> = [];
      let inputs = line.split(" ");
      inputs.forEach((token) => {
        let extractValue = token.replace(/[\<\>]/g, "").split(";");
        let type = extractValue[0];
        switch (type) {
          case "string":
            arr.push(this.extractString(extractValue));
            break;
          case "float":
            arr.push(this.extractFloat(extractValue));
            break;
          case "integer":
            arr.push(this.extractInteger(extractValue));
            break;
          case "regex":
            arr.push(this.extractRegex(token));
            break;
        }
      });
      inputsList.push(arr);
    });
    return inputsList;
  }
  static extractRegex(value: string): Input {
    let regex = value.split("<regex;")[1] ?? "";
    regex = regex.substring(0, regex.length - 1);
    return new RegexInput("regex", regex);
  }
  static extractString(value: Array<string>): Input {
    let maxLength: number = 100;
    let minLength: number = 1;
    if (value.length == 3 && typeof value[2] == "string") {
      maxLength = parseInt(value[2]);
    }
    if (value.length >= 2 && typeof value[1] == "string") {
      minLength = parseInt(value[1]);
    }
    return new StringInput(value[0] ?? "", minLength, maxLength);
  }
  static extractFloat(value: Array<string>): Input {
    let maxValue: number = 100000;
    let minValue: number = 0;
    let digits: number = 2;
    if (value.length == 4 && typeof value[3] == "string") {
      digits = parseInt(value[3]);
    }
    if (value.length >= 3 && typeof value[2] == "string") {
      maxValue = parseInt(value[2]);
    }
    if (value.length >= 2 && typeof value[1] == "string") {
      minValue = parseInt(value[1]);
    }
    return new FloatInput(value[0] ?? "", maxValue, minValue, digits);
  }

  static extractInteger(value: Array<string>): Input {
    let maxValue: number = 100000;
    let minValue: number = 0;
    if (value.length == 3 && typeof value[2] == "string") {
      maxValue = parseInt(value[2]);
    }
    if (value.length >= 2 && typeof value[1] == "string") {
      minValue = parseInt(value[1]);
    }
    return new IntegerInput(value[0] ?? "", maxValue, minValue);
  }
}
