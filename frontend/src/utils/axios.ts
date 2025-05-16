import axios from "axios";
import { env } from "@/config/env";

const { apiURl } = env;
export const api = axios.create({ baseURL: apiURl });
