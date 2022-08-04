import axios from "./axios";
import { ApiError, getError } from "@utils/errors";

import { NextConfig } from "next";
import getConfig from "next/config";
import { User } from "./types/user";

const { publicRuntimeConfig }: NextConfig = getConfig();

const base_url = publicRuntimeConfig!.BASE_URL + '/api';

export type LoginRequest = Pick<User, "email"> & { password: string };

export type RegisterRequest = Pick<
  User,
  "first_name" | "last_name" | "email" | "phone" | "role"
> & { password: string };

export type CreateDeviceToken = {
  device: string
}

export type ChangePasswordDto = {
  current: string;
  new: string;
}

export namespace auth {
  export const login = async (params: LoginRequest) => {
    try {
      const { data } = await axios.post(`${base_url}/auth/login`, params);
      return data as { access_token: string; user: User };
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const register = async (params: RegisterRequest) => {
    try {
      const { data } = await axios.post(`${base_url}/auth/register`, params);
      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const me = async (params?: { headers?: Record<string, any> }) => {
    try {
      const { data } = await axios.get(`${base_url}/auth/me`, {
        headers: params?.headers
      });
      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const logout = async () => {
    try {
      const { data } = await axios.post(`${base_url}/auth/logout`);
      return data;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  export const createDeviceToken = async (device: string) => {
    try {
      const { data } = await axios.post(`${base_url}/auth/devices/token-create`, { device });
      return data as { access_token: string };
    } catch (error) {
      throw new ApiError(error);
    }
  }
  

  export const changePassword = async (changePasswordDto: ChangePasswordDto) => {
    try {
      const { data } = await axios.post(`${base_url}/auth/change-password`, changePasswordDto);
      return data as User;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
