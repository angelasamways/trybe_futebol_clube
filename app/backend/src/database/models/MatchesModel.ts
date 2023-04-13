import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';
// import OtherModel from './OtherModel';

class Matches extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,

  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: true,
    defaultValue: true,
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamModel.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
TeamModel.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default Matches;
