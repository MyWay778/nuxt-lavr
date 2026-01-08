<script setup lang="ts">
  import { useFetchPost, useFetchPosts } from '~/entities/post/composables'
  import { PostList } from '~/entities/post/ui'

  const { params } = useRoute()
  const { post, loading } = useFetchPost(params.id)
  const { posts } = useFetchPosts()

  const otherPosts = computed(() => posts.value.filter(post => post.id !== Number(params.id)))
</script>

<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>{{ post?.title }}</h1>
      <p>{{ post?.content }}</p>

      <div>
        <span>{{ post?.User.login }}, &nbsp;</span>
        <span>{{ post?.createdAt && toLocalDate(post.createdAt) }}</span>
      </div>

      <div>
        <h2>Others</h2>
        <PostList :posts="otherPosts" />
      </div>
    </div>
  </main>
</template>
