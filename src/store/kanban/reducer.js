const initialState = {
  columns: [{ id: 'col_1', index: 0, name: 'Name' }],
  col_1: [{ id: 'item_1', index: 0, name: 'Item_01' }],
  canEditColumns: false,
};

export default function (state = initialState, { type }) {
  switch (type) {
    default:
      return state;
  }
}
