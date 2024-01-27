const asyncHandler = (requestHndler) => {
    return (req, res, next) => {
        Promise.resolve(requestHndler(req, res, next))
            .catch(
                (error) => next(error));
    }
}

export { asyncHandler }