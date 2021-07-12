interface SingleOperation {
    num1: number,
    num2: number,
    operacion: string
}

const operacion = async (num1: number, num2: number, operacion: string) => {
    const { SUMAR, RESTAR } = await import('./TSCasalSebastianOperacion');

    const result = operacion === "sumar" ? await SUMAR(num1, num2) : operacion === "restar" ? await RESTAR(num1, num2) : -1

    return result;
}

const getResult = (num1: number, num2: number, operacion: string, result: any) => {
    return result === -1
        ? `La operacion "${operacion}" que intenta realizar no esta permitida. Solo se permite "sumar" y "restar"`
        : `el Resultado de "${operacion}" el numero ${num1} y el numero ${num2} es ${result}`;
}

const operaciones = async (opt: Array<SingleOperation> | SingleOperation) => {
    let response: string;
    if (Array.isArray(opt)) {
        opt.forEach(async (el) => {
            const result = await operacion(el.num1, el.num2, el.operacion);
            response = getResult(el.num1, el.num2, el.operacion, result);

            console.log(response);
        })
    } else {
        const result = await operacion(opt.num1, opt.num2, opt.operacion);
        response = getResult(opt.num1, opt.num2, opt.operacion, result);
        console.log(response);
    }
}

const testArray: Array<SingleOperation> = [
    { num1: 54, num2: 3, operacion: 'restar' },
    { num1: 2, num2: 3, operacion: 'sumar' },
    { num1: 5, num2: 43, operacion: 'sumar' },
    { num1: 15, num2: 20, operacion: 'sumar' },
    { num1: 24, num2: 3, operacion: 'restar' },
    { num1: 24, num2: 3, operacion: 'dividir' },
];


const singleOperation = { num1: 2, num2: 2, operacion: 'sumar' };

operaciones(testArray);
operaciones(singleOperation);