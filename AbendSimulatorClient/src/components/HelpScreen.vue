<script setup lang="ts">
import {ref, defineEmits} from "vue"
import TerminalText from "./TerminalText.vue"

const props = defineProps<{
    open: boolean
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
        <p>Welcome to Abend Simulator</p>
        <ul>
            <li>Navigate by placing cursor on text fields</li>
            <li>Type "S" and press enter to select an option</li>
            <li>F3 can be used to navigate backwards</li>
            <li>Check Session TSO for the abend logs</li>
            <li>Check Session CMGR for list of transactions and the region they belong to</li>
            <li>When an abend brings down a transaction, navigate to region, and type transaction in to restart</li>
            <li>Starting down transactions will generate shareholder value</li>
        </ul>
        <p>And most importantly, have fun! We all love abends!</p>
        <div style="margin-top: auto; margin-bottom: 1rem;">
            <terminal-text @keydown.exact.enter="closeDialog" v-model="close" label="Close" :inputWidth="1" :force-focus="props.open"></terminal-text>
        </div>
    </div>
</template>

<style scoped>

.dialog {
    border: 1px solid rgba(51, 255, 0, 0.87);
    background-color: black;
    width: 50%;
    height: 60%;
    position: fixed;
    padding: .5rem;
    top: 15%;
    left: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>