import express from 'express';
import { newContact, deleteContact } from '../controllers/contact';
import { newSMS, getUserSentSMS, getUserReceivedSMS } from '../controllers/sms';
import { checkContactInput, validateContact, validateContactId, checkSMSInput } from '../middleware/index'

const router = express.Router();

/** Create contacts Route
 *
 * @param  {} checkContactInput
 * @param  {} validateContact
 * @param  {} newContact
 */
router.route('/contacts')
  .post(checkContactInput, validateContact, newContact);

/** Delete contacts Route
 *
 * @param  {} validateContactId
 * @param  {} deleteContact
 */
router.route('/contacts/:contactId')
  .delete(validateContactId, deleteContact);

/** SMS post Route
 *
 * @param  {} validateContactId
 * @param  {} checkSMSInput
 * @param  {} newSMS
 */
router.route('/:contactId/sms')
  .post(validateContactId, checkSMSInput, newSMS)

/** Get user sent sms Route
 *
 * @param  {} validateContactId
 * @param  {} getUserSentSMS
 */
router.route('/:contactId/sms/sent')
  .get(validateContactId, getUserSentSMS)

/** Get user received sms Route
 *
 * @param  {} validateContactId
 * @param  {} getUserReceivedSMS
 */
router.route('/:contactId/sms/received')
  .get(validateContactId, getUserReceivedSMS)

export default router;
