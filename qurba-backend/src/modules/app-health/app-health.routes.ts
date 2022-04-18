import { Router } from "express";
import AppHealthController from "./app-health.controller";

const appHealthRouter: Router = Router();
const appHealthController: AppHealthController = new AppHealthController();

appHealthRouter.get('/', appHealthController.ok)

export default appHealthRouter;