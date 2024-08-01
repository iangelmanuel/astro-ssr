import { column, defineDb, defineTable } from "astro:db"

const Clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean({ default: false })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients
  }
})
