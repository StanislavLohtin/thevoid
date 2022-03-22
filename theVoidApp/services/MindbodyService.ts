import { FetchUtil } from "../utils/FetchUtil";
import { FormulaNotesDTO } from "../classes/mindbody/FormulaNotesDTO";
import { ContractDTO } from "../classes/mindbody/ContractDTO";
import { PurchaseDTO } from "../classes/mindbody/PurchaseDTO";
import { VisitDTO } from "../classes/mindbody/VisitDTO";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";
import FirebaseService from "./FirebaseService";

class _MindbodyService {
  private BASE_URL =
    // @ts-ignore
    (window.chrome ? "https://cors-anywhere.herokuapp.com/" : "") +
    "https://api.mindbodyonline.com/public/v6";
  private userId = "100015644";
  private options: RequestInit;
  private readonly functions;

  constructor() {
    // this.getToken();

    this.functions = getFunctions(FirebaseService.app);
    // connectFunctionsEmulator(this.functions, "localhost", 5001);
  }

  getMindbodyInfo() {
    const addMessage = httpsCallable(this.functions, "getMindbodyInfo");
    addMessage({ text: "sending to server!!" }).then((result: any) => {
      const data = result.data;
      console.log("received from server:", data);
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
}

const MindbodyService = new _MindbodyService();
export default MindbodyService;
