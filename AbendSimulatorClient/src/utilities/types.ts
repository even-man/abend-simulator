export interface Transaction {
    transId: string,
    region: string,
    status: string
}

export interface Session {
    sessionSelector: string,
    sessionName: string,
    sessionDesc: string,
    sessionStatus: string
}

export interface State {
    command: string,
    navStack: string[],
    sessions: Session[],
    transactions: Transaction[],
    logs: string[]
}