import { createHouseholdMock, createPowerPlantMock } from "./mocks.js";

export class World {
  households = [];
  powerPlants = [];

  householdsConnections = new Map();

  createPowerPlant() {
    const powerPlant = createPowerPlantMock();

    this.powerPlants.push(powerPlant);

    return powerPlant;
  }

  createHousehold() {
    const household = createHouseholdMock();

    this.households.push(household);
    this.householdsConnections.set(household, new Set());

    return household;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    const connections = this.getHouseholdConnections(household);
    connections.add(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
    const connections = this.getHouseholdConnections(household1);
    connections.add(household2);
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    const connections = this.getHouseholdConnections(household);
    connections.delete(powerPlant);
  }

  killPowerPlant(powerPlant) {
    const pp = this.powerPlants.find((_pp) => _pp.id === powerPlant.id);

    if (pp) {
      pp.enabled = false;
    }
  }

  repairPowerPlant(powerPlant) {
    const pp = this.powerPlants.find((_pp) => _pp.id === powerPlant.id);

    if (pp) {
      pp.enabled = true;
    }
  }

  householdHasEletricity(household) {
    const connections = this.getHouseholdConnections(household);

    return Array.from(connections).some((powerProducer) => {
      if ("powerConsumption" in powerProducer) {
        return this.householdHasEletricity(powerProducer);
      }

      if ("powerProduction" in powerProducer) {
        return powerProducer.enabled;
      }
    });
  }

  getHouseholdConnections(household) {
    let connections = this.householdsConnections.get(household);

    if (!connections) {
      connections = new Set();
      this.householdsConnections.set(household, connections);
    }

    return connections;
  }
}




// export class World {
//   constructor() {
//     this.isElectricity = false;
//   }
//
//   createPowerPlant() {
//     this.isElectricity = true;
//
//     return this.isElectricity;
//     // throw new Error("Not Implemented");
//   }
//
//   createHousehold() {
//     this.householdEletricity = false;
//
//     return this.householdEletricity;
//     // throw new Error("Not Implemented");
//   }
//
//   connectHouseholdToPowerPlant(household, powerPlant) {
//     household.isElectricity = powerPlant.isElectricity;
//     // throw new Error("Not Implemented");
//   }
//
//   connectHouseholdToHousehold(household1, household2) {
//     throw new Error("Not Implemented");
//   }
//
//   disconnectHouseholdFromPowerPlant(household, powerPlant) {
//     throw new Error("Not Implemented");
//   }
//
//   killPowerPlant(powerPlant) {
//     throw new Error("Not Implemented");
//   }
//
//   repairPowerPlant(powerPlant) {
//     throw new Error("Not Implemented");
//   }
//
//   householdHasEletricity(household) {
//     return household;
//     // throw new Error("Not Implemented");
//   }
// }
//
// const world = new World();
// const household = world.createHousehold();
// const powerPlant = world.createPowerPlant();
//
// console.log(household, powerPlant);