import { MathField, addStyles } from "react-mathquill";
import Equation from "./components/Equation";
import { useEffect, useState } from "react";

addStyles();

export default function App() {
    const [equations, setEquations] = useState<MathField[]>([]);

    useEffect(() => {
        console.log(equations);
    }, [equations]);

    return (
        <main className="w-full flex flex-col items-center">
            <div className="max-w-screen-lg w-full">
                <Equation
                    onMount={mathField => setEquations(e => [...e, mathField])}
                />
            </div>
        </main>
    );
};