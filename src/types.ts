/* ---------- Enums ---------- */
export enum SagaStatus {
  INITIATED = "initiated",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  COMPENSATED = "compensated"
}

export enum SagaStepStatus {
  PENDING = "pending",
  EXECUTING = "executing",
  COMPLETED = "completed",
  FAILED = "failed",
  COMPENSATING = "compensating",
  COMPENSATED = "compensated"
}

/* ---------- Metadata ---------- */
export interface SagaMetadata {
  sagaId: string;
  status: SagaStatus;
  createdAt: string;   // ISO‑8601
  updatedAt: string;
  lastError?: string;
}

export interface SagaStepMetadata {
  stepId: string;
  status: SagaStepStatus;
  attempts: number;
  lastError?: string;
  startedAt?: string;
  finishedAt?: string;
}

/* ---------- Action & Step ---------- */
export type Protocol = "HTTP" | "GRPC" | "KAFKA" | "SQS" | "GRAPHQL";

export interface SagaAction {
  type: Protocol;
  target: string;
  config?: Record<string, unknown>;
}

export interface SagaStepDefinition {
  step_name: string;
  action: SagaAction;
  compensation?: SagaAction;
  payload?: unknown;
  retryPolicy?: { maxAttempts?: number; backoff?: number };
}

/* ---------- Root Definition ---------- */
export interface SagaOptions {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
  [key: string]: unknown;
}

export interface SagaDefinition {
  name: string;
  version: string;
  steps: SagaStepDefinition[];
  metadata?: Partial<SagaMetadata>;
  options?: SagaOptions;
}
