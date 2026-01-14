<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'
  import { useFetchPosts } from '~/entities/post/composables'
  import { PostList } from '~/entities/post/ui'

  const { isAuthenticated } = useAuthStore()
  const { data: posts, pending } = await useFetchPosts()
</script>

<template>
  <main>
    <h1>Posts Page</h1>
    <div>
      <NuxtLink
        v-if="isAuthenticated"
        :to="{ name: 'office-posts-create' }">
        Create Post
      </NuxtLink>
    </div>
    <div v-if="pending">Loading</div>
    <PostList
      v-else
      :posts />
  </main>
</template>
