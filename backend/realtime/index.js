import { query } from "../config/db.js";

// Ref to socket.io server, start as null, plug it in later
let io = null;

export const setIo = (instance) => {
  io = instance;
};

// name a boardroom
export const boardRoom = (boardId) => `board:${boardId}`;

// sends an event to everyone currently viewing a board
export const emitToBoard = (boardId, event, payload) => {
  if (io) {
    io.to(boardRoom(boardId)).emit(event, payload);
  }
};

// Audit log and Board Live feed
export const logActivity = async ({
  boardId,
  userId,
  action,
  message,
  metadata,
}) => {
  const { rows } = await query(
    `INSERT INTO activities (board_id, user_id, action, message, metadata)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, board_id, user_id, action, message, metadata, created_at`,
    [
      boardId,
      userId || null,
      action,
      message,
      metadata ? JSON.stringify(metadata) : null,
    ],
  );

  const activity = rows[0];
  emitToBoard(boardId, "activity:new", activity);
  return activity;
};
