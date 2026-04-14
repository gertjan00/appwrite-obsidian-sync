import { ObsidianAdminClient } from "appwrite/obsidian-clients";
import { template } from "types/schema-template";
import { SyncLogger } from "types/sync-logger";

export class AppwriteBootstrapService {
	constructor(private admin: ObsidianAdminClient) {}

	run(logger?: SyncLogger) {
		const log = logger || (() => {});

		log("Creating bucket for binary files...");
	}
}
