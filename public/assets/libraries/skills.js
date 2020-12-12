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
    value: 1,                         // AKA one extra health point.
    prerequisites: []
 },
 {
   id: 'SPEED-01',
   text: "Enhanced Agility",
   attributeAffected: 'topSpeed',
   value: 0.03125,                   // AKA one pixel's worth of extra distance travelled in the first frame.
   prerequisites: []
},
{
   id: 'ACRO-01',
   text: "Acrobatics 101",
   attributeAffected: 'jumpImpulse',
   value: 0.03125,                  // AKA one pixel's worth of extra distance travelled in the first frame.
   prerequisites: []
},
{
   id: 'INTEL-01',
   text: "Philoso-raptor",
   attributeAffected: 'intelligence',
   value: 10,                       // AKA a 10% reduction in the increase of the cost of future skills.
   prerequisites: []
},
{
   id: 'SPEED-02',
   text: "Get a grip!",
   attributeAffected: 'grip',
   value: 0.03125,                  // AKA one less pixel's worth of stopping distance
   prerequisites: []
},
]