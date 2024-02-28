const { buildSchema } = require('graphql')
const Contact = require('../models/Contact')


const schema = buildSchema(`

type Phonebook {
    _id: ID!
    name: String!
    phone: String!
    avatar: String
}

type Phonebooks {
    phonebooks: [Phonebook]
    page: Int
    limit: Int
    pages: Int
    total: Int
}

input PhonebookInput {
    name: String!
    phone: String!
}

type Query {
    getPhonebooks( page: Int, limit: Int, keyword: String, sort: String): Phonebooks
}

type Mutation {
    createPhonebook(input: PhonebookInput): Phonebook
    updatePhonebook(_id: ID, input: PhonebookInput): Phonebook
    deletePhonebook(_id: ID): Phonebook
}
`)

const solution = {
    getPhonebooks: async ({ page = 1, limit = 30, keyword = '', sort = 'asc' }) => {
        try {
            const offset = (page - 1) * limit
            const data = await Contact.find().limit(limit).skip(offset)
            return {
                phonebooks: data,
                page,
                limit,
            }
        }
        catch (err) {
            console.log(err)
        }
    },
    createPhonebook: async ({ input }) => {
        try {
            const data = await Contact.create(input)
            return data
        } catch (err) {
            console.log(err)
        }
    },
    updatePhonebook: async ({ _id, input }) => {
        try {
            const data = await Contact.findOneAndUpdate(_id, input, { new: true })
            return data
        } catch (err) {
            console.log(err)
        }
    },
    deletePhonebook: async ({ _id }) => await Contact.findByIdAndDelete(_id)
}

module.exports = { schema, solution }

/*
query{
getPhonebooks{
        phonebooks {
          _id,
      name,
      phone,
      avatar
        }
    }
}

query{
    getPhonebooks(page: 1, limit: 1){
    page
        phonebooks {
            name
    }
  }
}

params: {
    page,
    any params
}

mutation {
  createPhonebook(input: {name: "Rubi Henjaya", phone: "088123444"}) {
    _id
    name
    phone
    avatar
  }
}

mutation {
  deletePhonebook(_id: "65defaffd5659645d46732b0") {
    _id
    name
    phone
    avatar
  }
}

mutation {
  updatePhonebook(_id: "65db4bdc79812ce388dca088", input: {name: "m ramdani", phone: "08821896177810"}) {
    _id
    name
    phone
    avatar
  }
}


*/

