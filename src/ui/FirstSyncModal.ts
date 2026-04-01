import { App, Modal, Notice, Setting } from "obsidian";

export class FirstSyncModal extends Modal {
	constructor(app: App, onSubmit: (result: string) => void) {
		super(app);
		this.setTitle("Run the initial sync with Appwrite");

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText("submit")
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit("asdf");
				}),
		);
	}
}
