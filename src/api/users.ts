import axios from "./axios";
import { ApiError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { User } from "./types/user";
import { RegisterRequest } from "./auth";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type QueryUserParams = {
  p?: string;
};

export type QueryUserOptions = {
  params?: QueryUserParams;
  headers?: Record<string, any>;
};

export type UpdateUserDto = RegisterRequest;

export type UpdateUserInfoDto = Pick<UpdateUserDto, 'last_name' | 'first_name'>
  
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

  export const remove = async (id: string) => {
    try {
      const { data } = await axios.delete(`${base_url}/users/${id}`);

      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const updateInfo = async (id: string, updateUserInfoDto: UpdateUserInfoDto) => {
    try {
      const { data } = await axios.patch(`${base_url}/users/${id}/info`, updateUserInfoDto);

      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const update= async (id: string, updateUserDto: UpdateUserDto) => {
    try {
      const { data } = await axios.put(`${base_url}/users/${id}`, updateUserDto);

      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };
}
