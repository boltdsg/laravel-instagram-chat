import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// GraphQl 
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

// Action Types
import { STORE_USER_INFO } from "../../store/actions/types";

/* Load User Graph */
export const LOAD_USER_MUTATION = gql`
    mutation ($remember_token: String) {
        loadUser(remember_token: $remember_token) {
            access
            remember_token
            logged_in 
            email
            name
        }
    }
`;

// Login User Graph 
const LOGIN_USER_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
        user{
			name
			email
			username
		}
            remember_token
            logged_in
            errData{
                msg
            }
        }
    }
`;

// Login Component
function Login({ history }) {
    const dispatch = useDispatch();
    const [loadUser, loadUserData] = useMutation(LOAD_USER_MUTATION);
    const [loginUser, loginData] = useMutation(LOGIN_USER_MUTATION);

    /* State Values */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErr] = useState("");


    /** Check for login result */
    useEffect(() => {
        const { data } = loginData;
        if (data) {
            const { loginUser: { logged_in, errData } } = data;

            dispatch({ type: STORE_USER_INFO, payload: data.loginUser })

            /** Set Error Message */
            if (errData) setErr(errData.msg);

            if (logged_in) {
                setErr("");
                return history.push("/inbox");
            }
        }
    }, [loginData]);


    useEffect(() => {
        /* Get any token store in the browser localstorage */
        const stored_remember_token = localStorage.getItem("remember_token");
        if (stored_remember_token !== "null")
            loadUser({
                variables: {
                    remember_token: stored_remember_token
                }
            });

    }, [])

    /** Check for load User */
    useEffect(() => {
        const { data } = loadUserData;
        if (data) {
            const { access } = data.loadUser
            if (access) {
                dispatch({ type: STORE_USER_INFO, payload: data.loadUser })
                return history.push("/inbox");
            }
        }
    }, [loadUserData])


    const onSubmit = (e) => {
        e.preventDefault();
        loginUser({
            variables: { email, password }
        })
    };

    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </h1>

                            {errMsg ?
                                <div className="errmsg">
                                    {errMsg}
                                </div> : null}

                            <form
                                action="/users/login"
                                method="POST"
                                {...{ onSubmit }}
                            >
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Login
                                </button>
                            </form>
                            <p className="lead mt-4">
                                No Account?
                                <Link to="/register" className="ml-1">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
