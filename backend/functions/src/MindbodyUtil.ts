import {RequestInit} from "node-fetch";
import {fetchFn} from "./Fetch";
import {FormulaNotesDTO} from "./FormulaNotesDTO";

const BASE_URL = "https://api.mindbodyonline.com/public/v6";
const API_KEY = "91504ccb30ab411d95533a3535a18d5b";
const SITE_ID = "-99";
let mindbodyToken: string;
let mindbodyOptions: {
  method: string;
  headers: {"Api-Key": string; authorization: string; SiteId: string};
};

export const getClientFormulaNotes = async (
  mindbodyId: string
): Promise<FormulaNotesDTO[]> => {
  if (!mindbodyToken) {
    await getToken();
  }
  const responseBody: {FormulaNotes: FormulaNotesDTO[]} = await fetchFn(
    `${BASE_URL}/client/clientformulanotes?ClientId=${mindbodyId}`,
    mindbodyOptions
  );
  console.log("getClientFormulaNotes response:", responseBody);
  return responseBody.FormulaNotes;
};

export const getClientDuplicates = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<string> => {
  if (!mindbodyToken) {
    await getToken();
  }
  const responseBody: {ClientDuplicates: [{Id: string}]} = await fetchFn(
    // eslint-disable-next-line max-len
    `${BASE_URL}/client/clientduplicates?FirstName=${firstname}&LastName=${lastname}&Email=${email}&`,
    mindbodyOptions
  );
  if (responseBody.ClientDuplicates.length !== 1) {
    throw new Error(
      "User with this credentials is not registered on the mindbody."
    );
  }
  return responseBody.ClientDuplicates[0].Id;
};

const getToken = (): Promise<unknown> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": "91504ccb30ab411d95533a3535a18d5b",
      SiteId: "-99",
    },
    body: JSON.stringify({
      Username: "Siteowner",
      Password: "apitest1234",
    }),
  };
  return fetchFn(`${BASE_URL}/usertoken/issue`, options).then(
    (responseBody: {AccessToken: string}) => {
      mindbodyToken = responseBody.AccessToken;
      mindbodyOptions = {
        method: "GET",
        headers: {
          "Api-Key": API_KEY,
          authorization: mindbodyToken,
          SiteId: SITE_ID,
        },
      };
    }
  );
};
