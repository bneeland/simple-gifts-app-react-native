const listedPeople = [
  {
    "email": "Brian email",
    "id": 938705020378835700,
    "name": "Brian",
  },
  {
    "email": "Dana email",
    "id": 679486706697450400,
    "name": "Dana",
  },
  {
    "email": "Em email",
    "id": 223820751693978620,
    "name": "Em",
  },
  {
    "email": "Jack email",
    "id": 83417727648052880,
    "name": "Jack",
  },
  {
    "email": "Michael email",
    "id": 652899634236487300,
    "name": "Michael",
  },
  {
    "email": "Lauren email",
    "id": 900741110005811700,
    "name": "Lauren",
  },
];

console.log('listedPeople:', listedPeople);

const listedInclusions = [
  {
    "from": 938705020378835700,
    "id": 56278601168576744,
    "to": 652899634236487300,
  },
];

console.log('listedInclusions:', listedInclusions);

const listedExclusions = [
  {
    "from": 938705020378835700,
    "id": 158414670150343700,
    "to": 679486706697450400,
  },
  {
    "from": 679486706697450400,
    "id": 158414670150343700,
    "to": 938705020378835700,
  },
  {
    "from": 223820751693978620,
    "id": 158414670150343700,
    "to": 83417727648052880,
  },
  {
    "from": 83417727648052880,
    "id": 158414670150343700,
    "to": 223820751693978620,
  },
  {
    "from": 652899634236487300,
    "id": 158414670150343700,
    "to": 900741110005811700,
  },
  {
    "from": 900741110005811700,
    "id": 158414670150343700,
    "to": 652899634236487300,
  },
];

console.log('listedExclusions:', listedExclusions);

function randomize(arrayIn) {
    let arrayOut = [];
    for(let i in arrayIn) {
        let randomIndex = Math.floor(Math.random() * arrayIn.length);
        while(arrayOut.includes(arrayIn[randomIndex])) {
            randomIndex = Math.floor(Math.random() * arrayIn.length);
        }
        arrayOut[i] = arrayIn[randomIndex];
    }
    return arrayOut;
}

function randomizePeople(listedPeople) {
    var randomizedListedPeople = randomize(listedPeople);
    randomizedListedPeople = randomize(randomizedListedPeople);
    randomizedListedPeople = randomize(randomizedListedPeople);
    randomizedListedPeople = randomize(randomizedListedPeople);

    return randomizedListedPeople;
};

function get_vectors(randomizedListedPeople, listedInclusions, listedExclusions) {

  let vectors = {};

  let vectorsNames = {};

  for (listedInclusion of listedInclusions) {

    vectors[listedInclusion['from']] = listedInclusion['to'];

    vectorsNames[listedPeople.find(person => person.id == listedInclusion['from'])['name']] = listedPeople.find(person => person.id == listedInclusion['to'])['name'];

  }

  let excluded = false;
  let matched = false;
  let iterations = 0;
  let person2;
  let n = 0;

  for (let [i, person1] of Object.entries(randomizedListedPeople)) {

    matched = false;
    iterations = 0;

    if (!(person1['id'] in vectors)) {

      if (i == (randomizedListedPeople.length - 1)) {
        n = 0;

      } else {

        n = parseInt(i) + 1;

      }

      while (!(matched)) {

        if (iterations < (randomizedListedPeople.length * 2)) {

          excluded = false;
          person2 = randomizedListedPeople[n];

          if (person2 == person1) {

            if (n >= (randomizedListedPeople.length - 1)) {
              n = 0;
            } else {
              n++;
            }
            iterations++;

          } else if (Object.values(vectors).includes(person2['id'])) {

            if (n >= (randomizedListedPeople.length - 1)) {
              n = 0;
            } else {
              n++;
            }
            iterations++;

          } else {

            for (listedExclusion of listedExclusions) {

              if (listedExclusion['from'] == person1['id'] && listedExclusion['to'] == person2['id']) {

                excluded = true;
                break;

              }
            }

            if (excluded) {

              if (n >= (randomizedListedPeople.length - 1)) {
                n = 0;
              } else {
                n++;
              }
              iterations++;

            } else {

              vectors[person1['id']] = person2['id'];
              matched = true;

              vectorsNames[person1['name']] = person2['name'];

            }
          }
        } else {

          return {0: 0};

        }
      }
    }
  }

  return vectors;

}


var vectors = {0: 0};

var randomizedListedPeople = {};

let maxIterations = 3;
let iterations = 0;

while (vectors[0] === 0 && iterations <= maxIterations) {
  iterations++;
  randomizedListedPeople = randomizePeople(listedPeople);
  vectors = get_vectors(randomizedListedPeople, listedInclusions, listedExclusions);
}
