export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string; // optional, YYYY-MM-DD
}

export type Filter = "all" | "active" | "completed";
export type SortOrder = "none" | "asc" | "desc";