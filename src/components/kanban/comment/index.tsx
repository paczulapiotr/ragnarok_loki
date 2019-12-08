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
  canModify: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
const Comment = ({
  createdOn,
  content,
  editedOn,
  authorName,
  canModify,
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
        {canModify ? (
          <div className="comment-actions">
            <Button onClick={onEdit}>edit</Button>
            <Button onClick={onDelete}>delete</Button>
          </div>
        ) : (
          <></>
        )}
      </HeaderTitle>
      <p className="comment-content">{content}</p>
      <div className="comment-date">
        <div className="comment-edit-date">
          {wasEdited ? `Updated: ${new Date(editedOn!).toLocaleString()}` : ""}
        </div>
        <div className="comment-create-date">
          {new Date(createdOn).toLocaleString()}
        </div>
      </div>
    </Paper>
  );
};

export default Comment;
