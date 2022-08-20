export class PeristenceErrorBecauseNotExist extends Error {
    constructor() {
        super('Not Exist')
    }
}