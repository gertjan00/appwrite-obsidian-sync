import { Client, Account, Databases } from "appwrite";
import { Notice } from "obsidian";
import { MyPluginSettings } from "settings";

export class AppwriteService {
	private client: Client;
	private settings: MyPluginSettings;
	public account: Account;
	public databases: Databases;

	constructor() {
		this.client = new Client();
	}

	reconfigure(settings: MyPluginSettings) {
		this.settings = settings;

		if (!settings.appwriteEndpoint || !settings.appwriteProjectId) {
			new Notice(
				"Endpoint en/of project id zijn niet ingevuld in settings",
			);
		}

		this.client
			.setEndpoint(settings.appwriteEndpoint)
			.setProject(settings.appwriteProjectId);

		this.account = new Account(this.client);
		this.databases = new Databases(this.client);
	}

	async testConnection(): Promise<boolean> {
		try {
			const response = await fetch(`${this.settings}/health`);
			return response.ok;
		} catch {
			return false;
		}
	}
}
