// Requests
interface BoardBaseRequestDTO {
  owned: boolean;
  page: number;
  pageSize: number;
  search: string;
}

interface EditBoardParticipantsRequestDTO {
  id: number;
  participantIds: number[];
}

interface EditBoardRequestDTO {
  name: string;
}

// Results
interface BoardBaseResultDTO {
  id: number;
  name: string;
}
