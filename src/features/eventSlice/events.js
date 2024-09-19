/**
 * Displays: ${eventName}
 * Default chance of 10%
 */
const events = [
    {
        // 5% chance of losing 5-10% of each resource
        name: 'You have encountered a river crossing!',
        seasonChance:{
            Spring:0.1,
            Summer:0.1,
            Autumn:0.1,
            Winter:0.1,
        },
        id: 0
    },
    {
        // 5% chance to lose each settler
        //for i < settlerCount, if random() < 0.05, settlerCount--
        name: 'Your settlers have suffered from an illness!',
        seasonChance:{
            Spring:0.1,
            Summer:0.01,
            Autumn:0.1,
            Winter:0.25,
        },
        id: 1
    },
    {
        //food decays 20% faster each day
        name: 'There is a heat wave!',
        seasonChance:{
            Spring:0.05,
            Summer:0.25,
            Autumn:0.05,
            Winter:0,
        },
        id: 2
    },
    {
        //50% chance per resource to lose 10%
        name: 'You have encountered a hostile Native American Tribe!',
        seasonChance:{
            Spring:0.15,
            Summer:0.3,
            Autumn:0.2,
            Winter:0.01,
        },
        id: 3
    },
    {
        // 100% chance to trade 50-150 food per settler : 3-5 settlers available per interaction
        // 25% chance to be able to accept the whole caravan which adds 5-15% starting resources to the players caravan
        name: 'You have encountered a group of friendly settlers!',
        seasonChance:{
            Spring:0.15,
            Summer:0.3,
            Autumn:0.2,
            Winter:0.01,
        },
        id: 4
    },
    {
        // encounter 1-2 cattle
        // can accept 0-max cattle in enounter
        name: 'You have encountered cattle!',
        seasonChance:{
            Spring:0.15,
            Summer:0.3,
            Autumn:0.2,
            Winter:0.01,
        },
        id: 5
    },
    {//handled
        // movement speed reduced by 20%
        name: 'There is a storm!',
        seasonChance:{
            Spring:0.15,
            Summer:0.01,
            Autumn:0.15,
            Winter:0.2,
        },
        id: 6
    },
]

export default events