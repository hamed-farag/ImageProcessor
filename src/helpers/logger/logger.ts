// check the current env, if dev log normally, else log into error monitoriing platform like bugsnag, sentry...

export function log(message: string): void {
    console.log(message);
}

export function warn(message: string): void {
    console.warn(message);
}

export function error(message: string, error: Error | any): void {
    console.error(message, error);
}
