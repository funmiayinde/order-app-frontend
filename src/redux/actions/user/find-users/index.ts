import { createActionType } from "../../../../_shared/ui/redux";
import { ActionOption } from "../../type";


export const FIND_USERS = createActionType('FIND_USERS', 'USER');

export const findUsers = (options?: ActionOption) => ({
    type: FIND_USERS.START,
    meta: {
        ...options,
    }
});