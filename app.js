(function () {
  "use strict";

  var STORAGE_KEY = "campo_webapp_session_v1";
  var SCHEMA_VERSION = 1;

  var AFRICAN_COUNTRIES = [
    "Angola", "Argelia", "Benin", "Botsuana", "Burkina Faso", "Burundi", "Cabo Verde",
    "Camerun", "Chad", "Comoras", "Costa de Marfil", "Egipto", "Eritrea", "Esuatini",
    "Etiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea Bissau", "Guinea Ecuatorial",
    "Kenia", "Lesoto", "Liberia", "Libia", "Madagascar", "Malaui", "Mali", "Marruecos",
    "Mauricio", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria",
    "Republica Centroafricana", "Republica Democratica del Congo", "Republica del Congo",
    "Ruanda", "Santo Tome y Principe", "Senegal", "Seychelles", "Sierra Leona", "Somalia",
    "Sudafrica", "Sudan", "Sudan del Sur", "Tanzania", "Togo", "Tunez", "Uganda",
    "Yibuti", "Zambia", "Zimbabue"
  ];

  var GENERAL_FIELD_DEFS = [
    { type: "section", label: "DATOS PRINCIPALES" },
    { key: "numeroEmbarcacion", label: "EMBARCACION NUMERO", span: 1 },
    { key: "lugarLlegada", label: "LUGAR DE LLEGADA", span: 3 },
    { key: "fechaHoraLlegada", label: "FECHA Y HORA DE LLEGADA", inputType: "datetime-local", span: 2 },
    { key: "municipio", label: "MUNICIPIO", span: 2 },
    { key: "requirente", label: "REQUIRENTE" },
    { key: "fechaHoraAviso", label: "FECHA Y HORA DE AVISO", inputType: "datetime-local", compact: true },
    { key: "recuentoTotal", label: "RECUENTO TOTAL", inputType: "number", compact: true },
    { key: "menas", label: "MENAS", inputType: "number", compact: true },
    { key: "otrosMenores", label: "OTROS MENORES", inputType: "number", compact: true },
    { key: "mujeresAdultas", label: "MUJERES ADULTAS", inputType: "number", compact: true },
    { key: "hombresAdultos", label: "HOMBRES ADULTOS", inputType: "number", compact: true },
    { key: "juzgado", label: "JUZGADO" },
    { key: "horaLlamadaJuzgado", label: "HORA LLAMADA JUZGADO", inputType: "time", compact: true },
    { key: "horaLlamadaFiscalia", label: "HORA LLAMADA FISCALIA", inputType: "time", compact: true },
    { key: "horaLlamadaOfilingua", label: "HORA LLAMADA OFILINGUA", inputType: "time", compact: true },
    { key: "horaLlamadaGuagua", label: "HORA LLAMADA GUAGUA", inputType: "time", compact: true },

    { type: "section", label: "DATOS RESCATE" },
    { key: "quienRealizaRescate", label: "QUIEN REALIZA EL RESCATE", span: 2 },
    { key: "coordenadasInterceptacion", label: "COORD. INTERCEPTACION", span: 2 },
    { key: "distanciaCosta", label: "DISTANCIA A COSTA", span: 2 },
    { key: "fechaHoraInterceptacion", label: "FECHA Y HORA INTERCEPT.", inputType: "datetime-local", span: 2 },

    { type: "section", label: "DATOS EMBARCACION" },
    { key: "embarcacionTipo", label: "TIPO" },
    { key: "embarcacionColor", label: "COLOR" },
    { key: "embarcacionMetrosEslora", label: "METROS ESLORA" },
    { key: "embarcacionManga", label: "MANGA" },
    { key: "embarcacionMotores", label: "MOTORES" },
    { key: "embarcacionMaterial", label: "MATERIAL" },
    { key: "embarcacionMatricula", label: "MATRICULA / INSCRIPCION" },

    { type: "section", label: "DATOS VIAJE" },
    { key: "lugarSalida", label: "LUGAR DE SALIDA", span: 2 },
    { key: "fechaSalidaDiasNavegacion", label: "FECHA SALIDA / DIAS NAVEG.", span: 2 },
    { key: "nacionalidadOrigenViaje", label: "NACIONALIDAD / ORIGEN", span: 2 },
    { key: "derivadosHospital", label: "DERIVADOS AL HOSPITAL", span: 2 },

    { type: "section", label: "ESTADO DEL CATE" },
    { key: "estadoCate", label: "ESTADO DEL CATE" },
    { key: "distribucionModuloA", label: "DISTRIBUCION MODULO A" },
    { key: "distribucionModuloB", label: "DISTRIBUCION MODULO B" },
    { key: "distribucionModuloC", label: "DISTRIBUCION MODULO C" },
    { key: "distribucionModuloD", label: "DISTRIBUCION MODULO D" },
    { key: "distribucionModuloE", label: "DISTRIBUCION MODULO E" },
    { key: "policiasIntervinientes", label: "POLICIAS INTERVINIENTES", inputType: "textarea" }
  ];

  var DEFAULT_COMMON_DATA = {
    numeroEmbarcacion: "",
    diligencias: "",
    fechaDetencion: "",
    horaDetencion: "",
    lugarDetencion: "",
    tipoVia: "OTRO",
    instructor: "",
    secretario: "",
    juzgado: "",
    municipio: "",
    indicativo: "OMEGA",
    unidad: "SUR TENERIFE-BRIGADA DE EXTRANJERIA Y DOCUMENTACION",
    plantilla: "SUR TENERIFE-COMISARIA LOCAL",
    motivo: "ENTRADA ILEGAL / INTERCEPTACIONES EN FRONTERAS",
    idiomaComun: "",

    cnc: "",
    lugarLlegada: "",
    fechaHoraLlegada: "",
    requirente: "",
    fechaHoraAviso: "",
    recuentoTotal: "",
    menas: "",
    otrosMenores: "",
    mujeresAdultas: "",
    hombresAdultos: "",
    horaLlamadaJuzgado: "",
    horaLlamadaFiscalia: "",
    horaLlamadaOfilingua: "",
    horaLlamadaGuagua: "",

    quienRealizaRescate: "",
    coordenadasInterceptacion: "",
    distanciaCosta: "",
    fechaHoraInterceptacion: "",

    embarcacionTipo: "",
    embarcacionColor: "",
    embarcacionMetrosEslora: "",
    embarcacionManga: "",
    embarcacionMotores: "",
    embarcacionMaterial: "",
    embarcacionMatricula: "",

    lugarSalida: "",
    fechaSalidaDiasNavegacion: "",
    nacionalidadOrigenViaje: "",
    derivadosHospital: "",

    estadoCate: "",
    distribucionModuloA: "",
    distribucionModuloB: "",
    distribucionModuloC: "",
    distribucionModuloD: "",
    distribucionModuloE: "",
    policiasIntervinientes: ""
  };

  var PERSON_KEYS = [
    "numPulsera",
    "nombre",
    "apellidos",
    "sexo",
    "fechaNacimiento",
    "lugarNacimiento",
    "pais",
    "nacionalidad",
    "tipoDocumento",
    "numDocumento",
    "pasaporteCarta",
    "padres",
    "pulseraCruzRoja",
    "idioma",
    "hablaCastellano"
  ];

  var PERSON_INPUT_KEYS = [
    "numPulsera",
    "nombre",
    "apellidos",
    "sexo",
    "fechaNacimiento",
    "lugarNacimiento",
    "pais",
    "nacionalidad",
    "padres",
    "pasaporteCarta",
    "pulseraCruzRoja",
    "idioma"
  ];

  var state = loadState();
  var editingPersonId = null;
  var toastTimer = null;

  var ui = {
    tabSwitch: document.getElementById("tabSwitch"),
    tabs: document.querySelectorAll(".tab"),
    screens: {
      general: document.getElementById("screen-general"),
      people: document.getElementById("screen-people")
    },
    generalForm: document.getElementById("generalForm"),
    generalFields: document.getElementById("generalFields"),
    africanCountriesList: document.getElementById("africanCountriesList"),
    personForm: document.getElementById("personForm"),
    submitPerson: document.getElementById("submitPerson"),
    cancelEdit: document.getElementById("cancelEdit"),
    peopleList: document.getElementById("peopleList"),
    peopleCount: document.getElementById("peopleCount"),
    btnExport: document.getElementById("btnExport"),
    btnClear: document.getElementById("btnClear"),
    fileImport: document.getElementById("fileImport"),
    toast: document.getElementById("toast")
  };

  renderAfricanCountryList();
  renderGeneralForm();
  bindEvents();
  render();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js?v=20260327e").catch(function () {});
    });
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function toText(value) {
    return String(value == null ? "" : value).trim();
  }

  function uid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return "person_" + window.crypto.randomUUID();
    }
    var rnd = Math.random().toString(36).slice(2, 8);
    return "person_" + Date.now().toString(36) + "_" + rnd;
  }

  function normalizeSex(value) {
    var raw = toText(value);
    var low = raw.toLowerCase();

    if (low === "m" || low === "masculino" || low === "hombre" || low === "varon" || low === "varón") {
      return "MASCULINO";
    }
    if (low === "f" || low === "femenino" || low === "mujer") {
      return "FEMENINO";
    }
    return raw.toUpperCase();
  }

  function splitDateTimeLocal(value) {
    var raw = toText(value);
    if (!raw) {
      return { date: "", time: "" };
    }

    var parts = raw.split("T");
    if (parts.length < 2) {
      return { date: raw, time: "" };
    }

    return {
      date: toText(parts[0]),
      time: toText(parts[1]).slice(0, 5)
    };
  }

  function combineDateTimeLocal(dateValue, timeValue) {
    var date = toText(dateValue);
    var time = toText(timeValue);
    if (!date && !time) {
      return "";
    }
    if (!date) {
      return "";
    }
    if (!time) {
      return date + "T00:00";
    }
    return date + "T" + time.slice(0, 5);
  }

  function syncCompatibilityCommonData(commonData) {
    commonData.lugarDetencion = toText(commonData.lugarLlegada || commonData.lugarDetencion);

    var llegadaSplit = splitDateTimeLocal(commonData.fechaHoraLlegada);
    if (llegadaSplit.date) {
      commonData.fechaDetencion = llegadaSplit.date;
    }
    if (llegadaSplit.time) {
      commonData.horaDetencion = llegadaSplit.time;
    }

    if (!toText(commonData.fechaHoraLlegada) && (toText(commonData.fechaDetencion) || toText(commonData.horaDetencion))) {
      commonData.fechaHoraLlegada = combineDateTimeLocal(commonData.fechaDetencion, commonData.horaDetencion);
    }

    if (!toText(commonData.lugarLlegada) && toText(commonData.lugarDetencion)) {
      commonData.lugarLlegada = toText(commonData.lugarDetencion);
    }
  }

  function emptyBaseFields() {
    var base = {};
    for (var i = 0; i < PERSON_KEYS.length; i += 1) {
      base[PERSON_KEYS[i]] = "";
    }
    base.tipoDocumento = "NIE";
    base.hablaCastellano = "NO";
    return base;
  }

  function createSession() {
    var stamp = nowIso();
    var session = {
      schemaVersion: SCHEMA_VERSION,
      commonData: Object.assign({}, DEFAULT_COMMON_DATA),
      people: [],
      screen2EditsByPersonId: {},
      screen3Selection: [],
      metadata: {
        createdAt: stamp,
        updatedAt: stamp
      }
    };

    syncCompatibilityCommonData(session.commonData);
    return session;
  }

  function sanitizePerson(input) {
    var base = emptyBaseFields();
    var item = input && typeof input === "object" ? input : {};
    var baseIn = item.baseFields && typeof item.baseFields === "object" ? item.baseFields : {};

    for (var i = 0; i < PERSON_KEYS.length; i += 1) {
      var key = PERSON_KEYS[i];
      base[key] = toText(baseIn[key]);
    }

    base.sexo = normalizeSex(base.sexo);

    if (!base.tipoDocumento) {
      base.tipoDocumento = "NIE";
    }
    if (!base.hablaCastellano) {
      base.hablaCastellano = "NO";
    }

    return {
      id: toText(item.id) || uid(),
      baseFields: base,
      extraFields: item.extraFields && typeof item.extraFields === "object" ? item.extraFields : {}
    };
  }

  function sanitizeSession(input) {
    if (!input || typeof input !== "object") {
      return createSession();
    }

    var out = createSession();
    out.schemaVersion = Number(input.schemaVersion) || SCHEMA_VERSION;

    var commonIn = input.commonData && typeof input.commonData === "object" ? input.commonData : {};

    for (var key in out.commonData) {
      if (!Object.prototype.hasOwnProperty.call(out.commonData, key)) {
        continue;
      }
      if (commonIn[key] != null) {
        out.commonData[key] = toText(commonIn[key]);
      }
    }

    for (var incomingKey in commonIn) {
      if (!Object.prototype.hasOwnProperty.call(commonIn, incomingKey)) {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(out.commonData, incomingKey)) {
        out.commonData[incomingKey] = toText(commonIn[incomingKey]);
      }
    }

    syncCompatibilityCommonData(out.commonData);

    var peopleIn = Array.isArray(input.people) ? input.people : [];
    var used = {};
    out.people = peopleIn.map(function (person) {
      var clean = sanitizePerson(person);
      if (used[clean.id]) {
        clean.id = uid();
      }
      used[clean.id] = true;
      return clean;
    });

    out.screen2EditsByPersonId = input.screen2EditsByPersonId && typeof input.screen2EditsByPersonId === "object"
      ? input.screen2EditsByPersonId
      : {};

    out.screen3Selection = Array.isArray(input.screen3Selection) ? input.screen3Selection : [];

    var createdAt = toText(input.metadata && input.metadata.createdAt) || out.metadata.createdAt;
    out.metadata.createdAt = createdAt;
    out.metadata.updatedAt = nowIso();

    return out;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return createSession();
      }
      var parsed = JSON.parse(raw);
      return sanitizeSession(parsed);
    } catch (error) {
      console.error(error);
      return createSession();
    }
  }

  function persistState() {
    syncCompatibilityCommonData(state.commonData);
    state.metadata.updatedAt = nowIso();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function showToast(message) {
    if (!ui.toast) {
      return;
    }
    ui.toast.textContent = message;
    ui.toast.classList.add("show");
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(function () {
      ui.toast.classList.remove("show");
    }, 2500);
  }

  function switchTab(name) {
    ui.tabs.forEach(function (tab) {
      tab.classList.toggle("is-active", tab.dataset.tab === name);
    });
    if (ui.tabSwitch) {
      ui.tabSwitch.dataset.active = name;
    }
    for (var key in ui.screens) {
      ui.screens[key].classList.toggle("is-active", key === name);
    }
  }

  function getFormData(form) {
    var formData = new FormData(form);
    var out = {};
    PERSON_INPUT_KEYS.forEach(function (key) {
      var value = toText(formData.get(key));
      out[key] = key === "sexo" ? normalizeSex(value) : value;
    });
    return out;
  }

  function resetPersonForm() {
    editingPersonId = null;
    ui.personForm.reset();
    ui.submitPerson.textContent = "AÑADIR PERSONA";
    ui.cancelEdit.hidden = true;
  }

  function renderAfricanCountryList() {
    if (!ui.africanCountriesList) {
      return;
    }
    ui.africanCountriesList.innerHTML = AFRICAN_COUNTRIES
      .map(function (country) {
        return "<option value='" + escapeHtml(country) + "'></option>";
      })
      .join("");
  }

  function renderGeneralForm() {
    if (!ui.generalFields) {
      return;
    }

    var html = GENERAL_FIELD_DEFS.map(function (field) {
      if (field.type === "section") {
        return "<div class='form-section-title'>" + escapeHtml(field.label) + "</div>";
      }

      var inputType = field.inputType || "text";
      var placeholder = field.placeholder ? " placeholder='" + escapeHtml(field.placeholder) + "'" : "";
      var classes = ["general-field"];
      if (field.span && Number(field.span) >= 1 && Number(field.span) <= 4) {
        classes.push("general-field-span-" + Number(field.span));
      } else if (field.compact) {
        classes.push("general-field-compact");
      }

      if (inputType === "textarea") {
        return ""
          + "<label class='" + classes.concat(["general-field-wide"]).join(" ") + "'>"
          + "<span>" + escapeHtml(field.label) + "</span>"
          + "<textarea data-common-key='" + escapeHtml(field.key) + "' rows='3'" + placeholder + "></textarea>"
          + "</label>";
      }

      return ""
        + "<label class='" + classes.join(" ") + "'>"
        + "<span>" + escapeHtml(field.label) + "</span>"
        + "<input data-common-key='" + escapeHtml(field.key) + "' type='" + escapeHtml(inputType) + "'" + placeholder + ">"
        + "</label>";
    }).join("");

    ui.generalFields.innerHTML = html;
  }

  function renderGeneralFields() {
    if (!ui.generalForm) {
      return;
    }
    var nodes = ui.generalForm.querySelectorAll("[data-common-key]");
    nodes.forEach(function (node) {
      var key = node.dataset.commonKey;
      node.value = toText(state.commonData[key]);
    });
  }

  function renderPeopleList() {
    ui.peopleCount.textContent = String(state.people.length);

    if (!state.people.length) {
      ui.peopleList.innerHTML = "<p class='person-sub'>Sin personas.</p>";
      return;
    }

    var html = state.people.map(function (person, idx) {
      var bf = person.baseFields;
      var fullName = [toText(bf.nombre), toText(bf.apellidos)].filter(Boolean).join(" ").trim() || "Sin nombre";
      var sub = [
        "#" + (idx + 1),
        toText(bf.numPulsera) ? "Pulsera " + toText(bf.numPulsera) : "Sin pulsera",
        toText(bf.nacionalidad) || "Nacionalidad vacia",
        toText(bf.sexo) || "Sexo vacio"
      ].join(" · ");

      return ""
        + "<article class='person-item' data-person-id='" + escapeHtml(person.id) + "'>"
        + "<div class='person-meta'>"
        + "<div class='person-name'>" + escapeHtml(fullName) + "</div>"
        + "<div class='person-sub'>" + escapeHtml(sub) + "</div>"
        + "</div>"
        + "<div class='person-actions'>"
        + "<button type='button' class='btn btn-edit' data-action='edit'>Editar</button>"
        + "<button type='button' class='btn btn-danger btn-delete' data-action='delete'>Eliminar</button>"
        + "</div>"
        + "</article>";
    }).join("");

    ui.peopleList.innerHTML = html;
  }

  function render() {
    renderGeneralFields();
    renderPeopleList();
  }

  function exportJson() {
    persistState();

    var json = JSON.stringify(state, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var stamp = new Date();
    var fileName = [
      "sesion-campo",
      stamp.getFullYear(),
      String(stamp.getMonth() + 1).padStart(2, "0"),
      String(stamp.getDate()).padStart(2, "0"),
      "-",
      String(stamp.getHours()).padStart(2, "0"),
      String(stamp.getMinutes()).padStart(2, "0")
    ].join("") + ".json";

    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 600);

    showToast("JSON guardado");
  }

  function importJsonFile(file) {
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(String(reader.result || "{}"));
        state = sanitizeSession(parsed);
        persistState();
        resetPersonForm();
        render();
        showToast("JSON cargado");
      } catch (error) {
        alert("JSON no valido");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function bindEvents() {
    ui.tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        switchTab(tab.dataset.tab);
      });
    });

    if (ui.generalForm) {
      ui.generalForm.addEventListener("input", onGeneralFieldInput);
      ui.generalForm.addEventListener("change", onGeneralFieldInput);
    }

    ui.personForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = getFormData(ui.personForm);

      if (!data.nombre) {
        alert("El nombre es obligatorio");
        return;
      }

      if (editingPersonId) {
        var current = state.people.find(function (person) {
          return person.id === editingPersonId;
        });
        if (current) {
          PERSON_INPUT_KEYS.forEach(function (key) {
            current.baseFields[key] = toText(data[key]);
          });
          current.baseFields.sexo = normalizeSex(current.baseFields.sexo);

          if (!current.baseFields.tipoDocumento) {
            current.baseFields.tipoDocumento = "NIE";
          }
          if (!current.baseFields.hablaCastellano) {
            current.baseFields.hablaCastellano = "NO";
          }
          showToast("Persona actualizada");
        }
      } else {
        var baseFields = emptyBaseFields();
        PERSON_INPUT_KEYS.forEach(function (key) {
          baseFields[key] = toText(data[key]);
        });
        baseFields.sexo = normalizeSex(baseFields.sexo);

        state.people.push({
          id: uid(),
          baseFields: baseFields,
          extraFields: {}
        });
        showToast("Persona añadida");
      }

      persistState();
      resetPersonForm();
      renderPeopleList();
    });

    ui.cancelEdit.addEventListener("click", function () {
      resetPersonForm();
    });

    ui.peopleList.addEventListener("click", function (event) {
      var actionTarget = event.target.closest("[data-action]");
      if (!actionTarget) {
        return;
      }

      var personNode = actionTarget.closest("[data-person-id]");
      var personId = personNode ? personNode.dataset.personId : "";
      var person = state.people.find(function (row) {
        return row.id === personId;
      });

      if (!person) {
        return;
      }

      var action = actionTarget.dataset.action;
      if (action === "edit") {
        editingPersonId = person.id;
        PERSON_INPUT_KEYS.forEach(function (key) {
          ui.personForm.elements[key].value = toText(person.baseFields[key]);
        });
        ui.submitPerson.textContent = "Guardar cambios";
        ui.cancelEdit.hidden = false;
        switchTab("people");
        ui.personForm.elements.nombre.focus();
        return;
      }

      if (action === "delete") {
        var ok = window.confirm("¿Eliminar esta persona?");
        if (!ok) {
          return;
        }

        state.people = state.people.filter(function (row) {
          return row.id !== person.id;
        });
        delete state.screen2EditsByPersonId[person.id];
        state.screen3Selection = state.screen3Selection.filter(function (id) {
          return id !== person.id;
        });

        if (editingPersonId === person.id) {
          resetPersonForm();
        }

        persistState();
        renderPeopleList();
        showToast("Persona eliminada");
      }
    });

    ui.btnExport.addEventListener("click", exportJson);

    ui.fileImport.addEventListener("change", function () {
      var file = ui.fileImport.files && ui.fileImport.files[0];
      importJsonFile(file);
      ui.fileImport.value = "";
    });

    ui.btnClear.addEventListener("click", function () {
      var ok = window.confirm("Esto borra toda la sesion local del dispositivo. ¿Continuar?");
      if (!ok) {
        return;
      }
      state = createSession();
      localStorage.removeItem(STORAGE_KEY);
      resetPersonForm();
      render();
      showToast("Sesion local limpiada");
    });
  }

  function onGeneralFieldInput(event) {
    var target = event.target;
    if (!target || !target.dataset || !target.dataset.commonKey) {
      return;
    }
    state.commonData[target.dataset.commonKey] = toText(target.value);
    persistState();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
