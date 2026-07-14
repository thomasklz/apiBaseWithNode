//Controller tipo de usuario
import { TypeUsersModel } from "../models/TypeUsersModel.js";

export const getTypeUsers = async (req, res) => {
  try {
    const types = await TypeUsersModel.findAll({ where: { state: true } });
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

