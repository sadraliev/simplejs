import * as dotenv from 'dotenv'
dotenv.config()

export default function config() {
  return { PORT: Number(process.env.PORT) || 3000 }
}
