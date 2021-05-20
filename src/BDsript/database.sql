CREATE TABLE `database`.`names` (
  `idnames` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NULL,
  `age` INT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idnames`));

  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';