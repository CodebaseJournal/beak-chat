export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const error = new Error("Validation Failed");
        error.statusCode = 400;
        error.validationErrors = result.error.flatten().fieldErrors;
        return next(error);
    }

    req.body = result.data;
    next();
}