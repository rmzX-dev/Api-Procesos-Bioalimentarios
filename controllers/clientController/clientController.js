// controllers/clienteController.js
import Cliente from '../../models/clientModel/clientModel.js';

class ClienteController {
  static async getClientes(req, res) {
    try {
      const clientes = await Cliente.getClientes();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ message: 'Error al obtener los clientes' });
    }
  }

  static async getClienteById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.getClienteById(id);

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener cliente por ID:', error);
      res.status(500).json({ message: 'Error al obtener el cliente' });
    }
  }

  static async createCliente(req, res) {
    try {
      const data = req.body;
      const nuevoCliente = await Cliente.createCliente(data);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error('Error al crear cliente:', error);
      res.status(500).json({ message: 'Error al crear el cliente' });
    }
  }

  static async updateCliente(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const clienteActualizado = await Cliente.updateCliente(id, data);

      if (!clienteActualizado) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      res.status(200).json(clienteActualizado);
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
  }

  static async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      const clienteEliminado = await Cliente.deleteCliente(id);

      if (!clienteEliminado) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
  }
}

export default ClienteController;
