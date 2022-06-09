import { createActionString } from "../../../../_shared/ui/redux";


export const SESSION_TOKEN = createActionString('SESSION_TOKEN', 'AUTH');

export const setSessionToken  = (value: string) => ({
    type: SESSION_TOKEN,
    value,
});