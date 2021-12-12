import React, { useState, useEffect } from "react";
import { Spinner } from 'reactstrap'
import NoChatScreen from "../NoChatScreen";
import { useMutation, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux"

/* Inbox Components */
import Header from "../Inbox/Header";
import InboxChats from "../Inbox/InboxChats";
import InboxInput from "../Inbox/InboxInput";

import { STORE_CHAT_MESSAGE, STORE_CHATS_MESSAGES, RESET_MSG_LOADING } from "../../../../store/actions/types";

/** Mutation to Get All Users I have Chatted With */
export const MESSAGE_MUTATION = gql`
     mutation ($txtMsg: String, $senderEmail: String, $receiverEmail: String) {
         sendMessage(txtMsg: $txtMsg, senderEmail: $senderEmail, receiverEmail: $receiverEmail) {
             txtMsg
         }
     }
 `;

function Right({ thisUser }) {
    const dispatch = useDispatch();
    const [txtMsg, setTxtMsg] = useState("");
    const [sendMessage, sendMessageData] = useMutation(MESSAGE_MUTATION)

    // Chat Messages
    const { msgLoading } = useSelector(state => state.user);

    const clickedUserEmail = localStorage.getItem('clickedUserEmail');

    const setTextMsg = (msg) => {
        setTxtMsg(msg)
    }

    const onSubmit = () => {
        // Check if there is a message to send
        if (!txtMsg) return

        // // Message Data
        if (!clickedUserEmail) return;

        // Compose the Message 
        const composedMsg = {
            id: Date.now(),
            receiverEmail: clickedUserEmail,
            senderEmail: thisUser.email,
            sent_at: Date.now(),
            txtMsg
        }

        // send the current message to server
        if (thisUser) {
            sendMessage({
                variables: { ...composedMsg }
            });

            // Dispatch the message to store
            dispatch({
                type: STORE_CHAT_MESSAGE,
                payload: composedMsg
            });

        }
        setTxtMsg("");
    }

    useEffect(() => {
        const { email } = thisUser;

        window.Echo.channel(`receiver-${email}`)
            .listen('SendMessage', (e) => {

                setTimeout(() => {
                    if (e.receiverEmail == email) {
                        dispatch({
                            type: STORE_CHAT_MESSAGE, payload: {
                                ...e,
                                id: Date.now(),
                            }
                        });
                    }
                }, 100)
            });
    }, []);

    useEffect(() => {
        window.Echo.channel(`channel-name`).listen('LoadP2PChats', ({ messages }) => {
            if (messages.length > 0) {

                // Get sender from localStorage
                const sender = localStorage.getItem('clickedUserEmail');

                // Get all messages when currentUser is sender and clicked user is receiver
                const senderMsgs = messages.filter(({ senderEmail, receiverEmail }) => (senderEmail == thisUser.email) && (receiverEmail == sender));

                // Get all messages when currentUser is sender and clicked user is receiver
                const receivedMsgs = messages.filter(({ senderEmail, receiverEmail }) => (senderEmail == sender) && (receiverEmail == thisUser.email));

                // Join Both messages
                const joinedMsgs = receivedMsgs.concat(senderMsgs);

                if (joinedMsgs.length > 0) {
                    joinedMsgs.sort(function (x, y) {
                        return (Number(x.sent_at) - Number(y.sent_at))
                    })

                    dispatch({ type: STORE_CHATS_MESSAGES, payload: joinedMsgs });
                }
            }

            dispatch({ type: RESET_MSG_LOADING });
        })
    }, [])

    return (
        <div className="chat__right">
            {clickedUserEmail ? (
                <div className="chat__inbox__wrapper">
                    <Header />
                    <div className="chat__inbox">
                        {!msgLoading ?
                            <>
                                <InboxChats {...{ thisUser }} />
                                <InboxInput  {...{ setTextMsg, onSubmit }} />
                            </> :
                            <div style={{ margin: "auto", padding: "20% 20px" }}>
                                <Spinner size={"5"} />
                            </div>
                        }

                    </div>
                </div>
            ) : (
                <NoChatScreen />
            )}
        </div>
    );
}

export default Right;
