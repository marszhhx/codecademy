// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// To create multiple pAequor objects

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      // 1. randomly selecting a base in the object’s dna property
      let randomIndex = Math.floor(Math.random() * this.dna.length);
      
      // 2. changing the current base to a mutated base
      let mutatedBase = returnRandBase(); 
      while (this.dna[randomIndex] == mutatedBase) { 
        mutatedBase = returnRandBase() // if current base equals to mutated base, try again
      }
      // console.log(randomIndex, this.dna[randomIndex], mutatedBase);
      this.dna[randomIndex] = mutatedBase;

      // 3. return dna
      return this.dna;
    },
    compareDNA(anotherpAequorObj) {
      // 1. compare two DNA, compute numbers of bases identical in the same locations
      let numOfIdenticalBases = 0;
      for (let i = 0; i < anotherpAequorObj.dna.length; i++) { 
        if (anotherpAequorObj.dna[i] === this.dna[i]) {
          // console.log(anotherpAequorObj.dna[i], this.dna[i])
          numOfIdenticalBases++;
          // console.log(numOfIdenticalBases);
        }
      }
      // 2. prints a message: "% of common DNA"
      let commonPercentage = numOfIdenticalBases / 15 * 100;
      // console.log(`specimen #1 and specimen #2 have ${commonPercentage}% DNA in common.`);
      return commonPercentage;
    },
    willLikelySurvive() {
      // 1. if dna encounter 'C' or 'G' bases, survivalBases + 1;
      let survivalBases = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          survivalBases++;
        }
      })

      let survivalPercentage = Math.round(survivalBases / 15 * 100);
      // 2. return true if survivalPercentage > 60%
      return survivalPercentage > 60 ? true : false;
    },
    complementStrand() {
      let newStrand = [];

      // this.dna.forEach (base => {
      //   switch(base) {
      //     case 'A':
      //       newStrand.push('T');
      //       break;
      //     case 'T':
      //       newStrand.push('A');
      //       break;
      //     case 'G':
      //       newStrand.push('C');
      //       break;
      //     case 'C':
      //       newStrand.push('G');
      //       break;
      //   } 
      // })
      newStrand = this.dna.map(base => {
        switch(base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'G':
            return 'C';
          case 'C':
            return 'G';
        }
      })
      return newStrand;
    }
  }
}

// batch produce specimen that can survive 
const batchProduceSpecimen = quantity => {
  let specimenBatch = [];
  for(let i = 0; i < quantity; i++) {
    let specimen = pAequorFactory(i + 1,mockUpStrand());
    while (!specimen.willLikelySurvive()) { 
      specimen = pAequorFactory(i + 1,mockUpStrand()); // if it cannot survive, try another specimen;
    }
    specimenBatch.push(specimen);
  }
  return specimenBatch;
}

// find two most related pAequor objects in a batch
const findTwoMostRelated = specimenBatch => {
  // 1. compare similarity between specimenA and specimenB
  let highestPercentage = 0;
  let specimenPairs = []; // an object array to store specimen number pairs that are currently most similar
  for (let i = 0; i < specimenBatch.length; i++) {
    for (let j = i + 1; j < specimenBatch.length; j++) {
      let percentage = specimenBatch[i].compareDNA(specimenBatch[j]);
      // console.log(`SpecimenID: ${specimenBatch[i].specimenNum} & SpecimenID: ${specimenBatch[j].specimenNum} is ${percentage} similar`);
      // 2. log the highest percentage and both specimen IDs
      if (percentage >= highestPercentage) {
        highestPercentage = percentage;
        // if percentage is higher or same, add to the array
        specimenPairs.push({
          specimenNumA: specimenBatch[i].specimenNum, 
          specimenNumB: specimenBatch[j].specimenNum, 
          '%InCommon': highestPercentage
        })
      } 
    }
  }
  let mostSimilarPairs = [];
  highestPercentage = 0; // reset the percentage count
  // parse through the array backward and find out the highest percentage
  for (let i = specimenPairs.length - 1; i >= 0; i--) {
      if (specimenPairs[i]["%InCommon"] >= highestPercentage) {
        highestPercentage = specimenPairs[i]["%InCommon"];
        mostSimilarPairs.push(specimenPairs[i]);
      } 
    }
  console.log(specimenPairs)
  console.log(mostSimilarPairs)
  return mostSimilarPairs
}  

// let specimenA = pAequorFactory(1, mockUpStrand());
// console.log(specimenA);
// let specimenB = pAequorFactory(2, mockUpStrand());
// console.log(specimenB);
// console.log(specimenB.complementStrand());

let batch = batchProduceSpecimen(4);
console.log(batch);
findTwoMostRelated(batch);