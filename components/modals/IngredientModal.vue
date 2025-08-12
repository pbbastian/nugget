<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  id: 'add' | number | null
}>()

const emit = defineEmits<{
  closeModal: []
}>()

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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              class="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-3xl"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <form class="space-y-6" action="#" method="POST">
                  <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="mb-6 text-base font-semibold leading-7 text-orange-950">
                      Ingredient
                      Information
                    </h2>

                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10 pt-6 sm:grid-cols-10">
                      <div class="sm:col-span-5">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Name</label>
                        <div class="mt-2">
                          <input
                            id="name" v-model="data.name" type="text" name="name" placeholder="Beef"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-5">
                        <label
                          for="vendor"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Vendor</label>
                        <div class="mt-2">
                          <input
                            id="vendor" v-model="data.vendor" type="text" name="vendor" placeholder="Rema1000"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-5">
                        <label
                          for="density"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Density (g/ml) (optional)</label>
                        <div class="mt-2">
                          <input
                            id="density" v-model="data.density" name="density" type="number" placeholder="None"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-5">
                        <label
                          for="weight"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Weight (g/pc) (optional)</label>
                        <div class="mt-2">
                          <input
                            id="weight" v-model="data.weight" name="weight" type="number" placeholder="None"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="calories"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Calories</label>
                        <div class="mt-2">
                          <input
                            id="calories" v-model="data.energy" type="number" name="calories" placeholder="700"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="fat"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Fat</label>
                        <div class="mt-2">
                          <input
                            id="fat" v-model="data.fat" type="number" name="fat" placeholder="15"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="fat"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Carbs</label>
                        <div class="mt-2">
                          <input
                            id="fat" v-model="data.carbs" type="number" name="fat" placeholder="15"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="fibers"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Fibers</label>
                        <div class="mt-2">
                          <input
                            id="fibers" v-model="data.fibres" type="number" name="fibers" placeholder="4"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="protein"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >Protein</label>
                        <div class="mt-2">
                          <input
                            id="protein" v-model="data.protein" type="number" name="protein" placeholder="30"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button" class="text-sm font-semibold leading-6 text-gray-900"
                      @click="$emit('closeModal')"
                    >
                      Cancel
                    </button>
                    <button
                      type="button" :disabled="saving" class="rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                      @click="save().then(() => emit('closeModal'))"
                    >
                      Save
                    </button>
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
