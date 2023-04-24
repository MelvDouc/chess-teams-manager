CREATE TABLE IF NOT EXISTS player (
  ffe_id VARCHAR(10) NOT NULL PRIMARY KEY,
  fide_id INT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  rating INT DEFAULT 1199
);

CREATE TABLE IF NOT EXISTS team (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  captain_ffe_id VARCHAR(10) NOT NULL,
  CONSTRAINT fk_captain_ffe_id FOREIGN KEY (captain_ffe_id) REFERENCES player (ffe_id)
);

CREATE TABLE IF NOT EXISTS club (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  email VARCHAR(50) NULL,
  phone VARCHAR(15) NULL
);

CREATE TABLE IF NOT EXISTS league_match (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  season INT NOT NULL,
  round INT NOT NULL,
  team_id INT NOT NULL,
  opponent_id INT NOT NULL,
  home_club_id INT NOT NULL,
  white_on_odds TINYINT NOT NULL,
  date DATETIME NOT NULL,
  CONSTRAINT fk_match_team_id FOREIGN KEY (team_id) REFERENCES team (id),
  CONSTRAINT fk_match_opponent_id FOREIGN KEY (opponent_id) REFERENCES club (id),
  CONSTRAINT fk_match_home_club_id FOREIGN KEY (opponent_id) REFERENCES club (id)
);

CREATE TABLE IF NOT EXISTS line_up (
  board INT NOT NULL,
  player_rating INT DEFAULT 1199,
  player_ffe_id VARCHAR(10) NOT NULL,
  match_id INT NOT NULL,
  CONSTRAINT fk_line_up_player_ffe_id FOREIGN KEY (player_ffe_id) REFERENCES player (ffe_id),
  CONSTRAINT fk_line_up_match_id FOREIGN KEY (match_id) REFERENCES league_match (id)
);

CREATE TABLE IF NOT EXISTS user (
  email VARCHAR(50) NOT NULL PRIMARY KEY,
  role ENUM("ADMIN", "CAPTAIN", "USER"),
  password VARCHAR(255) NOT NULL,
  password_reset_id VARCHAR(255) NULL
);