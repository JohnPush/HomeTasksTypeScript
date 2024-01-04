class API {
  static async getProduct(id: number): Promise<any> {
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }
}

class APIProxy {
  static async getProduct(id: number): Promise<any> {
    try {
      if (id < 10) {
        return await API.getProduct(id);
      } else {
        throw new Error("Product ID is greater than or equal to 10");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      throw error;
    }
  }
}

(async () => {
  try {
    const productId = 1;
    const response = await APIProxy.getProduct(productId);
    console.log(response);
  } catch (error) {}
})();
