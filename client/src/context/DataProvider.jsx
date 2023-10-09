import { createContext,useContext,useState } from "react"

export const DataContext = createContext(null)

export const useGetData = () => (useContext(DataContext))

const DataProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)

    const toggleDark = () =>{
      setIsDark(!isDark)
    }

  return (
    <DataContext.Provider value={{
        isDark,
        toggleDark
    }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider