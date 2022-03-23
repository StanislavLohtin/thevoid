import {RequestInfo, RequestInit} from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({default: fetch}) => fetch(url, init));

export const fetchFn = (
  url: RequestInfo,
  options: RequestInit | undefined
): Promise<never> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log("ERROR! :", response);
        rej(response.status);
        return;
      }
      const bodyObj = await response.json();
      console.log("response body:", bodyObj);
      res(bodyObj);
    } catch (e) {
      console.warn("catching!");
      console.warn(e);
      rej(e);
    }
  });
};
