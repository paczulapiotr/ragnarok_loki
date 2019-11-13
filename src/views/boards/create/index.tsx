import { Button, TextField } from "@material-ui/core";
import ParticipantsSelector from "components/board/participantsSelector/index";
import React, { useEffect, useState } from "react";
import { authHttpPut } from "src/api/methods";
import ApiUrls from "src/api/urls";

const CreateBoardPage = () => {
  const [name, setName] = useState("");
  const [participantIds, setParticipantIds] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const nameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setName(target.value);

  useEffect(() => {
    setDisabled(name == null || name.length === 0);
  }, [name]);

  const createBoard = async () => {
    setDisabled(true);
    await authHttpPut(ApiUrls.Board.CREATE, {
      name,
      participantIds
    });
    setDisabled(false);
  };

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
        boardId={1}
        page={1}
        pageSize={5}
        setter={setParticipantIds}
      />
      <div className="controls-footer">
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={createBoard}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateBoardPage;
