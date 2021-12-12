import { STORE_USER_INFO, USER_CLICKED, RESET_USER_CLICKED, CLEAR_CLICK, STORE_OTHER_USERS, RESET_MSG_LOADING } from "../actions/types"

const initialState = {
    user: null,
    logged_in: false,
    userClicked: false,
    clickedUserEmail: "",
    otherUsers: null,
    msgLoading: true
};

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case STORE_USER_INFO:
            /* Store User Remember token in the Local Storage */
            localStorage.setItem("remember_token", payload.remember_token)
            return {
                ...state,
                user: payload,
                logged_in: payload.logged_in
            }

        case USER_CLICKED:
            localStorage.setItem('clickedUserEmail', payload)
            return {
                ...state,
                userClicked: true,
                clickedUserEmail: payload,
                msgLoading: true
            }

        case RESET_USER_CLICKED:
            localStorage.removeItem('clickedUserEmail');
            return {
                ...state,
                userClicked: false,
                clickedUserEmail: ""
            }

        case CLEAR_CLICK:
            return {
                ...state,
                userClicked: false
            }

        case STORE_OTHER_USERS:
            localStorage.removeItem("clickedUserEmail");
            return {
                ...state,
                otherUsers: payload
            }

        case RESET_MSG_LOADING:
            return {
                ...state,
                msgLoading: false
            }

        default:
            return state;
    }
};
