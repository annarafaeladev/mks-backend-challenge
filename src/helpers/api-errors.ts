export class CustomError extends Error {
    public readonly statusCode: number


    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export class BadRequestError extends CustomError {

    constructor(message: string, field?: string | null) {
        if (field)
            super(message.replace('{field}', field), 400);
        else
            super(message, 400);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401)
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500)
    }
}