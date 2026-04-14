type RequiredAndDefault<T> =
	| { required: true; default: null }
	| { required: false; default: T | null };

type BaseColumn<T> = {
	key: string;
	array: boolean;
} & RequiredAndDefault<T>;

type VarcharColumn = BaseColumn<string> & {
	type: "varchar";
	/** @max 16383 */
	size: number;
	encrypt: boolean;
};

type TextColumn = BaseColumn<string> & {
	type: "text";
	encrypt: boolean;
};

type MediumTextColumn = BaseColumn<string> & {
	type: "mediumtext";
	encrypt: boolean;
};

type LongTextColumn = BaseColumn<string> & {
	type: "longtext";
	encrypt: boolean;
};

type IntegerColumn = BaseColumn<number> & {
	type: "integer";
	min: number | null;
	max: number | null;
};

type BooleanColumn = BaseColumn<boolean> & {
	type: "boolean";
};

type DateTimeColumn = BaseColumn<string> & {
	type: "datetime";
};

type EmailColumn = BaseColumn<string> & {
	type: "email";
};

type UrlColumn = BaseColumn<string> & {
	type: "url";
};

type IpColumn = BaseColumn<string> & {
	type: "ip";
};

type EnumColumn = BaseColumn<string> & {
	type: "enum";
	elements: readonly string[];
};

export type ColumnDefinition =
	| VarcharColumn
	| TextColumn
	| MediumTextColumn
	| LongTextColumn
	| IntegerColumn
	| BooleanColumn
	| DateTimeColumn
	| EmailColumn
	| UrlColumn
	| IpColumn
	| EnumColumn;

interface TableDefinition {
	id: string;
	name: string;
	permission: string[];
	rowSecurity: boolean;
	columns: readonly ColumnDefinition[];
	indexes?: readonly {
		key: string;
		type: "key" | "unique" | "fulltext";
		attributes: string[];
	}[];
}

interface DatabaseDefinition {
	id: string;
	name: string;
	tables: readonly TableDefinition[];
}

interface BucketDefinition {
	bucketId: string;
	name: string;
}

interface SchemaDefinition {
	buckets: readonly BucketDefinition[];
	databases: readonly DatabaseDefinition[];
}

export const template = {
	buckets: [
		{
			bucketId: "binary_files",
			name: "Binary Files",
		},
	],
	databases: [
		{
			id: "obsidian",
			name: "Obsidian",
			tables: [
				{
					id: "settings",
					name: "Settings",
					permission: ["team:members"],
					rowSecurity: false,
					columns: [
						{
							key: "key",
							type: "varchar",
							size: 128,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "value",
							type: "text",
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
					],
				},
				{
					id: "files",
					name: "Files",
					permission: ["team:members"],
					rowSecurity: false,
					columns: [
						{
							key: "path",
							type: "varchar",
							size: 767,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "content",
							type: "longtext",
							required: false,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "last_modified_by",
							type: "varchar",
							size: 255,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "last_modified_at",
							required: true,
							type: "datetime",
							array: false,
							default: null,
						},
						{
							key: "checksum",
							type: "varchar",
							size: 255,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
					],
					indexes: [
						{
							key: "idx_path",
							type: "unique",
							attributes: ["path"],
						},
					],
				},
				{
					id: "presence",
					name: "Presence",
					permission: ["team:members"],
					rowSecurity: false,
					columns: [
						{
							key: "user_id",
							type: "varchar",
							size: 255,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "user_name",
							size: 255,
							required: true,
							type: "varchar",
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "color",
							size: 10,
							required: true,
							type: "varchar",
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "file_path",
							type: "varchar",
							size: 767,
							required: true,
							array: false,
							default: null,
							encrypt: false,
						},
						{
							key: "cursor_line",
							required: true,
							type: "integer",
							array: false,
							default: null,
							min: null,
							max: null,
						},
						{
							key: "cursor_char",
							required: true,
							type: "integer",
							array: false,
							default: null,
							min: null,
							max: null,
						},
						{
							key: "last_seen_at",
							required: true,
							type: "datetime",
							array: false,
							default: null,
						},
					],
					indexes: [
						{
							key: "idx_user",
							type: "unique",
							attributes: ["user_id"],
						},
						{
							key: "idx_file",
							type: "key",
							attributes: ["file_path"],
						},
					],
				},
			],
		},
	],
} as const satisfies SchemaDefinition;
