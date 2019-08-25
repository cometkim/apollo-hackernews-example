import { QueryResolvers } from 'generated/apollo-client';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

const resolvers: QueryResolvers = {
  async topStories(_, args, ctx) {
    const data = await fetch(TOP_STORIES_URL)
      .then(res => res.json()).then(res => res.slice(0, 10));

    const stories = await Promise.all(data.map(id => fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json())));
    return {
      '__typename': 'StoriesOutput',
      stories
    };
  }
};

export default resolvers;
