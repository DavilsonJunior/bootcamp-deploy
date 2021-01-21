import User from '../models/User';
import Notification from '../schemas/Notifications';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
      .status(401)
      .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' }) // ordernar
      .limit(20);

    return res.json(notifications);  
  }

  async update(req, res) {
    // You can do this way. Find in the data base e after do update
    // const notifications = await Notification.findById(req.params.id);

    // There is another way to do this. An method that finded and already do update
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // this params return bases currents.
    );

    return res.json(notification);
  }
}

export default new NotificationController();