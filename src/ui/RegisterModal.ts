import { App, Modal, Setting, Notice, ButtonComponent } from "obsidian";
import { AppwriteService } from "appwrite/client";
import { Models } from "node-appwrite";
import { AppwriteException, ID } from "appwrite";

export class RegisterModal extends Modal {
	private email = "email@example.com";
	private password = "12345678";
	private confirmPassword = "12345678";
	private registerButton!: ButtonComponent;

	constructor(
		app: App,
		private appwrite: AppwriteService,
		private onSuccess: (user: Models.Session) => void,
	) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		this.setTitle("Create an owner account");

		this.contentEl.createEl("p", {
			text: "This plugin does not send emails and does not collect any data at all.",
		});
		this.contentEl.createEl("p", {
			text: "After creating an account, the database setup will automatically start.",
		});

		new Setting(contentEl).setName("Email").addText((text) => {
			text.inputEl.addClass("aos-wide-input");
			text.setPlaceholder("email@example.com")
				.setValue(this.email)
				.onChange((value) => {
					this.email = value;
					this.validate();
				});
		});

		new Setting(contentEl).setName("Password").addText((text) => {
			text.inputEl.type = "password";
			text.setValue(this.password).onChange((value) => {
				this.password = value;
				this.validate();
			});
		});

		new Setting(contentEl).setName("Confirm Password").addText((text) => {
			text.inputEl.type = "password";
			text.setValue(this.password).onChange((value) => {
				this.confirmPassword = value;
				this.validate();
			});
		});

		new Setting(contentEl).addButton((btn) => {
			this.registerButton = btn;
			btn.buttonEl.style.width = "250px";
			btn.setButtonText("Register")
				.setWarning()
				.onClick(async () => {
					btn.setDisabled(true);

					try {
						const { account } = this.appwrite.user;

						await account.create({
							userId: ID.unique(),
							email: this.email,
							password: this.password,
						});

						const user = await account.createEmailPasswordSession({
							email: this.email,
							password: this.password,
						});

						this.close();
						this.onSuccess(user);
					} catch (e) {
						if (e instanceof AppwriteException) {
							new Notice(e.message);
						}
					} finally {
						btn.setDisabled(false);
					}
				});
		});

		this.validate();
	}

	private validate(): void {
		if (!this.registerButton) return;

		const errors: string[] = [];

		// Email validatie
		if (this.email.trim() === "") {
			errors.push("Email is required");
		} else if (!this.email.includes("@") || !this.email.includes(".")) {
			errors.push("Please enter a valid email address");
		}

		// Wachtwoord validatie
		if (this.password.length < 8) {
			errors.push("Password must be at least 8 characters");
		}

		// Bevestiging validatie
		if (this.password !== this.confirmPassword) {
			errors.push("Passwords do not match");
		}

		if (errors.length > 0) {
			this.registerButton
				.setDisabled(true)
				.setTooltip(errors.join("\n"), {
					delay: -1,
				});
		} else {
			this.registerButton.setDisabled(false).setTooltip("");
		}
	}

	onClose() {
		this.contentEl.empty();
	}
}
