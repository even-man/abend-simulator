<script setup lang="ts">
import TerminalText from "./TerminalText.vue"

defineProps<{
    state: Object
}>();


</script>

<template>

    <table class="container">
        <thead>
            <tr>
                <th></th>
                <th>Session</th>
                <th></th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="session in state.sessions">
                <td><terminal-text v-model="session.sessionSelector" label="" inputWidth="1"></terminal-text></td>
                <td>{{ session.sessionName }}</td>
                <td class="font-blue">{{ session.sessionDesc }}</td>
                <td :class="session.sessionStatus === 'ACTIVE' ? 'font-white' : 'font-red'">{{ session.sessionStatus }}</td>
            </tr>
        </tbody>
    </table>


</template>

<style scoped>

.container {
    margin: .5rem;
}

th {
    text-align: left;
}


</style>