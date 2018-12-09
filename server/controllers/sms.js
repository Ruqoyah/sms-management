import SMS from '../models/sms';
import Contact from '../models/contact';
import Status from '../models/status';

/**
 * Send sms
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const newSMS = async (req, res) => {
  try {
    // Get contact id from the params
    const { contactId } = req.params

    const newSMS = new SMS(req.body);

    // Find contact by id
    const sender = await Contact.findById(contactId)

    // check if sender contact exist
    if (!sender) {
      return res.status(404).json({message: 'Sender contact not found'})
    }

    // Assign sender data to new sms
    newSMS.sender = sender

    // Find contact by phone number
    const receiver = await Contact.findOne({ phoneNumber: req.body.receiver })

    // Check if receiver contact exist
    if (!receiver) {
      return res.status(404).json({message: 'Receiver contact not found'})
    }

    // Check if sender phone number and reciever is the same
    if(sender.phoneNumber === receiver.phoneNumber) {
      return res.status(400).json({message: 'You cannot send a message to yourself'})
    }

    // Assign receiver data to new sms
    newSMS.receiver = receiver
   
    // Save new sms
    await newSMS.save();

    // Create new recieved status
    const newReceivedStatus = new Status({
      contact: receiver,
      sms: newSMS,
      status: 'Received'
    });

    // Create new sent status
    const newSentStatus = new Status({
      contact: sender,
      sms: newSMS,
      status: 'Sent'
    });
    
    // Save new status
    await newReceivedStatus.save();
    await newSentStatus.save();

    return res.status(201).json(newSMS)
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}

/**
 * get user sent SMS
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const getUserSentSMS = async (req, res) => {
  try {
    // Get contact id from the params
    const { contactId } = req.params

    // Get all user sent sms
    const sentSMS = await Status.find(
      {
        contact: contactId, 
        status: 'Sent'
      }, 
      {
        contact: 0, 
        _id: 0, 
        createdAt: 0, 
        updatedAt: 0,
         __v: 0
      }
    ).populate('sms')

    return res.status(200).json(sentSMS)
  } catch (err) {
    return res.status(500).json({error: err.message})
  }

}

/**
 * get user received SMS
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const getUserReceivedSMS = async (req, res) => {
  try {
    // Get contact id from the params
    const { contactId } = req.params

    // Get all user sent sms
    const receivedSMS = await Status.find(
      {
        contact: contactId, 
        status: 'Received'
      }, 
      {
        contact: 0, 
        _id: 0, 
        createdAt: 0, 
        updatedAt: 0,
         __v: 0
      }
    ).populate('sms')

    return res.status(200).json(receivedSMS)
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}