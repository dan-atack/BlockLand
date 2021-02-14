// The Perks Library: A Place where Perks can come to read quietly and define their effects and prerequisites.

// PERK TEMPLATE (AKA INTERFACE):

// {
//     name: 'uniqueIdentifier',
//     attributeAffected: 'nameOfPlayerAttribute', // String name of Player attribute to be modified
//     value: 0,               // How much given attribute is affected (can be a negative number for a cooldown time, e.g.)
//     prerequisites: []       // Optional array of other skills (by code name) needed before this one can be available
//  },
const skills = [
 {
    id: "BASIC",
    text: "Basic Raptorism",
    attributeAffected: 'maxHP',
    value: 1,
    prerequisites: [],
    tooltipText: '"The quintessential characteristics of the modern velociraptor."'
 },
 {
    id: 'TOUGH-01',
    text: "Thick Skin",
    attributeAffected: 'maxHP',
    value: 1,                         // AKA one extra health point.
    prerequisites: [],
    tooltipText: '+ 1 Max HP \n \n "That\'s one tough raptor."',
 },
 {
   id: 'SPEED-01',
   text: "Enhanced Agility",
   attributeAffected: 'topSpeed',
   value: 0.03125,                   // AKA one pixel's worth of extra distance travelled in the first frame.
   prerequisites: [],
   tooltipText: '+ 12.5% Max Speed \n \n "Raptors pretty much invented agile."',
},
{
   id: 'ACRO-01',
   text: "Acrobatics 101",
   attributeAffected: 'jumpImpulse',
   value: 0.03125,                  // AKA one pixel's worth of extra distance travelled in the first frame.
   prerequisites: [],
   tooltipText: '+ 5% Jump Height \n \n "Even a tiny increase to air-time is pretty impressive, really."',
},
{
   id: 'ATTACK-01',
   text: "Sharper Claws",
   attributeAffected: 'clawAttackBaseDamage',
   value: 1,                       // AKA a 10% reduction in the increase of the cost of future skills.
   prerequisites: [],
   tooltipText: 'Claw Attack + 1 Damage \n \n "You\'re sharp and you\'re no fool."',
},
{
   id: 'SPEED-02',
   text: "Improved Traction",
   attributeAffected: 'grip',
   value: 0.03125,                  // AKA one less pixel's worth of stopping distance
   prerequisites: ['SPEED-01'],
   tooltipText: '-25% slip speed on all surfaces. \n Tested in the BlockLand skating rink for 100% quality assurance. \n \n "Get a grip, man!"',
},
]