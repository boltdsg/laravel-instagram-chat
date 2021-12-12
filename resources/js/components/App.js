import React from "react";
import ReactDOM from "react-dom";
import "boxicons";

/* Router */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Redux */
import { Provider } from "react-redux";

/* Components */
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Inbox from "./Inbox/Inbox";

// GraphQl
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://instagram.test/graphql",
    cache: new InMemoryCache(),
});

/* Store */
import store from "../store/store";

function App() {
    return (
        <Provider store={store}>
            <ApolloProvider {...{ client }}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/inbox" component={Inbox} />
                        <Route path="*" component={Login} />
                    </Switch>
                </Router>
            </ApolloProvider>
        </Provider>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
