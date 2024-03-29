<template>
    <div class="lg:flex lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">Edit recipe
            </h2>
        </div>
        <div class="mt-5 flex gap-4 lg:ml-4 lg:mt-0">
            <button type="button" @click="deleteModalOpen = true"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-400 hover:bg-red-50">
                <Icon icon="teenyicons:bin-outline" class="text-red-400 h-5 w-5" />
                Delete
            </button>
            <button type="button"
                class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Icon icon="lets-icons:folder-dublicate-light" class="text-gray-700 h-6 w-6" />
                Duplicate
            </button>
        </div>
    </div>
    <div class="mt-6">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Generel information</h2>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="recipename" class="block text-sm font-medium leading-6 text-gray-900">Recipe
                                name</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                                    <input type="text" name="recipename" id="recipename"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Nuggets med fritter" />
                                </div>
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="portions"
                                class="block text-sm font-medium leading-6 text-gray-900">Portions</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 sm:max-w-md">
                                    <input type="number" name="portions" id="portions"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="4" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <p class="block text-sm font-medium leading-6 text-gray-900">Recipe
                                photo</p>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <Icon icon="f7:photo-fill" class="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true" />
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label for="cover-photo"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-600">
                                            <span>Upload a file</span>
                                            <input id="cover-photo" name="cover-photo" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="tags" class="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500">
                                    <input type="search" name="tags" id="tags"
                                        class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Aftensmad" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Ingredients</h2>

                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Steps</h2>
                    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-6">
                        <div v-for="(step, index) in steps" class="col-span-full">
                            <div class="flex justify-between items-end">
                                <label :for="'step' + index" class="block text-sm font-medium leading-6 text-gray-900">Step <span>{{ index+1 }}</span></label>
                                <button @click="steps.splice(index, 1)" type="button"><Icon icon="teenyicons:bin-outline" class="text-red-400 hover:text-red-600 transition-colors duration-300 h-5 w-5" /></button>
                            </div>
                            <div class="mt-2">
                                <textarea :id="'step' + index" :name="'step' + step" rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <div class="col-span-full flex justify-end">
                            <button 
                                type="button" 
                                @click="addStep"
                                class="rounded-md flex items-center gap-2 bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">
                                <Icon icon="lets-icons:add-round" class="text-white h-6 w-6" />
                                Add step
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button @click="$router.go(-1)" type="button"
                    class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"
                    class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-500">Save</button>
            </div>
        </form>
    </div>
    <DeleteModal :open="deleteModalOpen" @close-delete-modal="deleteModalOpen = false" />
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import DeleteModal from "../components/modals/DeleteModal.vue";

    const deleteModalOpen = ref(false);

    let steps = ref(['']);
    let tags = ref(['Kylling', 'Aftensmad', 'Skinny', 'Ris']);
    let selectedTags = ref(['Aftensmad', 'Skinny']);
    let ingredients = ref(['Kylling', 'Gulerødder', 'Sødmælk', 'Ris']);

    const addStep = () => {
        steps.value.push('');
        console.log(steps.value);
    }; 
</script>
