/*
написать класс генератора запросы, который будет использовать паттерн builder с функциями добалвения:
- тип запроса: GET, POST...
- Body
- Заголовки
- Url
И финальной функцией exec, который делает fetch запрос
*/

class RequestBuilder {
  private request: {
    method: string;
    headers: Record<string, string>;
    body: any;
    url: string;
  };

  constructor() {
    this.request = {
      method: "GET",
      headers: {},
      body: null,
      url: "",
    };
  }

  setMethod(method: string): this {
    this.request.method = method;
    return this;
  }

  setBody<T>(body: T): this {
    this.request.body = body;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.request.headers = headers;
    return this;
  }

  setUrl(url: string): this {
    this.request.url = url;
    return this;
  }

  async exec(): Promise<Response> {
    try {
      const response = await fetch(this.request.url, {
        method: this.request.method,
        headers: this.request.headers,
        body: JSON.stringify(this.request.body),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response;
    } catch (error) {
      throw new Error(`Request failed with error: ${error}`);
    }
  }
}

(async () => {
  try {
    const response = await new RequestBuilder()
      .setMethod("POST")
      .setBody({ key: "value" })
      .setHeaders({ "Content-Type": "application/json" })
      .setUrl("https://purpleschool.ru/")
      .exec();

    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
