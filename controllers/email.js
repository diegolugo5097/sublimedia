exports.email = async (req, res) => {
  "use strict";
  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sublimediaco@gmail.com", // generated ethereal user
        pass: "xfqnwonwgunzdxos",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.query.email, // sender address
      to: "sublimediaco@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
      Correo: ${req.query.email}
      Nombre: ${req.query.name}
      Apellido: ${req.query.lastname}
      Documento: ${req.query.typedocument}
      Numero documento: ${req.query.document}
      Numero telefonico: ${req.query.phone}
      Pedido: ${req.query.description}
      Direccion: ${req.query.address}
      Diseño: <img src=${req.query.image} with="100%"/>
      `, // html body
    });

    if (info.messageId) {
      res.send("email sent");
    } else {
      res.send("Error with sending");
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  console.log(req.query.email);
  main().catch(console.error);
};
