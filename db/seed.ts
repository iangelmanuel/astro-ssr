import { db, Clients } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "Angel", age: 22, isActive: true },
    { id: 2, name: "Majo", age: 22, isActive: true },
    { id: 3, name: "Roxana", age: 38, isActive: true },
    { id: 4, name: "Irma", age: 60, isActive: true },
    { id: 5, name: "Jack", age: 3, isActive: true }
  ])

  console.log("Seeded data")
}
