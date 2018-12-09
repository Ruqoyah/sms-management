import Contact from '../models/contact';
import SMS from '../models/sms';
import Status from '../models/status';

/**
 * create new contact
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const newContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    
    // Save new contact
    const contact = await newContact.save();

    return res.status(201).json(contact)
  } catch(err) {
    return res.status(500).json({error: err.message})
  }
}

/**
 * Delete contact
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 */
export const deleteContact = async (req, res) => {
  try {
    // Get contact id from params
    const { contactId } = req.params

    // Find and delete contact
    const contact = await Contact.findByIdAndRemove(contactId)

    // Delete all SMS sent and received by the contact
    // from sms and status table
    await SMS.deleteMany({ sender: contactId })
    await SMS.deleteMany({ receiver: contactId })
    await Status.deleteMany({ contact: contactId })

    // Check if contact exist
    if (!contact) {
      return res.status(404).send({message: 'Contact does not exist'})
    } else {
      return res.status(200).send({message: 'Contact successfully deleted'})
    }
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}