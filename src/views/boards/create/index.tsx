import { Button, TextField } from "@material-ui/core";
import ParticipantsSelector from "components/board/participantsSelector/index";
import React, { useState } from "react";

const CreateBoardPage = () => {
  const [name, setName] = useState("");

  const nameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setName(target.value);

  return (
    <div>
      <TextField
        value={name}
        onChange={nameHandler}
        required
        label="Board Name"
        margin="normal"
      />
      <ParticipantsSelector
        ignoreUserIds={[]}
        boardId={1}
        page={1}
        pageSize={5}
        setter={(ids: number[]) => console.log(ids)}
      />
      <div className="controls-footer">
        <Button variant="contained" color="primary">
          Create
        </Button>
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateBoardPage;
