import React from "react";

function Chat({ txtMsg, sndrEmail, receiverEmail }) {
    const fromSender = !(sndrEmail == receiverEmail) ? "from_sender" : ""
    return <div className={`chat__msg ${fromSender}`}>{txtMsg}</div>;
}

export default Chat;
