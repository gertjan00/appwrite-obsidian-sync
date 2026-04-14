import { TablesDB } from "appwrite";
import { ObsidianUserClient } from "appwrite/obsidian-clients";

export class AppwriteUserService {
	public tablesDB: TablesDB;

	constructor(userClient: ObsidianUserClient) {
		this.tablesDB = new TablesDB(userClient);
	}
}
