<script setup lang="ts">
  const { error, label } = defineProps<{
    label: string
    error?: string
  }>()
</script>

<template>
  <label>
    <span>{{ label }}:&nbsp;</span>
    <slot></slot>
    <div
      :class="$style.error"
      v-show="error">
      {{ error }}
    </div>
  </label>
</template>
<style module>
  .input:user-invalid {
    border: 2px solid red;
  }

  .input:valid {
    border: 2px solid green;
  }

  .error {
    color: red;
  }
</style>
