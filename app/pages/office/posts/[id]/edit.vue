<script setup lang="ts">
  import { useFetchPost } from '~/entities/post/composables'
  import type { Post } from '~/entities/post/types'
  import { CreateUpdateForm } from '~/entities/post/ui'

  const { post } = defineProps<{ post: Post }>()
  const { execute, error } = await useFetchPost(post.id)

  function redirectToPosts() {
    navigateTo({ name: 'office-posts-id', params: { id: post.id } })
  }

  async function successHandler() {
    await execute()
    if (!error.value) {
      redirectToPosts()
    } else {
      console.warn(error.value)
    }
  }
</script>

<template>
  <main>
    <h1>Edit Post Page</h1>

    <CreateUpdateForm
      :initValue="post"
      :success-handler="successHandler"
      :cancel-handler="redirectToPosts" />
  </main>
</template>
