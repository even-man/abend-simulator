<script setup lang="ts">
import type {State} from '../utilities/types';

defineProps<{
    state: State
}>();

</script>


<template>
    <table class="container">
        <thead>
            <tr>
                <th>Trans ID</th>
                <th>Region</th>
                <th>Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trans in state.transactions">
                <td>{{ trans.transId }}</td>
                <td>{{ trans.region }}</td>
                <td :class="trans.status === 'UP' ? 'font-white' : 'font-red'">{{ trans.status }}</td>
                <td class="font-blue">{{ trans.desc }}</td>
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