import { createContext,useContext,useState } from "react"

export const DataContext = createContext(null)

export const useGetData = () => (useContext(DataContext))

const DataProvider = ({children}) => {
    const [account, setAccount] = useState({
        total:""
    })

  return (
    <DataContext.Provider value={{
        account,
        setAccount
    }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider