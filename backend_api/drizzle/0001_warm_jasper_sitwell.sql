CREATE TABLE `agendamentos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`servico_id` integer NOT NULL,
	`cliente_id` integer NOT NULL,
	`horario` text NOT NULL,
	`status` text DEFAULT 'agendado' NOT NULL,
	FOREIGN KEY (`servico_id`) REFERENCES `servicos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cliente_id`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `servicos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`preco` integer NOT NULL,
	`tempo_estimado` text NOT NULL,
	`descricao` text NOT NULL,
	`prestador_id` integer,
	FOREIGN KEY (`prestador_id`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `usuarios` ADD `categoria` text;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `regiao` text;