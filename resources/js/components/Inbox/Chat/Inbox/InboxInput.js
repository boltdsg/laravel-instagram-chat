import React, { useState, useRef } from "react";

function InboxInput({ setTextMsg, onSubmit: Submit }) {

    const formValue = useRef()

    const onSubmit = (e) => {
        e.preventDefault();
        Submit()
        formValue.current.reset();
    }

    return (
        <div className="inbox__input">
            <form {...{ onSubmit }} ref={formValue}>
                <input placeholder="Message.."
                    onChange={(e) => {
                        setTextMsg(e.target.value)
                    }}
                    defaultValue={""}
                />
            </form>
        </div>
    );
}

export default InboxInput;
