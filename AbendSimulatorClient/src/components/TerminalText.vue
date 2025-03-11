<script setup lang="ts">

defineProps<{
    modelValue: string,
    label: string,
    inputWidth: number
}>();

</script>

<template>
  
    <div class="container">
        {{ label + " ==>"  }}
        <!-- Place Input Here -->
        <input :value="modelValue"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
               @blur="$emit('update:modelValue', '')"
               :maxlength="inputWidth"
                type="text"
                :style="'width: ' + (inputWidth / 2).toString() + 'rem'"
        >
        
    </div>

</template>

<style scoped>
    .container {
        display: flex;
    }
</style>
