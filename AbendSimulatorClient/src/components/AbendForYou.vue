<script setup lang="ts">
import {ref, watch, defineEmits} from "vue"
import TerminalText from "./TerminalText.vue"

const props = defineProps<{
    open: Boolean
}>();

const emit = defineEmits(["close", "badClose"]);
const close = ref("");
watch(close, () => {
    if (close.value.toUpperCase() === "S") {
        emit("close");
    } else {
        emit("badClose");
    }
});

</script>

<template>
    <div v-if="props.open" class="dialog">
        <div>I have an ABEND for you, sending it your way...</div>
        <div style="margin-top: auto; margin-bottom: 1rem;">
            <terminal-text v-model="close" label="Close" inputWidth="1"></terminal-text>
        </div>
    </div>
</template>

<style scoped>

.dialog {
    border: 1px solid rgba(51, 255, 0, 0.87);
    background-color: black;
    width: 30%;
    height: 30%;
    position: fixed;
    top: 30%;
    left: 35%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>