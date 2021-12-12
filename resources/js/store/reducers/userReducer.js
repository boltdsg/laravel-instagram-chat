import { STORE_USER_INFO, USER_CLICKED, RESET_USER_CLICKED, CLEAR_CLICK, STORE_OTHER_USERS, RESET_MSG_LOADING } from "../actions/types"

const initialState = {
    user: null,
    logged_in: false,
    userClicked: false,
    clickedUserEmail: "",
    otherUsers: null,
    msgLoading: true
};

