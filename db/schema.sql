CREATE TABLE `organizations` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`industry` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`date_founded` DATE NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`first_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`last_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`organization_id` INT NULL DEFAULT NULL,
	`date_created` TIMESTAMP NULL DEFAULT (now()),
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE,
	INDEX `organization_id` (`organization_id`) USING BTREE,
	CONSTRAINT `FK_users_organizations` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`order_date` DATETIME NOT NULL,
	`total_amount` FLOAT NOT NULL DEFAULT '0',
	`user_id` INT NULL DEFAULT NULL,
	`organization_id` INT NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	INDEX `organization_id` (`organization_id`) USING BTREE,
	CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_orders_organizations` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


