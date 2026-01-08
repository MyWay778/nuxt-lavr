<script setup lang="ts">
  import type { Post } from '../types'

  const { posts } = defineProps<{ posts: Post[] }>()
</script>

<template>
  <ul :class="$style.list">
    <li
      v-for="post in posts"
      :class="$style.post"
      :key="post.id">
      <NuxtLink :to="`/posts/${post.id}`">
        {{ post.title }}
      </NuxtLink>
      <span>({{ post.User.login }})</span>
      <span>{{ toLocalDate(post.createdAt) }}</span>
    </li>
  </ul>
</template>

<style module>
  .list {
    max-width: 400px;
  }

  .post {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 10px;
  }
</style>
