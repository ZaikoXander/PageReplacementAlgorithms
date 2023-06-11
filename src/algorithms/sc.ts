class PageSC {
    public pageNumber: number;
    public referenceBit: boolean;
  
    constructor(pageNumber: number, referenceBit: boolean) {
      this.pageNumber = pageNumber;
      this.referenceBit = referenceBit;
    }
  }
  
  class SecondChance {
    private pages: PageSC[];
    private clockHand: number;
  
    constructor() {
      this.pages = [];
      this.clockHand = 0;
    }
  
    public addPage(pageNumber: number): void {
      const page = new Page(pageNumber, false);
      this.pages.push(page);
    }
  
    public referencePage(pageNumber: number): void {
      const page = this.pages.find((p) => p.pageNumber === pageNumber);
      if (page) {
        page.referenceBit = true;
      }
    }
  
    public evictPage(): number {
      while (true) {
        const page = this.pages[this.clockHand];
        if (page.referenceBit) {
          page.referenceBit = false;
        } else {
          this.pages.splice(this.clockHand, 1);
          return page.pageNumber;
        }
  
        this.clockHand = (this.clockHand + 1) % this.pages.length;
      }
    }
  }
  
  // Exemplo de uso
  const secondChance = new SecondChance();
  
  secondChance.addPage(1);
  secondChance.addPage(2);
  secondChance.addPage(3);
  
  console.log(secondChance.evictPage()); // Saída: 1
  
  secondChance.referencePage(2);
  console.log(secondChance.evictPage()); // Saída: 3
  
  secondChance.addPage(4);
  console.log(secondChance.evictPage()); // Saída: 2
  