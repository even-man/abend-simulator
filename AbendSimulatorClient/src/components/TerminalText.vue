<script setup lang="ts">

defineProps<{
    modelValue: None
    label: String,
    inputWidth: Number
}>();

</script>

<template>
  
    <div class="container">
        {{ label + " ==>"  }}
        <!-- Place Input Here -->
        <input :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               @blur="$emit('update:modelValue', '')"
               :maxlength="inputWidth"
                type="text"
                :style="'width: ' + inputWidth / 2 + 'rem'"
        >
        
    </div>

</template>

<style scoped>
    .container {
        display: flex;
    }
</style>
