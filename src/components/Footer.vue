<template>
  <footer class="footer">
    <!-- © {{ new Date().getFullYear() }} Bisyaroh · Media Pembelajaran Islam -->
    © {{ new Date().getFullYear() }} Bisyaroh · {{ appTitle }}
  </footer>
</template>

<script setup>
defineProps({
  appTitle: String,
});
</script>

<style scoped>
.footer {
  background: var(--navy);
  color: var(--gold-soft);
  text-align: center;
  padding: 16px;
  margin-top: 60px;
}
</style>
