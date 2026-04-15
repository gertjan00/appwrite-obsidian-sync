// @ts-nocheck
import { type Models } from 'appwrite';

export type SettingsCreate = {
    "key": string;
    "value": string;
}

export type Settings = Models.Row & {
    "key": string;
    "value": string;
}

export type FilesCreate = {
    "path": string;
    "content"?: string | null;
    "last_modified_by": string;
    "last_modified_at": string;
    "checksum": string;
}

export type Files = Models.Row & {
    "path": string;
    "content"?: string | null;
    "last_modified_by": string;
    "last_modified_at": string;
    "checksum": string;
}

export type PresenceCreate = {
    "user_id": string;
    "user_name": string;
    "color": string;
    "file_path": string;
    "cursor_line": number;
    "cursor_char": number;
    "last_seen_at": string;
}

export type Presence = Models.Row & {
    "user_id": string;
    "user_name": string;
    "color": string;
    "file_path": string;
    "cursor_line": number;
    "cursor_char": number;
    "last_seen_at": string;
}

declare const __roleStringBrand: unique symbol;
export type RoleString = string & { readonly [__roleStringBrand]: never };

export type RoleBuilder = {
  any: () => RoleString;
  user: (userId: string, status?: string) => RoleString;
  users: (status?: string) => RoleString;
  guests: () => RoleString;
  team: (teamId: string, role?: string) => RoleString;
  member: (memberId: string) => RoleString;
  label: (label: string) => RoleString;
}

export type PermissionBuilder = {
  read: (role: RoleString) => string;
  write: (role: RoleString) => string;
  create: (role: RoleString) => string;
  update: (role: RoleString) => string;
  delete: (role: RoleString) => string;
}

export type PermissionCallback = (permission: PermissionBuilder, role: RoleBuilder) => string[];

export type QueryValue = string | number | boolean;

export type ExtractQueryValue<T> = T extends (infer U)[]
  ? U extends QueryValue ? U : never
  : T extends QueryValue | null ? NonNullable<T> : never;

export type QueryableKeys<T> = {
  [K in keyof T]: ExtractQueryValue<T[K]> extends never ? never : K;
}[keyof T];

export type QueryBuilder<T> = {
  equal: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  notEqual: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  lessThan: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  lessThanEqual: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  greaterThan: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  greaterThanEqual: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  contains: <K extends QueryableKeys<T>>(field: K, value: ExtractQueryValue<T[K]>) => string;
  search: <K extends QueryableKeys<T>>(field: K, value: string) => string;
  isNull: <K extends QueryableKeys<T>>(field: K) => string;
  isNotNull: <K extends QueryableKeys<T>>(field: K) => string;
  startsWith: <K extends QueryableKeys<T>>(field: K, value: string) => string;
  endsWith: <K extends QueryableKeys<T>>(field: K, value: string) => string;
  between: <K extends QueryableKeys<T>>(field: K, start: ExtractQueryValue<T[K]>, end: ExtractQueryValue<T[K]>) => string;
  select: <K extends keyof T>(fields: K[]) => string;
  orderAsc: <K extends keyof T>(field: K) => string;
  orderDesc: <K extends keyof T>(field: K) => string;
  limit: (value: number) => string;
  offset: (value: number) => string;
  cursorAfter: (documentId: string) => string;
  cursorBefore: (documentId: string) => string;
  or: (...queries: string[]) => string;
  and: (...queries: string[]) => string;
}

export type DatabaseId = "obsidian";

