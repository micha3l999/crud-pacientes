const Confidence = require('confidence');

const RecordConfig = {
    SYMPTOMS: {
        $filter: "SYMPTOM",
        FIEBRE: "FIEBRE",
        PERDIDA_DEL_OLFATO: "PERDIDA_DEL_OLFATO",
        PERDIDA_DEL_GUSTO: "PERDIDA_DEL_GUSTO",
        CANSANCIO: "CANSANCIO",
        TOS_SECA: "TOS_SECA",
        DOLOR_DE_PECHO: "DOLOR_DE_PECHO",
        DOLOR_DE_GARGANTA: "DOLOR_DE_GARGANTA",
        INCAPACIDAD_PARA_HABLAR: "INCAPACIDAD_PARA_HABLAR",
        INCAPACIDAD_PARA_MOVERSE: "INCAPACIDAD_PARA_MOVERSE"
    }
}

const store = new Confidence.Store(RecordConfig);

const get = function (key, criteria) {
    if (criteria) {
      return store.get(key, criteria);
    }
    return store.get(key);
};

const meta = function (key, criteria) {
    if (criteria) { return store.meta(key, criteria); }

    return store.meta(key, criteria);
};


module.exports = {
    get,
    meta,
    RecordConfig
}