import React from "react";
import { AvatarGenerator } from "random-avatar-generator";
import UseAvatar from "react-avatar";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();


function ChatUsers({ email, name, clickedUserEmail, grabClickedUser }) {

    return (
        <>
            <div className="chat__user" onClick={() => grabClickedUser(email)}>
                <button className={(clickedUserEmail == email) ? "active" : ""}>
                    <UseAvatar src={avatar} alt="username" size={40} />
                    <div className="chat__user__info">
                        <div className="chat__user__name">{name}</div>
                        <div className="chat__user__active">last seen...</div>
                    </div>
                </button>
            </div>
        </>
    );
}

export default ChatUsers;
