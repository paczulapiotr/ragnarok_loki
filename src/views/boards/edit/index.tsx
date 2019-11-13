import { Button, TextField } from "@material-ui/core";
import ParticipantsSelector from "components/board/participantsSelector/index";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { HttpResponseType } from "src/api";
import { authHttpGet, authHttpPatch } from "src/api/methods";
import ApiUrls from "src/api/urls";
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
      <TextField
        value={changedName}
        onChange={e => setChangedName(e.target.value)}
      />
      <Button onClick={changeNameRequest}>Save Name</Button>
      <Button onClick={resetName}>Reset Name</Button>
      <ParticipantsSelector
        boardId={boardId}
        page={1}
        pageSize={5}
        setter={changeParticipantsRequest}
      />
    </div>
  );
};

export default withRouter(EditBoardPage) as any;
