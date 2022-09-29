import { setupWorker, graphql, rest } from 'msw';
import names from '../public/names.json'

export const worker = setupWorker(
  graphql.query('GetNames', (req, res, ctx) => res(ctx.data(names))),
  rest.all('http://localhost:3022/graphql', (req, res, ctx) => res(ctx.status(200))),
)
