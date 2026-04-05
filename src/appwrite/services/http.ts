import { requestUrl } from "obsidian";
import { MyPluginSettings } from "settings";

export class AppwriteHttpService {
	private settings: MyPluginSettings;

	constructor(settings: MyPluginSettings) {
		this.settings = settings;
	}

	async request<TResponse>(
		method: "GET" | "POST" | "DELETE",
		path: string,
		body?: unknown,
	): Promise<TResponse> {
		try {
			const url = `${this.settings.appwriteEndpoint}${path}`;

			const res = await requestUrl({
				url: url,
				method: method,
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": this.settings.appwriteProjectId,
					"X-Appwrite-Key": this.settings.appwriteApiKey,
				},
				body: body ? JSON.stringify(body) : undefined,
			});

			if (!res.text || res.text.trim() === "") {
				return undefined as unknown as TResponse;
			}

			return res.json as TResponse;
		} catch (e) {
			throw e;
		}
	}
}
