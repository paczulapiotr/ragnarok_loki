import _ from "lodash";
import { KanbanBoard } from "logic/kanban/models.ts";

export class KanbanBoardDecorator extends KanbanBoard {
  constructor(
    id: number,
    name: string,
    columns: IKanbanColumn[],
    timestamp: Date,
    private itemMovedCallback?: (arg: KanbanItemMoveDTO) => void,
    private columnMovedCallback?: (arg: KanbanColumnMoveDTO) => void
  ) {
    super(id, name, columns, timestamp);
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
      !this.columns.some(x => x.droppableId === source.droppableId)
    ) {
      throw new Error(`${source.droppableId} is not a valid column ID`);
    }

    const srcColumnId = source.droppableId;
    const destColumnId = destination.droppableId;
    const srcColumn = this.getDroppableColumn(srcColumnId);
    if (!srcColumn) {
      return;
    }
    const srcItems = srcColumn.items;
    const indexToMove = _.findIndex(
      srcItems,
      x => x.draggableId === draggableId
    );
    const toMove = srcItems.splice(indexToMove, 1)[0];
    this.remapIndexes(srcItems);

    const destColumn = this.getDroppableColumn(destColumnId);
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
        index: destination.index,
        boardId: this.id,
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

    if (this.droppableId !== source.droppableId) {
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
        index: destination.index,
        boardId: this.id,
        timestamp: toMove.timestamp
      });
  }

  private getDroppableColumn = (
    droppapleId: string
  ): IKanbanColumn | undefined =>
    this.columns == null
      ? undefined
      : this.columns.find(x => x.droppableId === droppapleId);

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
