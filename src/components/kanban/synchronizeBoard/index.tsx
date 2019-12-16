import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from "@aspnet/signalr";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { ApiUrls } from 'src/api/urls';
import { loadBoardRequest } from 'src/store/kanban/actions';
import userManager from 'src/utils/userManager';

const options: IHttpConnectionOptions = {
    accessTokenFactory: async () => (await userManager.getUser())?.access_token || ""
}
const hubConnectionBuilder = new HubConnectionBuilder().withUrl(ApiUrls.Kanban.SYNCHRONIZE, options);
const UPDATE_METHOD_IN = "UpdateBoard";
const SUBSCRIBE_METHOD_OUT = "Subscribe";
interface OwnProps {
    boardId: number;
}
interface DispatchProps {
    loadBoard: (arg: KanbanBoardLoadRequestDTO) => void;
}

type MergedProps = OwnProps & DispatchProps;

const SynchronizeBoard = ({boardId, loadBoard}: MergedProps) => {
    const [hub, setHub] = useState<HubConnection>();

    const updateHandler = (message: any) => {
        console.log("Updating board...", message);
        if (boardId === Number(message)) {
            loadBoard({boardId});
        }
    };

    useEffect(() => {
        const hubConnection = hubConnectionBuilder.build();
        setHub(hubConnection);
        hubConnection.on(UPDATE_METHOD_IN, updateHandler);
        hubConnection.start().then(() =>{
            console.log("Subscribing...")
            hubConnection.send(SUBSCRIBE_METHOD_OUT, boardId);
        })

        return () => {
            hub?.off(UPDATE_METHOD_IN);
            hub?.stop();
        };
    }, [])
    return <></>;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadBoard: loadBoardRequest
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(SynchronizeBoard);
