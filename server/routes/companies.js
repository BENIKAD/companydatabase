const express = require('express');
const router = express.Router();
const { Companies } = require('../models');


router.post('/add',  async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access Denied');
  const { vatNumber, companyName, companyAddress } = req.body;

  try {
    const newCompany = await Companies.create({
      vatNumber,
      companyName,
      companyAddress
    });

    res.status(201).send(newCompany);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all companies
router.get('/',  async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.status(200).send(companies);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get a single company by ID
router.get('/:id', async (req, res) => {
  try {
    const companies = await Companies.findByPk(req.params.id);
    if (!companies) return res.status(404).send('Company not found');
    res.status(200).send(companies);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a company
router.put('/:id',  async (req, res) => {
 // if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

  const { vatNumber, companyName, companyAddress } = req.body;

  try {
    const company = await Companies.findByPk(req.params.id);
   
    if (!company) return res.status(404).send('Company not found');

    company.vatNumber = vatNumber;
    company.companyName = companyName;
    company.address = companyAddress;

    await company.save();
    res.status(200).send(company);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
 // if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

  try {
    const companies = await Companies.findByPk(req.params.id);
    if (!companies) return res.status(404).send('Company not found: I cant find this company');

    await companies.destroy();
    res.status(200).send('Company deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;
