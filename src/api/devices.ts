import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { Device } from "./types/device";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type CreateRequest = Pick<
  Device,
  "name" | "description" | "type"
>;

export type UpdateRequest = Partial<Omit<CreateRequest, "network">>;

export type QueryDeviceParams = {
  p?: string;
}

export type QueryDeviceOptions = {
  params?: QueryDeviceParams,
  headers?: Record<string, any>
};

export namespace devices {
  export const create = async (params: CreateRequest) => {
    try {
      const { data } = await axios.post(`${base_url}/devices`, params);

      return data as Device;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const update = async (id: string, params: UpdateRequest) => {
    try {
      const { data } = await axios.post(`${base_url}/devices/${id}`, params);

      return data as Device;
    } catch (error) {
      throw new ApiError(error);
    }
  };
  export const get = async (id: string, queryOptions?: QueryDeviceOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/devices/${id}`, {
        params: queryOptions?.params,
        headers: queryOptions?.headers
      });

      return data as Device;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const find = async (queryOptions?: QueryDeviceOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/devices`, {
        params: queryOptions?.params,
        headers: queryOptions?.headers
      });

      return data as Device[];
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const remove = async (id: string) => {
    try {
      const { data } = await axios.delete(`${base_url}/devices/${id}`);

      return data as Device;
    } catch (error) {
      throw new ApiError(error);
    }
  };
}
