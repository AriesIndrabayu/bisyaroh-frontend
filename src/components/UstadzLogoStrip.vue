<template>
  <section class="ustadz-strip">
    <img
      v-for="u in ustadz"
      :key="u.id"
      :src="img(u.logo)"
      :alt="u.name"
      class="logo"
      @click="$emit('select', u)"
    />
  </section>
</template>

<script setup>
const props = defineProps({
  ustadz: {
    type: Array,
    required: true,
  },
  BASE_URL: {
    type: String,
    required: true,
  },
});

defineEmits(["select"]);

const img = (path) => `${props.BASE_URL}/storage/${path}`;
</script>

<style scoped>
.ustadz-strip {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  overflow-x: auto;
}
.logo {
  height: 64px;
  cursor: pointer;
  transition: transform 0.2s;
}
.logo:hover {
  transform: scale(1.1);
}
</style>
