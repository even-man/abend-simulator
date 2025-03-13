<script setup lang="ts">
import TerminalHeader from "./TerminalHeader.vue"
import TerminalText from "./TerminalText.vue"
import SessionScreen from "./SessionScreen.vue"
import CMGRScreen from "./CMGRScreen.vue"
import TSOScreen from "./TSOScreen.vue"
import AbendForYou from "./AbendForYou.vue"
import CICSScreen from "./CICSScreen.vue"
import TerminalFooter from "./TerminalFooter.vue"
import HelpScreen from "./HelpScreen.vue"
import {ref, computed, watch} from "vue"

// KEY HANDLERS
// this is cursed

document.addEventListener("keydown", function(event: KeyboardEvent) {
    if (event.key === "F3") {
        backCommand();
        event.preventDefault();
    }
})

function handleEnterKey() {
    switch (state.value.command.toUpperCase()) {
        case "BACK":
            backCommand();
            break;
        case "HELP":
            helpOpen.value = true;
            break;
        default:
            // show error
            break;
    }
}

function backCommand() {
    if (state.value.navStack.length > 1) {
        state.value.navStack = state.value.navStack.slice(0, state.value.navStack.length - 1)
        message.value = ""
    }
}

function handleCommandEnter(e: KeyboardEvent) {
    switch (e.key) {
        case "Enter":
            handleEnterKey();
            break;
        case "F3":
            backCommand();
            e.preventDefault()
            break;

        default:
            break;
    }
}
function handleSessionEnter() {
    state.value.sessions.forEach(session => {
            if (session.sessionSelector.toUpperCase() === 'S') {
                state.value.navStack.push(session.sessionName)
                message.value = "";
            }
        })
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
            status: "UP",
            desc: "Main value generator"
        },
        {
            transId: "RU19",
            region: "C1",
            status: "UP",
            desc: "Employee satisfaction analyzer"
        },
        {
            transId: "RW72",
            region: "C1",
            status: "UP",
            desc: "Price maximizer"
        },
        {
            transId: "RF80",
            region: "C2",
            status: "UP",
            desc: "Number cruncher"
        },
        {
            transId: "FR45",
            region: "C2",
            status: "UP",
            desc: "Corporate espionage management"
        },
        {
            transId: "RC76",
            region: "C2",
            status: "UP",
            desc: "Abend Simulator Abend fixer"
        },
        {
            transId: "RU10",
            region: "C3",
            status: "UP",
            desc: "Priority Optimization Organizational Program"
        },
        {
            transId: "RF78",
            region: "C3",
            status: "UP",
            desc: "Waste Finder"
        },
        {
            transId: "KR76",
            region: "C3",
            status: "UP",
            desc: "Productivity Portal"
        },
    ],
    logs: [""]
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
        totalAbends.value++;
        dialogOpen.value = true;

    } 
}

function randomLog() {
    let trans = state.value.transactions[Math.floor(Math.random() * state.value.transactions.length)]
    let logMessage = logMessages[Math.floor(Math.random() * logMessages.length)]
    let date = new Date();
    state.value.logs.push(`>${date} ${trans.region} ${trans.transId} ${logMessage} `)
}

// I have an ABEND for you, sending it your way...

const dialogOpen = ref(false);

// transaction starting

function goodTransStart(transId: string) {
    state.value.transactions.filter(trans => trans.transId === transId)[0].status = "UP";
    let logMessage = "Started transaction"
    let date = new Date();
    state.value.logs.push(`>${date} ${state.value.transactions.filter(trans => trans.transId === transId)[0].region} ${transId} ${logMessage} `)
    message.value = "Transaction started"
    totalAbendsFixed.value++;
}
function badTransStart(errorMessage: string) {
    console.log(errorMessage);
    message.value = errorMessage;
}

// messages
const message = ref("");
const totalAbends = ref(0);
const totalAbendsFixed = ref(0);
const shareholderValue = computed(() => {
    return `$${(totalAbendsFixed.value * 1000) - (totalAbends.value - totalAbendsFixed.value) * 500}`
})
const width = computed(() => {
    if (typeof window !== undefined) {
        return window.innerWidth
    } else {
        return 0;
    }
})

// HELP dialog
const helpOpen = ref(true);


// TIMERS
const speed = ref(30);

watch(speed, () => {
    clearInterval(addAbendTimer);
    addAbendTimer = setInterval(function() {
                    if (!helpOpen.value) {
                        addAbendLog();
                    }
                }, speed.value * 1000)
})

let addAbendTimer = setInterval(function() {
                    if (!helpOpen.value) {
                        addAbendLog();
                    }
                }, speed.value * 1000)
setInterval(function() {
    randomLog();
}, 5000)

</script>

<template>
    <div v-if="width > 1100">
        <div style="display: flex;">
            Total Abends: {{ totalAbends }}
            <span class="font-red" style="margin-left: .5rem; margin-right: .5rem;">||</span>
            Abends Fixed: {{ totalAbendsFixed }}
            <span class="font-red" style="margin-left: .5rem; margin-right: .5rem;">||</span>
            Shareholder Value: {{ shareholderValue }}
            <span class="font-red" style="margin-left: .5rem; margin-right: .5rem;">||</span>
            <label for="abendSpeed">1 abend every {{ speed }} sec</label>
            <input 
             v-model="speed"
             class="input-range"
             type="range"
             min="5"
             max="60"
             step="1"
             value="30"
             name="abendSpeed"
             >
            <div style="margin-left: auto;">
                Stuck? Try typing help on the COMMAND line and pressing enter.
            </div>
        </div>
        <div class="terminal">
            <terminal-header title="z/OS SuperSession"></terminal-header>
            
            <terminal-text @keydown.exact.enter="handleCommandEnter" class="command-margin" v-model="state.command" label="Command" :inputWidth="40" :force-focus="false">
            </terminal-text>
            <session-screen @enter-pressed="handleSessionEnter" v-if="state.navStack[state.navStack.length - 1] === 'SESSIONSCREEN'" :state="state"></session-screen>
            <CMGRScreen v-if="state.navStack[state.navStack.length - 1] === 'CMGR'" :state="state"></CMGRScreen>
            <TSOScreen v-if="state.navStack[state.navStack.length - 1] === 'TSO'" :state="state"></TSOScreen>
            <CICSScreen @good-start="goodTransStart" @bad-start="badTransStart" v-if="['C1', 'C2', 'C3'].includes(state.navStack[state.navStack.length - 1])" :region="state.navStack[state.navStack.length - 1]" :state="state"></CICSScreen>
            <AbendForYou @close="dialogOpen = false;" :open="dialogOpen"></AbendForYou>
            <HelpScreen @close="helpOpen = false" :open="helpOpen"></HelpScreen>
            <TerminalFooter class="footer" :message="message"></TerminalFooter>
        </div>
    </div>
    <div v-else>
        You think you can use a mainframe on a mobile phone? Think again. This is *real* computing. Try again on a monitor.
    </div>

</template>

<style scoped>

    .command-margin {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    .terminal {
        border: 1px solid white;
        display: flex;
        flex-direction: column;
        height: 80vh;
        margin-top: 1rem;
    }
    .footer {
        margin-top: auto;
    }
    .input-range {
        accent-color: rgba(51, 255, 0, 0.87);
        background-color: black;
    }
</style>
