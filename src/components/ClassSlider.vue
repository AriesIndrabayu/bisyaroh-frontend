<template>
  <section v-if="kelasList.length" class="slider">
    <div class="slides">
      <div v-for="kelas in kelasList" :key="kelas.id" class="slide">
        <img :src="getImage(kelas.flyer)" class="flyer" alt="Flyer kelas" />

        <button class="btn-detail" @click="$emit('show-detail', kelas.id)">
          Lihat Detail Kelas →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  kelasList: {
    type: Array,
    required: true,
  },
  BASE_URL: {
    type: String,
    required: true,
  },
});

defineEmits(["show-detail"]);

const getImage = (path) => {
  return `${props.BASE_URL}/storage/${path}`;
};
</script>

<style scoped>
.slider {
  margin-bottom: 80px;
}

.slides {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.slide {
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.flyer {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 16px;
}

.btn-detail {
  padding: 12px 22px;
  background: var(--gold);
  color: var(--navy);
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
</style>
