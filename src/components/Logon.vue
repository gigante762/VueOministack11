<template>
  <div class="logon-container">
    <section class="form">
      <img src="../assets/logo.svg" alt="Be The Hero" />

      <form @submit.prevent="handleLogin">
        <h1 @click="handleLogin">Faça seu logon</h1>

        <input placeholder="Sua ID" v-model="id" />
        <button class="button">Entrar</button>
        <router-link class="back-link" to="/register"
          >Não tenho cadastro</router-link
        >
      </form>
    </section>
    <img src="../assets/heroes.png" alt="Heroes" />
  </div>
</template>

<script>
export default {
  name: "Logon",
  data() {
    return {
      id: "",
      logoImg:'../assets/logo.svg',
      
    };
  },
  methods: {
    async handleLogin() {
      try {

        if(!this.id)
          return;
       

        let response = await fetch("http://localhost:3000/ongs/"+this.id)
        let data = await response.json()
        /* 
          Check if this id exist;
         */
        if(!data.id)
        {
          alert("Falha no login, id desconhecido.");
          return;
        }

        localStorage.setItem("ongId", this.id);
        localStorage.setItem("ongName", data.name);

        this.$router.push('profile');
        
      } catch (err) {
        alert("Falha no login, tente novamente.");
      }
    },
  },
};
</script>

<style>
.logon-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logon-container section.form {
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
}

.logon-container section.form form {
  margin-top: 100px;
}

.logon-container section.form form h1 {
  font-size: 32px;
  margin-bottom: 32px;
}
</style>