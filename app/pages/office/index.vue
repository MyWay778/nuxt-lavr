<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })

  const links = [
    {
      title: 'Posts',
      url: 'posts'
    }
  ]
</script>

<template>
  <main>
    <h1>Office Page</h1>
    <nav>
      <ul>
        <li
          v-for="link in links"
          :key="link.title">
          <NuxtLink :to="{ name: 'office-' + link.url }">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </main>
</template>
