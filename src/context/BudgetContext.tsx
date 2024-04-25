import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetState, budgetReducer, initialState, BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
  children: ReactNode
}
//el "createContext" nos permite crear nuestro context
export const BudgetContext = createContext<BudgetContextProps>(null!)

// el context nos sirve para generar el context que incluye los datos

export const BudgetProvider = ({children} : BudgetProviderProps) => {
  // el provider es de donde vienen los datos y de donde vienen las funciones

  const [state, dispatch] = useReducer(budgetReducer, initialState)
  //aqui le pasmos el Reducer dentro del provider


  return(
      <BudgetContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        {children}
      </BudgetContext.Provider>
  )
}