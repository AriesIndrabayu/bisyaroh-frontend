<template>
  <div class="layout">
    <Navbar />
    <main class="content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
.content {
  max-width: 1100px;
  margin: auto;
  padding: 40px 16px;
}
</style>
