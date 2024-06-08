import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="h-screen items-center justify-center flex grid-col-3">
        <div className="block">
          <div className="text-end">123</div>
          <div className="flex justify-between mb-3">

            <div className="text-sky-950 font-mono font-bold"> 
            calculator
            </div>

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
            </div>
          </div>

          <div>
            <input className="rounded-md w-full mb-5 p-5 bg-sky-950 text-white text-end text-3xl font-bold font-mono" type="text"/>
          </div>
          
          <div className="bg-sky-950 p-4 rounded-lg grid grid-rows-5 grid-flow-col gap-4">
            {/* eerste rij */}
            <button>
              7
            </button>
            <button>
              4
            </button>
            <button>
              1
            </button>
            <button>
              .
            </button>
            {/* tweede rij */}
            <button>
              8
            </button>
            <button>
              5
            </button>
            <button>
              2
            </button>
            <button>
              0
            </button>
            {/* derde rij */}
            <button>
              9
            </button>
            <button>
              6
            </button>
            <button>
              3
            </button>
            <button>
              /
            </button>
            {/* vierde rij */}
            <button className="bg-orange-500 border-b-red-600 text-red-700/60">
              DEL
            </button>
            <button>
              +
            </button>
            <button>
              -
            </button>
            <button>
              X
            </button>
            {/* Onderste rij */}
            <button className="col-span-2 col-start-1 col-end-3 grid-rows-subgrid row-start-5 bg-orange-500 border-b-red-600 text-red-700/60">RESET</button>
            <button className="col-span-2 col-start-3 col-end-5 grid-rows-subgrid row-start-5 bg-blue-600 border-b-blue-900 text-blue-950">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}
