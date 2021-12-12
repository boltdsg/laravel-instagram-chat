import React from "react";

function NoChatScreen() {
    return (
        <div className="no__chat__wrapper">
            <div className="no__chat__info">
                <box-icon name="message-square-detail"></box-icon>
                <h4>Your Messages</h4>
                <div className="info">Send private message to a friend</div>
            </div>
        </div>
    );
}

export default NoChatScreen;
