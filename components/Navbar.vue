<template>
  <section>
    <nav class="navbar bg-primary" data-bs-theme="dark">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/AboutView">About</a>
        </li>
      </ul>
      <div class="nav-item" v-if="authStore.user.uid">
        <button class="btn btn-danger me-4" @click.prevent="onLogout">Logout {{ authStore.user.phone }}</button>
      </div>
    </nav>
  </section>
</template>

<script setup>
import { useAuthstore } from '../stores';

const authStore = useAuthstore();

const onLogout = () => {
  authStore.logoutUser();
}
</script>