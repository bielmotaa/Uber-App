CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`picture` text,
	`email` text,
	`phone` text,
	`email_confirmed_at` text NOT NULL
);
