import prisma from '../../../prisma/prisma-client';
import { Tag } from './tag.model';

const getTags = async (id?: number): Promise<string[]> => {
  const tags = await prisma.tag.findMany({
    where: {
      articles: {
        some: {},
      },
    },
    select: {
      name: true,
    },
    orderBy: {
      articles: {
        _count: 'desc',
      },
    },
    take: 10,
  });

  return tags.map((tag: Tag) => tag.name);
};

export default getTags;
