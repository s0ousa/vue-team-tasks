import { defineStore } from "pinia"
import { ref } from "vue"

export interface ButtonAction {
    text: String,
    onClick: () => void
}

export const useHeaderStore = defineStore('header', () => {
    const pageTitle = ref('titulo')
    const pageDescription = ref('')
    const buttonAction = ref<ButtonAction | null> (null)

    function setHeader(title:string, description:string, action: ButtonAction) {
        pageTitle.value = title
        pageDescription.value = description
        buttonAction.value = action
    }

    function clearHeader() {
        pageTitle.value = 'Página Inicial'
        pageDescription.value = ''
        buttonAction.value = null
      }


      return {
        pageTitle,
        pageDescription,
        buttonAction,
        setHeader,
        clearHeader
      }
})