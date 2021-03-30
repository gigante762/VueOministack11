<template>
  <div class="new-incident-container">
    <div class="content">
      <section>
        <img src="../assets/logo.svg" alt="Be The Hero" />

        <h1>Cadastrar novo caso</h1>
        <p>
          Descreva o textp detalhadamente para encontrar um herói para resolver
          isso.
        </p>

        <router-link class="button" to="/profile">Voltar para home</router-link>
      </section>
      <form @submit.prevent="handleNewIncident">
        <input placeholder="Titulo do caso" v-model="title" />
        <textarea placeholder="Descrição" v-model="description" />

        <input placeholder="Valor em reais" v-model="value" />

        <button class="button">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      value: "",
      ongId: "",
    };
  },
  created() {
    this.ongId = localStorage.getItem("ongId");
  },

  methods: {
    async handleNewIncident() {
        const data = {
            title: this.title,
            description: this.description,
            value: this.value,
            ong_id: this.ongId
        };

        try{
            await fetch('http://localhost:3000/incidents', {
                headers:{
                Authorization: this.ongId,
                'Content-Type': 'application/json'
            },
            method:'post',
            body: JSON.stringify(data)
            });

            this.$router.push('/profile');
        }catch(err){
            alert("Erro ao cadastrar caso, tente novamente.");
        }

    },
  },
};
</script>

<style>
.new-incident-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.new-incident-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-incident-container .content section {
  width: 100%;
  max-width: 380px;
}

.new-incident-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.new-incident-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.new-incident-container .content form {
  width: 100%;
  max-width: 450px;
}

.new-incident-container .content form input,
.new-incident-container .content form textarea {
  margin-top: 8px;
}
</style>