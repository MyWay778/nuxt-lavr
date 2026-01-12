<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'

  const { user, me, logout } = useAuthStore()
  onMounted(me)

  const { isProtected: isProtectedPage } = useIsPageProtected()
</script>

<template>
  <header :class="$style.header">
    <div>
      <NuxtLink to="/">Header</NuxtLink>
    </div>

    <nav>
      <NuxtLink to="/posts">Posts</NuxtLink>
    </nav>

    <div v-if="user">
      <span :class="$style.userName">{{ user.login }}</span>
      <button @click="() => logout(isProtectedPage)">Logout</button>
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
