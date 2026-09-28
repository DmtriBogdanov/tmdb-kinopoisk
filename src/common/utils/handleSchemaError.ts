
import { errorToast } from "./errorToast";

type SchemaError = {
  issues: unknown;
};

export const handleSchemaError = (
  error: SchemaError,
) => {
  console.error(
    "Zod validation error:",
    error.issues,
  );

  errorToast(
    "Ошибка проверки данных. Подробности в консоли.",
    error.issues,
  );
};

