<script setup lang="ts">
import type { State } from "../utilities/types";
import {ref, computed, defineProps} from "vue"

const props = defineProps<{
    state: State
}>();

</script>


<template>
    
    <table class="container">
        <thead>
            <tr>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="log in props.state.logs.slice(-15)">
                <td class="font-blue">{{log}}</td>
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