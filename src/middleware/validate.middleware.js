import { validationResult } from "express-validator";


const validate = (validationRules) => {

    return async(req, res, next) => {

        // Run all validation rules
        await Promise.all(
            validationRules.map(
                (validation) => validation.run(req)
            )
        );


        // Get validation errors
        const errors = validationResult(req);


        if (!errors.isEmpty()) {

            return res.status(400).json({

                success: false,

                message: "Validation failed",

                errors: errors.array().map((error) => ({

                    field: error.path,

                    message: error.msg

                }))

            });
        }


        next();
    };
};


export default validate;