const Patient = require('../../models/patient/Patient');
const User = require('../../models/user/User');
const RecordConfig = require('../../models/record/config');
const colors = require('colors');
const bcrypt = require('bcrypt');
const { populate } = require('../../models/patient/Patient');

async function confirmPassword(req, res, next) {
    try  {
        if (req.body.c_password) {
            if(req.body.password === req.body.c_password) {
                return next();
            } else {
                return res.status(400).send({ message: `Error: Asegurese de estar ingresando correctamente las credenciales` });
            }
        } else {
            return res.status(400).send({ message: "DEBE DE CONFIRMAR LA CONTRASEÑA" });
        }
    } catch(error) {
        console.error(error.red);
        return res.status(500).send({  error });
    }
}

async function registerPatient(req, res) {
    try {
        const salts = 10;
        const newPassword = await bcrypt.hash(req.body.password, salts);

        req.body.password  = newPassword;
        delete req.body.c_password;

        // const copiedUser = JSON.parse(JSON.stringify(req.body));
        const userCreated = new User(req.body);
        const patientCreated = new Patient(req.body);
        userCreated.patientID = patientCreated._id;

        if (req.body.symptoms) {
            const symptoms = req.body.symptoms;
            let firstValidation, secondValidation;
            firstValidation = (symptoms.includes(RecordConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_OLFATO" }))) || 
            (symptoms.includes(RecordConfig.get("/SYMPTOMS", { SYMPTOM: "PERDIDA_DEL_GUSTO" }))) || 
            (symptoms.includes(RecordConfig.get("/SYMPTOMS", { SYMPTOM: "FIEBRE" })))

            symptoms.length >= 2 ? secondValidation = true : secondValidation = false;
            
            if ( firstValidation || secondValidation) {
                patientCreated.covid_19 = true;
            }
            await patientCreated.save();
            await userCreated.save();
            return res.status(201).send({ patient: req.body, message: "El paciente posiblemente tenga covid"});
        } else {
            await patientCreated.save();
            await userCreated.save();

            return res.status(201).send({  patient: req.body, message: "El paciente posiblemente no tenga covid"});
        }
        
    } catch (error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function showAllPatients(req, res) {
    try {
        const users = await User.find({})
        if ( users.length ) return res.status(200).send({ users });
        return res.status(204).send({ message : `NO CONTENT` });
    } catch (error) {
        console.log(error.red);
        return res.status(500).send({ error });
    }
}

async function showPatient(req, res) {
    try  {
        if(req.body.error) {
            const error = req.body.error;
            console.error(error);
            return res.status(500).send({ error });
        }
        if(!req.body.user) return res.status(404).send({message: `Not found`});

        const user = req.body.user;

        return res.status(200).send({user});

    } catch(error) {
        console.error(error.red);
        return res.status(500).send({error});
    }
}

async function updatePatient(req, res) {
    try {
        let query = {};
        query[req.params.key] = req.params.value;

        const user = User.findOne(query, { createdAt: 0, updatedAt: 0 });

        console.log(req.body);
        if(user) {
            User.updateOne(query, req.body, {});
        } else {
            throw new Error("The user doesn't exist");
        }


        /* if(req.body.error) {
            const error = req.body.error;
            return res.status(500).send({ error });
        }
        if(!req.body.user) return res.status(404).send({message: 'Not found'});

        const user = req.body.user;
        
        if(user.patientID) {
            const patient = JSON.parse(JSON.stringify(user.patientID));
            console.log(patient);
        } else {
            throw new Error("There is no a patient of this user");
        }

        delete user.patientID;


        const patientID = user.patientID._id;

        delete req.body.user

        let userToUpdate = JSON.parse(JSON.stringify(req.body))
        userToUpdate.email = email;
        // user = Object.assign({}, req.body);
        console.log(userToUpdate);

        const userUpdated = await userToUpdate.save();


        // const patient = { ...user.patientID, ...req.body };
        // await patient.save(); */
        return res.status(200).send({message: 'Updated'}); 

    } catch(error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function removePatient(req, res) {
    try {
        if(req.body.error) {
            const error = req.body.error;
            return res.status(500).send({ error });
        }
        if(!req.body.user) return res.status(404).send({message: 'Not found'});
        
        const user = req.body.user;
        await user.patientID.remove();
        await user.remove();
        return res.status(200).send({message: 'Patient Removed'});
    } catch(error) {
        console.error(error.red);
        return res.status(500).send({ error });
    }
}

async function find(req, res, next) {
    let query = {};
    try {
        query[req.params.key] = req.params.value;
        const user = await User.findOne(query).populate('patientID');

        if (!user) return next();

        req.body.user = user;
        return next();

    } catch(error) {
        req.body.error = error;
        return next();     
    }
}


module.exports = {
    registerPatient,
    showAllPatients,
    find,
    showPatient,
    updatePatient,
    removePatient,
    confirmPassword
}