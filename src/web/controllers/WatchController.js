const WatchService = require("../../services/WatchService");

class WatchController {
  async create(req, res) {
    try {
      const watch = await WatchService.create(req.body);
      res.status(201).json({
        success: true,
        message: watch.message,
        data: watch.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to create watch",
      });
    }
  }

  async getAll(req, res) {
    try {
      const watches = await WatchService.getAll();
      res.status(200).json({
        success: true,
        message: watches.message,
        data: watches.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Failed to retrieve watches",
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const watch = await WatchService.getById(id);
      res.status(200).json({
        success: true,
        message: watch.message,
        data: watch.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Watch not found",
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await WatchService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to update watch",
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await WatchService.delete(id);
      res.status(200).json({
        success: true,
        message: "Watch deleted successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to delete watch",
      });
    }
  }
}

module.exports = new WatchController;
