<script setup lang="ts">
import { Rotate3D, RotateCcw, RotateCcwIcon, RotateCcwKey, RotateCcwKeyIcon, SearchIcon } from 'lucide-vue-next';
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
import { cargos } from '@/types/schemas/MemberFormSchema'



</script>

<template>
    <div class="flex flex-col gap-4 md:flex-row mt-8">
     
     <InputGroup class="h-12 ">
       <InputGroupInput placeholder="Buscar membros..."  />
       <InputGroupAddon>
         <SearchIcon />
       </InputGroupAddon>
     </InputGroup>
 
     <div class="flex items-center gap-4">
         
         <Select class="">  
             <SelectTrigger class="w-full !h-12 md:w-40">
                 <SelectValue placeholder="Cargo" />
             </SelectTrigger>
             <SelectContent>
                 <SelectGroup>
                     <SelectLabel>Cargos</SelectLabel>
                     <SelectItem  v-for="(cargo, index) in cargos" 
                        :key="index" 
                        :value="cargo"
                >
                         {{ cargo }}
                     </SelectItem>
                   
                 </SelectGroup>
             </SelectContent>
         </Select>
         
         <Button variant="outline" size="icon" class="h-12 w-12">
             <RotateCcwIcon />
         </Button>
     </div>
    
   </div>
 </template>



<style scoped>

</style>