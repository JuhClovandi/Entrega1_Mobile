CREATE TABLE `cidades` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`uf_id` integer NOT NULL,
	FOREIGN KEY (`uf_id`) REFERENCES `ufs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ufs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sigla` text NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ufs_sigla_unique` ON `ufs` (`sigla`);--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`email` text NOT NULL,
	`senha` text NOT NULL,
	`perfil` text DEFAULT 'usuario' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usuarios_email_unique` ON `usuarios` (`email`);