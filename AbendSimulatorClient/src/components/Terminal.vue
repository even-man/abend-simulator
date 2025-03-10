<script setup lang="ts">
import TerminalHeader from "./TerminalHeader.vue"
import TerminalText from "./TerminalText.vue"
import SessionScreen from "./SessionScreen.vue"
import CMGRScreen from "./CMGRScreen.vue"
import TSOScreen from "./TSOScreen.vue"
import AbendForYou from "./AbendForYou.vue"
import {ref} from "vue"

// KEY HANDLERS

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "Enter":
        if (dialogOpen.value && goodScreenClose.value) {
            dialogOpen.value = false;
        } else {
            handleEnterKey();
        }
        break;
    case "F3":
        backCommand();
        event.preventDefault()
        break;

    default:
        break;
  }
});

function handleEnterKey() {
    if (state.value.command != "") {
        switch (state.value.command.toUpperCase()) {
            case "BACK":
                backCommand();
                break;
            case "HELP":
                // open help screen
                break;
            default:
                // show error
                break;
        }
    } else {
        state.value.sessions.forEach(session => {
            if (session.sessionSelector.toUpperCase() === 'S') {
                state.value.navStack.push(session.sessionName)
            }
        })
    }
}

function backCommand() {
    if (state.value.navStack.length > 1) {
        state.value.navStack = state.value.navStack.slice(0, state.value.navStack.length - 1)
    }
}

// STATE OBJECT

const state = ref({
    command: "",
    navStack: ["SESSIONSCREEN"],
    sessions: [
        {
            sessionSelector: "",
            sessionName: "TSO",
            sessionDesc: "Time Sharing Option",
            sessionStatus: "ACTIVE",
        },
        {
            sessionSelector: "",
            sessionName: "C1",
            sessionDesc: "CICS Region 1",
            sessionStatus: "ACTIVE"
        },
        {
            sessionSelector: "",
            sessionName: "C2",
            sessionDesc: "CICS Region 2",
            sessionStatus: "ACTIVE"
        },
        {
            sessionSelector: "",
            sessionName: "C3",
            sessionDesc: "CICS Region 3",
            sessionStatus: "ACTIVE"
        },
        {
            sessionSelector: "",
            sessionName: "CMGR",
            sessionDesc: "CICS MANAGER",
            sessionStatus: "ACTIVE"
        },
    ],
    transactions: [
        {
            transId: "RU20",
            region: "C1",
            status: "UP"
        },
        {
            transId: "RU19",
            region: "C1",
            status: "UP"
        },
        {
            transId: "RW72",
            region: "C1",
            status: "UP"
        },
        {
            transId: "RF80",
            region: "C2",
            status: "UP"
        },
        {
            transId: "FR45",
            region: "C2",
            status: "UP"
        },
        {
            transId: "RC76",
            region: "C2",
            status: "UP"
        },
        {
            transId: "RU10",
            region: "C3",
            status: "UP"
        },
        {
            transId: "RF78",
            region: "C3",
            status: "UP"
        },
        {
            transId: "KR76",
            region: "C3",
            status: "UP"
        },
    ],
    logs: ["apsddddddddddddddddddddd"]
})

// LOG GENERATION

const logErrorMessages = [
    "Shareholder value was not generated..program fail state.",
    "Department got axed, wait did that department actually do something?",
    "The intern locked a table shaking my head",
    "A table was dropped. Did someone mean to do that?",
    "24356 rows affected",
    "No value found, value expected",
    "User got a new keyboard, wrong input",
    "There was a unhandled exception"
];
const logMessages = [
    "Business value created in a big way",
    "Were doing some big big processing",
    "This transaction is getting stuff done",
    "Does anyone even look at these logs",
]

function addAbendLog() {
    let activeTrans = state.value.transactions.filter(trans => trans.status === 'UP');
    if (activeTrans.length > 0 && !dialogOpen.value) {
        let trans = activeTrans[Math.floor(Math.random() * activeTrans.length)]
        let message = logErrorMessages[Math.floor(Math.random() * logErrorMessages.length)]
        let date = new Date();   
        state.value.logs.push(`>${date} @ ${trans.region} ${trans.transId} ${message} `)
        state.value.transactions.filter(transaction => trans.transId === transaction.transId)[0].status = "DOWN";
        dialogOpen.value = true;
    } 
}

function randomLog() {
    let trans = state.value.transactions[Math.floor(Math.random() * state.value.transactions.length)]
    let message = logMessages[Math.floor(Math.random() * logMessages.length)]
    let date = new Date();
    state.value.logs.push(`>${date} ${trans.region} ${trans.transId} ${message} `)
}

// I have an ABEND for you, sending it your way...

const dialogOpen = ref(false);
const goodScreenClose = ref(false);

// TIMERS

setInterval(function() {
    addAbendLog();
}, 20000)
setInterval(function() {
    randomLog();
}, 5000)

</script>

<template>
  
    <div class="terminal">
        <terminal-header title="z/OS SuperSession"></terminal-header>
        
        <terminal-text class="command-margin" v-model="state.command" label="Command" inputWidth="40">
        </terminal-text>
        <session-screen v-if="state.navStack[state.navStack.length - 1] === 'SESSIONSCREEN'" :state="state"></session-screen>
        <CMGRScreen v-if="state.navStack[state.navStack.length - 1] === 'CMGR'" :state="state"></CMGRScreen>
        <TSOScreen v-if="state.navStack[state.navStack.length - 1] === 'TSO'" :state="state"></TSOScreen>
        <AbendForYou @close="goodScreenClose = true;" @bad-close="goodScreenClose = false;" :open="dialogOpen"></AbendForYou>
    </div>

</template>

<style scoped>

    .command-margin {
        margin-top: 1rem;
        margin-left: 8%;
        margin-bottom: 1rem;
    }

    .terminal {
        border: 1px solid white;
        display: flex;
        flex-direction: column;
        height: 80vh;
        max-width: 50%;
        margin-top: 2rem;
        margin-left: 25%;
    }
</style>
