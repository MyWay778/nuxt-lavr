<script setup lang="ts">
  function submitHandler() {}
</script>

<template>
  <main>
    <h1>Create Post Page</h1>

    <form @submit.prevent="submitHandler">
      <label>
        <span>Title</span>
        <input
          name="title"
          type="text" />
      </label>

      <label>
        <span>Content</span>
        <textarea name="content" />
      </label>

      <label>
        <span>Url</span>
        <input
          name="title"
          type="text" />
      </label>

      <button type="submit">Create</button>
    </form>
  </main>
</template>
