<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'

  const { user, me, logout, pending: authPending } = useAuthStore()
  onMounted(me)

  const { isProtected: isProtectedPage } = useIsPageProtected()
</script>

<template>
  <header :class="$style.header">
    <div>
      <NuxtLink to="/">Header</NuxtLink>
    </div>

    <nav :class="$style.nav">
      <NuxtLink to="/posts">Posts</NuxtLink>
      <NuxtLink to="/office">Office</NuxtLink>
    </nav>

    <div v-if="user">
      <span :class="$style.userName">{{ user.login }}</span>
      <button @click="() => logout(isProtectedPage)">Logout</button>
    </div>

    <div v-else-if="authPending">
      <span>Loading</span>
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

  .nav {
    display: flex;
    gap: 10px;
  }

  .userName {
    margin-right: 10px;
  }
</style>
