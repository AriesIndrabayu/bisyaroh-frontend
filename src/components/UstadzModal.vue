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

          <!-- 📦 Kontak Pemesanan Buku -->
          <section v-if="bookOrders.length" class="section">
            <h3>Kontak Pemesanan Buku</h3>

            <ul class="contact-list">
              <li v-for="(c, i) in bookOrders" :key="i">
                <div class="contact-info">
                  <strong>{{ c.name }}</strong>
                  <span class="role">{{ c.role }}</span>
                  <span class="phone">{{ c.phone }}</span>
                </div>

                <div class="contact-actions">
                  <a
                    v-if="c.wa"
                    :href="c.wa"
                    target="_blank"
                    class="btn-wa"
                    title="Chat WhatsApp"
                  >
                    💬
                  </a>

                  <button
                    class="btn-copy"
                    title="Salin nomor"
                    @click="copyPhone(c.phone)"
                  >
                    📋
                  </button>
                </div>
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

/* ✅ Parse & normalize kontak */
const bookOrders = computed(() => {
  if (!props.ustadz?.book_order) return [];

  try {
    return JSON.parse(props.ustadz.book_order).map((c) => ({
      name: c.name || "Admin Buku",
      phone: c.phone || "",
      role: c.role || "Kontak Resmi",
      wa: c.phone ? `https://wa.me/${c.phone.replace(/^0/, "62")}` : null,
    }));
  } catch {
    return [];
  }
});

/* 📋 Copy nomor */
const copyPhone = async (phone) => {
  try {
    await navigator.clipboard.writeText(phone);
    alert("Nomor disalin");
  } catch {
    alert("Gagal menyalin");
  }
};

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
  padding: 14px 16px;
  background: #f9fafb;
  border-radius: 10px;
  margin-bottom: 10px;
  gap: 12px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-info strong {
  font-weight: 700;
  color: var(--navy);
}

.contact-info .role {
  font-size: 12px;
  color: #6b7280;
}

.contact-info .phone {
  font-size: 13px;
  color: #374151;
}

.contact-actions {
  display: flex;
  gap: 8px;
}

.btn-wa,
.btn-copy {
  border: none;
  background: #e5e7eb;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.btn-wa {
  background: #25d366;
  color: white;
}

.btn-wa:hover {
  filter: brightness(0.95);
}

.btn-copy:hover {
  background: #d1d5db;
}
</style>
