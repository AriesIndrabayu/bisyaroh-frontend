<template>
  <div v-if="show" class="overlay">
    <div class="modal">
      <button class="close" @click="$emit('close')">✕</button>

      <div v-if="kelas">
        <img :src="getImage(kelas.flyer)" class="flyer" />

        <h2>{{ kelas.tutor.name }}</h2>

        <div class="content" v-html="parseContent(kelas.content)"></div>
      </div>

      <p v-else>Memuat...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../services/api";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  kelasId: {
    type: Number,
    required: true,
  },
  BASE_URL: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);

const kelas = ref(null);

watch(
  () => props.kelasId,
  async (id) => {
    if (!id) return;

    try {
      const res = await api.get(`/fe/kelas/${id}`);
      kelas.value = res.data.data;
    } catch (e) {
      console.error("Gagal load detail kelas", e);
    }
  },
  { immediate: true },
);

const getImage = (path) => `${props.BASE_URL}/storage/${path}`;

const parseContent = (content) => {
  try {
    return JSON.parse(content).html;
  } catch {
    return "";
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  max-width: 720px;
  width: 90%;
  padding: 32px;
  border-radius: 18px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

.flyer {
  padding-top: 20px;
  width: 100%;
  border-radius: 14px;
  margin-bottom: 24px;
}
</style>
