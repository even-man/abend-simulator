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
    transToStart.value = transToStart.value.toUpperCase();
    let targetTrans = props.state.transactions.filter(trans => trans.transId === transToStart.value && trans.region === props.region);
    // value in region
    if (targetTrans.length === 1) {
        if (targetTrans[0].status === "UP") {
            emits("badStart", "Transaction already up");
        } else {
            emits("goodStart", transToStart.value.toUpperCase());
        }
        
    } else {
        emits("badStart", "Transaction not found in region");
    }
}

</script>

<template>
    <div class="container">
        <p>region {{ props.region }}</p>
        <terminal-text @keyup.exact.enter="attemptStartTrans()" v-model="transToStart" label="Start Transaction" :inputWidth="4" :force-focus="false"></terminal-text>
    </div>
</template>

<style scoped>
.container {
    margin: 1rem;
}
</style>