const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlContacts = require('../controllers/contacts.controller');
const ctrlMessages = require('../controllers/message.controller');

const jwtHelper = require('../config/jwtHelper')

router.post('/inscription', ctrlUser.inscription);
router.post('/authentification', ctrlUser.authentification);
router.get('/profilUtilisateur', jwtHelper.verifyJwtToken,ctrlUser.profilUtilisateur);
router.post('/profilUtilisateur', jwtHelper.verifyJwtToken,ctrlUser.updateProfil);
router.get('/contacts', jwtHelper.verifyJwtToken, ctrlContacts.getContacts);
router.get('/messagesReceived', jwtHelper.verifyJwtToken, ctrlMessages.getAllMessagesReceived);
router.get('/messagesSend', jwtHelper.verifyJwtToken, ctrlMessages.getAllMessagesSend);

router.put('/contacts', jwtHelper.verifyJwtToken, ctrlContacts.new);
router.delete('/contacts/:email', jwtHelper.verifyJwtToken, ctrlContacts.delete);
router.get('/all', jwtHelper.verifyJwtToken, ctrlUser.getAllRegisteredUsers);
router.put('/addExterneContact', jwtHelper.verifyJwtToken, ctrlContacts.addExterneContact);

module.exports = router;



