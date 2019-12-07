import KanbanMenu from "components/common/menu/index";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { HttpResponseType } from "src/api";
import { authHttpDelete } from "src/api/methods";
import { ApiUrls, ClientUrls } from "src/api/urls";
import AddColumnModal from "src/components/kanban/modals/addColumnModal";
import { addColumnRequest } from "src/store/kanban/actions";
import DeleteBoardModal from "../modals/deleteBoardModal";

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
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const [deleteBoardModalOpen, setDeleteBoardModalOpen] = useState(false);
  const history = useHistory();

  const removeBoard = useCallback(
    _.debounce(() => {
      (async () => {
        const { type } = await authHttpDelete(
          `${ApiUrls.Board.REMOVE}/${boardId}`
        );
        if (type === HttpResponseType.Ok) {
          history.push(`${ClientUrls.Board.SEARCH}`);
        }
      })();
    }, 100),
    [boardId]
  );

  const items: MenuItem[] = [
    {
      content: "Add column",
      onClick: () => {
        setAddColumnModalOpen(true);
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
        setDeleteBoardModalOpen(true);
      }
    }
  ];

  const isLoading = kanbanState.board == null;
  const { board } = kanbanState;
  const id = board != null ? board.id : -1;
  const { name: boardName } = kanbanState.board;
  return (
    <>
      <KanbanMenu items={items} />
      <AddColumnModal
        addColumn={addColumn}
        isLoading={isLoading}
        boardId={id}
        open={addColumnModalOpen}
        setOpen={setAddColumnModalOpen}
      />
      <DeleteBoardModal
        isLoading={isLoading}
        boardName={boardName}
        setOpen={setDeleteBoardModalOpen}
        open={deleteBoardModalOpen}
        deleteBoard={removeBoard}
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
