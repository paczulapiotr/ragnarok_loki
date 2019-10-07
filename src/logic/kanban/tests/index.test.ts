import "jest";
import { KanbanBoard, KanbanColumn, KanbanItem } from "../index";

describe("KanbanBoard tests", () => {
  let SUT: KanbanBoard;
  const itemIds = {
    colOne: {
      name0: "col_one_item_0",
      name1: "col_one_item_1",
      name2: "col_one_item_2",
      name3: "col_one_item_3"
    },
    colTwo: {
      name0: "col_two_item_0",
      name1: "col_two_item_1",
      name2: "col_two_item_2",
      name3: "col_two_item_3"
    }
  };
  const colIds = {
    colOne: "colOne",
    colTwo: "colTwo"
  };
  const boardId = "testBoard";

  beforeEach(() => {
    const colOneItems: KanbanItem[] = [
      new KanbanItem(itemIds.colOne.name0, 0, ""),
      new KanbanItem(itemIds.colOne.name1, 1, ""),
      new KanbanItem(itemIds.colOne.name2, 2, ""),
      new KanbanItem(itemIds.colOne.name3, 3, "")
    ];
    const colTwoItems: KanbanItem[] = [
      new KanbanItem(itemIds.colTwo.name0, 0, ""),
      new KanbanItem(itemIds.colTwo.name1, 1, ""),
      new KanbanItem(itemIds.colTwo.name2, 2, ""),
      new KanbanItem(itemIds.colTwo.name3, 3, "")
    ];
    const columns: KanbanColumn[] = [
      new KanbanColumn(colIds.colOne, 0, colOneItems),
      new KanbanColumn(colIds.colOne, 1, colTwoItems)
    ];
    SUT = new KanbanBoard(boardId, columns);
  });

  test("should move item inside column", () => {
    // given
    const testedItemId = itemIds.colOne.name0;
    const oldIndex = 0;
    const newIndex = 2;
    const result: IDropResult = {
      source: { droppableId: colIds.colOne, index: oldIndex },
      destination: { droppableId: colIds.colOne, index: newIndex },
      draggableId: testedItemId
    };

    // when
    SUT.move(result);

    // then
    const colOne = SUT.columns.find(x => x.id === colIds.colOne);
    expect(colOne).not.toBe(undefined);

    const newItemIndex = colOne!.items.findIndex(x => x.id === testedItemId);
    expect(newItemIndex).toBe(newIndex);
  });
});
