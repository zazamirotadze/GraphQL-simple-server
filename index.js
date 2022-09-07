const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const VillageArray = [{id:1, name:"mgvimevi"},{id:2, name:"khalifauri"},{id:3,  name:"tsirkvali"},{id:4 , name:"chalovani"}]
const villageType = new GraphQLObjectType({
    name: "parameters",
    description: "objects of village list  parameters",
    fields: ()=>({
        id:{type: GraphQLInt},
        name:{type: GraphQLString}
    })
})

const querForVillages = new GraphQLObjectType({
    name: "Query",
    description: "this is a query to present  villages",
    fields: () => (
        {
        villages:
            { 
                type: new GraphQLList(villageType),
                resolve:()=> VillageArray
            },
        findVillages:
            {   args:
                {
                    id:{type:GraphQLInt}
                },
                type: villageType,
                resolve:(param, args)=> VillageArray.find(village =>  village.id===args.id )
            }
        }
        
    )
})

const mutationForVillages = new GraphQLObjectType({
    name: "mutation",
    description: "this is created to add objects into the villages array",
    fields: () => (
        {addvillage:
            { 
                type: villageType,
                args:{
                    name:{type:GraphQLString}
                },
                resolve:(parent, args)=> 
                {
                    const newVillage = {
                        name: args.name,
                        id: VillageArray.length + 1
                    }
                    VillageArray.push(newVillage)
                    return newVillage
                }
            }
        }
        
    )
})

const schema = new GraphQLSchema({
    query: querForVillages,
    mutation: mutationForVillages
})
 
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
    
}));
 
app.use('/', (req, res) => {
    res.send(`to see graphql data please add "/graphql" to the local host url `)
});


 
app.listen(4000, console.log("server is live"))