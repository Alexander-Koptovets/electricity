function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getID(length = 32) {
    return Array(length)
        .fill(null)
        .map(() => randomInt(0, 16))
        .map((num) => num.toString(16))
        .join("");
}

export const createHouseholdMock = (override) => ({
    id: getID(),
    powerConsumption: 1,
    ...override
});

export const createPowerPlantMock = (override) => ({
    id: getID(),
    powerProduction: 1,
    enabled: true,
    ...override
});
