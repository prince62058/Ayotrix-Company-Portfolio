import { Router } from "express";
import { ServiceModel, ProductModel, TeamMemberModel, ClientModel } from "@workspace/db";

const router = Router();

router.get("/stats", async (req, res) => {
  const servicesCount = await ServiceModel.countDocuments();
  const productsCount = await ProductModel.countDocuments();
  const teamCount = await TeamMemberModel.countDocuments();
  const clientsCount = await ClientModel.countDocuments();

  res.json({
    projectsCompleted: 500 + productsCount * 10,
    happyClients: 200 + clientsCount * 5,
    yearsExperience: 8,
    teamMembers: teamCount || 25,
  });
});

export default router;
