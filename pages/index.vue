<script setup lang="ts">
const { data: stands } = await useFetch<{ id: string; name: string }[]>("/api/stands")
const selectedStand = shallowRef("")
const openModal = shallowRef(false)

const handleSearch = () => {
    if(!selectedStand.value || !stands.value) return
    const stand = stands.value.find(stand => stand.name === selectedStand.value)
    if(!stand) return
    navigateTo(`/${stand.id}`)
}

const needAutocomplete = stands.value ? stands?.value?.length > 0 : false 

useHead({ title: `StandsKennedy` })
</script>

<template>
    <main class="h-5/6 pt-10">
        <div class="form-control my-2">
            <div class="input-group flex justify-center px-3">
                <input list="stands-names" class="input w-full input-bordered" id="ice-cream-choice"
                    name="ice-cream-choice" placeholder="Buscar stand" v-model="selectedStand" :autocomplete="needAutocomplete ? 'on' : 'off'">
                <DatalistStand v-if="stands" :stands="stands" />
                <button role="button" class="btn btn-square border border-primary-content" @click="handleSearch" aria-label="search icon">
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