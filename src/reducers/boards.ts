import type { Board, Kudo } from "@/data/types";

export type BoardsAction =
  | { type: "kudo_added"; boardId: string; kudo: Kudo }
  | { type: "kudo_deleted"; boardId: string; kudoId: string };

function assertNever(value: never): never {
  throw new Error(`Unexpected action: ${JSON.stringify(value)}`);
}

export function boardsReducer(boards: Board[], action: BoardsAction): Board[] {
  switch (action.type) {
    case "kudo_added":
      return boards.map((board) =>
        board.id === action.boardId
          ? { ...board, kudos: [...board.kudos, action.kudo] }
          : board,
      );
    case "kudo_deleted":
      return boards.map((board) =>
        board.id === action.boardId
          ? {
              ...board,
              kudos: board.kudos.filter((k) => k.id !== action.kudoId),
            }
          : board,
      );
  }

  return assertNever(action);
}

//fix: the state still lives at the wrong level
//  expand the reducer to manage the entire Board[] collection. Instead of dispatching { type: "added", kudo }, 
//  we'll dispatch { type: "kudo_added", boardId, kudo } — the reducer finds the right board and updates it.