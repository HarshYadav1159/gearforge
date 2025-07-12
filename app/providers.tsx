'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { store } from './store'
import { Provider } from "react-redux"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (<Provider store={store}>
        <QueryClientProvider client={queryClient}>
            
            {/* REMOVE THIS DURING PRODUCTION */}
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </Provider>)
}

export default Providers