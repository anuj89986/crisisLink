class ApiError extends Error{
    constructor(
        status,
        message = "Something went wrong",
        errors =[],
        stack = ""
    ){
        super(message),
        this.status = status,
        this.errors = errors,
        this.stack = stack
        this.data = null,
        this.message = message,
        this.success=false
    }
}
export {ApiError}
