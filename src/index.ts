import prompts from "prompts"

import FIFO from "./algorithms/fifo"
import NRU from "./algorithms/nru"
import SecondChance from "./algorithms/secondChance"
import Clock from "./algorithms/clock"
import MRU from "./algorithms/mru"

import Page from "./page"

function fifo() {
  const memorySize = 4
  const fifo = new FIFO(memorySize)

  console.log("Adicionando página de ID `A`.")
  fifo.addPageToMemory(new Page("A"))
  console.log("Adicionando página de ID `B`.")
  fifo.addPageToMemory(new Page("B"))
  console.log("Adicionando página de ID `C`.")
  fifo.addPageToMemory(new Page("C"))
  console.log("Adicionando página de ID `D`.")
  fifo.addPageToMemory(new Page("D"))

  console.log("Lista de páginas adicionadas:", fifo.memory, "\n")

  console.log("Primeira página substituída por nova página de ID `E`.")
  fifo.addPageToMemory(new Page("E"))

  console.log("Lista de páginas atualizada:", fifo.memory, "\n")

  console.log("Segunda página substituída por nova página de ID `F`.")
  fifo.addPageToMemory(new Page("F"))

  console.log("Lista de páginas atualizada:", fifo.memory)
}

function nru() {
  const memorySize = 4
  const recentUsageTimeThreshold = 5
  const nru = new NRU(memorySize, recentUsageTimeThreshold)

  console.log("Adicionando página de ID `A`.")
  nru.addPageToMemory(new Page("A"))
  console.log("Adicionando página de ID `B`.")
  nru.addPageToMemory(new Page("B"))
  console.log("Adicionando página de ID `C`.")
  nru.addPageToMemory(new Page("C"))
  console.log("Adicionando página de ID `D`.")
  nru.addPageToMemory(new Page("D"))

  console.log("Lista de páginas adicionadas:", nru.memory, "\n")

  console.log("Usando página de ID `A`.")
  nru.usePage("A")
  console.log("Usando página de ID `C`.")
  nru.usePage("C")
  console.log("Usando página de ID `D`.")
  nru.usePage("D")

  console.log("Lista de páginas atualizada:", nru.memory, "\n")

  console.log("Modificando página de ID `A`.")
  nru.modifyPage("A")
  console.log("Modificando página de ID `C`.")
  nru.modifyPage("C")
  console.log("Modificando página de ID `D`.")
  nru.modifyPage("D")

  console.log("Lista de páginas atualizada:", nru.memory, "\n")

  console.log("Substituindo página de ID `B` por uma nova de ID `E`.")
  nru.addPageToMemory(new Page("E"))
  console.log("Modificando página de ID `E`.")
  nru.modifyPage("E")

  console.log("Lista de páginas atualizada:", nru.memory, "\n")
}

function sc() {
  const memorySize = 4
  const sc = new SecondChance(memorySize)

  console.log("Adicionando página de ID `A`.")
  sc.addPageToMemory(new Page("A"))
  console.log("Adicionando página de ID `B`.")
  sc.addPageToMemory(new Page("B"))
  console.log("Adicionando página de ID `C`.")
  sc.addPageToMemory(new Page("C"))
  console.log("Adicionando página de ID `D`.")
  sc.addPageToMemory(new Page("D"))

  console.log("Lista de páginas adicionadas:", sc.memory, "\n")

  console.log("Adicionando página de ID `E`.")
  sc.addPageToMemory(new Page("E"))

  console.log("Usando página de ID `B`.")
  sc.usePage("B")

  console.log("Usando página de ID `D`.")
  sc.usePage("D")

  console.log("Adicionando página de ID `F`.")
  sc.addPageToMemory(new Page("F"))

  console.log("Lista de páginas atualizada:", sc.memory, "\n")

  console.log("Adicionando página de ID `G`.")
  sc.addPageToMemory(new Page("G"))

  console.log("Usando página de ID `E`.")
  sc.usePage("E")

  console.log("Adicionando página de ID `H`.")
  sc.addPageToMemory(new Page("H"))

  console.log("Lista de páginas atualizada:", sc.memory, "\n")
}

