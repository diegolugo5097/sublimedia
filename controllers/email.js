const multer = require("multer");

let Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: Storage,
}).single("image");

exports.email = async (req, res) => {
  "use strict";
  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    upload(req, res, function (err) {
      if (err) {
        return res.send("Algo ocurrió");
      } else {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sublimediaco@gmail.com", // generated ethereal user
            pass: "xfqnwonwgunzdxos",
          },
        });
        let mailOptions = {
          from: req.body.email, // sender address
          to: "sublimediaco@gmail.com", // list of receivers
          subject: "Nuevo diseño ✔", // Subject line
          html: `
          Correo: ${req.body.email}
          Nombre: ${req.body.name}
          Apellido: ${req.body.lastname}
          Documento: ${req.body.typedocument}
          Numero documento: ${req.body.document}
          Numero telefonico: ${req.body.phone}
          Pedido: ${req.body.description}
          Direccion: ${req.body.address}
          `, // html body
          attachments: [
            {
              path: req.file.path,
            },
          ],
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("enviado");
          }
        });
      }
    });
  }

  main().catch(console.error);
};
