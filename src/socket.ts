import { NextConfig } from "next";
import getConfig from "next/config";
import { io } from "socket.io-client";

const { publicRuntimeConfig }: NextConfig = getConfig();

console.log(`WS_URL >>> ${publicRuntimeConfig?.WS_URL}`);
console.log(`WS_PATH >>> ${publicRuntimeConfig?.WS_PATH}`);

const url = publicRuntimeConfig?.WS_URL;
const options = { path: publicRuntimeConfig?.WS_PATH };

const socket = io(url, options);

export default socket;
