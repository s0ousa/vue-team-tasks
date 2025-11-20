import { defineStore } from "pinia"
import { ref } from "vue"

export type Cargo =
  | 'Tech Lead'
  | 'Desenvolvedor'
  | 'Gerente de Projetos'
  | 'Designer'
  | 'Analista';

export interface Member {
    id: string,
    nome: string,
    cargo: Cargo
    email: string,
    avatar: string,
}

export const useMembersStore = defineStore('members', () => {
  const members = ref<Member[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addMember = async (memberData: Omit<Member, 'id'>) => {
    loading.value = true
    error.value = null

    try {
      const newMember: Member = {
        id: crypto.randomUUID(),
        ...memberData
      }

      members.value.push(newMember)
      
      console.log(members.value);
      
      return newMember
      
    } catch (err) {
      error.value = 'Erro ao cadastrar novo membro'
      throw err
    } finally {
      loading.value = false
    }
  }

  const membersQuantity = () => members.value.length


  const deleteMember = (id: string) => {
    members.value = members.value.filter(m => m.id !== id)
  }

  const getMemberById = (id: string) => {
    return members.value.find(m => m.id === id)
  }

  return {
    members,
    loading,
    error,
    addMember,
    deleteMember,
    getMemberById,
    membersQuantity
  }

},
{
  persist: { key: 'members' }  
}
)