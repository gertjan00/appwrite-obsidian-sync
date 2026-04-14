import { Models } from "node-appwrite";
import { requestUrl, SecretStorage } from "obsidian";
import { MyPluginSettings } from "settings";
import { template } from "types/schema-template";
import { SyncLogger } from "types/sync-logger";

export class AppwriteHttpService {
	constructor(
		private settings: MyPluginSettings,
		private secretStorage: SecretStorage,
	) {}

	request = async <TResponse>(
		method: "GET" | "POST" | "DELETE",
		path: string,
		body?: unknown,
	): Promise<TResponse> => {
		try {
			const url = `${this.settings.appwriteEndpoint}${path}`;

			const res = await requestUrl({
				url: url,
				method: method,
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": this.settings.appwriteProjectId,
					"X-Appwrite-Key":
						this.secretStorage.getSecret(
							this.settings.appwriteApiKey,
						) || "",
				},
				body: body ? JSON.stringify(body) : undefined,
			});

			if (!res.text || res.text.trim() === "") {
				return undefined as TResponse;
			}

			return res.json as TResponse;
		} catch (e) {
			throw e;
		}
	};

	// TODO verder invullen. deze functie kan je pas uitvoeren als er een team is aangemaakt
	// Permissions any is niet handig
	createTable = async (
		databaseId: string,
		tableId: string,
		name: string,
	): Promise<Models.Table> => {
		return await this.request("POST", `/tablesdb/${databaseId}/tables`, {
			tableId: tableId,
			name: name,
			permissions: [],
			rowSecurity: false,
			enabled: false,
		});
	};

	createBucket = async (bucketId: string, name: string) => {
		const url = "/storage/buckets";

		try {
			await this.request("POST", url, { bucketId: bucketId, name: name });
		} catch (e: any) {
			if (e.status == 409) {
			} else {
				console.error(e);
			}
		}
	};

	// DANGER ZONE

	// Deze functie alleen tijdens testen gebruiken
}
