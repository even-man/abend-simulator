<script setup lang="ts">

defineProps<{
    message: string
}>();

</script>

<template>
  
    <div class="terminal-footer-scoped">
        {{ message }}
    </div>

</template>


<style scoped>

.terminal-footer-scoped {
    text-align: right;
}

</style>