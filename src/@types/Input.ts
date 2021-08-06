export abstract class Input {
  abstract type: string;
}
export class RegexInput implements Input {
  type: string;
  regex: string;
  constructor(type: string, regex: string) {
    this.type = type;
    this.regex = regex;
  }
}
export class FloatInput implements Input {
  type: string;
  minValue: number;
  maxValue: number;
  digits: number;
  constructor(
    type: string,
    minValue: number,
    maxValue: number,
    digits: number
  ) {
    this.type = type;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.digits = digits;
  }
}
export class IntegerInput implements Input {
  type: string;
  minValue: number;
  maxValue: number;
  constructor(type: string, minValue: number, maxValue: number) {
    this.type = type;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
}
export class StringInput implements Input {
  type: string;
  minLength: number;
  maxLength: number;
  constructor(type: string, minLength: number, maxLength: number) {
    this.type = type;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}
