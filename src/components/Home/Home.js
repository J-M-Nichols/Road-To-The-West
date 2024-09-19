import React from 'react'
import Description from './Description'
import OverlayGrid from '../OverlayGrid'

const resources = [
    {
        title:'Food',
        content:'Food is used to feed settlers and earned when killing cattle. Food will expire after around 3 days.'
    },
    {
        title:'Preserved Food',
        content:'Preserved food is used to feed settlers when there is no food available and earned by preserverving food. When preserving food if you have less than 10 settlers then you will preserve less food. Preserved food will expire after around 45 days.'
    },
    {
        title:'Settlers',
        content:'Settlers are the lifeblood of your caravan. When you have too many resources to hold in your wagons, your settlers will have to walk or carry the resources themselves which will slow your caravan down. If all settlers perish then you lose the game. At the end of the day, each settler will eat 1-2 food. If a settler does not eat at the end of the day then they will perish.'
    },
    {
        title:'Cattle',
        content:'Cattle are used to create food and pull wagons. There must be 1 settler per cattle of they will wander off. When killing cattle if you have less than 10 settlers then you will not be able to butcher the whole cattle.'
    },
    {
        title:'Wagons',
        content:'Wagons are used to hold your resources. You will travel much slower if you do not enough wagons for your resources. There must be 1 cattle per wagon or you will have to leave it behind.'
    },
    {
        title:'Tools',
        content:'Tools are used to repair wagons if they are damaged during an event. It will take about 50 tools to repair 1 wagon.'
    },
]

const events = [
    {
        title:'River Crossing',
        content:'You move 50% slower. Also, you have a 5% chance of losing 25%-30% of each resource.'
    },
    {
        title:'Illness',
        content:'Each settler has a 5% chance to perish from their illness.'
    },
    {
        title:'Heat Wave',
        content:'Food will decay faster.'
    },
    {
        title:'Hostile Native Americans',
        content:'There is around a 50% chance per resource to lose 5%-10% of that resource.'
    },
    {
        title:'Friendly Settlers',
        content:'There is a 100% chance to be able to trade 50-150 food per settler for up to 3 settlers. As well as a 25% chance to be able to accept the whole caravan.'
    },
    {
        title:'Encountered Cattle',
        content:'You can capture 1-2 cattle.'
    },
    {
        title:'Storm',
        content:'You will move 20% slower in the mud.'
    },
]

const seasons = [
    {
        title:'Spring',
        content:'The first season of your trip. There will be more storms. There will be less friendly settlers and cattle.'
    },
    {
        title:'Summer',
        content:'There will be more heat waves, friendly settlers, cattle and hostile Native Americans. There will be less illnesses and storms.'
    },
    {
        title:'Fall',
        content:'There will be more illnesses and hostile Native Americans.'
    },
    {
        title:'Winter',
        content:'There will be much more illnesses and storms. There will be much less hostile Native Americans, cattle and settlers. There will be no heat waves.'
    },
]

const actions = [
    {
        title:'Travel',
        content:'You spend the day travelling. You will travel slower if you do not have enough wagons.'
    },
    {
        title:'Kill Cattle',
        content:'You spend the day butchering a cattle. If there are no cattle in your caravan then the day is wasted.'
    },
    {
        title:'Preserve Food',
        content:'You spend the day preserving food. If there is no food to preserve then the day is wasted.'
    },
]

const Home = () => {
    return (
        <section 
            className='m-3'
            aria-labelledby='home-heading'
        >
            <header>
                <h1 id='home-heading'>Welcome to <b>Road To The West</b></h1>
                <p>Can you survive the road to the west?</p>
            </header>
            <section>
                <Description />
                <OverlayGrid  
                    title='Resources'
                    elements={resources}
                    cols='4'
                />
                <OverlayGrid 
                    title='Events'
                    elements={events}
                    cols='3'
                />
                <OverlayGrid 
                    title='Seasons'
                    elements={seasons}
                    cols='6'
                />
                <OverlayGrid 
                    title='Actions'
                    elements={actions}
                    cols='4'
                />
            </section>
        </section>
    )
}

export default Home