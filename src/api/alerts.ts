import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { Alert } from "./types/alert";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type CreateAlertDto = Omit<Alert, 'user'>

export type UpdateAlertDto = Partial<CreateAlertDto>

export type QueryAlertOptions = {
  headers?: Record<string, any>
};

export namespace alerts {
  export const create = async (createAlertDto: CreateAlertDto) => {
    try {
      const { data } = await axios.post(`${base_url}/alerts`, createAlertDto);

      return data as Alert; 
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const find = async (queryOptions?: QueryAlertOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/alerts`, {
        headers: queryOptions?.headers,
      });

      return data as Alert[]; 
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const get = async (id: string, queryOptions?: QueryAlertOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/alerts/${id}`, {
        headers: queryOptions?.headers,
      });

      return data as Alert; 
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const update = async (id: string, updateAlertDto: UpdateAlertDto) => {
    try {
      const { data } = await axios.put(`${base_url}/alerts/${id}`, updateAlertDto);

      return data as Alert; 
    } catch (error) {
      throw new ApiError(error);
    }
  }

  export const remove = async (id: string) => {
    try {
      const { data } = await axios.delete(`${base_url}/alerts/${id}`);

      return data as Alert; 
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
