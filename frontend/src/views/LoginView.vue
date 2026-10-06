<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setUserId } from '@/lib/user-id.js';

const router = useRouter();
const userIdInput = ref('');
const error = ref('');

function handleLogin() {
  error.value = '';
  const id = Number(userIdInput.value);
  if (!Number.isInteger(id) || id < 1) {
    error.value = 'Enter a valid user id (whole number ≥ 1).';
    return;
  }
  setUserId(id);
  router.push('/feed');
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <p>
        <label>
          User id
          <input v-model="userIdInput" type="text" inputmode="numeric" />
        </label>
      </p>
      <p v-if="error">{{ error }}</p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
