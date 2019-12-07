import { Button, TextField } from "@material-ui/core";
import { ApiUrls, ClientUrls } from "api/urls";
import ParticipantsSelector from "components/board/participantsSelector/index";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { HttpResponseType } from "src/api";
import { authHttpGet, authHttpPatch } from "src/api/methods";
import FieldWrapper from "src/components/common/fieldWrapper";
import "./style.scss";
interface PathParamsType {
  boardId: string;
}

type Props = RouteComponentProps<PathParamsType>;

const EditBoardPage = ({ match }: Props) => {
  const boardId = Number(match.params.boardId);
  const [name, setName] = useState("");
  const [changedName, setChangedName] = useState("");

  useEffect(() => {
    (async () => {
      const { response, type } = await authHttpGet(
        `${ApiUrls.Board.GET}/${boardId}`
      );
      if (type === HttpResponseType.Ok) {
        const fetchedName: string = response.data.name;
        setName(fetchedName);
        setChangedName(fetchedName);
      }
    })();
  }, []);

  const changeNameRequest = () => {
    const data: EditBoardRequestDTO = {
      name: changedName
    };
    authHttpPatch(`${ApiUrls.Board.EDIT}/${boardId}`, data);
  };

  const changeParticipantsRequest = async (participantIds: number[]) => {
    const data: EditBoardParticipantsRequestDTO = {
      id: boardId,
      participantIds
    };
    authHttpPatch(ApiUrls.Board.PARTICIPANTS, data);
  };

  const resetName = () => {
    setChangedName(name);
  };
  return (
    <div>
      <Link to={`${ClientUrls.Board.VIEW}/${boardId}`}>View page</Link>
      <FieldWrapper
        className="kanban-board-edit-container"
        headerTitle="Edit board"
      >
        <FieldWrapper
          headerTitle="Board name"
          className="kanban-board-edit-name"
        >
          <TextField
            fullWidth
            value={changedName}
            onChange={e => setChangedName(e.target.value)}
          />
          <div className="controls-footer">
            <Button onClick={changeNameRequest}>Save</Button>
            <Button onClick={resetName}>Reset</Button>
          </div>
        </FieldWrapper>
        <FieldWrapper
          headerTitle="Participants"
          className="kanban-board-edit-participants"
        >
          <ParticipantsSelector
            boardId={boardId}
            setter={changeParticipantsRequest}
          />
        </FieldWrapper>
      </FieldWrapper>
    </div>
  );
};

export default withRouter(EditBoardPage) as any;
