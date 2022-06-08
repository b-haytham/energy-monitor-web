import axios from "axios";
import { Redirect } from 'next'

export class ApiError extends Error {
  messages: string[];
  status: number;
  errors: { errors: string[]; status: number };
  constructor(error: any) {
    super();
    this.errors = getError(error);
    this.messages = this.errors.errors;
    this.status = this.errors.status;
    this.message = this.messages[0];
    this.name = "Api Error";
  }
}

export const getError = (error: any): { errors: string[]; status: number } => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    const message = data.message as string | string[];
    return {
      errors: typeof message == "string" ? [message] : message,
      status: error.response?.status as number,
    };
  }
  return { errors: [error.message as string], status: 500 };
};


export const handleServerSidePropsRejection = (err: any, destination?: string): { redirect: Redirect } | { notFound: true } => {
  if ((err.status == 403 || err.status == 401) && destination) {
    return {
      redirect: {
        destination,
        permanent: false
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}
