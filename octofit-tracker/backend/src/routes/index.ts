import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

function createResourceRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    response.json(await model.find());
  });

  router.get('/:id', async (request: Request, response: Response) => {
    const document = await model.findById(request.params.id);
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(document);
  });

  router.post('/', async (request: Request, response: Response) => {
    const document = await model.create(request.body);
    response.status(201).json(document);
  });

  router.patch('/:id', async (request: Request, response: Response) => {
    const document = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(document);
  });

  router.delete('/:id', async (request: Request, response: Response) => {
    const document = await model.findByIdAndDelete(request.params.id);
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).end();
  });

  return router;
}

apiRouter.use('/users', createResourceRouter(User));
apiRouter.use('/teams', createResourceRouter(Team));
apiRouter.use('/activities', createResourceRouter(Activity));
apiRouter.use('/leaderboard', createResourceRouter(Leaderboard));
apiRouter.use('/workouts', createResourceRouter(Workout));

export default apiRouter;