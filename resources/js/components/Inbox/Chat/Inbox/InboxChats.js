import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MsgChat from "./Chat";

function InboxChats() {
    const { chatMessages } = useSelector(state => state.chat);

    // For scroll into view
    const messageRef = useRef(null)

    const sndrEmail = localStorage.getItem('clickedUserEmail');

    useEffect(() => {
        if (chatMessages.length > 0) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [chatMessages])


    return (
        <div className="inbox__chats" ref={messageRef}>
            {chatMessages.length > 0 ?
                chatMessages.map(({ txtMsg, id, receiverEmail }) => (
                    <div
                        key={id}
                        style={{
                            display: "flex",
                            justifyContent: !(sndrEmail == receiverEmail) ? "flex-start" : "flex-end",
                            margin: "10px 0px",
                        }}
                    >
                        <MsgChat {...{ txtMsg, id, sndrEmail, receiverEmail }} />
                    </div>
                )) : null}
        </div>
    );
}

export default InboxChats;
