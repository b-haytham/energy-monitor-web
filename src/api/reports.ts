import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { Report } from "./types/reports";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type QueryReportParams = {
  headers?: Record<string, any>
};

export namespace reports {
  export const find = async (params?: QueryReportParams) => {
    try {
      const { data } = await axios.get(`${base_url}/reports`, {
        headers: params?.headers,
      });

      return data as Report[]; 
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
