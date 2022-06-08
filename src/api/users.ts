import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { User } from "./types/user";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type QueryUserParams = {
  p?: string;
};

export type QueryUserOptions = {
  params?: QueryUserParams;
  headers?: Record<string, any>;
};

export namespace users {
  export const get = async (id: string, queryOptions?: QueryUserOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/users/${id}`, {
        params: queryOptions?.params,
        headers: queryOptions?.headers,
      });

      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const find = async (queryOptions?: QueryUserOptions) => {
    try {
      const { data } = await axios.get(`${base_url}/users`, {
        params: queryOptions?.params,
        headers: queryOptions?.headers,
      });

      return data as User[];
    } catch (error) {
      throw new ApiError(error);
    }
  };
}
