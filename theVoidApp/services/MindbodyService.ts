class _MindbodyService {
  private BASE_URL = "https://api.mindbodyonline.com/public/v6";

  getCourses(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const token = await this.getToken();
        const options: RequestInit = {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Api-Key": "91504ccb30ab411d95533a3535a18d5b",
            authorization: token,
            SiteId: "-99",
          },
          // "user-agent": "FloatCulture-voidTest1",
        };
        const response = await fetch(`${this.BASE_URL}/class/classes`, options);
        if (!response.ok) {
          console.warn(response);
          rej(response.status);
          return;
        }
        const responseBody: { AccessToken: string } = await response.json();
        console.log(responseBody);
        res(responseBody.toString());
      } catch (e) {
        console.warn(e);
        rej(e);
      }
    });
  }

  private getToken(): Promise<string> {
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

    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(
          `${this.BASE_URL}/usertoken/issue`,
          options
        );
        if (!response.ok) {
          console.warn(response);
          rej(response.status);
          return;
        }
        const responseBody: { AccessToken: string } = await response.json();
        console.log(responseBody);
        res(responseBody.AccessToken);
      } catch (e) {
        console.warn(e);
      }
    });
  }
}

const MindbodyService = new _MindbodyService();
export default MindbodyService;
