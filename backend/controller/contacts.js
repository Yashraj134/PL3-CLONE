const contacts = require('../model/contacts');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

exports.addContact = async (req, res) => {
    const { contact } = req.body;
    const {userId}=req.user
    const id=parseInt(userId,10)

    try {
        const result = await contacts.addContact(contact,id);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Unable to add contact." }); 
        }

        res.status(201).json({ result }); 

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." }); 
    }
};

exports.deleteContact = async (req, res) => {
    const {contactId}=req.params;
    const userId=parseInt(req.user.userId,10)
    try {
        const result = await contacts.deleteContact(userId,contactId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Contact not found." }); 
        }

        res.status(200).json({ message: "Contact deleted successfully.", result });

    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: "Internal server error." }); 
    }
};

exports.downloadContacts = async (req, res) => {
    const userId = parseInt(req.user.userId, 10);

    try {
        const result = await contacts.downloadContacts(userId); 
        if (result.length) {
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(result);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');

            res.status(200).end(csv);
        } else {
            res.status(404).json({ message: 'No contacts found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { userId } = req.user; 
    const id=parseInt(userId,10)
    const {updatedContact} = req.body;
    try {
        const result = await contacts.updateContact(contactId, id, updatedContact); 

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Contact not found." }); 
        }

        res.status(200).json({ message: "Contact updated successfully.", result }); 

    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Internal server error." }); // Return appropriate status
    }
};

exports.getContacts = async (req, res) => {
    const { userId } = req.user; 
    const id=parseInt(userId,10)
    try {
        const rows = await contacts.getContacts(id);

        res.status(200).json({ rows }); // Return 200 for successful retrieval

    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: "Internal server error." }); // Return appropriate status
    }
};
