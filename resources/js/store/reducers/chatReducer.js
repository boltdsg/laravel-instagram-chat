import { STORE_CHATS_MESSAGES, STORE_CHAT_MESSAGE, RESET_USER_CLICKED } from "../actions/types";

const initialState = {
    chatMessages: []
};

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case STORE_CHATS_MESSAGES:
            return {
                ...state,
                chatMessages: [
                    ...payload
                ]
            }
        case STORE_CHAT_MESSAGE:
            return {
                ...state,
                chatMessages: [
                    ...state.chatMessages,
                    payload
                ]
            }
        case RESET_USER_CLICKED:
            return {
                chatMessages: []
            }
        default:
            return state;
    }
};
