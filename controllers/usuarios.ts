import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({ usuarios });
  } catch (error) {
    // Type assertion to Error
    const err = error as Error;
    res.status(500).json({ msg: "Error retrieving users", error: err.message });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ usuario });
  } catch (error) {
    // Type assertion to Error
    const err = error as Error;
    res.status(500).json({ msg: "Error retrieving user", error: err.message });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    // Using Sequelize's create method, for example

    const existeEmail = await Usuario.findOne({
        where: {
            email: body.email
        }
    })

    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el email ' + body.email
        })
    }

    const usuario = await Usuario.create(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    
    const usuario = await Usuario.findByPk(id);
    if(!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    };

    await usuario.update(body);

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {

  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
    if(!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    };

    await usuario.update({estado: false});

    // await usuario.destroy();

    res.json(usuario);

};
