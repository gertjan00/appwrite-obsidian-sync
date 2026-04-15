import { Plugin, requestUrl } from "obsidian";
import {
	MyPluginSettings,
	DEFAULT_SETTINGS,
	MyPluginSettingTab,
} from "./settings";
import { AppwriteService } from "appwrite/client";

export default class MyPlugin extends Plugin {
	public settings!: MyPluginSettings;
	public appwrite!: AppwriteService;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new MyPluginSettingTab(this));
		this.appwrite = new AppwriteService(this.settings, this.app);
		this.appwrite.reconfigure();
		//
	}

	async onunload() {
		this.appwrite.admin.deleteAll();
	}

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
