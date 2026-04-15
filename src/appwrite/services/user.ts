import { Account, TablesDB } from "appwrite";
import { ObsidianUserClient } from "appwrite/obsidian-clients";

export class AppwriteUserService {
	public tablesDB: TablesDB;
	public account: Account;

	constructor(userClient: ObsidianUserClient) {
		this.tablesDB = new TablesDB(userClient);
		this.account = new Account(userClient);
	}
}
