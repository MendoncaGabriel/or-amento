const { access } = require('./access');

class Produto {
  #token = null;

  constructor() {
    this.descricao = null
    this.productId = null
    this.price = {
      varejo: null,
      atacado: null,
      boleto: null
    }
    this.ean = null
  }

  async getInfo() {
    try {
      const responseInfo = await fetch(`https://novaluz.varejofacil.com/api/v1/produto/produtos/${this.productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.#token
        }
      });
      const resInfo = await responseInfo.json();
      this.descricao = resInfo.descricao
    } catch (error) {
      console.error("===> getInfo ===> Erro ao obter informações do produto:", error);
    }
  }

  async getPrice() {
    try {
      const responsePrice = await fetch(`https://novaluz.varejofacil.com/api/v1/produto/produtos/${this.productId}/precos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.#token
        }
      });
      const resPrice = await responsePrice.json();
      console.log(resPrice[0])
      this.price = {
        varejo: resPrice[0].precoVenda1,
        atacado: resPrice[0].precoVenda2,
        boleto: resPrice[0].precoVenda3
      }

    } catch (error) {
      console.error("===> getPrice ===> Erro ao obter preços do produto:", error);
    }
  }

  async getByEan(ean) {
    this.ean = ean;
    if (this.#token == null) this.#token = await access.getToken();

    try {
      const response = await fetch(`https://novaluz.varejofacil.com/api/v1/produto/codigos-auxiliares?q=id==${ean}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.#token
        }
      });
      
      const res = await response.json();
      this.productId = res.items[0].produtoId

      await this.getInfo()
      await this.getPrice()

      return {
        productId: this.productId,
        descricao: this.descricao,
        ean: this.ean,
        price: this.price
      }


    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
}


exports.getProductByEan = async (ean) => {
  const prod = new Produto()
  const produto = await prod.getByEan(ean)
  return produto
};
