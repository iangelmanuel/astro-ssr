import type { APIRoute } from "astro"
import { Clients, db } from "astro:db"

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  const users = await db.select().from(Clients)

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, ...body } = await request.json()

    const { lastInsertRowid } = await db.insert(Clients).values(body)

    const response = {
      id: +lastInsertRowid!.toString(),
      ...body
    }

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return new Response(JSON.stringify({ msg: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
