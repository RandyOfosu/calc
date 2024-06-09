'use client'

export const runtime = "edge";

import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previousOperand == null) {
          return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state,currentOperand: null }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }


    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
    }
    return {
      ...state,
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: evaluate(state),
    }
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0.
})
function formatOperand(operand){
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate({ currentOperand, previousOperand, operation }, dispatch) {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "x":
      computation = prev * curr
      break
    case "÷":
      computation = prev / curr
      break
  }
    return computation.toString()
}

export default function Home() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div>
      <div className="h-screen items-center justify-center flex grid-col-3">
        <div className="block">
          {/* <div className="text-end">123</div> */}
          <div className="flex justify-between mb-3">

            <div className="text-sky-950 text-2xl font-mono font-bold"> 
            calculator
            </div>
{/* 
              <div className="flex gap-2">
                  <div className="text-sky-950 font-mono font-bold">
                    theme
                  </div>
                  <div className="bg-sky-950 px-1 rounded-full">
                  <label>
                    <input type="radio" />
                    <input type="radio" />
                    <input type="radio" />
                  </label>
              </div>
            </div> */}
          </div>

            {/* Scherm */}
          <div className="rounded-md w-full mb-5 p-8 bg-sky-950 text-white text-nowrap text-end text-7xl font-bold font-mono">
            <div className="output">
              <div className="previous-operand text-base text-slate-400 "> { formatOperand(previousOperand) } { operation } </div>
              <div className="current-operand" contentEditable={true} data-text="0" >{ formatOperand(currentOperand) }</div>
            </div>
          </div>
          
          {/* Toetsenbord */}
          <div className="bg-sky-950 p-4 rounded-lg grid grid-rows-5 grid-flow-col gap-4">
            {/* eerste rij */}
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="." dispatch={dispatch} />
            {/* tweede rij */}
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            {/* derde rij */}
            <DigitButton digit="9" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operation="÷" dispatch={dispatch} />
            {/* vierde rij */}
            <button className="bg-orange-500 border-b-red-600 text-red-700/80" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} >
              DEL</button>
            <OperationButton operation="+" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />
            <OperationButton operation="x" dispatch={dispatch} />
            {/* Onderste rij */}
            <button className="col-span-2 col-start-1 col-end-3 grid-rows-subgrid row-start-5 bg-orange-500 border-b-red-600 text-red-700/80" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>RESET</button>
            <button className="col-span-2 col-start-3 col-end-5 grid-rows-subgrid row-start-5 bg-blue-600 border-b-blue-900 text-blue-950" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}
