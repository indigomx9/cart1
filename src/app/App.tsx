import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Main } from "../containers/Main";
// import "./App.css";

const client = new QueryClient();

export const App = (): JSX.Element => {
    return (
        <QueryClientProvider client={client}>
            <React.Fragment>
                <Main />
            </React.Fragment>
        </QueryClientProvider>
    );
};


