<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="$emit('closeModal')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 sm:max-w-3xl">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <form class="space-y-6" action="#" method="POST">
                                    <div class="border-b border-gray-900/10 pb-12">
                                        <h2 class="text-base font-semibold leading-7 text-orange-950 mb-6">Ingredient
                                            Information
                                        </h2>

                                        <div
                                            class="border-t border-gray-900/10 pt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                                            <div class="sm:col-span-4">
                                                <label for="name"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                <div class="mt-2">
                                                    <input type="text" name="name" id="name" placeholder="Beef"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="vendor"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Vendor</label>
                                                <div class="mt-2">
                                                    <input type="text" name="vendor" id="vendor" placeholder="Rema1000"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="unit"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Unit</label>
                                                <div class="mt-2">
                                                    <select id="unit" name="unit"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6">
                                                        <option>gram</option>
                                                        <option>tbsp</option>
                                                        <option>tsp</option>
                                                        <option>ml</option>
                                                        <option>cl</option>
                                                        <option>dl</option>
                                                        <option>l</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="sm:col-span-4">
                                                <label for="email"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Weight pr.
                                                    Unit (gram)</label>
                                                <div class="mt-2">
                                                    <input id="email" name="email" type="number" placeholder="500"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="calories"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Calories</label>
                                                <div class="mt-2">
                                                    <input type="number" name="calories" id="calories" placeholder="700"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="protein"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Protein</label>
                                                <div class="mt-2">
                                                    <input type="number" name="protein" id="protein" placeholder="30"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="fat"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Fat</label>
                                                <div class="mt-2">
                                                    <input type="number" name="fat" id="fat" placeholder="15"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="sm:col-span-2">
                                                <label for="fibers"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Fibers</label>
                                                <div class="mt-2">
                                                    <input type="number" name="fibers" id="fibers" placeholder="4"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" @click="$emit('closeModal')"
                                            class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                        <button type="submit"
                                            class="rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">Save</button>
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
  
<script setup>
import { defineProps } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps(['open']);
</script>