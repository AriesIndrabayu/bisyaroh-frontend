<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <!-- Header -->
        <header class="modal-header">
          <h2>{{ ustadz.name }}</h2>
          <button class="close" @click="$emit('close')">✕</button>
        </header>

        <!-- Body -->
        <div class="modal-body">
          <!-- Biografi -->
          <section class="section">
            <h3>Biografi</h3>
            <div class="html" v-html="parseHTML(ustadz.biography)"></div>
          </section>

          <!-- Buku -->
          <section v-if="ustadz.books?.length" class="section">
            <h3>Buku</h3>
            <ul class="list">
              <li
                v-for="book in ustadz.books"
                :key="book.id"
                @click="$emit('open-book', book)"
              >
                {{ book.category }}
              </li>
            </ul>
          </section>

          <!-- ✅ Kontak Pemesanan Buku -->
          <section v-if="bookOrders.length" class="section">
            <h3>Kontak Pemesanan Buku</h3>
            <ul class="contact-list">
              <li v-for="(c, i) in bookOrders" :key="i">
                <strong>{{ c.name }}</strong>
                <a
                  :href="`https://wa.me/${c.phone.replace(/^0/, '62')}`"
                  target="_blank"
                >
                  {{ c.phone }}
                </a>
              </li>
            </ul>
          </section>

          <!-- Kelas -->
          <section v-if="ustadz.class_registrations?.length" class="section">
            <h3>Kelas</h3>
            <ul class="list">
              <li
                v-for="k in ustadz.class_registrations"
                :key="k.id"
                @click="$emit('open-class', k)"
              >
                Pembukaan Kelas Mengaji Islam
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, watch } from "vue";
import { registerModal, unregisterModal } from "../utils/modalStack";

const MODAL_ID = "UstadzModal";

const props = defineProps({
  ustadz: Object,
  show: Boolean,
});

const emit = defineEmits(["close", "open-book", "open-class"]);

const parseHTML = (json) => {
  try {
    return JSON.parse(json).html;
  } catch {
    return "";
  }
};

/* ✅ parse book_order */
const bookOrders = computed(() => {
  if (!props.ustadz?.book_order) return [];
  try {
    return JSON.parse(props.ustadz.book_order);
  } catch {
    return [];
  }
});

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
  background: #fff;
  width: min(900px, 92%);
  max-height: 90vh;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
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
}

.section {
  margin-bottom: 32px;
}

.section h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
}

.html {
  line-height: 1.8;
  color: #374151;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.list li:hover {
  background: var(--gold-soft);
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
}

.contact-list strong {
  font-weight: 600;
  color: var(--navy);
}

.contact-list a {
  color: var(--gold);
  font-weight: 600;
  text-decoration: none;
}

.contact-list a:hover {
  text-decoration: underline;
}
</style>
