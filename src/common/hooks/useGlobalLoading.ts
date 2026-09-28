import { useSelector } from "react-redux";

import type { RootState } from "@/app/model/store";

const excludedEndpoints: string[] = [];

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.tmdbApi.queries);

    return queries.some((query) => {
      if (query?.status !== "pending") {
        return false;
      }

      if (excludedEndpoints.includes(query.endpointName)) {
        return false;
      }

      return true;
    });
  });
};