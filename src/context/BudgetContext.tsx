import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
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

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) , [state.expenses])

  const remainingBudget = state.budget - totalExpenses

  return(
      <BudgetContext.Provider
        value={{
          state,
          dispatch,
          totalExpenses,
          remainingBudget
        }}
      >
        {children}
      </BudgetContext.Provider>
  )
}