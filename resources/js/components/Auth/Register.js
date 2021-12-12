import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

// Actions
import { STORE_USER_INFO } from "../../store/actions/types";

// Register Component
function Register({ history }) {

    const dispatch = useDispatch();

    /* State Values */
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errMsg, setErr] = useState("");

    /* Register Mutation */
    const REGISTER_USER_MUTATION = gql`
    mutation (
        $email: String!
        $name: String!
        $password: String!
        $username: String!
    ) {
         registerUser(
            email: $email
            name: $name
            password: $password
            username: $username
        ) {
            user{
                name
                email
                username
		    }
            remember_token
            registered
            errData{
                msg
            }
        }
    }
`;

    // Register Mutation
    const [registerUser, registerData] = useMutation(REGISTER_USER_MUTATION);

    useEffect(() => {
        const { data } = registerData;

        if (data) {
            const { registerUser: { registered, errData } } = data;
            dispatch({ type: STORE_USER_INFO, payload: data.registerUser })

            /** Set Error Message */
            if (errData) setErr(errData.msg);

            /** Redirect after login */
            if (registered) {
                setErr("");
                return history.push("/inbox");
            }

        }

    }, [registerData])

    useEffect(() => {
        /* Get any token store in the browser localstorage */
        const stored_remember_token = localStorage.getItem("remember_token");

        if (stored_remember_token) {
            return history.push("/inbox");
        }

    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        registerUser({
            variables: {
                email,
                name,
                password,
                username,
            },
        })
    }


    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt"></i>Register
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
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        className="form-control"
                                        placeholder="Full Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        placeholder="Username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
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
                                    Register
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register