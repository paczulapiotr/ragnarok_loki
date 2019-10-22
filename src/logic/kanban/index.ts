import _ from "lodash";

export class KanbanBoard {
  constructor(
    private boardIdetificator: string,
    public columns: IKanbanColumn[] | undefined,
    public timestamp?: Date,
    private itemMovedCallback?: (arg: IItemMove) => void,
    private columnMovedCallback?: (arg: IColumnMove) => void
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

    if (
      this.columns == null ||
      !this.columns.some(x => x.id === source.droppableId)
    ) {
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

    // tslint:disable-next-line: no-unused-expression
    this.itemMovedCallback &&
      this.itemMovedCallback({
        columnDestId: destColumn.id,
        indexDest: destination.index,
        itemId: toMove.id,
        timestamp: toMove.timestamp
      });
  }

  private moveColumn(result: IDropResult): void {
    const { destination, source } = result;
    if (destination == null) {
      return;
    }

    if (this.columns == null) {
      throw new Error("Columns are empty. Invalid action.");
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

    // tslint:disable-next-line: no-unused-expression
    this.columnMovedCallback &&
      this.columnMovedCallback({
        columnId: toMove.id,
        indexDest: destination.index,
        timestamp: toMove.timestamp
      });
  }

  private getColumn(id: string): IKanbanColumn | undefined {
    return this.columns == null
      ? undefined
      : this.columns.find(x => x.id === id);
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
