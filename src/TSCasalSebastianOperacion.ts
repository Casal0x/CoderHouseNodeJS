export const SUMAR = (num1: number, num2: number) => {
    const result = num1 + num2
    return new Promise(resolve => resolve(result))
}

export const RESTAR = (num1: number, num2: number) => {
    const result = num1 - num2
    return new Promise(resolve => resolve(result))
}