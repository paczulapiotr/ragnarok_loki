import _ from "lodash";

export interface IIndexable {
  index: number;
}

export class KanbanItem implements IIndexable {
  constructor(
    public id: string,
    public index: number,
    public content: string
  ) {}
}

export class KanbanColumn implements IIndexable {
  constructor(
    public id: string,
    public index: number,
    public items: KanbanItem[]
  ) {}
}

export class KanbanBoard {
  constructor(
    private boardIdetificator: string,
    public columns: KanbanColumn[]
  ) {}

  get identifier(): string {
    return this.boardIdetificator;
  }

  private remapIndexes(array: IIndexable[]): void {
    array.forEach((element, index) => {
      element.index = index;
    });
  }

  private moveItem(result: IDropResult): void {
    const { destination, source, draggableId } = result;
    if (destination == null) {
      return;
    }

    if (!this.columns.some(x => x.id === source.droppableId)) {
      throw new Error(`${source.droppableId} is not a valid column ID`);
    }

    const srcColumnId = source.droppableId;
    const destColumnId = destination.droppableId;
    const srcColumn = this.getColumn(srcColumnId);
    if (!srcColumn) {
      return;
    }
    const srcItems = srcColumn.items;
    const indexToMove = _.findIndex(srcItems, x => x.id === draggableId);
    const toMove = srcItems.splice(indexToMove, 1)[0];
    this.remapIndexes(srcItems);

    const destColumn = this.getColumn(destColumnId);
    if (!destColumn) {
      return;
    }
    const destItems = destColumn.items;
    destItems.splice(destination.index, 0, toMove);
    this.remapIndexes(destItems);
  }

  private moveColumn(result: IDropResult): void {
    const { destination, source } = result;
    if (destination == null) {
      return;
    }
    if (this.boardIdetificator !== source.droppableId) {
      throw new Error(`${source.droppableId} is not a valid board ID`);
    }

    if (destination.index === source.index) {
      return;
    }
    const toMove = this.columns.splice(source.index, 1)[0]; // remove column
    this.columns.splice(destination.index, 0, toMove); // add column

    this.remapIndexes(this.columns);
  }

  private getColumn(id: string): KanbanColumn | undefined {
    return this.columns.find(x => x.id === id);
  }

  /**
   * @param result
   * @param canMoveColumns if true then column replacements mode is turned on
   */
  public move(result: IDropResult, canMoveColumns: boolean = false): void {
    debugger;
    if (canMoveColumns) {
      this.moveColumn(result);
    } else {
      this.moveItem(result);
    }
  }
}
