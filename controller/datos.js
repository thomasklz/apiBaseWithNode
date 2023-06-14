import { DatosModel } from "../models/datos.js";

export const obtenerDatos = async (req, res) => {
  try {
    const datos = await DatosModel.findAll({
      attributes: ["id","nombre", "apellido", "cedula"],
      where: { estado: true },
    })
    res.status(200).json(datos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const crearDatos = async (req, res) => {
  try {
      await DatosModel.create(req.body);
      res.status(201).json({ message: "registrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editarDatos = async (req,res) => {
  try {
    const { id } = req.params;
    const datos = await DatosModel.findOne({
      where: { estado: true, id },
    });
    datos.set(req.body);
    await datos.save();
    res.status(200).json({ message: "actualizado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const eliminarDatos = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = await DatosModel.findOne({
      where: { id },
    });
    datos.set({ ...datos, estado: false });
    await datos.save();

    res.status(200).json({ message: "eliminado" });
  } catch (error) { }
};