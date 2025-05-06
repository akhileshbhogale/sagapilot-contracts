import * as TJS from "typescript-json-schema";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const settings: TJS.PartialArgs = { required: true, titles: true };
const compilerOptions = { strictNullChecks: true };
const program = TJS.getProgramFromFiles(
  [resolve("src/types.ts")],
  compilerOptions
);

const generator = TJS.buildGenerator(program, settings)!;

["SagaDefinition", "SagaOptions", "SagaAction"].forEach((sym) => {
  const schema = generator.getSchemaForSymbol(sym);
  mkdirSync("schema", { recursive: true });
  writeFileSync(`schema/${sym}.json`, JSON.stringify(schema, null, 2));
});
