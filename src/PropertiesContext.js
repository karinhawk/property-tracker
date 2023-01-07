const PropertiesContext = React.createContext()

export function useProperties() {
  return useContext(PropertiesContext)
}