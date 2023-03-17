import { App, Plugin, PluginSettingTab, Setting, Notice } from "obsidian";
import * as http from "http";

import RequestHandler from "./requestHandler";
import { OmnisearchHttpSettings } from "./types";
import { DEFAULT_SETTINGS, HOSTNAME, PLUGIN_NAME } from "./constants";

declare module "obsidian" {
	interface App {
		plugins: {
			isEnabled: (pluginId: string) => boolean;
			disablePlugin: (pluginId: string) => void;
		};
	}
}

export default class OmnisearchHttp extends Plugin {
	settings: OmnisearchHttpSettings;
	httpServer: http.Server;
	requestHandler: RequestHandler;

	async onload() {
		if (!this.app.plugins.isEnabled("omnisearch")) {
			new Notice("Omnisearch HTTP requires Omnisearch to be enabled.");
			this.app.plugins.disablePlugin(PLUGIN_NAME);
			return;
		}

		await this.loadSettings();
		this.requestHandler = new RequestHandler(
			this.app,
			this.manifest,
			this.settings
		);
		this.requestHandler.setupRouter();

		if (!this.settings.apiKey) {
			this.settings.apiKey = this.generateApiKey();
			await this.saveSettings();
		}

		this.addSettingTab(new OmnisearchHttpSettingsTab(this.app, this));
		this.restartServer();
	}

	generateApiKey(): string {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	}

	restartServer() {
		if (this.httpServer) {
			this.httpServer.close();
		}
		this.httpServer = http.createServer(this.requestHandler.api);
		this.httpServer.listen(this.settings.port, HOSTNAME);
		console.log(
			`Omnisearch HTTP API listening on http://${HOSTNAME}:${this.settings.port}`
		);
	}

	onunload(): void {
		if (this.httpServer) {
			this.httpServer.close();
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class OmnisearchHttpSettingsTab extends PluginSettingTab {
	plugin: OmnisearchHttp;

	constructor(app: App, plugin: OmnisearchHttp) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.classList.add("omnisearch-http-settings");

		const apiKeyDiv = containerEl.createDiv("api-key");
		apiKeyDiv.createEl("h2", { text: "API Key" });
		apiKeyDiv.createEl("p", {
			text: "This must be passed in all requests via an authorization header.",
		});
		apiKeyDiv.createEl("pre", { text: this.plugin.settings.apiKey });
		apiKeyDiv.createEl("p", { text: "Example header: " });
		apiKeyDiv.createEl("pre", {
			text: "Authorization: Bearer " + this.plugin.settings.apiKey,
		});

		new Setting(containerEl)
			.setName("Port")
			.setDesc("The port to listen on.")
			.addText((text) =>
				text
					.onChange(async (value) => {
						this.plugin.settings.port = parseInt(value, 10);
						await this.plugin.saveSettings();
						this.plugin.restartServer();
					})
					.setValue(this.plugin.settings.port.toString())
			);
	}
}
