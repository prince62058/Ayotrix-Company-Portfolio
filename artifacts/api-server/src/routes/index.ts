import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bannersRouter from "./banners";
import servicesRouter from "./services";
import productsRouter from "./products";
import teamRouter from "./team";
import testimonialsRouter from "./testimonials";
import clientsRouter from "./clients";
import contactsRouter from "./contacts";
import statsRouter from "./stats";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bannersRouter);
router.use(servicesRouter);
router.use(productsRouter);
router.use(teamRouter);
router.use(testimonialsRouter);
router.use(clientsRouter);
router.use(contactsRouter);
router.use(statsRouter);
router.use(adminRouter);

export default router;
