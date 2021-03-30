import { createWebHistory, createRouter } from "vue-router";
//import HelloWorld from "../components/HelloWorld.vue";
import Logon from "../components/Logon.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import NewIncident from "../components/NewIncident.vue";

const routes = [
  {
    path: "/",
    name: "Logon",
    component: Logon,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/newincident",
    name: "NewIncident",
    component: NewIncident,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;