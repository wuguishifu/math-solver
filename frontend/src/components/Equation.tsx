import { useState } from "react";
import { EditableMathField, MathField } from "react-mathquill";
import { cn } from "../lib/utils";
import { toAST, evaluateAst } from '../../../solver/lib/ast';

type EquationProps = {
    onDown?: (_: MathField) => void;
    onUp?: (_: MathField) => void;
    onMount: (_: MathField) => void;
}

export default function Equation(props: EquationProps) {
    const { onDown, onUp, onMount } = props;

    const [latex, setLatex] = useState<string>('\\frac{1}{2}');
    const [focused, setFocused] = useState(false);

    return (
        <div className={cn("w-full border-2 flex flex-row items-center pr-2 text-2xl leading-none", focused ? 'border-blue-400' : 'border-gray-800')}>
            <EditableMathField
                mathquillDidMount={onMount}
                className="p-2 flex-1 text-2xl leading-none"
                latex={latex}
                onChange={(mathField) => setLatex(mathField?.latex())}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                config={{
                    handlers: {
                        downOutOf: onDown,
                        upOutOf: onUp
                    }
                }}
            />
            <div>= {(() => {
                try {
                    return evaluateAst(toAST(latex));
                } catch (error) {
                    return 'Error';
                }
            })()}</div>
        </div>
    );
};