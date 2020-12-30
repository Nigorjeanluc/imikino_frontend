import getSingle from './fetchPostActions';
import { createPost, createPostAdmin } from './createPostActions';
import { deletePost, deletePostAdmin } from './deletePostActions';
import { editPost, editPostAdmin } from './editPostActions';
import approvePost from './approvePostActions';

export {
  getSingle,
  createPost,
  createPostAdmin,
  deletePost,
  deletePostAdmin,
  editPost,
  editPostAdmin,
  approvePost
};