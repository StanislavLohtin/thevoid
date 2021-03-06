export class FetchUtil {
  static async fetch(url, options): Promise<any> {
    return new Promise(async (res, rej) => {
      try {
        console.log("fetch inside:", url, options);
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log("ERROR :", response);
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
  }
}
