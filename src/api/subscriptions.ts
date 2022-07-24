import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { Subscription } from "./types/subscription";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export interface CreateRequest {
  admin: string;
  company_info: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      ciy: string;
      state: string;
      country: string;
      zip: number;
    };
    file?: any;
    energie_cost?: number;
    currency?: number
  };
}

export type UpdateRequest = Partial<CreateRequest>;
export type UpdateCompanyInfoRequest = Partial<CreateRequest["company_info"]>;

export type QuerySubscriptionParams = {
  p?: string;
};

export type QuerySubscriptionOptions = {
  params?: QuerySubscriptionParams;
  headers?: Record<string, any>;
};

export namespace subscriptions {
  export const create = async (params: CreateRequest) => {
    try {
      const { data } = await axios.post(`${base_url}/subscriptions`, params, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const update = async (id: string, params: UpdateRequest) => {
    try {
      const { data } = await axios.put(
        `${base_url}/subscriptions/${id}`,
        params
      );

      return data as Subscription;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const updateInfo = async (id: string, params: UpdateCompanyInfoRequest) => {
    try {
      const { data } = await axios.patch(
        `${base_url}/subscriptions/${id}/info`,
        params
      );

      return data as Subscription;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const get = async (id: string, query?: QuerySubscriptionOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/subscriptions/${id}`, {
        params: query?.params,
        headers: query?.headers,
      });

      return data as Subscription;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const find = async (query?: QuerySubscriptionOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/subscriptions`, {
        withCredentials: true,
        params: query?.params,
        headers: query?.headers,
      });

      return data as Subscription[];
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const remove = async (id: string) => {
    try {
      const { data } = await axios.delete(`${base_url}/subscriptions/${id}`);

      return data as Subscription;
    } catch (error) {
      throw new ApiError(error);
    }
  };
}
