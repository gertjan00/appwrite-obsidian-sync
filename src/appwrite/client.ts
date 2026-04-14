import { App, SecretStorage } from "obsidian";
import { MyPluginSettings } from "settings";
import { ObsidianAdminClient, ObsidianUserClient } from "./obsidian-clients";
import sdk, {
	TablesDB as AdminTablesDB,
	Account as AdminAccount,
} from "node-appwrite";
import {
	TablesDB as UserTablesDB,
	Account as UserAccount,
	TablesDB,
	Account,
} from "appwrite";

export class AppwriteService {
	private userClient: ObsidianUserClient;
	private adminClient: ObsidianAdminClient;
	private secretStorage: SecretStorage;

	public admin: {
		account: AdminAccount;
		tablesDB: AdminTablesDB;
	};

	public user: {
		account: UserAccount;
		tablesDB: UserTablesDB;
	};

	constructor(
		private settings: MyPluginSettings,
		app: App,
	) {
		this.userClient = new ObsidianUserClient();
		this.adminClient = new ObsidianAdminClient();
		this.secretStorage = app.secretStorage;

		this.admin = {
			account: new sdk.Account(this.adminClient),
			tablesDB: new sdk.TablesDB(this.adminClient),
		};

		this.user = {
			account: new Account(this.userClient),
			tablesDB: new TablesDB(this.userClient),
		};
	}

	reconfigure() {
		this.userClient
			.setEndpoint(this.settings.appwriteEndpoint)
			.setProject(this.settings.appwriteProjectId);

		this.adminClient
			.setEndpoint(this.settings.appwriteEndpoint)
			.setProject(this.settings.appwriteProjectId);

		const apiKey = this.secretStorage.getSecret(
			this.settings.appwriteApiKey,
		);

		if (apiKey) {
			this.adminClient.setKey(apiKey);
		}
	}
}
