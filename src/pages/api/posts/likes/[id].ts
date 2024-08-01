import type { APIRoute } from "astro"
import { db, eq, Posts } from "astro:db"

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? ""

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId))

  if (posts.length === 0) {
    const post = {
      id: postId,
      title: "Post Not Found",
      likes: 0
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  return new Response(JSON.stringify(posts.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const PUT: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? ""
  const { likes = 0 } = await request.json()

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId))

  if (posts.length === 0) {
    const newPost = {
      id: postId,
      title: "Post Not Found",
      likes: 0
    }
    await db.insert(Posts).values(newPost)
    posts.push(newPost)
  }

  const post = posts.at(0)!
  post.likes = post.likes + likes
  await db.update(Posts).set(post).where(eq(Posts.id, postId))

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
