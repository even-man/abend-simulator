<script setup lang="ts">
import TerminalText from "./TerminalText.vue";
import {ref, defineEmits} from "vue"
import type { State } from "../utilities/types";

const props = defineProps<{
    region: string,
    state: State
}>();

const emits = defineEmits(["badStart", "goodStart"])

const transToStart = ref("");

function attemptStartTrans() {
    if (props.state.transactions.filter(trans => trans.transId === transToStart.value && trans.region === props.region).length === 1) {
        emits("goodStart", transToStart.value);
    } else {
        emits("badStart");
    }
}

</script>

<template>
    <div class="container">
        <terminal-text @keyup.exact.enter="attemptStartTrans()" v-model="transToStart" label="Start Transaction" :inputWidth="4"></terminal-text>
    </div>
</template>

<style scoped>
.container {
    margin: 1rem;
}
</style>