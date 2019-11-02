import "jest";
import { KanbanBoardDecorator } from "../index";
import { KanbanColumn, KanbanItem } from "../models";

function itemMoveUsecase(
  sut: KanbanBoardDecorator,
  testedItemId: number,
  oldIndex: number,
  newIndex: number,
  oldColumnId: number,
  newColumnId: number
): void {
  // given
  const result: IDropResult = {
    source: { droppableId: oldColumnId.toString(), index: oldIndex },
    destination: { droppableId: newColumnId.toString(), index: newIndex },
    draggableId: testedItemId.toString()
  };

  // when
  sut.move(result);

  // then
  if (oldColumnId !== newColumnId) {
    const srcCol = sut.columns!.find(x => x.id === oldColumnId);
    expect(srcCol).not.toBe(undefined);
    const oldItemIndex = srcCol!.items.findIndex(x => x.id === testedItemId);
    expect(oldItemIndex).toBe(-1);
  }

  const destCol = sut.columns!.find(x => x.id === newColumnId);
  expect(destCol).not.toBe(undefined);
  const newItemIndex = destCol!.items.findIndex(x => x.id === testedItemId);
  expect(newItemIndex).toBe(newIndex);
}

describe("KanbanBoard tests", () => {
  let SUT: KanbanBoardDecorator;
  const itemIds = {
    colOne: {
      name0: 1,
      name1: 2,
      name2: 3,
      name3: 4
    },
    colTwo: {
      name0: 5,
      name1: 6,
      name2: 7,
      name3: 8
    }
  };
  const colIds = {
    colOne: 1,
    colTwo: 2
  };
  const boardId = 69;

  beforeEach(() => {
    const colOneItems: IKanbanItem[] = [
      new KanbanItem(itemIds.colOne.name0, 0, "", new Date()),
      new KanbanItem(itemIds.colOne.name1, 0, "", new Date()),
      new KanbanItem(itemIds.colOne.name2, 0, "", new Date()),
      new KanbanItem(itemIds.colOne.name3, 0, "", new Date())
    ];
    const colTwoItems: IKanbanItem[] = [
      new KanbanItem(itemIds.colTwo.name0, 0, "", new Date()),
      new KanbanItem(itemIds.colTwo.name1, 0, "", new Date()),
      new KanbanItem(itemIds.colTwo.name2, 0, "", new Date()),
      new KanbanItem(itemIds.colTwo.name3, 0, "", new Date())
    ];
    const columns: IKanbanColumn[] = [
      new KanbanColumn(colIds.colOne, 0, "", colOneItems, new Date()),
      new KanbanColumn(colIds.colTwo, 0, "", colTwoItems, new Date())
    ];
    SUT = new KanbanBoardDecorator(boardId, "", columns, new Date());
  });

  test("should move item down the column", () => {
    itemMoveUsecase(
      SUT,
      itemIds.colOne.name0,
      0,
      2,
      colIds.colOne,
      colIds.colOne
    );
  });

  test("should move item up the column", () => {
    itemMoveUsecase(
      SUT,
      itemIds.colOne.name3,
      3,
      1,
      colIds.colOne,
      colIds.colOne
    );
  });

  test("should move item between columns ahead", () => {
    itemMoveUsecase(
      SUT,
      itemIds.colOne.name3,
      3,
      1,
      colIds.colOne,
      colIds.colTwo
    );
  });

  test("should move item between columns not ahead", () => {
    itemMoveUsecase(
      SUT,
      itemIds.colTwo.name1,
      1,
      1,
      colIds.colTwo,
      colIds.colOne
    );
  });
});
