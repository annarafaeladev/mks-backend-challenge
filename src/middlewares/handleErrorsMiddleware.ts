import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../helpers/api-errors'


export const handleErrorsMiddleware = (
    error: Error & Partial<CustomError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("handleMiddleware: ", error)

    if (error instanceof SyntaxError) {
        return res.status(400).json({ error: 'Requisição JSON inválida' });
    }
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    return res.status(statusCode).json({ message })
}
