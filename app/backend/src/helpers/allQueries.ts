export const queryHome = `SELECT 
teams.team_name AS name,
SUM(
  CASE 
    WHEN home_team_goals > away_team_goals THEN 3 
    WHEN home_team_goals = away_team_goals THEN 1 
    ELSE 0 
  END
) AS totalPoints,
COUNT(team_name) AS totalGames,
SUM(
  CASE
    WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
    END
) AS totalVictories,
SUM(
  CASE
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
    END
) AS totalDraws,
SUM(
  CASE
    WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
    END
) AS totalLosses,
SUM(home_team_goals) AS goalsFavor, 
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals - away_team_goals) AS goalsBalance,
ROUND(
  SUM(
    CASE 
      WHEN home_team_goals > away_team_goals THEN 3 
      WHEN home_team_goals = away_team_goals THEN 1 
      ELSE 0 
    END
  ) / (COUNT(team_name) * 3) * 100, 
2) AS efficiency
FROM 
TRYBE_FUTEBOL_CLUBE.matches AS matches 
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams ON matches.home_team_id = teams.id
WHERE 
in_progress = false
GROUP BY 
name
ORDER BY 
totalPoints DESC, 
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC
`;

export const queryAway = `SELECT 
teams.team_name AS name,
SUM(
  CASE 
    WHEN home_team_goals < away_team_goals THEN 3 
    WHEN home_team_goals = away_team_goals THEN 1 
    ELSE 0 
  END
) AS totalPoints,
COUNT(team_name) AS totalGames,
SUM(
  CASE
    WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
    END
) AS totalVictories,
SUM(
  CASE
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
    END
) AS totalDraws,
SUM(
  CASE
    WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
    END
) AS totalLosses,
SUM(away_team_goals) AS goalsFavor, 
SUM(home_team_goals) AS goalsOwn,
SUM(away_team_goals - home_team_goals) AS goalsBalance,
ROUND(
  SUM(
    CASE 
      WHEN home_team_goals < away_team_goals THEN 3 
      WHEN home_team_goals = away_team_goals THEN 1 
      ELSE 0 
    END
  ) / (COUNT(team_name) * 3) * 100, 
2) AS efficiency
FROM 
TRYBE_FUTEBOL_CLUBE.matches AS matches 
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams ON matches.away_team_id = teams.id
WHERE 
in_progress = false
GROUP BY 
name
ORDER BY 
totalPoints DESC, 
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC
`;

export const queryAll = `SELECT 
name, 
SUM(totalPoints) AS totalPoints, 
SUM(totalGames) AS totalGames, 
SUM(totalVictories) AS totalVictories, 
SUM(totalDraws) AS totalDraws, 
SUM(totalLosses) AS totalLosses, 
SUM(goalsFavor) AS goalsFavor, 
SUM(goalsOwn) AS goalsOwn, 
SUM(goalsBalance) AS goalsBalance, 
ROUND(
  SUM(totalPoints) / (SUM(totalGames) * 3) * 100,
2) AS efficiency
FROM (
SELECT 
    teams.team_name AS name,
    SUM(
        CASE 
            WHEN home_team_goals < away_team_goals THEN 3 
            WHEN home_team_goals = away_team_goals THEN 1 
            ELSE 0 
        END
    ) AS totalPoints,
    COUNT(team_name) AS totalGames,
    SUM(
      CASE
        WHEN home_team_goals < away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalVictories,
    SUM(
      CASE
        WHEN home_team_goals = away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalDraws,
    SUM(
      CASE
        WHEN home_team_goals > away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalLosses,
    SUM(away_team_goals) AS goalsFavor, 
    SUM(home_team_goals) AS goalsOwn,
    SUM(away_team_goals - home_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches 
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams ON matches.away_team_id = teams.id
WHERE in_progress = false
GROUP BY name
UNION ALL
SELECT 
    teams.team_name AS name,
    SUM(
        CASE 
            WHEN home_team_goals > away_team_goals THEN 3 
            WHEN home_team_goals = away_team_goals THEN 1 
            ELSE 0 
        END
    ) AS totalPoints,
    COUNT(team_name) AS totalGames,
    SUM(
      CASE
        WHEN home_team_goals > away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalVictories,
    SUM(
      CASE
        WHEN home_team_goals = away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalDraws,
    SUM(
      CASE
        WHEN home_team_goals < away_team_goals THEN 1
        ELSE 0
        END
    ) AS totalLosses,
    SUM(home_team_goals) AS goalsFavor, 
    SUM(away_team_goals) AS goalsOwn,
    SUM(home_team_goals - away_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches 
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams ON matches.home_team_id = teams.id
WHERE in_progress = false
GROUP BY name
) AS subquery
GROUP BY name
ORDER BY 
totalPoints DESC, 
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC
;`;
