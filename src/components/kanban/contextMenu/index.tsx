import KanbanMenu from "components/common/menu/index";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { HttpResponseType } from "src/api";
import { authHttpDelete } from "src/api/methods";
import { ApiUrls, ClientUrls } from "src/api/urls";
import AddColumnModal from "src/components/kanban/addColumnModal";
import { addColumnRequest } from "src/store/kanban/actions";

interface OwnProps {
  boardId: number;
}

interface StateProps {
  kanbanState: IKanbanState;
}

interface DispatchProps {
  addColumn: (payload: KanbanColumnAddRequestDTO) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const KanbanContextMenu = ({ boardId, kanbanState, addColumn }: Props) => {
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const history = useHistory();

  const removeBoard = useCallback(
    _.debounce((bboardId: number) => {
      (async () => {
        const { type } = await authHttpDelete(
          `${ApiUrls.Board.REMOVE}/${bboardId}`
        );
        if (type === HttpResponseType.Ok) {
          history.push(`${ClientUrls.Board.SEARCH}`);
        }
      })();
    }, boardId),
    [boardId]
  );

  const items: MenuItem[] = [
    {
      content: "Add column",
      onClick: () => {
        setAddColumnOpen(true);
      }
    },
    {
      content: "Edit board",
      onClick: () => {
        history.push(`${ClientUrls.Board.EDIT}/${boardId}`);
      }
    },
    {
      content: "Delete board",
      onClick: () => {
        removeBoard(boardId);
      }
    }
  ];

  const isLoading = kanbanState.board == null;
  const { board } = kanbanState;
  const timestamp = board != null ? board.timestamp : new Date();
  const id = board != null ? board.id : -1;

  return (
    <>
      <KanbanMenu items={items} buttonText={"Board menu"} />
      <AddColumnModal
        addColumn={addColumn}
        isLoading={isLoading}
        timestamp={timestamp}
        boardId={id}
        open={addColumnOpen}
        setOpen={setAddColumnOpen}
      />
    </>
  );
};

const mapStateToProps = (props: IRootState): StateProps => ({
  kanbanState: props.kanban
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ addColumn: addColumnRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanContextMenu);
