import { defineStore } from "pinia"
import { computed, ref } from "vue"

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
  const searchQuery = ref('')
  const cargoFilter = ref<string | undefined>(undefined)

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

  const filteredMembers = computed(() => {
    let result = members.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(member => 
            member.nome.toLowerCase().includes(query) 
        )
    }

    if (cargoFilter.value) {
        result = result.filter(member => member.cargo === cargoFilter.value)
    }

    return result
})

const resetFilters = () => {
  searchQuery.value = ''
  cargoFilter.value = undefined
}


  return {
    members,
    loading,
    error,
    addMember,
    deleteMember,
    getMemberById,
    membersQuantity,
    searchQuery,
    cargoFilter,
    filteredMembers,
    resetFilters,
  }

},
{
  persist: { key: 'members' }  
}
)