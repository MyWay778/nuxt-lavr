<script setup lang="ts">
  import type { Post } from '~/entities/post/types'

  const { params } = useRoute()

  const { data, pending } = useAppFetch<Post>(`/posts/${params.id}`)
</script>

<template>
  <main>
    <div v-if="pending">Loading...</div>
    <div v-else>
      <h1>{{ data?.title }}</h1>
      <p>{{ data?.content }}</p>

      <div>
        <span>{{ data?.User.login }}, &nbsp;</span>
        <span>{{ data?.createdAt && toLocalDate(data.createdAt) }}</span>
      </div>
    </div>
  </main>
</template>
