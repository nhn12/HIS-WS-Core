import { ExceptionObject } from "../exception/exception-object";

/**
 * @description: Extends from Promise default.
*                Custome rejection/resolve following by this project. 
 *               Handle catch for async.
 *               Enhandment: cannot support for Observale-rxjs (Implement later).
 * @author: NamNguyen. 
 */

export class EnterprisePromise<T> extends Promise<T> {

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: ExceptionObject) => void) => void) {
        super(executor);
    }

    /**
     * Support handle catch for await/async.
     * @param errorExt
     */
    public await(
        errorExt?: object
    ): Promise<[ExceptionObject | undefined, T | undefined]> {
        return this
            .then<[undefined, T]>((data: T) => [undefined, data])
            .catch<[ExceptionObject, undefined]>(err => {
                if (errorExt) {
                    Object.assign(err, errorExt)
                }
                return [err, undefined];
            })
    }
}