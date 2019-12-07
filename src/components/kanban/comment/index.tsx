import { Button, Paper } from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";
import React from "react";
import HeaderTitle from "src/components/common/headerTitle";
import "./style.scss";
interface Props {
  content: string;
  authorName: string;
  createdOn: Date;
  editedOn?: Date;
  onEdit: () => void;
  onDelete: () => void;
}
const Comment = ({
  createdOn,
  content,
  editedOn,
  authorName,
  onEdit,
  onDelete
}: Props) => {
  const wasEdited = editedOn != null;
  return (
    <Paper className="comment">
      <HeaderTitle className="comment-header">
        <div className="comment-author">
          <PersonOutlined />
          <p>{authorName}</p>
        </div>
        <div className="comment-actions">
          <Button onClick={onEdit}>edit</Button>
          <Button onClick={onDelete}>delete</Button>
        </div>
      </HeaderTitle>
      <p className="comment-content">{content}</p>
      <div className="comment-date">
        <div className="comment-edit-date">
          {wasEdited ? `Updated: ${editedOn!.toLocaleString()}` : ""}
        </div>
        <div className="comment-create-date">{createdOn.toLocaleString()}</div>
      </div>
    </Paper>
  );
};

export default Comment;
