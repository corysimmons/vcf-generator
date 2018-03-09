const fs = require(`fs`)
const path = require(`path`)
const faker = require(`faker`)
const base64Img = require(`base64-img`)

const numOfContactsToGenerate = 2

const contactsFile = path.resolve(`./dummy-contacts.vcf`)

fs.writeFileSync(contactsFile, ``)

for (let i = 1; i <= numOfContactsToGenerate; i++) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  const address1 = {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    stateAbbr: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country(),
  }

  const address2 = {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    stateAbbr: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country(),
  }

  const formattedDate = faker.date.past().toISOString().replace(/-/g, ``).replace(/:/g, ``).replace(/\..*$/, ``) + `Z`

  base64Img.requestBase64(faker.image.avatar(), (err, res, body) => {
    if (err) console.error(err)

    const avatar = body.replace(`data:image/jpeg;base64,`, ``)

    /* eslint-disable */
    if (i % 2 === 0) {
    fs.appendFileSync(contactsFile, `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;${faker.name.prefix()};
FN:${firstName} ${lastName}
ORG:${faker.company.companyName()}
TITLE:${faker.name.jobTitle()}
PHOTO;PHOTO;ENCODING=b;TYPE=JPEG:${avatar}
TEL;TYPE=HOME,VOICE:${faker.phone.phoneNumberFormat()}
TEL;TYPE=WORK,VOICE:${faker.phone.phoneNumberFormat()}
ADR;TYPE=HOME,PREF:;;${address1.street};${address1.city};${address1.stateAbbr};${address1.zipCode};${address1.country}
LABEL;TYPE=HOME,PREF:${address1.street}\n${address1.city}\, ${address1.stateAbbr} ${address1.zipCode}\n${address1.country}
ADR;TYPE=WORK:;;42 Plantation St.;${address2.city};${address2.stateAbbr};${address2.zipCode};${address2.country}
LABEL;TYPE=WORK:42 Plantation St.\n${address2.city}\, ${address2.stateAbbr} ${address2.zipCode}\n${address2.country}
EMAIL;TYPE=HOME:${faker.internet.exampleEmail().toLowerCase()}
EMAIL;TYPE=WORK:${faker.internet.exampleEmail().toLowerCase()}
REV:${formattedDate}
END:VCARD

`)
    } else {
    fs.appendFileSync(contactsFile, `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${faker.company.companyName()}
TITLE:${faker.name.jobTitle()}
PHOTO;PHOTO;ENCODING=b;TYPE=JPEG:${avatar}
TEL;TYPE=HOME,VOICE:${faker.phone.phoneNumberFormat()}
ADR;TYPE=HOME,PREF:;;${address1.street};${address1.city};${address1.stateAbbr};${address1.zipCode};${address1.country}
LABEL;TYPE=HOME,PREF:${address1.street}\n${address1.city}\, ${address1.stateAbbr} ${address1.zipCode}\n${address1.country}
EMAIL;TYPE=HOME:${faker.internet.exampleEmail().toLowerCase()}
REV:${formattedDate}
END:VCARD

`)
    }
    /* eslint-enable */
  })
}
