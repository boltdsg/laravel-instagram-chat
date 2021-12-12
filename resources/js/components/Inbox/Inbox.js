import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState, } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { STORE_OTHER_USERS, STORE_USER_INFO } from "../../store/actions/types";
import { LOAD_USER_MUTATION } from "../Auth/Login";
import { useSelector, } from 'react-redux';
import Left from "./Chat/Containers/Left";
import Right from "./Chat/Containers/Right";

import Header from "./Header";

/** Mutation to Get All Users I have Chatted With */
export const GET_OTHER_USERS_MUTATION = gql`
     mutation ($myEmail: String) {
         getAllUsers(myEmail: $myEmail) {
            otherUsers
         }
     }
 `;


function Inbox() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadUser, loadUserData] = useMutation(LOAD_USER_MUTATION);
    const [getOtherUsers, otherUsersData] = useMutation(GET_OTHER_USERS_MUTATION)
    const [thisUser, setThisUser] = useState(null);
    const [otherUsersStateData, setOtherUsersStateData] = useState(null);

    useEffect(() => {
        /* Get any token store in the browser localstorage */
        const stored_remember_token = localStorage.getItem("remember_token");

        if (stored_remember_token == "undefined") {
            history.push('/login');
        }

        /* Load a user using the remember_token */
        loadUser({
            variables: {
                remember_token: stored_remember_token
            }
        })

    }, []);

    /** Check for load User */
    useEffect(() => {
        const { data } = loadUserData;
        if (data) {
            const { access } = data.loadUser
            if (access) {
                setThisUser(data.loadUser)
            }
        }
    }, [loadUserData]);

    /* Distpatch this user to the redux store */
    useEffect(() => {
        if (thisUser) {

            /*Dispatch thisUser to store*/
            dispatch({ type: STORE_USER_INFO, payload: thisUser });

            /* Get Other Users if any */
            getOtherUsers({ variables: { myEmail: thisUser.email } })
        }

    }, [thisUser])

    /* Get Other Users */
    useEffect(() => {
        const { data } = otherUsersData;
        if (data) {
            const { getAllUsers } = data
            const { otherUsers } = getAllUsers;
            setOtherUsersStateData(otherUsers)
        }
    }, [otherUsersData])

    /* Store others users to store */
    useEffect(() => {
        /* New Array for users */
        const newUsersArr = [];

        // convert the object string to object and push to newUsersArray
        if (otherUsersStateData)
            otherUsersStateData.forEach(user => {
                newUsersArr.push(JSON.parse(user));
            })

        // Dispatch all the other users to array
        dispatch({ type: STORE_OTHER_USERS, payload: newUsersArr })
    }, [otherUsersStateData])

    return (
        <>
            <> <Header />
                <Container className="container">
                    <div className="chat__wrapper">
                        <Left />
                        {thisUser ?
                            <Right {...{ thisUser }} /> : null}
                    </div>
                </Container></>
        </>
    );
}

export default Inbox;
