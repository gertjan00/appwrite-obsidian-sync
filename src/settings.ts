import {
	App,
	SecretComponent,
	PluginSettingTab,
	Setting,
	setIcon,
	ButtonComponent,
	Notice,
} from "obsidian";
import MyPlugin from "./main";
import { FirstSyncModal } from "ui/FirstSyncModal";
import { ConfirmModal } from "ui/ConfirmModal";

interface Tab {
	id: string;
	title: string;
	icon: string;
	requiresApiKey: boolean;
	render: (containerEl: HTMLElement) => void;
}

export interface MyPluginSettings {
	appwriteEndpoint: string;
	appwriteProjectId: string;
	appwriteApiKey: string;
	connected: boolean;
	initialSyncDone: boolean;
	syncPlugins: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	appwriteEndpoint: "https://appwrite.zalmhuys.com/v1", // "https://<REGION>.cloud.appwrite.io/v1",
	appwriteProjectId: "69c315ee003c738bed8e", // ""
	appwriteApiKey: "",
	connected: false,
	initialSyncDone: false,
	syncPlugins: false,
};

export class MyPluginSettingTab extends PluginSettingTab {
	plugin: MyPlugin;
	private currentActiveTab: string;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.currentActiveTab = "team";
	}

	display(): void {
		const containerEl = this.containerEl;
		containerEl.empty();
		containerEl.addClass("aos-settings-tab");

		containerEl.createEl("h2", {
			text: "Appwrite Obsidian Sync Settings",
			attr: {
				style: "padding-left: 0",
			},
		});

		const headerEl = containerEl.createDiv({
			cls: "tab-header",
		});

		const tabs = this.getTabs();

		tabs.forEach((tab) => {
			const isActive = tab.id === this.currentActiveTab;

			const isDisabled =
				tab.requiresApiKey && !this.plugin.settings.appwriteApiKey;

			const btn = new ButtonComponent(headerEl)
				.setIcon(tab.icon)
				.setDisabled(isDisabled)
				.setTooltip(isDisabled ? "API key required" : "", {
					delay: -1,
				})
				.onClick(() => {
					this.currentActiveTab = tab.id;
					this.display();
				});

			btn.buttonEl.createSpan({
				text: tab.title,
			});

			if (isActive) {
				btn.setCta();
				tab.render(containerEl);
			}
		});
	}

	private getTabs(): Tab[] {
		const tabs = [
			{
				id: "general",
				title: "Algemeen",
				icon: "settings",
				requiresApiKey: false,
				render: (containerEl: HTMLElement) => {
					this.renderGeneralSettings(containerEl);
				},
			},
			{
				id: "preferences",
				title: "Voorkeuren",
				icon: "settings-2",
				requiresApiKey: true,
				render: (containerEl: HTMLElement) => {
					this.renderPreferenceSettings(containerEl);
				},
			},
			{
				id: "team",
				title: "Team",
				icon: "users",
				requiresApiKey: true,
				render: (containerEl: HTMLElement) => {
					this.renderTeamSettings(containerEl);
				},
			},
			{
				id: "advanced",
				title: "Geavanceerd",
				icon: "wrench",
				requiresApiKey: true,
				render: (containerEl: HTMLElement) => {
					this.renderAdvancedSettings(containerEl);
				},
			},
		];

		return tabs;
	}

	private renderGeneralSettings(containerEl: HTMLElement) {
		new Setting(containerEl).setName("Project details").setHeading();

		new Setting(containerEl)
			.setName("Appwrite Endpoint")
			.setDesc(
				"The url to reach your Appwrite project (should end with /v1).",
			)
			.addText((input) => {
				input
					.setValue(this.plugin.settings.appwriteEndpoint)
					.onChange(async (value) => {
						this.plugin.settings.appwriteEndpoint = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Appwrite Project")
			.setDesc(
				"The id of your Appwrite project. Default is 20 characters",
			)
			.addText((input) => {
				input
					.setValue(this.plugin.settings.appwriteProjectId)
					.onChange(async (value) => {
						this.plugin.settings.appwriteProjectId = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Unlock advanced features")
			.setHeading();

		new Setting(containerEl)
			.setName("Appwrite API key")
			.setDesc(
				"Will be stored securely on your device. Needed for initial setup and advanced features.",
			)
			.addComponent((el) =>
				new SecretComponent(this.app, el)
					.setValue(this.plugin.settings.appwriteApiKey)
					.onChange(async (value) => {
						this.plugin.settings.appwriteApiKey = value;
						await this.plugin.saveSettings();

						let connected: boolean = false;
						if (value) {
							connected = await this.plugin.appwrite.testApiKey();
							new Notice(
								`Api key ${!connected ? "is not " : "is"} valid!`,
							);
						}

						new Notice(
							`Advanced features are now ${value && connected ? "enabled" : "disabled"}.`,
						);

						this.display();
					}),
			);
	}

	private renderPreferenceSettings(containerEl: HTMLElement) {
		containerEl.createEl("p", {
			text: "These settings are shared accross users and devices.",
		});

		new Setting(containerEl)
			.setName("Sync plugins")
			.setDesc(
				"Wheter or not you want to sync plugins accross all devices",
			)
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.syncPlugins)
					.onChange((value) => {
						this.plugin.settings.syncPlugins = value;
						this.plugin.saveSettings();
					});
			});
	}

	private renderTeamSettings(containerEl: HTMLElement) {
		const columns = [
			{ key: "name", caption: "Name" },
			{ key: "joinedAt", caption: "Joined at" },
			{ key: "status", caption: "Status" },
			{ key: "last_seen", caption: "Last seen" },
			{ key: "devices", caption: "Devices" },
		];
		const rows = [
			{ name: "Gert Jan", joined_at: "Today", status: "Verified" },
			{ name: "Pieter", joined_at: "Today", status: "Verified" },
			{ name: "Evert", joined_at: "Today", status: "Verified" },
			{ name: "Tromp", joined_at: "Today", status: "Verified" },
		];

		const table = containerEl.createEl("table", {
			cls: "aos-settings-table",
		});

		const tbody = table.createEl("tbody");

		for (const row of rows) {
			const tr = tbody.createEl("tr");
			for (const column of columns) {
				tr.createEl("td", {
					text: row[column.key] || "",
				});
			}

			tr.createEl("td", {
				text: row.name,
			});
			tr.createEl("td", {
				text: row.joined_at,
			});
			tr.createEl("td", {
				text: row.status,
			});
		}
	}

	private renderAdvancedSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName("Reset settings")
			.addButton((button) => {
				button
					.setButtonText("Reset")
					.setWarning()
					.onClick(() => {
						this.plugin.settings = DEFAULT_SETTINGS;
						this.plugin.saveSettings();
						this.currentActiveTab = "general";
						this.display();
						new Notice(
							"Settings set back to default settings",
							5000,
						);
					});
			});
	}
}
