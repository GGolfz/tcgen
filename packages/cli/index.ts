import { Generator, Exportor } from "@tcgen/core";
import { Command } from "commander";
const program = new Command();

program
  .command("generate <template>")
  .description("generate a testcase")
  .action(generateTestCase);
program
  .option("-n, --num [num]", "number of testcases")
  .option("-e, --extension [extension]", "file extension");
program.parse(process.argv);

interface GenerateTestCaseOptions {
  num?: number;
  extension?: string;
}
async function generateTestCase(template: string) {
  const options = program.opts<GenerateTestCaseOptions>();
  let extension = "in";
  if (options.extension) extension = options.extension;
  let testcase;
  if (options.num) {
    for (let i = 1; i <= options.num; i++) {
      testcase = Generator.generate(template);
      await Exportor.writeFile(`${i}.${extension}`, testcase);
    }
  } else {
    testcase = Generator.generate(template);
    await Exportor.writeFile(`testcase.${extension}`, testcase);
  }
  console.log("Generate Testcase Success!");
}
