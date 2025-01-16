function deepClone<T>(v: T): T {
    if (typeof v !== "object") {
        return v;
    }
    let clone: any = {};
    for (let k in v) {
        clone[k] = deepClone(v[k]);
    }
    return clone;
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

function deepDiff<T extends object>(o1: DeepPartial<T>, o2: DeepPartial<T>): DeepPartial<T> {
    let diff: DeepPartial<T> = {};
    for (let k1 in o1) {
        if (!(k1 in o2)) {
            diff[k1] = o1[k1];
        }
    }
    for (let k in o2) {
        let v2 = o2[k];
        if (!(k in o1)) {
            diff[k] = v2;
            continue;
        }

        let v1 = o1[k];

        if (typeof v1 !== "object" && typeof v2 !== "object") {
            if (v1 != v2) {
                diff[k] = v2;
            }
        } else if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length) {
                diff[k] = v2;
            } else {
                let different = false;
                for (let i = 0; i < v2.length; i++) {
                    if (v1[i] != v2[i]) {
                        different = true;
                        break;
                    }
                }
                if (different) {
                    diff[k] = v2;
                }
            }
        } else if (v1 && v2) {
            diff[k] = deepDiff(v1, v2);
        }
    }
    return diff;
}

export function useApi<T extends object>(plural: string, singular: string, defaultValue: T) {
  return async (id: Ref<any>) => {
    let data: Ref<T | null> = ref(null);
    let saving = ref(false);
    let reference: DeepPartial<T> = {};

    let save = async () => {
        if (data.value == null) { throw new Error("Cannot save before data is loaded"); }
        if (saving.value) { throw new Error("A save request is already in progress"); }

        try {
            saving.value = true;
            const isCreate = id.value === 'add';
            const url = isCreate ? `/api/${plural}` : `/api/${plural}/${id.value}`;
            let change: DeepPartial<T> = deepDiff(reference, data.value);
            if ('id' in change) {
                delete change.id;
            }
            await $fetch(url, {
                method: isCreate ? 'POST' : 'PUT',
                body: {
                    [singular]: change,
                }
            });
        } finally {
            saving.value = false;
        }
    };

    watch(id, async (newId) => {
        if (saving.value) { throw new Error("Id changed while saving was in progress"); }

        if (newId === 'add') {
            data.value = Object.assign({}, defaultValue);
        } else if (newId !== null && newId !== undefined) {
            data.value = null;
            let result = await useFetch<any>(`/api/${plural}/${id.value}`);
            if (result.data.value == null) { return; }
            data.value = result.data.value[singular];
            reference = data.value ? deepClone(data.value) : {};
        }
    }, { immediate: true });

    return { data, saving, save };
  };
}
