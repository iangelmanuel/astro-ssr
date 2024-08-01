import { getPostLikes } from "./posts/get-post-like.action"
import { updatePostLikes } from "./posts/update-post-likes.action"

export const server = {
  getPostLikes,
  updatePostLikes
}
