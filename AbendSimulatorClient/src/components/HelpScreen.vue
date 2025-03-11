<script setup lang="ts">
import {ref, defineEmits} from "vue"
import TerminalText from "./TerminalText.vue"

const props = defineProps<{
    open: Boolean
}>();

const emit = defineEmits(["close"]);
const close = ref("");

function closeDialog() {
    if (close.value.toUpperCase() === "S") {
        emit("close");
    }
}

</script>

<template>
    <div v-if="props.open" class="dialog">
        <p>Navigate the mainframe by placing cursor on text fields, typing S to select the option, and then pressing enter. F3 can be used to navigate backwards.</p>
        <p>Squash abends to generate shareholder value. Check out some of the sessions, and you might find them useful.</p>
        <div style="margin-top: auto; margin-bottom: 1rem;">
            <terminal-text @keydown.exact.enter="closeDialog" v-model="close" label="Close" :inputWidth="1"></terminal-text>
        </div>
    </div>
</template>

<style scoped>

.dialog {
    border: 1px solid rgba(51, 255, 0, 0.87);
    background-color: black;
    width: 30%;
    height: 60%;
    position: fixed;
    top: 20%;
    left: 35%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>