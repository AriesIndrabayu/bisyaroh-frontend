<template>
  <PublicLayout>
    <!-- HERO -->
    <section class="contact-hero">
      <h1>Kontak Kami</h1>
      <p>Kritik, saran, dan masukan Anda sangat berarti bagi kami</p>
    </section>

    <!-- FORM -->
    <section class="contact-content">
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="field">
          <label>Nama</label>
          <input v-model="form.name" required />
        </div>

        <div class="field">
          <label>Email</label>
          <input type="email" v-model="form.email" required />
        </div>

        <div class="field">
          <label>Subjek</label>
          <input v-model="form.subject" required />
        </div>

        <div class="field">
          <label>Pesan</label>
          <textarea v-model="form.message" rows="5" required />
        </div>

        <button :disabled="loading">
          {{ loading ? "Mengirim..." : "Kirim Pesan" }}
        </button>

        <p v-if="successMessage" class="success">
          {{ successMessage }}
        </p>

        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>
      </form>
    </section>
  </PublicLayout>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import PublicLayout from "../layouts/PublicLayout.vue";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const submitForm = async () => {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const payload = new FormData();
    Object.entries(form.value).forEach(([key, value]) => {
      payload.append(key, value);
    });

    const res = await api.post("/feedback", payload, {
      headers: {
        Accept: "application/json",
      },
    });

    successMessage.value = res.data.message;

    // reset form
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* HERO */
.contact-hero {
  text-align: center;
  padding: 80px 16px 48px;
}

.contact-hero h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--navy);
}

.contact-hero p {
  color: var(--muted);
  margin-top: 8px;
}

/* CONTENT */
.contact-content {
  max-width: 600px;
  margin: auto;
  padding: 0 20px 80px;
}

.contact-form {
  background: #fff;
  padding: 32px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.field {
  margin-bottom: 18px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: var(--gold);
  color: var(--navy);
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  margin-top: 16px;
  color: #15803d;
  font-weight: 600;
}

.error {
  margin-top: 16px;
  color: #b91c1c;
  font-weight: 600;
}
</style>
