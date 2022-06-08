import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type QueryPowerParams = {
  s: string; // subscription id

  dev: string; // device id

  d: '1m' | '1d' | '1y' // duration  
}

export namespace data {
  export const overviewEnergie = async (params: QueryPowerParams) => {
    try {
      const { data } = await axios.get(`${base_url}/data/overview-energie`, {
        params
      });

      return data
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
