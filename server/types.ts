import { Session } from "oak_sessions";

export type {
  DbEntities,
  MySqlEntities,
  BoardColor,
  WithoutId
} from "../global.ts";

export type AppState = {
  session: Session;
};