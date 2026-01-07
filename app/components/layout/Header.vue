<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'

  const { user, me, logout } = useAuthStore()
  onMounted(me)
</script>

<template>
  <header :class="$style.header">
    <div>Header</div>
    <div v-if="user">
      <span :class="$style.userName">{{ user.login }}</span>
      <button @click="logout">Logout</button>
    </div>
    <NuxtLink
      v-else
      to="/login">
      Login
    </NuxtLink>
  </header>
</template>

<style module>
  .header {
    display: flex;
    justify-content: space-between;
  }

  .userName {
    margin-right: 10px;
  }
</style>
