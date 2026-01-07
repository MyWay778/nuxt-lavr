<script setup lang="ts">
  import type { Post } from '~/entities/post/types'

  const { data, pending } = await useAppFetch<Post[]>('/posts')
</script>

<template>
  <main>
    <h1>Posts Page</h1>
    <div v-if="pending">Loading</div>
    <ul
      v-else
      :class="$style.list">
      <li
        v-for="post in data"
        :class="$style.post"
        :key="post.id">
        <NuxtLink :to="`/posts/${post.id}`">
          {{ post.title }}
        </NuxtLink>
        <span>({{ post.User.login }})</span>
        <span>{{ toLocalDate(post.createdAt) }}</span>
      </li>
    </ul>
  </main>
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
