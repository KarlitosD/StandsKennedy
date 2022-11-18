<script setup>
const password = ref("")
const isAdmin = ref(false)
const standName = ref("")
const error = ref(null)
const handleAdd = async () => {
    try {
        const newStand = await $fetch("/api/stands", {
            method: "POST",
            body: { name: standName.value }
        })
        await refresh()
        alert("El nuevo stand fue creado, su id es: " + newStand.id)
    } catch (error) {
        console.error(error.message)
        alert("Hubo un error :(")
    }
    standName.value = ""
}


const handleEnter = async () => {
    const res = await $fetch("/api/admin", {
        method: "POST",
        body: {
            password: password.value
        }
    })
    if (res.isAdmin) error.value = "Contraseña incorrecta"
    password.value = ""
    isAdmin.value = res.isAdmin
}

const { data: stands, refresh } = await useFetch("/api/stands")

</script>

<template>
    <div class="h-5/6 overflow-hidden flex items-center justify-center flex-col">
        <div v-if="isAdmin" class="flex flex-col justify-center">
            <form class="px-6 py-10 bg-base-200 shadow rounded-xl" @submit.prevent="handleAdd">
                <p class="text-2xl font-semibold mb-1">Agregar un stand</p>
                <label class="label max-w-lg flex gap-4 my-4">
                    Nombre del stand
                    <input type="text" class="input input-bordered w-full" placeholder="Nombre" v-model="standName" />
                </label>
                <button class="btn btn-primary w-full rounded-sm">Agregar</button>
            </form>
            <div class="flex gap-1 flex-wrap justify-center h-1/3 overflow-y-scroll" v-if="stands">
               <AdminCard v-for="stand in stands" :name="stand.name" :id="stand.id" @refresh="refresh"/>
            </div>
        </div>
        <form v-else class="px-6 py-10 bg-base-200 shadow rounded-xl" @submit.prevent="handleEnter">
            <p class="text-2xl font-semibold mb-1">Entrar como admin</p>
            <label class="label max-w-md flex gap-4 my-4">
                Contraseña
                <input type="password" class="input input-bordered" placeholder="Contraseña" v-model="password" />
            </label>
            <button class="btn btn-primary w-full rounded-sm">Ingresar</button>
        </form>
    </div>
</template>