function clock() {
  const memorySize = 4
  const clock = new Clock(memorySize)

  console.log("Adicionando página de ID `A`.")
  clock.addPageToMemory(new Page("A"))
  console.log("Adicionando página de ID `B`.")
  clock.addPageToMemory(new Page("B"))
  console.log("Adicionando página de ID `C`.")
  clock.addPageToMemory(new Page("C"))
  console.log("Adicionando página de ID `D`.")
  clock.addPageToMemory(new Page("D"))

  console.log("Lista de páginas adicionadas:", clock.memory, "\n")

  console.log("Adicionando página de ID `E`.")
  clock.addPageToMemory(new Page("E"))

  console.log("Usando página de ID `B`.")
  clock.usePage("B")

  console.log("Usando página de ID `D`.")
  clock.usePage("D")

  console.log("Adicionando página de ID `F`.")
  clock.addPageToMemory(new Page("F"))

  console.log("Lista de páginas atualizada:", clock.memory, "\n")

  console.log("Usando página de ID `E`.")
  clock.usePage("E")

  console.log("Adicionando página de ID `G`.")
  clock.addPageToMemory(new Page("G"))

  console.log("Usando página de ID `E`.")
  clock.usePage("E")

  console.log("Usando página de ID `G`.")
  clock.usePage("G")

  console.log("Lista de páginas atualizada:", clock.memory, "\n")

  console.log("Usando página de ID `F`.")
  clock.usePage("F")

  console.log("Adicionando página de ID `H`.")
  clock.addPageToMemory(new Page("H"))

  console.log("Lista de páginas atualizada:", clock.memory, "\n")
}

function mru() {
  const memorySize = 4
  const mru = new MRU(memorySize)

  console.log("Adicionando página de ID `A`.")
  mru.addPageToMemory(new Page("A"))
  console.log("Adicionando página de ID `B`.")
  mru.addPageToMemory(new Page("B"))
  console.log("Adicionando página de ID `C`.")
  mru.addPageToMemory(new Page("C"))
  console.log("Adicionando página de ID `D`.")
  mru.addPageToMemory(new Page("D"))

  console.log("Lista de páginas adicionadas:", mru.memory, "\n")

  console.log("Usando página de ID `A`.")
  mru.usePage("A")
  console.log("Usando página de ID `C`.")
  mru.usePage("C")
  console.log("Usando página de ID `D`.")
  mru.usePage("D")

  console.log("Adicionando página de ID `E`.")
  mru.addPageToMemory(new Page("E"))

  console.log("Lista de páginas atualizada:", mru.memory, "\n")

  console.log("Usando página de ID `B`.")
  mru.usePage(mru.memory[1].id)

  console.log("Adicionando página de ID `F`.")
  mru.addPageToMemory(new Page("F"))
  
  console.log("Usando página de ID `C`.")
  mru.usePage(mru.memory[2].id)

  console.log("Adicionando página de ID `G`.")
  mru.addPageToMemory(new Page("G"))

  console.log("Lista de páginas atualizada:", mru.memory, "\n")

  console.log("Usando página de ID `A`.")
  mru.usePage(mru.memory[0].id)

  console.log("Adicionando página de ID `H`.")
  mru.addPageToMemory(new Page("H"))
  
  console.log("Lista de páginas atualizada:", mru.memory, "\n")
}

(async() => {
  const { algorithm }: { algorithm: string } = await prompts({
    type: "select",
    name: "algorithm",
    message: "Escolha um algoritmo",
    choices: [
      {
        title: "FIFO",
        value: "fifo",
      },
      {
        title: "NRU",
        value: "nru",
      },
      {
        title: "Second-Chance",
        value: "sc",
      },
      {
        title: "Clock",
        value: "clock",
      },
      {
        title: "MRU",
        value: "mru",
      },
    ],
  })

  switch (algorithm) {
    case "fifo":
      fifo()
      break

    case "nru":
      nru()
      break

    case "sc":
      sc()
      break

    case "clock":
      clock()
      break

    case "mru":
      mru()
      break
  }
})()
