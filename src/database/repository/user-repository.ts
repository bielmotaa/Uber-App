import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import { userSchema } from '../schemas'
import { UserDTO } from '../../types/typing/user-dto'



export function UseUserRepository() {
  const database = useSQLiteContext()
  const db = drizzle(database, { schema: userSchema })

  async function create(users: UserDTO) {
    try {
      await db.insert(userSchema.user).values({
        ...users
      })
    } catch (error) {
      throw error
    }
  }

  async function findAll() {
    try {
      const response = await db.query.user.findMany()
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    create,
    findAll,
  }
}
