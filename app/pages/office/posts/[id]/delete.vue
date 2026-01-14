<script setup lang="ts">
  import type { Post } from '~/entities/post/types'

  const { post } = defineProps<{ post: Post }>()
  const { $api } = useNuxtApp()

  function cancelHandler() {
    navigateTo({ name: 'office-posts-id', params: { id: post.id } })
  }

  async function agreeHandler() {
    try {
      await $api.posts.delete(String(post.id))
      navigateTo({ name: 'office-posts' })
    } catch (error) {
      console.warn(error)
    }
  }
</script>

<template>
  <main>
    <h1>Delete Post Page</h1>
    <p>Are you sure?</p>
    <div class="gl-flex-gap">
      <button @click="agreeHandler">Yes</button>
      <button @click="cancelHandler">No</button>
    </div>
  </main>
</template>
