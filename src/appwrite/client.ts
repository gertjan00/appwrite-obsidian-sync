import { Models } from "node-appwrite";
import { requestUrl, Notice } from "obsidian";
import { MyPluginSettings } from "settings";
import { AppwriteAPI } from "types/appwrite-api";

export class AppwriteService {
	private settings: MyPluginSettings;

	constructor(settings: MyPluginSettings) {
		this.settings = settings;
	}

	private async adminRequest<Banaan>(
		path: string,
		method: string,
		body?: Banaan,
	): Promise<Banaan> {
		try {
			const res = await requestUrl({
				url: `${this.settings.appwriteEndpoint}${path}`,
				method: method,
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": this.settings.appwriteProjectId,
					"X-Appwrite-Key": this.settings.appwriteApiKey,
				},
				body: body ? JSON.stringify(body) : undefined,
			});

			return res.json as Banaan;
		} catch (e) {
			throw e;
		}
	}

	async testConnection(): Promise<boolean> {
		if (!this.settings.appwriteEndpoint || !this.settings.appwriteApiKey) {
			new Notice("Instellingen niet compleet");
			return false;
		}

		try {
		} catch {}

		try {
			const data = await this.adminRequest<Models.DatabaseList>(
				"/databases",
				"GET",
			);

			if (data.databases) {
				new Notice(
					`Verbinding geslaagd! ${data.total} databases gevonden.`,
				);
				return true;
			}
			return false;
		} catch (e) {
			if (e) console.log(`Verbinding mislukt: ${e.toString()}`);
			return false;
		}
	}

	async getDatabase(): Promise<Models.Collection> {
		const db = await this.adminRequest();

		return db.Collection;
	}
}
