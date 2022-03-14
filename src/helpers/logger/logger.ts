// check the current env, if dev log normally, else log into error monitoriing platform like bugsnag, sentry...

export default function log(message: string): void {
    console.log(message);
}

export function warn(message: string): void {
    console.warn(message);
}

export function error(error: Error | any): never {
    console.error(error);
    throw new Error(error);
}
