<template>
  <div class="layout">
    <Navbar :logo="logo" :appTitle="appTitle" />
    <main class="content">
      <slot />
    </main>
    <Footer :appTitle="appTitle" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api, { baseURL } from "../services/api";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const logo = ref(null);
const appTitle = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/fe/header");

    const data = res.data.data;

    const logoData = data.find((item) => item.menu_frontend === "logo");
    const headerData = data.find((item) => item.menu_frontend === "header");

    if (logoData) {
      logo.value = `${baseURL}/storage/${logoData.content}`;
    }

    if (headerData) {
      appTitle.value = headerData.content;
    }
  } catch (error) {
    console.error("Gagal mengambil header:", error);
  }
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  max-width: 1100px;
  margin: auto;
  padding: 48px 20px;
}
</style>
