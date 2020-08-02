import { ReminderHashTableType, ReminderHashTable } from "../state/reminder";
import { RecoilRoot } from "recoil";
import React from "react";


export const initializeHashTableRoot = (value: ReminderHashTableType): React.FunctionComponent => ({ children }: { children?: React.ReactNode }) => {
    return <RecoilRoot initializeState={({ set }) => set(ReminderHashTable, value)}>
        {children}
    </RecoilRoot>
};