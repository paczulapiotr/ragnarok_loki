interface CommentDTO {
  id: number;
  content: string;
  authorName: string;
  authorId: number;
  createdOn: Date;
  editedOn?: Date;
  isOwner: boolean;
}

interface AddCommentRequestDTO {
  boardId: number;
  itemId: number;
  content: string;
}

interface EditCommentRequestDTO {
  boardId: number;
  itemId: number;
  commentId: number;
  content: string;
}

interface DeleteCommentRequestDTO {
  boardId: number;
  itemId: number;
  commentId: number;
}
