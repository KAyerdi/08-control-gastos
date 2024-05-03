import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const { dispatch, state } = useBudget();

  useEffect(() => {
    if(state.editingId){
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      }}
      , [state.editingId])



  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validar
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son requeridos");
      return;
    }

    //Agregar o actualizar el gasto
    if(state.editingId){
        dispatch({type: 'update-expense', payload: {expense : {id: state.editingId, ...expense}}})
    }else {
        dispatch({ type: "add-expense", payload: { expense } });
    }


    //Reiniciar el State
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 '>
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='flex flex-col gap-2'>
        <label htmlFor='expenseName' className='text-xl'>
          Nombre del Gasto:
        </label>
        <input
          type='text'
          id='expenseName'
          placeholder='Añade el nombre del gasto'
          className='bg-slate-100 p-2'
          name='expenseName'
          onChange={handleChange}
          value={expense.expenseName}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Cantidad:
        </label>
        <input
          type='number'
          id='expenseName'
          placeholder='Añade la cantida del gasto: ej. 300'
          className='bg-slate-100 p-2'
          name='amount'
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='category' className='text-xl'>
          Categoria:
        </label>
        <select
          id='category'
          className='bg-slate-100 p-2'
          name='category'
          onChange={handleChange}
          value={expense.category}
        >
          <option value=''>-- Seleccione --</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Fecha Gasto:
        </label>
        <DatePicker
          className='bg-slate-100 p-2 border-0'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type='submit'
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      />
    </form>
  );
}
