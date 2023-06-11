class Page {
    public pageNumber: number;
    public referenceBit: boolean;
  
    constructor(pageNumber: number, referenceBit: boolean) {
      this.pageNumber = pageNumber;
      this.referenceBit = referenceBit;
    }
  }
  
  class Clock {
    private pages: Page[];
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
  const clock = new Clock();
  
  clock.addPage(1);
  clock.addPage(2);
  clock.addPage(3);
  clock.addPage(4);
  clock.referencePage(2);
  clock.referencePage(4);
  
  console.log(clock.evictPage()); // Saída: 1
  console.log(clock.evictPage()); // Saída: 3
  console.log(clock.evictPage()); // Saída: 2
  console.log(clock.evictPage()); // Saída: 4
  