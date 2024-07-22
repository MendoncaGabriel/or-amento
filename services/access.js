require('dotenv').config()

 class Auth {
  #user; #pass; 
  constructor({user, pass}){
    this.uri = "https://novaluz.varejofacil.com/api/auth";
    this.#user = user;
    this.#pass = pass;
  }

  async getToken(){
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "username": this.#user,
          "password": this.#pass
        })
      });
  
      const result = await response.json();
      return result.accessToken;
    } catch (error) {
      console.error('Erro ao pegar token de acesso!:', error);
    }
  }
}

exports.access = new Auth({
  user: process.env.USER_VAREJO,  
  pass: process.env.PASS_VAREJO   
});
