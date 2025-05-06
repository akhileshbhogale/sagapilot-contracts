// Does the package compile when imported in TS?
import {
	SagaDefinition,
	SagaAction,
	SagaStatus
  } from "../src/types";
  
  test("basic type assignability", () => {
	const def: SagaDefinition = {
	  name: "demo",
	  version: "v1",
	  steps: [],
	  metadata: {
		sagaId: "id",
		status: SagaStatus.INITIATED,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	  }
	};
	expect(def.name).toBe("demo");
  });
  