'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { store } from './store'
import { Provider } from "react-redux"
function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (<Provider store={store}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </Provider>)
}

export default Providers