// FirstSyncModal.ts
import { App, ButtonComponent, Modal, Notice, Setting } from "obsidian";

type SyncDirection = "pull" | "push";

export class FirstSyncModal extends Modal {
	private currentDirection: SyncDirection = "pull";

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		this.setTitle("Initial Appwrite Sync");

		new Setting(contentEl).addButton((button) => {
			button
				.setCta()
				.setButtonText("Close")
				.onClick(() => {
					this.close();
				});
		});
	}
}
