import "jest";
import { KanbanBoard } from "../index";

function itemMoveUsecase(
  sut: KanbanBoard,
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
  let SUT: KanbanBoard;
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
      { id: itemIds.colOne.name0, index: 0, name: "", timestamp: new Date() },
      { id: itemIds.colOne.name1, index: 1, name: "", timestamp: new Date() },
      { id: itemIds.colOne.name2, index: 2, name: "", timestamp: new Date() },
      { id: itemIds.colOne.name3, index: 3, name: "", timestamp: new Date() }
    ];
    const colTwoItems: IKanbanItem[] = [
      { id: itemIds.colTwo.name0, index: 0, name: "", timestamp: new Date() },
      { id: itemIds.colTwo.name1, index: 1, name: "", timestamp: new Date() },
      { id: itemIds.colTwo.name2, index: 2, name: "", timestamp: new Date() },
      { id: itemIds.colTwo.name3, index: 3, name: "", timestamp: new Date() }
    ];
    const columns: IKanbanColumn[] = [
      {
        id: colIds.colOne,
        index: 0,
        name: "",
        timestamp: new Date(),
        items: colOneItems
      },
      {
        id: colIds.colTwo,
        index: 0,
        name: "",
        timestamp: new Date(),
        items: colTwoItems
      }
    ];
    SUT = new KanbanBoard(boardId, columns);
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
