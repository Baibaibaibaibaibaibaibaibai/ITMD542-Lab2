var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.queryAll();
  res.render('contacts', { title: 'Contacts', contacts: data } );
});

/* GET contact add */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', { title: 'Add a Contact'} );
});

/* POST contact add */
router.post('/add', function(req, res, next) {
  // 校验所有属性, 如果属性校验有问题,重新回到新增页,并且展示哪些字段有问题.
  if (req.body.firstName.trim() === '') {
    res.render('contacts_add', {title: 'Add a Contact', msg: 'firstName can not be empty!'});
  }
  if (req.body.lastName.trim() === '') {
    res.render('contacts_add', {title: 'Add a Contact', msg: 'lastName can not be empty!'});
  }
  // 如果属性没问题
  // 落表
  contactsRepo.create(req.body);
  // 重定向到列表页
  res.redirect('/contacts');
});

/* GET a contact */
router.get('/:uuid', function(req, res, next) {
  const contact = contactsRepo.queryById(req.params.uuid);
  if (contact) {
    res.render('contact', { title: 'Your Contact', contact: contact} );
  } else {
    res.redirect('/contacts');
  }
});

/* GET A contact delete */
router.get('/:uuid/delete', function(req, res, next) {
  const contact = contactsRepo.queryById(req.params.uuid);
  res.render('contact_delete', { title: 'Delete Contact', contact: contact} );
});

/* POST contacts delete */
router.post('/:uuid/delete', function(req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

/* GET contacts edit */
router.get('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.queryById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit contact', contact: contact} );
});

/* POST contacts edit  */
router.post('/:uuid/edit', function(req, res, next) {
  // 1. 校验数据
  // 2. 如果失败,render 到edit页, 并且携带校验的错误信息
  const contact = contactsRepo.queryById(req.params.uuid);
  if (req.body.firstName.trim() === '') {
    res.render('contacts_edit', {title: 'Edit a Contact', msg: 'firstName can not be empty!', contact: contact});
  }
  if (req.body.lastName.trim() === '') {
    res.render('contacts_edit', {title: 'Edit a Contact', msg: 'lastName can not be empty!', contact: contact});
  }
  // 3. 如果成功,调用repository的更新方法
  contact.firstName = req.body.firstName
  contact.lastName = req.body.lastName
  contact.email = req.body.email
  contact.firstName = req.body.firstName
  contactsRepo.update(contact);
  // 4. 最后再重定向到列表页
  res.redirect('/contacts');



  if (req.body.contactText.trim() === '') {
    const contact = contactsRepo.queryById(req.params.uuid);
    res.render('contacts_edit', {title: 'Edit contact', msg: 'Contact text can not be empty!', contact: contact});
  } else {
    const updatedContact = {id: req.params.uuid, text: req.body.contactText.trim()};
    contactsRepo.update(updatedContact);
    res.redirect('/contacts');
  }
});

module.exports = router;
