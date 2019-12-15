import { Button, TextField } from "@material-ui/core";
import { ApiUrls, ClientUrls } from "api/urls";
import ParticipantsSelector from "components/board/participantsSelector/index";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { HttpResponseType } from "src/api";
import { authHttpPut } from "src/api/methods";
import FieldWrapper from "src/components/common/fieldWrapper";
import "./style.scss";

interface ISelectRef {
  select: { clearValue: () => void };
}

const CreateBoardPage = () => {
  const [name, setName] = useState("");
  const [participantIds, setParticipantIds] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const selectRef = useRef<ISelectRef>();
  const history = useHistory();

  const nameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setName(target.value);
  useEffect(() => {
    setDisabled(name == null || name.length === 0);
  }, [name]);

  const createBoard = async () => {
    setDisabled(true);
    const { type, response } = await authHttpPut(ApiUrls.Board.CREATE, {
      name,
      participantIds
    });
    setName("");
    selectRef.current!.select.clearValue();
    setParticipantIds([]);
    setDisabled(false);
    if (type === HttpResponseType.Ok) {
      const boardId = response.data;
      history.push(`${ClientUrls.Board.VIEW}/${boardId}`);
    }
  };

  return (
    <div className="kanban-board-create-page">
      <FieldWrapper
        headerTitle="Create board"
        className="kanban-board-create-container"
      >
        <FieldWrapper headerTitle="Board name">
          <TextField
            fullWidth
            value={name}
            onChange={nameHandler}
            required
            label="Board Name"
            margin="normal"
          />
        </FieldWrapper>
        <FieldWrapper headerTitle="Board participants">
          <ParticipantsSelector
            selectRef={selectRef}
            setter={setParticipantIds}
          />
        </FieldWrapper>
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
      </FieldWrapper>
    </div>
  );
};

export default CreateBoardPage;
