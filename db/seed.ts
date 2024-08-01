import { getCollection } from "astro:content"
import { db, Clients, Posts } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "Angel", age: 22, isActive: true },
    { id: 2, name: "Majo", age: 22, isActive: true },
    { id: 3, name: "Roxana", age: 38, isActive: true },
    { id: 4, name: "Irma", age: 60, isActive: true },
    { id: 5, name: "Jack", age: 3, isActive: true }
  ])

  const posts = await getCollection("blog")
  const postsToInsert = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    likes: Math.round(Math.random() * 100)
  }))

  await db.insert(Posts).values(postsToInsert)

  console.log("Seeded data")
}
