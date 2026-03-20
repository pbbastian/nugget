<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

interface Props {
  open: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  close: []
  save: [date: string]
}>()

const selectedDate = ref(getTodayDateValue())

watch(() => props.open, (open) => {
  if (open) {
    selectedDate.value = getTodayDateValue()
  }
})

function getTodayDateValue() {
  const today = new Date()
  const year = today.getFullYear()
  const month = `${today.getMonth() + 1}`.padStart(2, '0')
  const day = `${today.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function handleSubmit() {
  if (!selectedDate.value) {
    return
  }

  emit('save', selectedDate.value)
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xs transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4" @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <div>
                    <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                      Vælg dato
                    </DialogTitle>
                    <p class="mt-2 text-sm text-gray-500">
                      Vælg hvilken dag opskriften skal registreres som lavet.
                    </p>
                  </div>

                  <NuggetFormInput
                    id="made-at"
                    v-model="selectedDate"
                    type="date"
                    name="madeAt"
                    label="Dato"
                    variant="shadow"
                    required
                  />
                </div>

                <div class="mt-6 flex flex-col-reverse gap-3 bg-gray-50 sm:-mx-6 sm:-mb-4 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
                  <NuggetButton
                    variant="outlined"
                    color="secondary"
                    :disabled="loading"
                    @click="emit('close')"
                  >
                    Annuller
                  </NuggetButton>
                  <NuggetButton
                    type="submit"
                    variant="filled"
                    color="primary"
                    :disabled="!selectedDate || loading"
                    :loading="loading"
                  >
                    Gem dato
                  </NuggetButton>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