export type DatabaseTableMap = {
  "obsidian": {
    "settings": {
      create: (data: {
        "key": string;
        "value": string;
      }, options?: { rowId?: string; permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Settings>;
      get: (id: string) => Promise<Settings>;
      update: (id: string, data: Partial<{
        "key": string;
        "value": string;
      }>, options?: { permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Settings>;
      delete: (id: string, options?: { transactionId?: string }) => Promise<void>;
      list: (options?: { queries?: (q: { equal: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; notEqual: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; lessThan: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; lessThanEqual: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; greaterThan: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; greaterThanEqual: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; contains: <K extends QueryableKeys<Settings>>(field: K, value: ExtractQueryValue<Settings[K]>) => string; search: <K extends QueryableKeys<Settings>>(field: K, value: string) => string; isNull: <K extends QueryableKeys<Settings>>(field: K) => string; isNotNull: <K extends QueryableKeys<Settings>>(field: K) => string; startsWith: <K extends QueryableKeys<Settings>>(field: K, value: string) => string; endsWith: <K extends QueryableKeys<Settings>>(field: K, value: string) => string; between: <K extends QueryableKeys<Settings>>(field: K, start: ExtractQueryValue<Settings[K]>, end: ExtractQueryValue<Settings[K]>) => string; select: <K extends keyof Settings>(fields: K[]) => string; orderAsc: <K extends keyof Settings>(field: K) => string; orderDesc: <K extends keyof Settings>(field: K) => string; limit: (value: number) => string; offset: (value: number) => string; cursorAfter: (documentId: string) => string; cursorBefore: (documentId: string) => string; or: (...queries: string[]) => string; and: (...queries: string[]) => string }) => string[] }) => Promise<{ total: number; rows: Settings[] }>;
    };
    "files": {
      create: (data: {
        "path": string;
        "content"?: string | null;
        "last_modified_by": string;
        "last_modified_at": string;
        "checksum": string;
      }, options?: { rowId?: string; permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Files>;
      get: (id: string) => Promise<Files>;
      update: (id: string, data: Partial<{
        "path": string;
        "content"?: string | null;
        "last_modified_by": string;
        "last_modified_at": string;
        "checksum": string;
      }>, options?: { permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Files>;
      delete: (id: string, options?: { transactionId?: string }) => Promise<void>;
      list: (options?: { queries?: (q: { equal: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; notEqual: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; lessThan: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; lessThanEqual: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; greaterThan: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; greaterThanEqual: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; contains: <K extends QueryableKeys<Files>>(field: K, value: ExtractQueryValue<Files[K]>) => string; search: <K extends QueryableKeys<Files>>(field: K, value: string) => string; isNull: <K extends QueryableKeys<Files>>(field: K) => string; isNotNull: <K extends QueryableKeys<Files>>(field: K) => string; startsWith: <K extends QueryableKeys<Files>>(field: K, value: string) => string; endsWith: <K extends QueryableKeys<Files>>(field: K, value: string) => string; between: <K extends QueryableKeys<Files>>(field: K, start: ExtractQueryValue<Files[K]>, end: ExtractQueryValue<Files[K]>) => string; select: <K extends keyof Files>(fields: K[]) => string; orderAsc: <K extends keyof Files>(field: K) => string; orderDesc: <K extends keyof Files>(field: K) => string; limit: (value: number) => string; offset: (value: number) => string; cursorAfter: (documentId: string) => string; cursorBefore: (documentId: string) => string; or: (...queries: string[]) => string; and: (...queries: string[]) => string }) => string[] }) => Promise<{ total: number; rows: Files[] }>;
    };
    "presence": {
      create: (data: {
        "user_id": string;
        "user_name": string;
        "color": string;
        "file_path": string;
        "cursor_line": number;
        "cursor_char": number;
        "last_seen_at": string;
      }, options?: { rowId?: string; permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Presence>;
      get: (id: string) => Promise<Presence>;
      update: (id: string, data: Partial<{
        "user_id": string;
        "user_name": string;
        "color": string;
        "file_path": string;
        "cursor_line": number;
        "cursor_char": number;
        "last_seen_at": string;
      }>, options?: { permissions?: (permission: { read: (role: RoleString) => string; write: (role: RoleString) => string; create: (role: RoleString) => string; update: (role: RoleString) => string; delete: (role: RoleString) => string }, role: { any: () => RoleString; user: (userId: string, status?: string) => RoleString; users: (status?: string) => RoleString; guests: () => RoleString; team: (teamId: string, role?: string) => RoleString; member: (memberId: string) => RoleString; label: (label: string) => RoleString }) => string[]; transactionId?: string }) => Promise<Presence>;
      delete: (id: string, options?: { transactionId?: string }) => Promise<void>;
      list: (options?: { queries?: (q: { equal: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; notEqual: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; lessThan: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; lessThanEqual: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; greaterThan: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; greaterThanEqual: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; contains: <K extends QueryableKeys<Presence>>(field: K, value: ExtractQueryValue<Presence[K]>) => string; search: <K extends QueryableKeys<Presence>>(field: K, value: string) => string; isNull: <K extends QueryableKeys<Presence>>(field: K) => string; isNotNull: <K extends QueryableKeys<Presence>>(field: K) => string; startsWith: <K extends QueryableKeys<Presence>>(field: K, value: string) => string; endsWith: <K extends QueryableKeys<Presence>>(field: K, value: string) => string; between: <K extends QueryableKeys<Presence>>(field: K, start: ExtractQueryValue<Presence[K]>, end: ExtractQueryValue<Presence[K]>) => string; select: <K extends keyof Presence>(fields: K[]) => string; orderAsc: <K extends keyof Presence>(field: K) => string; orderDesc: <K extends keyof Presence>(field: K) => string; limit: (value: number) => string; offset: (value: number) => string; cursorAfter: (documentId: string) => string; cursorBefore: (documentId: string) => string; or: (...queries: string[]) => string; and: (...queries: string[]) => string }) => string[] }) => Promise<{ total: number; rows: Presence[] }>;
    }
  }
};

export type DatabaseHandle<D extends DatabaseId> = {
  use: <T extends keyof DatabaseTableMap[D] & string>(tableId: T) => DatabaseTableMap[D][T];

};

export type DatabaseTables = {
  use: <D extends DatabaseId>(databaseId: D) => DatabaseHandle<D>;

};
