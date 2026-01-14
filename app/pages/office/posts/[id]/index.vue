<script setup lang="ts">
  import type { Post } from '~/entities/post/types'

  const { post } = defineProps<{
    post: Post
  }>()
</script>

<template>
  <section>
    <h1>{{ post?.title }}</h1>
    <p>{{ post?.content }}</p>

    <div>
      <span>{{ post?.User.login }}, &nbsp;</span>
      <span>{{ post?.createdAt && toLocalDate(post.createdAt) }}</span>
    </div>
  </section>
</template>
