<script setup lang="ts">
  import type { Post } from '../types'

  const { posts, parent = '' } = defineProps<{
    posts: Post[]
    parent?: string // parent route
  }>()

  const parentWithDash = computed(() => (parent ? parent + '-' : ''))
</script>

<template>
  <ul :class="$style.list">
    <li
      v-for="post in posts"
      :class="$style.post"
      :key="post.id">
      <NuxtLink :to="{ name: parentWithDash + 'posts-id', params: { id: post.id } }">
        {{ post.title }}
      </NuxtLink>
      <span v-if="post.User">({{ post.User.login }})</span>
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
