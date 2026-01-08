<script setup lang="ts">
  import { useFetchPosts } from '~/entities/post/composables'
  import { PostList } from '~/entities/post/ui'

  const { posts, loading } = useFetchPosts()
</script>

<template>
  <main>
    <h1>Posts Page</h1>
    <div>
      <NuxtLink to="/posts/create">Create Post</NuxtLink>
    </div>
    <div v-if="loading">Loading</div>
    <PostList
      v-else
      :posts />
  </main>
</template>
