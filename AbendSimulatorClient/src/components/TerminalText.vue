<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
    if (props.forceFocus) {
        document.getElementById(inputId)?.focus();
    }
})
const inputId = (Math.random()*1000).toString()
const props = defineProps<{
    modelValue: string,
    label: string,
    inputWidth: number,
    forceFocus: boolean
}>();

</script>

<template>
  
    <div class="container">
        {{ props.label + " ==>"  }}
        <!-- Place Input Here -->
        <input :id="inputId" :value="props.modelValue"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
               @blur="$emit('update:modelValue', '')"
               :maxlength="props.inputWidth"
                type="text"
                :style="'width: ' + (props.inputWidth / 2).toString() + 'rem'"
        >
        
    </div>

</template>

<style scoped>
    .container {
        display: flex;
    }
</style>
