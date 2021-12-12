import React from "react";
import { Container, Button } from "reactstrap";

function Header() {
    return (
        <header id="header">
            <Container>
                <div className="header__wrapper">
                    <div id="logo">
                        <span>Laravel Instagram Chat</span>
                    </div>

                    <div className="header__actions">
                        <button className="logout__btn">
                            <box-icon name="log-out"></box-icon>
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
