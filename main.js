import { senatorData } from './assets/senators.js'

const senators = senatorData.results[0].members

const filterSenators = (prop, value) => {
    return senators.filter(senator => senator[prop] === value)
}

console.log(filterSenators('party', 'R'))
console.log(filterSenators('party', 'D'))
console.log(filterSenators('gender', 'M'))
console.log(filterSenators('gender', 'F'))

const republicans = senators.filter(senator => senator.party === 'R')
const democrats = senators.filter(senator => senator.party === 'D')

const maleSenators = senators.filter(senator => senator.gender === 'M')
const femaleSenators = senators.filter(senator => senator.gender === 'F')

const mostLoyalRepublican = republicans.reduce((acc, senator) => (acc.votes_with_party_pct || 0) > senator.votes_with_party_pct ? acc : senator, 0)

const mostLoyalDemocrat = democrats.reduce((acc, senator) => (acc.votes_with_party_pct || 0) > senator.votes_with_party_pct ? acc : senator, 0)

console.log(`The senator who is the most loyal to the republican party is ${mostLoyalRepublican.first_name} ${mostLoyalRepublican.last_name} from ${mostLoyalRepublican.state} who votes with republicans ${mostLoyalRepublican.votes_with_party_pct}% of the time.`)

console.log(`The senator who is the most loyal to the democrat party is ${mostLoyalDemocrat.first_name} ${mostLoyalDemocrat.last_name} from ${mostLoyalDemocrat.state} who votes with democrats ${mostLoyalDemocrat.votes_with_party_pct}% of the time.`)

const senWithPics = senators.map(senator => {
    senator.imgURL = `https://www.govtrack.us/data/photos/${senator.govtrack_id}-200px.jpeg`
    if(senator.govtrack_id === '412743') {
        senator.imgURL = `http://localhost:5500/assets/cindy.jpeg`
    }
    return senator
})

console.log(senWithPics)
let pictureDiv = document.querySelector('.container')

senWithPics.forEach(senator => {
    let senatorPic = document.createElement('img')
    let senatorFig = document.createElement('figure')
    let senatorCap = document.createElement('figcaption')
    senatorCap.textContent = `${senator.first_name} ${senator.last_name}`
    senatorPic.src = senator.imgURL
    senatorFig.appendChild(senatorPic)
    senatorFig.appendChild(senatorCap)
    pictureDiv.appendChild(senatorFig)
})


