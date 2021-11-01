import { FetchUtil } from "../utils/FetchUtil";

class _MindbodyService {
  private BASE_URL = "https://api.mindbodyonline.com/public/v6";
  private token: string;
  private options: RequestInit;

  constructor() {
    this.getToken();
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
        console.warn(e);
        rej(e);
      }
    });
  }

  getClientPurchases(): Promise<string> {
    console.log("options: ", this.options);
    return new Promise(async (res, rej) => {
      try {
        const responseBody: { Purchases: [] } = await FetchUtil.fetch(
          `${this.BASE_URL}/client/clientpurchases?ClientId=100000324`,
          this.options
        );
        console.log(responseBody);
        res(responseBody.toString());
      } catch (e) {
        console.warn(e);
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
        "Api-Key": "91504ccb30ab411d95533a3535a18d5b",
        authorization: this.token,
        SiteId: "-99",
      },
    };
  }
}

const MindbodyService = new _MindbodyService();
export default MindbodyService;
