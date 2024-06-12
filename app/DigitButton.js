'use client'
import { ACTIONS } from "./page"

export default function DigitButton({ dispatch, digit }) {
    return (
    <button className="2xl:pt-6 2xl:pb-6 2xl:pl-12 2xl:pr-12 xl:pt-4 xl:pb-4 xl:pl-10 xl:pr-10 lg:pt-4 lg:pb-4 lg:pl-8 lg:pr-8 pt-1 pb-1 pl-5 pr-5 rounded-lg border-b-8 font-bold" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
        {digit}
    </button>
    )
}