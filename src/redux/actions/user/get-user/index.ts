import { createActionType } from "../../../../_shared/ui/redux";
import { ActionOption } from "../../type";


export const GET_USER = createActionType('GET_USER', 'USER');

export const getUser = (_id: string, option?: ActionOption) => ({
    type: GET_USER.START,
    meta: {
        _id,
        ...option,
    }
});