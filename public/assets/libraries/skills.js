// The Perks Library: A Place where Perks can come to read quietly and define their effects and prerequisites.

// PERK TEMPLATE (AKA INTERFACE):

// {
//     name: 'uniqueIdentifier',
//     attributeAffected: 'nameOfPlayerAttribute', // String name of Player attribute to be modified
//     value: 0,               // How much given attribute is affected (can be a negative number for a cooldown time, e.g.)
//     prerequisites: []       // Optional array of other skills needed to get this one
//  },
const skills = [
 {
    id: "BASIC",
    text: "Basic Raptorism",
    attributeAffected: 'maxHP',
    value: 1,
    prerequisites: [],
 },
 {
    id: 'TOUGH-01',
    text: "Improved Toughness",
    attributeAffected: 'maxHP',
    value: 1,
    prerequisites: []
 },
 {
   id: 'SPEED-01',
   text: "Be more Agile",
   attributeAffected: 'topSpeed',
   value: 0.05,
   prerequisites: []
},
{
   id: 'ACRO-01',
   text: "Acrobatics 101",
   attributeAffected: 'jumpImpulse',
   value: 0.05,
   prerequisites: []
},
{
   id: 'INTEL-01',
   text: "Philoso-raptor",
   attributeAffected: 'maxHP',   // A boring duplicate value, for now.
   value: 1,
   prerequisites: []
},
]