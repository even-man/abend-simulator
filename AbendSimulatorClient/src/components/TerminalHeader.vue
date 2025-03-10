<script setup lang="ts">

defineProps<{
    title: string
}>();

</script>

<template>
  
    <div class="terminal-header terminal-header-scoped font-white">
        ----- {{ title }} -----
    </div>

</template>


<style scoped>

.terminal-header-scoped {
    text-align: center;
}

</style>