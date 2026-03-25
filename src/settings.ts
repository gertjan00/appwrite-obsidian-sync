import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export interface MyPluginSettings {
	appwriteEndpoint: string;
	appwriteProjectId: string;
	appwriteApiKey: string;
	connected: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	appwriteEndpoint: "https://<REGION>.cloud.appwrite.io/v1",
	appwriteProjectId: "",
	appwriteApiKey: "",
	connected: false,
};

export class MyPluginSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Appwrite Obsidian Sync settings" });

		if (!this.plugin.settings.connected) {
			new Setting(containerEl)
				.setName("Appwrite endpoint")
				.setDesc("The url where your Appwrite project can be reached")
				.addText((text) => {
					text.inputEl.style.width = "250px";

					text.setPlaceholder(DEFAULT_SETTINGS.appwriteEndpoint)
						.setValue(this.plugin.settings.appwriteEndpoint)
						.onChange(async (value) => {
							this.plugin.settings.appwriteEndpoint = value;
							await this.plugin.saveSettings();
						});
				});
			new Setting(containerEl)
				.setName("Appwrite project id")
				.setDesc("The id of your Appwrite project")
				.addText((text) => {
					text.inputEl.style.width = "250px";

					text.setPlaceholder(DEFAULT_SETTINGS.appwriteProjectId)
						.setValue(this.plugin.settings.appwriteProjectId)
						.onChange(async (value) => {
							this.plugin.settings.appwriteProjectId = value;
							await this.plugin.saveSettings();
						});
				});

			new Setting(containerEl)
				.setName("Appwrite API key")
				.setDesc("Your server API key")
				.addText((text) => {
					text.inputEl.style.width = "250px";
					text.inputEl.type = "password";

					text.setPlaceholder(DEFAULT_SETTINGS.appwriteApiKey)
						.setValue(this.plugin.settings.appwriteApiKey)
						.onChange(async (value) => {
							this.plugin.settings.appwriteApiKey = value;
							await this.plugin.saveSettings();
						});
				});

			new Setting(containerEl)
				.setName("Verbinden met Appwrite!")
				.addButton((button) => {
					button
						.setButtonText("Verbinden")
						.setCta()
						.onClick(async () => {
							button.setDisabled(true);
							button.setButtonText("Verbinden...");

							new Notice("Verbinden met Appwrite...");

							try {
								const success = await this.connect();

								if (success) {
									this.plugin.settings.connected = true;
									await this.plugin.saveSettings();
									new Notice(
										"Succesvol verbonden met Appwrite!",
									);
									this.display();
								} else {
									throw Error("mislukt");
								}
							} catch (error) {
								this.plugin.settings.connected = false;
								await this.plugin.saveSettings();

								if (error instanceof Error) {
									new Notice(error.message);
								} else {
									new Notice(
										error?.toString() ||
											"Onverwachtte fout opgetreden",
									);
								}
							} finally {
								button.setDisabled(false);
								button.setButtonText("Verbinden");
							}
						});
				});
		}
	}

	async connect(): Promise<boolean> {
		await new Promise((resolve) => setTimeout(resolve, 5000));

		return true;
	}
}
