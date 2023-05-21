import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store, persistor } from "./app/store"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
