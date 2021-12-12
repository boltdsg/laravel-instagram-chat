import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Header Component
const Header = () => {
    const { clickedUserEmail, otherUsers } = useSelector(state => state.user);
    const [userNameToChat, setUserNameToChat] = useState(null);

    useEffect(() => {

        if (otherUsers && otherUsers.length > 0) {
            const [{ name }] = otherUsers.filter(({ email }) => email == clickedUserEmail)
            setUserNameToChat(name)
        }
    }, [clickedUserEmail])


    return <header id="inbox__header">{userNameToChat ? userNameToChat : "Laravel GraphQl Instagram Chat"}</header>;
}


export default Header;
