<script setup lang="ts">
  import { PostList } from '~/entities/post/ui'

  definePageMeta({
    middleware: ['auth']
  })

  const { $api } = useNuxtApp()
  const { data: posts, pending } = await useAsyncData('my-posts', () => $api.posts.getMy())
</script>

<template>
  <main>
    <h1>Posts Page</h1>
    <div>
      <NuxtLink :to="{ name: 'office-posts-create' }">Create Post</NuxtLink>
    </div>
    <div v-if="pending">Loading</div>
    <PostList
      v-else-if="posts"
      parent="office"
      :posts />
  </main>
</template>
