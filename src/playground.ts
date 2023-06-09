import fs from 'fs'

const numberFilesToCreate = 100

createFiles(numberFilesToCreate)

function createTextFile(fileNumber: number): string {
  return `<template>
  <h1>Javascript${fileNumber}</h1>
  {{ response }}
</template>

<script setup>
import { onMounted } from 'vue';
import { useGetApiJs } from '../composables/useGetApiJs'

const urlJson = new URL(window.location.origin + '/fichier.json')

const { get, response } =  /** @type {typeof useGetApiJs<string>} */(useGetApiJs)(urlJson)

onMounted(() => {
  get()
  console.log(${fileNumber})
})
</script>`
}
function createVueFile(filename: string, vueTextFile: string): void {
  fs.writeFileSync('./' + filename, vueTextFile)
}

function createMainFile(numberFilesToCreate: number) {
  const importsFilesList: string[] = []
  for (let i = 0; i < numberFilesToCreate; i++) {
    importsFilesList.push(
      `import VueComponent${i} from './VueComponent${i}.vue';`
    )
  }
  const templateFilesList: string[] = []
  for (let i = 0; i < numberFilesToCreate; i++) {
    templateFilesList.push(`<VueComponent${i}></VueComponent${i}>';`)
  }
  const mainFileText = `<script setup>
  ${importsFilesList.join('\n')}
  </script>
  
  <template>
    <div>
     ${templateFilesList.join('\n')}
    </div>
  </template>
  `
  createVueFile('App.vue', mainFileText)
}

function createFiles(numberFilesToCreate: number) {
  for (let i = 0; i < numberFilesToCreate; i++) {
    const vueTextFile = createTextFile(i)
    const filename = `VueComponent${i}.vue`
    createVueFile(filename, vueTextFile)
  }
  createMainFile(numberFilesToCreate)
}
