function hasOneOrMoreKeys(obj: object): boolean {
    let count = 0;
    for (let _ in obj) {
        if (++count > 1) {
            return false;
        }
    }
    return true;
}
export default defineNuxtPlugin(_ => {
    const api = $fetch.create({
        baseURL: '/api/',
        parseResponse(responseText) {
            let cache = new Map();
            return JSON.parse(responseText, function (_, value) {
                if (value && typeof value === 'object' && '$ref' in value) {
                    let $ref = value.$ref;
                    let cached = cache.get($ref);
                    if (!cached) {
                        if (hasOneOrMoreKeys(value)) {
                            cached = {};
                        } else {
                            delete value.$ref;
                            cached = value;
                        }
                        cache.set($ref, cached);
                    } else if (!hasOneOrMoreKeys(value)) {
                        delete value.$ref; 
                        Object.assign(cached, value);
                    }

                    return cached;
                }

                return value;
            });
        },
    })
    return {
        provide: {
            api
        }
    }
})
