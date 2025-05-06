import Ajv from "ajv";
import fs from "fs";
import path from "path";

const ajv = new Ajv({ strict: false });

function loadSchema(name: string) {
  const json = fs.readFileSync(
    path.join(__dirname, "..", "schema", `${name}.json`),
    "utf8"
  );
  return JSON.parse(json);
}

test("SagaDefinition sample validates against generated schema", () => {
  const schema = loadSchema("SagaDefinition");
  const validate = ajv.compile(schema);

  const sample = {
    name: "purchase",
    version: "v1",
    steps: [],
    metadata: {
      sagaId: "abc",
      status: "initiated",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  expect(validate(sample)).toBe(true);
});
