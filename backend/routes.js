const express = require('express');
const router = express.Router();
const client = require('./db')
require('dotenv').config();

router.get('/createtable', async (req, res) => {
    await client.query(`
        DROP TABLE IF EXISTS eintraege;
        CREATE TABLE eintraege(
            id serial PRIMARY KEY, 
            datum DATE DEFAULT CURRENT_DATE, -- Automatische Generierung des Datums
            eintraege VARCHAR(3000)
        );
    `);
    res.send({ message: `Table eintraege in database ${process.env.PGDATABASE} created`});
});

router.post('/addEntry', async (req, res) => {
    let eintraege = req.body.eintraege;
    try {
        await client.query('INSERT INTO eintraege (eintraege) VALUES ($1)', [eintraege]);
        res.send({ message: 'Eintrag erfolgreich hinzugefügt' });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Eintrags', error);
        res.status(500).send({ message: 'Fehler beim Hinzufügen des Eintrags' });
    }
});

router.get('/entries', async (req, res) => {
    const query = `SELECT * FROM public.eintraege;`;

    try {
        const result = await client.query(query);
        console.log(result);
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send({ message: 'Fehler beim Abrufen der Einträge.' });
    }
});


router.get('/entries/:id', async (req, res) => {
    const query = `SELECT * FROM public.eintraege WHERE id=$1;`;

    try {
        const id = req.params.id;
        const result = await client.query(query, [id]);
        console.log(result);
        if (result.rowCount == 1)
            res.send(result.rows[0]);
        else
            res.send({ message: "Kein Eintrag gefunden mit id=" + id });
    } catch (err) {
        console.log("error", err.stack);
        res.status(500).send({ message: 'Fehler beim Abrufen des Eintrags.' });
    }
});

router.delete('/entries/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteQuery = `DELETE FROM eintraege WHERE id = $1 RETURNING *;`;
        const deleteResult = await client.query(deleteQuery, [id]);
        if (deleteResult.rowCount > 0) {
            console.log(`Eintrag mit ID ${id} wurde gelöscht.`);
            res.send({ message: `Eintrag mit ID ${id} erfolgreich gelöscht.` });
        } else {
            res.status(404).send({ message: `Eintrag mit ID ${id} nicht gefunden.` });
        }
    } catch (err) {
        console.error(`Fehler beim Löschen des Eintrags: ${err}`);
        res.status(500).send({ message: 'Fehler beim Löschen des Eintrags.' });
    }
});


router.put('/entries/:id', async (req, res) => {
    const id = req.params.id;

    const checkQuery = `SELECT * FROM public.eintraege WHERE id=$1;`;
    try {
        const checkResult = await client.query(checkQuery, [id]);
        if (checkResult.rowCount > 0) {
            const eintraege = req.body.eintraege !== undefined ? req.body.eintraege : checkResult.rows[0].eintraege;

            const updateQuery = `UPDATE eintraege SET eintraege = $1 WHERE id = $2 RETURNING *;`;
            const updateResult = await client.query(updateQuery, [eintraege, id]);
            console.log('updateResult : ', updateResult);
            res.send(updateResult.rows[0]);
        } else {
            res.status(404).send({
                message: "Kein Eintrag gefunden mit id=" + id
            });
        }
    } catch (error) {
        console.log("error", error.stack);
        res.status(500).send({
            message: "Fehler beim Aktualisieren des Eintrags."
        });
    }
});

// Profiel------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/users', async (req, res) => {
    const query = `SELECT * FROM users;`;
    try {
        const result = await client.query(query);
        if (result.rows.length === 0) {
            res.status(200).send({});
        } else {
            res.status(200).send(result.rows[0]);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzerprofils', error);
        res.status(500).send({ message: 'Fehler beim Abrufen des Benutzerprofils' });
    }
});

router.post('/users', async (req, res) => {
    const { vorname, nachname, email } = req.body;
    try {
        const insertQuery = `INSERT INTO users (vorname, nachname, email) VALUES ($1, $2, $3) RETURNING *;`;
        const result = await client.query(insertQuery, [vorname, nachname, email]);
        res.status(201).send(result.rows[0]);
    } catch (error) {
        console.error('Fehler beim Speichern des Benutzerprofils', error);
        res.status(500).send({ message: 'Fehler beim Speichern des Benutzerprofils' });
    }
});

router.put('/entries/:id', async (req, res) => {
    const { id } = req.params;
    const { eintraege, datum } = req.body;

    if (!eintraege || !datum) {
        return res.status(400).send({ message: 'Eintrag und Datum sind erforderlich.' });
    }

    try {
        const updateQuery = `
            UPDATE eintraege 
            SET eintraege = $1, datum = $2
            WHERE id = $3
            RETURNING *;
        `;
        const result = await client.query(updateQuery, [eintraege, datum, id]);

        if (result.rows.length > 0) {
            res.send(result.rows[0]);
        } else {
            res.status(404).send({ message: 'Eintrag nicht gefunden.' });
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Eintrags:', err);
        res.status(500).send({ message: 'Fehler beim Aktualisieren des Eintrags.' });
    }
});


router.delete('/users', async (req, res) => {
    try {
        const deleteQuery = `DELETE FROM users;`; 
        await client.query(deleteQuery);
        res.status(200).send({ message: 'Alle Benutzerdaten wurden gelöscht.' });
    } catch (error) {
        console.error('Fehler beim Löschen der Benutzerdaten', error);
        res.status(500).send({ message: 'Fehler beim Löschen der Benutzerdaten' });
    }
});

// Profiel------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
