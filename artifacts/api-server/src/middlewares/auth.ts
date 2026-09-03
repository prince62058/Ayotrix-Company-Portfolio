import type { Request, Response, NextFunction } from "express";

export const ADMIN_SESSION_KEY = "ayotrix_admin";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any)?.[ADMIN_SESSION_KEY]) {
    return next();
  }
  return res.status(401).json({ error: "Not authenticated" });
}
