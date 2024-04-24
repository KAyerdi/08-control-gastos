//estamos creando un CustomHook para hacer uso del context

import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
  const context = useContext(BudgetContext)
  if(!context) {
    throw new Error('useBudget must bt use within a BudgetProvider')
  }
  return context
}

//utilizamos los hook de react para conectar con nuestro Context personalizado
