import Contact from '../models/contact';

/** Check if any field is empty while
 * creating new contact
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const checkContactInput = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: 'Name is required'
    });
  }
  if (!req.body.phoneNumber) {
    return res.status(400).json({
      message: 'Phone Number is required'
    });
  }
  next();
};


/** Check if any field is empty while
 * sending an sms
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const checkSMSInput = (req, res, next) => {
  if (!req.body.receiver) {
    return res.status(400).json({
      message: 'Reciever number is required'
    });
  }
  if (!req.body.message) {
    return res.status(400).json({
      message: 'Message is required'
    });
  }
  next();
};


/** Check if name and contact already exist
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validateContact = async (req, res, next) => {
  try {
    const name = await Contact.findOne({name: req.body.name})
    if (name) {
      return res.status(409).json({
        message: 'Name already exists'
      });
    }
    const phoneNumber = await Contact.findOne({phoneNumber: req.body.phoneNumber})
    if (phoneNumber) {
      return res.status(409).json({
        message: 'Phone Number already exists'
      });
    }
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
  next();
};

/** validate param id
 *
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 *
 */
export const validateContactId = (req, res, next) => {
  if (req.params.contactId.match(/^[0-9a-fA-F]{24}$/) == null) {
    return res.status(400).json({
      message: 'Invalid contact id'
    });
  }
  next();
};