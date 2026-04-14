import { Plugin, requestUrl } from "obsidian";
import {
	MyPluginSettings,
	DEFAULT_SETTINGS,
	MyPluginSettingTab,
} from "./settings";
import { AppwriteService } from "appwrite/client";
import {
	ObsidianAdminClient,
	ObsidianUserClient,
} from "appwrite/obsidian-clients";
import { Account } from "appwrite";

export default class MyPlugin extends Plugin {
	public settings!: MyPluginSettings;
	public appwrite!: AppwriteService;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new MyPluginSettingTab(this.app, this));
		this.appwrite = new AppwriteService(this.settings, this.app);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
