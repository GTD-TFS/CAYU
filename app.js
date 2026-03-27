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

  var IDIOMA_CATALOG = [
    "INUKTITUT","ESPERANTO","FRISN (O FRISIO)","MALDIVO","ASAMS","RUANDÉS","TSONGA","RUSO","BHOJPUR","ZUL","ALEMÁN","INGLÉS","FRANCÉS","AFAR","ABJASO (O ABJASIANO)","AVSTICO","AFRIKAANS","AKANO","AMRICO","ARAGONÉS","ARABE","AVAR","AIMARA","AZER","BASKIR","BIELORRUSO","BÚLGARO","BISLAMA","BAMBARA","BENGAL","TIBETANO","BRETÓN","BOSNIO","CATALÁN","CHECHENO","CHAMORRO","CORSO","CREE","CHECO","ESLAVO ECLESISTICO ANTIGUO","CHUVASIO","GALÉS","DANÉS","DZONGKHA","EWE","GRIEGO (MODERNO)","ESPAÑOL (O CASTELLANO)","ESTONIO","EUSKERA","PERSA","FULA","FINÉS (O FINLANDÉS)","FIYIANO (O FIYI)","FEROS","IRLANDÉS (O GALÁICO)","GALÁICO ESCOCÉS","GALLEGO","GUARAN","GUYARAT (O GUYARAT)","MANS (GALÁICO MANS O DE ISLA DE MAN)","HAUSA","HEBREO","HINDI (O HIND)","HIRI MOTU","CROATA","HAITIANO","HÚNGARO","ARMENIO","HERERO","INTERLINGUA","INDONESIO","OCCIDENTAL","IGBO","YI DE SICHUN","INUPIAQ","IDO","ISLANDÉS","ITALIANO","JAPONÉS","JAVANS","GEORGIANO","KONGO","KIKUYU","KUANYAMA","KAZAJO (O KAZAJIO)","GROENLANDÉS (O KALAALLISUT)","CAMBOYANO (O JEMER)","CANARIO","COREANO","KANURI","CACHEMIRO","KURDO","KOMI","CRNICO","KIRGUS","LATíN","LUXEMBURGUÉS","LUGANDA","LIMBURGUS","LINGALA","LAO","LITUANO","LUBA-KATANGA","LETÓN","MALGACHE (O MALAGASY)","MARSHALÉS","MAOR","MACEDONIO","MALAYALAM","MONGOL","MARAT","MALAYO","MALTÉS","BIRMANO","NAURUANO","NORUEGO BOKML","NDEBELE DEL NORTE","NEPAL","NDONGA","NEERLANDÉS (U HOLANDÉS)","NYNORSK","NORUEGO","NDEBELE DEL SUR","NAVAJO","CHICHEWA","OCCITANO","OJIBWA","OROMO","ORIYA","OSTICO","PANYAB (O PENYABI)","PALI","POLACO","PAST (O PASHTO)","PORTUGUÉS","QUECHUA","RETRORROMÁNICO","KIRUNDI","RUMANO","SÁNSCRITO","SARDO","SINDHI","SAMI SEPTENTRIONAL","SANGO","SERBOCROATA","CINGALS","ESLOVACO","ESLOVENO","SAMOANO","SHONA","SOMAL","ALBANÉS","SERBIO","SUAZI (SWATI O SISWATI)","SESOTHO","SUNDANÉS","SUECO","SUAJILI","TAMIL","TELUG","TAYIKO","TAILANDÉS","TIGRIA","TURCOMANO","TAGALO","SETSUANA","TONGANO","TURCO","TÁRTARO","TWI","TAHITIANO","UIGUR","UCRANIANO","URDU","UZBEKO","VENDA","VIETNAMITA","WALISIANO","VOLAPK","VALN","WOLOF","XHOSA","YDISH (O YIDDISH)","YORUBA","CHUAN (O ZHUANG)","CHINO"
  ];

  var GENERAL_FIELD_DEFS = [
    { type: "section", label: "DATOS PRINCIPALES" },
    { key: "numeroEmbarcacion", label: "EMBARCACION NUMERO", span: 2 },
    { key: "fechaHoraLlegada", label: "FECHA Y HORA DE LLEGADA", inputType: "datetime-local", span: 2 },
    { key: "lugarLlegada", label: "LUGAR DE LLEGADA", span: 4 },
    { key: "municipio", label: "MUNICIPIO", span: 2 },
    { key: "requirente", label: "REQUIRENTE" },
    { key: "fechaHoraAviso", label: "FECHA Y HORA DE AVISO", inputType: "datetime-local", compact: true },
    { key: "recuentoTotal", label: "RECUENTO TOTAL", inputType: "number", compact: true },
    { key: "menas", label: "MENAS", inputType: "number", compact: true },
    { key: "otrosMenores", label: "OTROS MENORES", inputType: "number", compact: true },
    { key: "mujeresAdultas", label: "MUJERES ADULTAS", inputType: "number", compact: true },
    { key: "hombresAdultos", label: "HOMBRES ADULTOS", inputType: "number", compact: true },
    {
      key: "juzgado",
      label: "JUZGADO",
      inputType: "select",
      span: 4,
      options: ["Plaza 1 de Arona", "Plaza 2 de Arona", "Plaza 3 de Arona", "Plaza 4 de Arona"]
    },
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
    idiomaList: document.getElementById("idiomaList"),
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
  renderIdiomaList();
  renderGeneralForm();
  bindEvents();
  installPullToRefreshBlocker();
  render();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js?v=20260327k").catch(function () {});
    });
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function toText(value) {
    return String(value == null ? "" : value).trim();
  }

  function buildExportFileName() {
    var raw = toText(state.commonData && state.commonData.numeroEmbarcacion);
    var normalized = raw
      .replace(/[\\/]+/g, "-")
      .replace(/\s*-\s*/g, "-")
      .replace(/[<>:"|?*\u0000-\u001F]+/g, "-")
      .replace(/\s+/g, " ")
      .replace(/-+/g, "-")
      .trim();

    if (!normalized) {
      normalized = "SIN-NUMERO";
    }
    return "PATERA " + normalized + ".json";
  }

  function installPullToRefreshBlocker() {
    var startY = 0;
    var canBlock = false;

    document.addEventListener("touchstart", function (event) {
      if (!event.touches || event.touches.length !== 1) {
        return;
      }
      startY = event.touches[0].clientY;
      canBlock = window.scrollY <= 0;
    }, { passive: true });

    document.addEventListener("touchmove", function (event) {
      if (!canBlock || !event.touches || event.touches.length !== 1) {
        return;
      }
      var delta = event.touches[0].clientY - startY;
      if (delta > 8) {
        event.preventDefault();
      }
    }, { passive: false });
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
    ui.submitPerson.innerHTML = "<span class='btn-icon' aria-hidden='true'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='9.5' cy='7.5' r='3.5'></circle><path d='M3 20v-1a4.5 4.5 0 0 1 4.5 -4.5h4'></path><path d='M16 8v8'></path><path d='M12 12h8'></path></svg></span>";
    ui.submitPerson.setAttribute("aria-label", "Añadir persona");
    ui.submitPerson.setAttribute("title", "Añadir persona");
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

  function renderIdiomaList() {
    if (!ui.idiomaList) {
      return;
    }
    ui.idiomaList.innerHTML = IDIOMA_CATALOG
      .map(function (item) {
        return "<option value='" + escapeHtml(item) + "'></option>";
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

      if (inputType === "select") {
        var optionsHtml = "<option value=''></option>" + (field.options || []).map(function (opt) {
          return "<option value='" + escapeHtml(opt) + "'>" + escapeHtml(opt) + "</option>";
        }).join("");
        return ""
          + "<label class='" + classes.join(" ") + "'>"
          + "<span>" + escapeHtml(field.label) + "</span>"
          + "<select data-common-key='" + escapeHtml(field.key) + "'>" + optionsHtml + "</select>"
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
        toText(bf.numPulsera) ? "Pulsera " + toText(bf.numPulsera) : "Sin pulsera"
      ].join(" · ");

      return ""
        + "<article class='person-item' data-person-id='" + escapeHtml(person.id) + "'>"
        + "<div class='person-meta'>"
        + "<div class='person-name'>" + escapeHtml(fullName) + "</div>"
        + "<div class='person-sub'>" + escapeHtml(sub) + "</div>"
        + "</div>"
        + "<div class='person-actions'>"
        + "<button type='button' class='icon-action icon-edit' data-action='edit' aria-label='Editar' title='Editar'>"
        + "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20h9'></path><path d='M16.5 3.5a2.1 2.1 0 0 1 3 3l-11 11l-4 1l1-4z'></path></svg>"
        + "</button>"
        + "<button type='button' class='icon-action icon-delete' data-action='delete' aria-label='Eliminar' title='Eliminar'>"
        + "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 6h18'></path><path d='M8 6v-2h8v2'></path><path d='M19 6l-1 14h-12l-1-14'></path><path d='M10 11v6'></path><path d='M14 11v6'></path></svg>"
        + "</button>"
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

    var fileName = buildExportFileName();

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

    ui.personForm.addEventListener("input", function (event) {
      var target = event.target;
      if (!target || target.name !== "lugarNacimiento") {
        return;
      }
      var value = toText(target.value);
      if (!value) {
        return;
      }
      ui.personForm.elements.pais.value = value;
      ui.personForm.elements.nacionalidad.value = value;
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
        ui.submitPerson.innerHTML = "<span class='btn-icon' aria-hidden='true'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2'></path><path d='M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path><path d='M14 4l0 4l-6 0l0 -4'></path></svg></span>";
        ui.submitPerson.setAttribute("aria-label", "Guardar cambios");
        ui.submitPerson.setAttribute("title", "Guardar cambios");
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
