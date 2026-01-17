<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <!-- Header -->
        <header class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close" @click="$emit('close')">✕</button>
        </header>

        <!-- Body -->
        <div class="modal-body">
          <!-- Flyer -->
          <div v-if="kelas?.flyer" class="flyer-wrapper">
            <img
              :src="`${BASE_URL}/storage/${kelas.flyer}`"
              alt="Flyer Kelas"
            />
          </div>

          <!-- Content -->
          <div
            v-if="kelas?.content"
            class="content"
            v-html="parseHTML(kelas.content)"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch, computed } from "vue";
import { registerModal, unregisterModal } from "../utils/modalStack";

const MODAL_ID = "ClassRegistrationModal";

const props = defineProps({
  show: Boolean,
  kelas: Object,
  BASE_URL: String,
});

const emit = defineEmits(["close"]);

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      registerModal(MODAL_ID, {
        onClose: () => emit("close"),
      });
    } else {
      unregisterModal(MODAL_ID);
    }
  },
);

const title = computed(() => {
  return "Pembukaan Kelas Mengaji Islam";
});

const parseHTML = (json) => {
  try {
    return JSON.parse(json).html;
  } catch {
    return "";
  }
};
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1300;
}

/* Modal */
.modal {
  width: min(900px, 96%);
  max-height: 90vh;
  background: #fff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35);
}

/* Header */
.modal-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
}

.close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Body */
.modal-body {
  padding: 24px;
  overflow-y: auto;
  background: #f9fafb;
}

/* Flyer */
.flyer-wrapper {
  margin-bottom: 24px;
  border-radius: 14px;
  overflow: hidden;
}

.flyer-wrapper img {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  display: block;
}

/* Content */
.content {
  background: white;
  padding: 20px 22px;
  border-radius: 14px;
  line-height: 1.8;
  color: #374151;
}

/* Heading inside content */
.content h1,
.content h2,
.content h3 {
  color: var(--navy);
  margin-top: 1.2em;
  margin-bottom: 0.6em;
}

/* Mobile */
@media (max-width: 640px) {
  .modal-body {
    padding: 16px;
  }

  .content {
    padding: 16px;
  }
}
</style>
