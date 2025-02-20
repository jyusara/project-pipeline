import app from './app';
import { dbConnection, PORT } from './config';
import { seedAgents } from './seeders';

(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  // Rodrigo Chumpitaz: Change index.ts v3
  //await dbConnection.default();
  //await seedAgents();
})();
