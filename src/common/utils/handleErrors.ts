import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { errorToast } from "./errorToast";

type TMDBError = {
  status_message?: string;
  status_code?: number;
};

const isTMDBError = (
  data: unknown,
): data is TMDBError => {
  return (
    typeof data === "object" &&
    data !== null &&
    "status_message" in data
  );
};

export const handleErrors = (
  error: FetchBaseQueryError,
) => {
  switch (error.status) {
    case "FETCH_ERROR":
      errorToast(
        "Ошибка сети. Проверьте подключение к интернету.",
      );
      break;

    case "PARSING_ERROR":
      errorToast(
        "Ошибка обработки ответа сервера.",
      );
      break;

    case "TIMEOUT_ERROR":
      errorToast(
        "Сервер не отвечает. Попробуйте ещё раз.",
      );
      break;

    case "CUSTOM_ERROR":
      errorToast(error.error);
      break;

    case 401:
      if (
        isTMDBError(error.data) &&
        error.data.status_message
      ) {
        errorToast(error.data.status_message);
      } else {
        errorToast(
          "Ошибка авторизации. Проверьте AUTH_TOKEN.",
        );
      }
      break;

    case 404:
      if (
        isTMDBError(error.data) &&
        error.data.status_message
      ) {
        errorToast(error.data.status_message);
      } else {
        errorToast(
          "Фильм или ресурс не найден.",
        );
      }
      break;

    default:
      if (
        typeof error.status === "number" &&
        error.status >= 500 &&
        error.status < 600
      ) {
        errorToast(
          "Ошибка сервера. Попробуйте позже.",
          error,
        );
      } else {
        errorToast(
          "Произошла ошибка. Попробуйте ещё раз.",
        );
      }
  }
};