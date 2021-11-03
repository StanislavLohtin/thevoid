import { FetchUtil } from "../utils/FetchUtil";
import { FormulaNotesDTO } from "../classes/mindbody/FormulaNotesDTO";
import { ContractDTO } from "../classes/mindbody/ContractDTO";
import { PurchaseDTO } from "../classes/mindbody/PurchaseDTO";
import {VisitDTO} from "../classes/mindbody/VisitDTO";

class _MindbodyService {
  private BASE_URL =
    // @ts-ignore
    (window.chrome ? "https://cors-anywhere.herokuapp.com/" : "") +
    "https://api.mindbodyonline.com/public/v6";
  private API_KEY = "91504ccb30ab411d95533a3535a18d5b";
  private SITE_ID = "-99";
  private userId = "100015644";
  private token: string;
  private options: RequestInit;

  constructor() {
    this.getToken();
  }

  getClients(): Promise<object> {
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Clients: [] } = await FetchUtil.fetch(
          `${this.BASE_URL}/client/clients?limit=200&searchText=Vishnevy`,
          this.options
        );
        res(responseBody);
      } catch (e) {
        rej(e);
      }
    });
  }

  getClientInfo(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Classes: [] } = await FetchUtil.fetch(
          `${this.BASE_URL}/client/clientcompleteinfo?ClientId=${this.userId}`,
          this.options
        );
        res(responseBody.toString());
      } catch (e) {
        rej(e);
      }
    });
  }

  getCourses(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Classes: [] } = await FetchUtil.fetch(
          `${this.BASE_URL}/class/classes`,
          this.options
        );
        res(responseBody.toString());
      } catch (e) {
        rej(e);
      }
    });
  }

  getClientFormulaNotes(): Promise<FormulaNotesDTO[]> {
    console.log("options: ", this.options);
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { FormulaNotes: FormulaNotesDTO[] } =
          await FetchUtil.fetch(
            `${this.BASE_URL}/client/clientformulanotes?ClientId=${this.userId}`,
            this.options
          );
        res(responseBody.FormulaNotes);
      } catch (e) {
        rej(e);
      }
    });
  }

  getClientContracts(): Promise<ContractDTO[]> {
    console.log("options: ", this.options);
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Contracts: ContractDTO[] } =
          await FetchUtil.fetch(
            `${this.BASE_URL}/client/clientcontracts?ClientId=${this.userId}`,
            this.options
          );
        res(responseBody.Contracts);
      } catch (e) {
        rej(e);
      }
    });
  }

  getClientPurchases(): Promise<PurchaseDTO[]> {
    console.log("options: ", this.options);
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Purchases: PurchaseDTO[] } =
          await FetchUtil.fetch(
            `${this.BASE_URL}/client/clientpurchases?ClientId=${this.userId}`,
            this.options
          );
        res(responseBody.Purchases);
      } catch (e) {
        rej(e);
      }
    });
  }

  getClientVisits(): Promise<VisitDTO[]> {
    console.log("options: ", this.options);
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Visits: VisitDTO[] } = await FetchUtil.fetch(
          `${this.BASE_URL}/client/clientvisits?ClientId=${this.userId}`,
          this.options
        );
        res(responseBody.Visits);
      } catch (e) {
        rej(e);
      }
    });
  }

  private async getToken(): Promise<void> {
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
    const responseBody: { AccessToken: string } = await FetchUtil.fetch(
      `${this.BASE_URL}/usertoken/issue`,
      options
    );
    this.token = responseBody.AccessToken;
    console.log("token:", this.token);
    this.options = {
      method: "GET",
      headers: {
        "Api-Key": this.API_KEY,
        authorization: this.token,
        SiteId: this.SITE_ID,
      },
    };
  }
}

const MindbodyService = new _MindbodyService();
export default MindbodyService;
