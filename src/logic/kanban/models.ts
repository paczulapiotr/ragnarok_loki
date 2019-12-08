const IndexableComparer = (a: IIndexable, b: IIndexable) => a.index - b.index;

export class KanbanState implements IKanbanState {
  constructor(
    public board: IKanbanBoard,
    public canEditColumns: boolean = false,
    public isSaving: boolean = false,
    public version: number = +new Date()
  ) {}

  get columns(): IKanbanColumn[] {
    return this.board != null ? this.board.columns : [];
  }

  get boardId(): number {
    return this.board != null ? this.board.id : 0;
  }

  get boardName(): string {
    return this.board != null ? this.board.name : "";
  }

  get boardTimestamp(): Date {
    return this.board != null ? this.board.timestamp : new Date();
  }

  static CreateFromDTO = (dto: KanbanBoardResultDTO): KanbanState => {
    const columns = dto.columns
      .sort(IndexableComparer)
      .map(
        (x): IKanbanColumn =>
          new KanbanColumn(
            x.id,
            x.index,
            x.name,
            x.items
              .sort(IndexableComparer)
              .map(
                (y): IKanbanItem =>
                  new KanbanItem(y.id, y.index, y.name, y.assigneeName)
              )
          )
      );
    const board = new KanbanBoard(
      dto.id,
      dto.name,
      dto.isOwner,
      columns,
      dto.timestamp
    );
    return new KanbanState(board);
  };
}

export class KanbanColumn implements IKanbanColumn {
  public droppableId: string;
  public draggableId: string;
  constructor(
    public id: number,
    public index: number,
    public name: string,
    public items: IKanbanItem[]
  ) {
    this.droppableId = `column_drop_${id}`;
    this.draggableId = `column_drag_${id}`;
  }
}

export class KanbanBoard implements IKanbanBoard {
  public droppableId: string;
  constructor(
    public id: number,
    public name: string,
    public isOwner: boolean,
    public columns: IKanbanColumn[],
    public timestamp: Date
  ) {
    this.droppableId = `board_${id}`;
  }
}

export class KanbanItem implements IKanbanItem {
  public draggableId: string;
  constructor(
    public id: number,
    public index: number,
    public name: string,
    public assigneeName: string
  ) {
    this.draggableId = `item_${id}`;
  }
}
