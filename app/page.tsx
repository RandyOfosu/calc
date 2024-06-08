'use client'

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

        if (state.previousOperand == null) {
            return{
            ...state,
            operation: payload.operation,
            previousOperand: state.currenOperand,
            currentOperand: null
          }
        }

      case ACTIONS.CLEAR:
        return {}
  }
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
          <div className="rounded-md w-full mb-5 p-8 bg-sky-950 text-white text-end text-7xl font-bold font-mono">
            <div className="output">
              <div className="previous-operand">{ previousOperand } { operation } </div>
              <div className="current-operand">{ currentOperand }</div>
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
            <OperationButton operation="/" dispatch={dispatch} />
            {/* vierde rij */}
            <OperationButton operation="DEL" dispatch={dispatch} />
            <OperationButton operation="+" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />
            <OperationButton operation="x" dispatch={dispatch} />
            {/* Onderste rij */}
            <button className="col-span-2 col-start-1 col-end-3 grid-rows-subgrid row-start-5 bg-orange-500 border-b-red-600 text-red-700/80" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>RESET</button>
            <button className="col-span-2 col-start-3 col-end-5 grid-rows-subgrid row-start-5 bg-blue-600 border-b-blue-900 text-blue-950">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}
