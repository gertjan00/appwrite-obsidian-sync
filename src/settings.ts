import {
	App,
	SecretComponent,
	PluginSettingTab,
	Setting,
	setIcon,
	ButtonComponent,
} from "obsidian";
import MyPlugin from "./main";
import { FirstSyncModal } from "ui/FirstSyncModal";
import { ConfirmModal } from "ui/ConfirmModal";

export interface MyPluginSettings {
	appwriteEndpoint: string;
	appwriteProjectId: string;

	appwriteApiKey: string;
	connected: boolean;

	initialSyncDone: boolean;
}

export interface Tab {
	id: string;
	title: string;
	icon: string;
	render: (containerEl: HTMLElement) => void;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	appwriteEndpoint: "https://<REGION>.cloud.appwrite.io/v1",
	appwriteProjectId: "",
	appwriteApiKey: "",
	connected: false,
	initialSyncDone: false,
};

export class MyPluginSettingTab extends PluginSettingTab {
	plugin: MyPlugin;
	activeTabId: string; // We houden bij welke tab open staat

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.activeTabId = "general"; // Default tab
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.addClass("aos-settings-tab");

		containerEl.createEl("h2", {
			text: "Appwrite Obsidian Sync settings",
			attr: {
				style: "padding-left: 0",
			},
		});

		const tabs = this.getTabs();

		const headerEl = containerEl.createDiv({ cls: "tab-header" });

		tabs.forEach((tab) => {
			const isActive = this.activeTabId === tab.id;

			const btn = new ButtonComponent(headerEl)
				.setIcon(tab.icon)
				.onClick(() => {
					this.activeTabId = tab.id;
					this.display();
				});

			btn.buttonEl.createSpan({
				text: "Algemeen",
				attr: { style: "margin-left: 0.5em" },
			});

			// Dit is de "magic" voor de styling:
			if (isActive) {
				btn.setCta(); // Maakt de knop paars (Call to Action) + regelt hovers
				tab.render(containerEl);
			} else {
				btn.buttonEl.classList.add("mod-subtle"); // Maakt de knop subtieler
			}

			// Optioneel: voeg een class toe voor je eigen uitlijning (flexbox),
			// maar NIET voor de kleuren/hover.
			btn.buttonEl.addClass("tab-button");
		});

		if (false) {
			// API key can be saved in data.json. Each user needs to setup their own private appwrite project.
			// So environment will not be shared with others and apikey only accessible on client machine.
			// If someone can access that then apikey is not biggest concern
			// Maybe later: only store key in memory during initial setup.
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
		}
	}
	private getTabs(): Tab[] {
		return [
			{
				id: "general",
				title: "Algemeen",
				icon: "settings",
				render: (containerEl: HTMLElement) =>
					this.renderGeneralSettings(containerEl),
			},
			{
				id: "advanced",
				title: "Geavanceerd",
				icon: "wrench",
				render: (containerEl: HTMLElement) =>
					this.renderAdvancedSettings(containerEl),
			},
			{
				id: "about",
				title: "Over",
				icon: "info",
				render: (containerEl: HTMLElement) =>
					this.renderAboutSettings(containerEl),
			},
		];
	}

	private renderGeneralSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName("Update database schema")
			.setDesc("Werkt het schema bij in de database.")
			.addButton((button) => {
				button
					.setButtonText("Update")
					.setCta()
					.onClick(async () => {});
			});

		new Setting(containerEl)
			.setName("Run first sync")
			.setDesc(
				"Choose if you want to pull from, or push to the server (merge not yet available)",
			)
			.addButton((button) => {
				button
					.setCta()
					.setButtonText("Sync")
					.onClick(() => {});
			});
	}

	private renderAdvancedSettings(containerEl: HTMLElement) {
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
			.setName("API key")
			.setDesc("Select a secret from SecretStorage")
			.addComponent((el) =>
				new SecretComponent(this.app, el)
					.setValue(this.plugin.settings.appwriteApiKey)
					.onChange((value) => {
						this.plugin.settings.appwriteApiKey = value;
						this.plugin.saveSettings();
					}),
			);
	}

	private renderAboutSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName("Reset appwrite")
			.setDesc("This will delete ALL data in Appwrite!")
			.addButton((button) => {
				button
					.setButtonText("delete")
					.setWarning()
					.onClick(() => {
						new ConfirmModal(this.app, {
							title: "Are you really, really sure?",
							message:
								"This will really delete all data on your Appwrite server!!",
							countdown: 10,
							setWarning: true,
							onConfirm: async () => {},
						}).open();
					});
			});
	}
}
