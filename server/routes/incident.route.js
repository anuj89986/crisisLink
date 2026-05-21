import {Router} from 'express';
import { createIncident,changeIncidentStatus } from '../controllers/incident.controller.js';
import upload from '../middlewares/multer.middleware.js';
import userAuth  from '../middlewares/userAuth.middleware.js';
const incidentRouter = Router();

incidentRouter.route('/report-incident').post(upload.single('image'),userAuth, createIncident);
incidentRouter.patch('/change-incident-status/:incidentId', changeIncidentStatus);

export default incidentRouter;