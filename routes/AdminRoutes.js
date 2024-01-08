// import { express } from "express";
import { addAdmin, adminLogin, getAdmins,getAdminById } from "../controllers/AdminController";

import express from 'express';
const AdminRouter=express.Router();


// Admin signup
AdminRouter.post("/signup",addAdmin);
// Admin Login
AdminRouter.post("/login",adminLogin);
// get all admins
AdminRouter.get("/",getAdmins);

AdminRouter.get("/:id",getAdminById);

export default AdminRouter;