import { ObsidianAdminClient } from "appwrite/obsidian-clients";
import { Storage, TablesDB } from "node-appwrite";
import { ColumnDefinition, template } from "types/schema-template";
import { SyncLogger } from "types/sync-logger";
import { never } from "utils";

type TDatabases = typeof template.databases;
type TDatabaseId = TDatabases[number]["id"];

type TTables<D extends TDatabaseId> = Extract<
	TDatabases[number],
	{ id: D }
>["tables"];
type TTableId<D extends TDatabaseId> = TTables<D>[number]["id"];

type TColumns<D extends TDatabaseId, T extends TTableId<D>> = Extract<
	TTables<D>[number],
	{ id: T }
>["columns"];

interface createColumnProps<D extends TDatabaseId, T extends TTableId<D>> {
	databaseId: TDatabaseId;
	tableId: TTableId<D>;
	column: TColumns<D, T>[number];
}

export class AppwriteAdminService {
	public tablesDB: TablesDB;
	public storage: Storage;

	constructor(private adminClient: ObsidianAdminClient) {
		this.tablesDB = new TablesDB(adminClient);
		this.storage = new Storage(adminClient);
	}

	updateSchema = async (syncLogger?: SyncLogger): Promise<void> => {
		const { tablesDB, storage } = this;
		const log = syncLogger || (() => {});

		log("Creating bucket for binary files...");

		for (const bucket of template.buckets) {
			await storage.createBucket({
				bucketId: bucket.bucketId,
				name: bucket.name,
			});
		}

		log("Database resetten", 0);
		await sleep(1000);

		log("Starting setup database", 0);

		for (const db of template.databases) {
			try {
				log(` - creating database '${db.id}'`, 0);
				await tablesDB.create({
					databaseId: db.id,
					name: db.name,
				});
			} catch (e: any) {
				if (e.status == 404 || e.status == 409) {
					log(` - database '${db.id}' already exists.`, 2);
				} else {
					console.error(e);
				}
			}

			for (const table of db.tables) {
				try {
					log(` - creating table '${table.id}'`, 2);
					await tablesDB.createTable({
						databaseId: db.id,
						tableId: table.id,
						name: table.id,
					});
				} catch (e: any) {
					if (e.status == 404 || e.status == 409) {
						log(` - table '${table.id}' already exists.`, 4);
					} else {
						log(e, 4);
					}
				}

				for (const column of table.columns) {
					try {
						log(
							` - creating column '${column.key}' (${column.type})`,
							4,
						);
						this.createColumn({
							databaseId: db.id,
							tableId: table.id,
							column: column,
						});
					} catch (e: any) {
						if (e.status == 404 || e.status == 409) {
							log(` - column '${column.key}' already exists.`, 6);
						} else {
							log(e, 6);
						}
					}
				}
			}
		}
	};

	createColumn<D extends TDatabaseId, T extends TTableId<D>>(
		props: createColumnProps<D, T>,
	) {
		const { tablesDB } = this;
		const { databaseId, tableId } = props;
		const column = props.column as ColumnDefinition;

		const { type, ...rest } = column;

		const payload = {
			databaseId: databaseId,
			tableId: tableId,
			...rest,
		};

		switch (type) {
			case "boolean":
				tablesDB.createBooleanColumn(payload);
				break;

			case "email":
				tablesDB.createEmailColumn(payload);
				break;

			case "enum":
				tablesDB.createEnumColumn(payload);
				break;

			case "ip":
				break;

			case "mediumtext":
				break;

			case "url":
				break;

			case "datetime":
				tablesDB.createDatetimeColumn(payload);
				break;

			case "integer":
				tablesDB.createIntegerColumn(payload);
				break;

			case "varchar":
				tablesDB.createVarcharColumn(payload);
				break;

			case "text":
				tablesDB.createTextColumn(payload);
				break;

			case "longtext":
				tablesDB.createLongtextColumn(payload);
				break;

			default:
				never(type);
		}
	}
}
