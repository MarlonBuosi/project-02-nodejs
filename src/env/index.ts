import { config } from 'dotenv'
import { z } from 'zod'

console.log(process.env)

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })

  console.log(config().parsed)
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333)
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid env variable', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data