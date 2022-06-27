import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type QueryEnergieParams = {
  s: string; // subscription id

  d: string; // device id

  t: '1m' | '1d' | '1y' // duration  
}

export type QueryEnergieResult = {
  _id: string;
  max: number;
  prev: number;
  consumed: number;
}

export type QueryPowerParms = Omit<QueryEnergieParams, 't'>

export namespace data {
  export const energie = async (params: QueryEnergieParams) => {
    try {
      const { data } = await axios.get(`${base_url}/data/energy`, {
        params
      });

      return data as QueryEnergieResult[];
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const power = async (params: QueryPowerParms) => {
    try {
      const { data } = await axios.get(`${base_url}/data/power`, {
        params
      });

      return data
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const overview = async (params: QueryEnergieParams) => {
    try {
      const { data } = await axios.get(`${base_url}/data/overview`, {
        params
      });

      return data as QueryEnergieResult[]
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
