<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  id: 'add' | number | null
  readonly?: boolean
}>()

const emit = defineEmits<{
  closeModal: []
  saved: []
}>()

const isEditing = ref(false)

// Reset editing mode when modal opens/closes
watch(toRef(props, 'id'), (value) => {
  if (value === null) {
    isEditing.value = false
  }
})

const { data, refresh, clear } = await useAPI<Ingredient>(computed(() => `ingredients/${props.id}`), { immediate: false, watch: false })
watch(toRef(props, 'id'), (value, _) => {
  if (value === 'add') {
    data.value = reactive({
      id: 'add',
      name: '',
      energy: null,
      fat: null,
      carbs: null,
      fibres: null,
      protein: null,
      density: null,
      weight: null,
      vendor: null,
    })
  }
  else if (value) {
    refresh()
  }
  else {
    clear()
  }
})
const { saving, save, success } = useEdit('ingredients', data)
</script>

<template>
  <TransitionRoot v-if="data != null" as="template" :show="props.id !== null" @after-leave="data = null">
    <Dialog as="div" class="relative z-50" @close="$emit('closeModal')">
      <TransitionChild
        as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-sm transition-all sm:my-8 sm:max-w-3xl"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <form class="space-y-6" action="#" method="POST">
                  <div class="border-b border-gray-900/10 pb-12">
                    <div class="mb-2 flex items-center justify-between">
                      <h2 class="text-base font-semibold text-orange-950">
                        {{ (props.readonly && !isEditing) ? 'Ingredient Details' : 'Ingredient Information' }}
                      </h2>
                      <NuggetButton
                        v-if="props.readonly && !isEditing"
                        variant="ghost"
                        color="primary"
                        icon="circum:edit"
                        @click="isEditing = true"
                      >
                        Edit
                      </NuggetButton>
                    </div>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-gray-900/10 pt-6 sm:grid-cols-10">
                      <div class="col-span-2 sm:col-span-5">
                        <NuggetFormInput
                          id="name"
                          v-model="data.name"
                          type="text"
                          name="name"
                          label="Name"
                          placeholder="Beef"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="col-span-2 sm:col-span-5">
                        <NuggetFormInput
                          id="vendor"
                          v-model="data.vendor"
                          type="text"
                          name="vendor"
                          label="Vendor (optional)"
                          placeholder="Rema 1000"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-5">
                        <NuggetFormInput
                          id="density"
                          v-model="data.density"
                          type="number"
                          name="density"
                          label="Density (g/ml) (optional)"
                          placeholder="None"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-5">
                        <NuggetFormInput
                          id="weight"
                          v-model="data.weight"
                          type="number"
                          name="weight"
                          label="Weight (g/pc) (optional)"
                          placeholder="None"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <NuggetFormInput
                          id="calories"
                          v-model="data.energy"
                          type="number"
                          name="calories"
                          label="Calories"
                          placeholder="700"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <NuggetFormInput
                          id="fat"
                          v-model="data.fat"
                          type="number"
                          name="fat"
                          label="Fat"
                          placeholder="15"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <NuggetFormInput
                          id="carbs"
                          v-model="data.carbs"
                          type="number"
                          name="carbs"
                          label="Carbs"
                          placeholder="15"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <NuggetFormInput
                          id="fibers"
                          v-model="data.fibres"
                          type="number"
                          name="fibers"
                          label="Fibers"
                          placeholder="4"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <NuggetFormInput
                          id="protein"
                          v-model="data.protein"
                          type="number"
                          name="protein"
                          label="Protein"
                          placeholder="30"
                          variant="shadow"
                          :readonly="props.readonly && !isEditing"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <NuggetButton
                      v-if="!props.readonly || (props.readonly && isEditing)"
                      variant="ghost"
                      color="secondary"
                      @click="props.readonly && isEditing ? (isEditing = false, refresh()) : $emit('closeModal')"
                    >
                      Cancel
                    </NuggetButton>
                    <NuggetButton
                      v-if="props.readonly && !isEditing"
                      variant="filled"
                      color="primary"
                      @click="$emit('closeModal')"
                    >
                      Close
                    </NuggetButton>
                    <NuggetButton
                      v-if="!props.readonly || (props.readonly && isEditing)"
                      variant="filled"
                      color="primary"
                      :disabled="saving"
                      :loading="saving"
                      @click="save().then(() => { if (success) { emit('saved'); isEditing = false; if (!props.readonly) emit('closeModal') } })"
                    >
                      Save
                    </NuggetButton>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
