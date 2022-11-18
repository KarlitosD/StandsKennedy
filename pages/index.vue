<script setup>
const { data: stands } = await useFetch("/api/stands")
const selectedStand = ref("")
const openModal = ref(false)

const handleSearch = () => {
    if(!selectedStand.value) return
    const stand = stands.value.find(stand => stand.name === selectedStand.value)
    navigateTo(`/${stand.id}`)
}

useHead({ title: () => `StandsKennedy` })
console.log(stands.value)
</script>

<template>
    <main class="h-5/6 pt-10">
        <div class="form-control my-2">
            <div class="input-group flex justify-center px-3">
                <input list="ice-cream-flavors" class="input w-full input-bordered" id="ice-cream-choice"
                    name="ice-cream-choice" placeholder="Buscar stand" v-model="selectedStand" :autocomplete="stands.length > 0">
                <datalist id="ice-cream-flavors">
                    <option v-for="stand in stands" :value="stand.name" :key="stand.id" />
                </datalist>
                <button class="btn btn-square border border-primary-content" @click="handleSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="h-3/4 flex flex-col justify-center items-center gap-4">
            <a href="#escanear" class="btn btn-primary btn-lg" @click="openModal = true">Escanear</a>
        </div>
        <ClientOnly>
            <Modal v-if="openModal"/>
        </ClientOnly>
    </main>
</template>