require('dotenv/config');

// dialect | host | username | password | database
module.exports = {
  dialect: 'sqlite',
  storage: 'src/database/db.sqlite',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};