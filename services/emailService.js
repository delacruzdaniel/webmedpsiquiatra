const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCorreoConfirmacionTurno = async (turno) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: turno.email,
            subject: 'Confirmación de Turno',
            html: `
                <h2>¡Hola ${turno.nombre}!</h2>
                <p>Tu turno ha sido agendado exitosamente.</p>
                <p><strong>Detalles del turno:</strong></p>
                <ul>
                    <li>Fecha: ${new Date(turno.fecha).toLocaleDateString()}</li>
                    <li>Hora: ${turno.hora}</li>
                    <li>Tipo de consulta: ${turno.tipoConsulta}</li>
                </ul>
                <p>Si necesitas cancelar o modificar tu turno, por favor contáctanos.</p>
                <p>¡Te esperamos!</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo de confirmación enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
        throw error;
    }
};

const enviarCorreoContacto = async (contacto) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Nuevo Mensaje de Contacto',
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${contacto.nombre}</p>
                <p><strong>Email:</strong> ${contacto.email}</p>
                <p><strong>Teléfono:</strong> ${contacto.telefono}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${contacto.mensaje}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo de contacto enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo de contacto:', error);
        throw error;
    }
};

module.exports = {
    enviarCorreoConfirmacionTurno,
    enviarCorreoContacto
}; 