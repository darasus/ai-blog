import { Category, Locale } from '@prisma/client'
import { GetStaticPropsContext } from 'next'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function paginatePosts(ctx: GetStaticPropsContext) {
  const DEFAULT_LIMIT = 10

  const schema = z.object({
    page: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().max(1000).default(1)
    ),
    limit: z.number().min(1).max(100).default(DEFAULT_LIMIT),
    category: z.nativeEnum(Category).optional(),
  })

  const metadata = schema.parse(ctx.params)
  const { page, limit, category } = metadata
  const locale = ctx.locale as Locale

  const where = {
    locale,
    category: category ? category : undefined,
  }

  const posts = await prisma.article.findMany({
    skip: limit * (page - 1),
    take: limit,
    where,
    orderBy: {
      id: 'desc',
    },
  })

  const count = await prisma.article.count({
    where,
  })

  const response = {
    data: posts,
    pagination: {
      total: count,
      pageCount: Math.ceil(count / limit),
      currentPage: page,
      perPage: limit,
      from: (page - 1) * limit + 1,
      to: (page - 1) * limit + posts.length,
    },
  }

  return response
}
