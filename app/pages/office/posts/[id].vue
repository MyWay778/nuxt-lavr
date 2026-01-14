<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'
  import { useFetchPost } from '~/entities/post/composables'

  definePageMeta({
    middleware: ['auth']
  })

  const { params } = useRoute()

  const { data: post, pending } = await useFetchPost(params.id)

  const authStore = useAuthStore()

  if (post.value && authStore.user.value && post.value.UserId !== authStore.user.value.id) {
    throw createError({ statusCode: 404, message: 'Страница не найдена', fatal: true })
  }
</script>

<template>
  <main>
    <div v-if="pending">Loading...</div>
    <template v-else>
      <nav class="gl-flex-gap">
        <NuxtLink :to="{ name: 'office-posts-id-edit', params: { id: params.id } }">Edit</NuxtLink>
        <NuxtLink :to="{ name: 'office-posts-id-delete', params: { id: params.id } }">Delete</NuxtLink>
      </nav>

      <NuxtPage :post />
    </template>
  </main>
</template>
