import './HeaderComponent.tsx'

import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from '../routeTree.gen.ts'
import {Context, LoadContext} from "../dashboard/Context.tsx";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContextProvider.tsx";

const router = createRouter({routeTree})
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    const authContext = useContext(AuthContext);
    const [size, setSize] = React.useState<number>(30);
    const [loadImage, setLoadImage] = React.useState<number>(0);
    if (!authContext.isAuthenticated) {
        return;
    } else
        return (
            <>
                <Context.Provider value={{size, setSize}}>
                    <LoadContext.Provider value={{loadImage, setLoadImage}}>
                        <RouterProvider router={router}/>
                    </LoadContext.Provider>
                </Context.Provider>
            </>
        )
}

export default App
