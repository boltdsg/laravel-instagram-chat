import React, { useEffect } from "react";
import ChatUsers from "../ChatUsers";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";

// Actions
import { loadP2PChat } from '../../../../store/actions/chatActions'

// Action types
import { USER_CLICKED, RESET_USER_CLICKED } from "../../../../store/actions/types";


function Left() {
    const { user: thisUser, otherUsers } = useSelector(state => state.user);

    const { clickedUserEmail } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const grabClickedUser = (email) => {
        // Disconnect from any pusher connection
        window.Echo.leave();

        // Reset clickedUserEmail && and Store a New one to database
        dispatch({ type: RESET_USER_CLICKED })
        dispatch({ type: USER_CLICKED, payload: email });

        // Load Peer to Peer Messages for Two Users
        dispatch(loadP2PChat({ senderEmail: email, receiverEmail: thisUser.email }))

    };

    return (
        <div className="chat__left">
            <div className="chat__username">
                <h3>{thisUser ? thisUser.name : null}</h3>
            </div>

            <div className="chat__users">
                {otherUsers && otherUsers.length > 0 ?
                    <>
                        {otherUsers.map(({ email, name }, key) =>
                            <div key={key}>
                                <ChatUsers {...{ email, name, grabClickedUser, clickedUserEmail }} />
                            </div>
                        )}
                    </> : null}
            </div>
        </div>
    );
}

export default Left;
