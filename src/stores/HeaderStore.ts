import { defineStore } from "pinia"
import { ref } from "vue"

export interface ButtonAction {
    text: String,
    onClick: () => void
}

export const useHeaderStore = defineStore('header', () => {
    const pageTitle = ref('titulo')
    const pageDescription = ref('')
    const buttonText = ref('')
    const isDialogOpen = ref(false)

    function setHeader(title:string, description:string, textOfButton:string) {
        pageTitle.value = title
        pageDescription.value = description
        buttonText.value = textOfButton
    }

    function clearHeader() {
        pageTitle.value = 'Página Inicial'
        pageDescription.value = ''
        buttonText.value = ''
    }

    function openDialog() {
        isDialogOpen.value = true
    }

    function closeDialog() {
        isDialogOpen.value = false
    }

    return {
        pageTitle,
        pageDescription,
        buttonText,
        isDialogOpen,
        openDialog,
        closeDialog,
        setHeader,
        clearHeader
    }
})