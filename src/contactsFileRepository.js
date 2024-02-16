const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
/*
    以Map的形式存储 (id, contact),
    其中contact 也是 Map (id, firstName....)
 */
const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contact.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach((element) => {
        db.set(element[0], element[1]);
    });
};
const saveData = () => {
    // 1. 把db全局变量序列化为 json 字符串
    const stringifyData = JSON.stringify(Array.from(db));
    // 2. 把刚才的json字符串持久化到文件.
    fs.writeFileSync(path.join(__dirname, '../data/contact.json'), stringifyData);
};

const repo = {
    queryAll: () => Array.from(db.values()),
    queryById: (uuid) => db.get(uuid),
    create: (contact) => {
        // 构造新的实体
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email, // Assuming email is not mandatory.
            notes: contact.notes,
            createdAt: new Date().toISOString(), // Capture the creation date and time

        };
        // 把实体储存在内存里面
        db.set(newContact.id, newContact);
        // 把所有内存的值持久化到文件上
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        db.set(contact.firstName, contact)
        saveData();
    },

};

loadData();

module.exports = repo;