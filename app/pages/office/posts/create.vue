<script setup lang="ts">
  import type { Post } from '~/entities/post/types'
  import { CreateUpdateForm } from '~/entities/post/ui'

  definePageMeta({
    middleware: ['auth']
  })

  const router = useRouter()
  const previousPath = router.options.history.state.back

  function successHandler(newPost: Post) {
    navigateTo({ name: 'office-posts-id', params: { id: newPost.id } })
  }

  function cancelHandler() {
    navigateTo(previousPath ? { path: previousPath as string } : { name: 'posts' })
  }
</script>

<template>
  <main>
    <h1>Create Post Page</h1>
    <CreateUpdateForm
      :success-handler="successHandler"
      :cancel-handler="cancelHandler" />
  </main>
</template>
