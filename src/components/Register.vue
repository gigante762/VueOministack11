<template>
  <div class="register-container">
    <div class="content">
      <section>
        <img src="../assets/logo.svg" alt="Be The Hero" />

        <h1>Cadastro</h1>
        <p>
          Faça seu cadastro, entra na plataforma e ajude pessoas a encontrar os
          casos da sua ong.
        </p>

        <router-link class="back-link" to="/"> Já tenho cadastro</router-link>
      </section>

      <form @submit.prevent="handleRegister">
        <input placeholder="Nome da ONG" v-model="name" />
        <input type="email" placeholder="E-mail" v-model="email" />
        <input placeholder="Whatsapp" v-model="whatsapp" />

        <div class="input-group">
          <input placeholder="Cidade" v-model="city" />
          <input placeholder="UF" style="width: 80px" v-model="uf" />
        </div>
        <button class="button">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      whatsapp: "",
      city: "",
      uf: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const dataPost = {
          name: this.name,
          email: this.email,
          whatsapp: this.whatsapp,
          city: this.city,
          uf: this.uf,
        };
        const response = await fetch("http://localhost:3000/ongs", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(dataPost),
        });

        let data = await response.json();

        alert(`Seu ID de acesso: ${data.id}`);
        this.$router.push("/");
      } catch (err) {
        alert("Erro no cadastro, tente novamente.");
      }
    },
  },
};
</script>

<style>
.register-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-container .content section {
  width: 100%;
  max-width: 380px;
}

.register-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.register-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.register-container .content form {
  width: 100%;
  max-width: 450px;
}

.register-container .content form input {
  margin-top: 8px;
}

.register-container .content form .input-group {
  display: flex;
}

.register-container .content form .input-group input + input {
  margin-left: 8px;
}
</style>