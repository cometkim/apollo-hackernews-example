import { Resolvers } from 'generated/apollo-client';

import Query from './Query';

const resolvers: Resolvers = {
  Query,
  StoriesOutput: {
    stories: (root) => {
      return root.stories.map(story => ({
        ...story,
        '__typename': 'Story',
      }))
    },
  },
  Story: {
    id: (root) => {
      return root.id
    },
    url: (root) => {
      return root.url
    },
    title: (root) => {
      return root.title
    },
    score: (root) => {
      return root.score
    },
    // createdAt: (root) => {
    //   return root.createdAt
    // },
    createdBy: async (root) => {
      const userName = root.by
      const userData = await fetch(`https://hacker-news.firebaseio.com/v0/user/${userName}.json`).then(res => res.json())
      return {
        '__typename': 'User',
        ...userData,
      }
    },
  },
  User: {
    id: (root) => {
      return root.id
    },
    about: (root) => {
      return root.about || ''
    },
    karma: (root) => {
      return root.karma
    },
  }
};

export default resolvers;
