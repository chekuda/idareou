import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql'
import { UserType } from '../user'
import { BetOptionType } from '../betOption'
import { findBetOptions } from '../../../database/queries/betOption'
import { findUserById, findUsers } from '../../../database/queries/user'

const participantType = new GraphQLObjectType({
  name: 'participant',
  fields: {
    user: {
      type: UserType,
      resolve: async ({ user }) => (
        findUserById(user)
      )
    },
    option: { type: BetOptionType }
  }
})

export default new GraphQLObjectType({
  name: 'Bet',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    currency: { type: GraphQLString },
    options: {
      type: new GraphQLList(BetOptionType),
      resolve: async (parentValue) => (
        findBetOptions(parentValue.options)
      )
    },
    master: { type: GraphQLString },
    winners: {
      type: new GraphQLList(UserType),
      resolve: async ({ winners }) => (
        findUsers(winners)
      )
    },
    participants: { type: new GraphQLList(participantType) }
  }
})
