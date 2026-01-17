<template>
  <PublicLayout>
    <!-- HERO -->
    <section class="about-hero" v-if="about">
      <h1>{{ about.title }}</h1>
      <p class="subtitle">Profil dan tujuan Bisyaroh</p>
    </section>

    <!-- CONTENT -->
    <section class="about-content" v-if="about">
      <article class="content-html" v-html="parsedContent" />
    </section>
  </PublicLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../services/api";
import PublicLayout from "../layouts/PublicLayout.vue";

/* STATE UTAMA */
const about = ref(null);

/* Decode HTML entity */
const decodeHtml = (html) => {
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
};

/* HTML siap render */
const parsedContent = computed(() => {
  if (!about.value?.content) return "";

  try {
    const raw = JSON.parse(about.value.content).html;
    return decodeHtml(raw);
  } catch (e) {
    console.error("Gagal parse konten About:", e);
    return "";
  }
});

/* FETCH DATA */
const fetchAbout = async () => {
  try {
    const res = await api.get("/fe/about");

    about.value =
      res.data?.data?.find(
        (item) => item.menu_frontend === "about" && item.publish === 1,
      ) || null;
  } catch (err) {
    console.error("Gagal memuat Tentang Kami:", err);
  }
};

onMounted(fetchAbout);
</script>
