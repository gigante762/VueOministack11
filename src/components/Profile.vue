<template>
   <div class="profile-container">
            <header>
                <img src="../assets/logo.svg" alt="Be The Hero"/>
                <span>Bem vinda, {{ongName}}</span>
                
                <router-link class="button" to="/newincident">Cadastrar novo caso</router-link>
                <button @click="handleLogout" type='button'>Logout</button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                <li v-for="incident of incidents" :key="incident.id">
                    <strong>CASO: </strong>
                    <p>{{incident.title}}</p>

                    <strong>DESCRIÇÂO:</strong>
                    <p>{{incident.description}}</p>

                     <strong>VALOR:</strong>
                     <p>{{valueCurrency(incident.value)}}</p>
                    <button @click="handleDeleteIncident(incident.id)" type='button'>
                        Deletar
                    </button>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
  data() {
    return {
      incidents: [],
      ongName: "",
      ongId: "",
    };
  },
  created() {
    this.ongId = localStorage.getItem("ongId");
    this.ongName = localStorage.getItem("ongName");

    fetch('http://localhost:3000/incidents?ong_id='+this.ongId)
    .then((res)=>res.json())
    .then((d)=>{this.incidents = d;})

  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    },
    async handleDeleteIncident(id) {
      try {

        /* 
            Simple check that cheks if this incident belong to this ong.
        */
        let res = await fetch(`http://localhost:3000/incidents/${id}`);
        let data = await res.json()

        //The incident isn't your
        if (data.ong_id !== this.ongId)
        {
            alert("Erro ao deletar, caso novamente");
            return;
        }

        res = await fetch(`http://localhost:3000/incidents/${id}`, {
          method:'delete',
        });

        this.incidents = this.incidents.filter(incidents => incidents.id !== id)

      } catch (err) {
        alert("Erro ao deletar, caso novamente");
      }
    },
    valueCurrency(val) {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(val);
    },
  },
};
</script>

<style>
.profile-container {
  width: 100%;
  max-width: 1100px;
  padding: 0 30px;
  margin: 32px auto;
}

.profile-container header {
  display: flex;
  align-items: center;
}
.profile-container header span {
  font-size: 20px;
  margin-left: 24px;
}
.profile-container header img {
  height: 64px;
}
.profile-container header a {
  width: 260px;
  margin-left: auto;
  margin-top: 0;
}
.profile-container header button {
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  background: transparent;
  margin-left: 16px;
}
.profile-container header button:hover {
  border-color: #999;
  transition: border-color 0.2s;
}

.profile-container h1 {
  margin-top: 80px;
  margin-bottom: 24px;
}

.profile-container ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
}

.profile-container ul li {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
}
.profile-container ul li button {
  position: absolute;
  right: 24px;
  top: 24px;
  border: 0;
  background: none;
}

.profile-container ul li button:hover {
  opacity: 0.8;
}

.profile-container ul li strong {
  display: block;
  margin-bottom: 16px;
  color: #41414d;
}

.profile-container ul li p + strong {
  margin-top: 32px;
}

.profile-container ul li p {
  color: #737380;
  line-height: 21px;
  font-size: 16px;
}
</style>