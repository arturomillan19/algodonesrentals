const TRANSLATIONS = {
    es: {
        // NAV
        "nav.cta": "Reservar",

        // HERO
        "hero.eyebrow": "Playa Algodones · San Carlos, Sonora",
        "hero.title": "Renta de<br><em>Jetski.</em>",
        "hero.sub": "Adrenalina en el Mar de Cortés. Tres modelos, por hora o media hora. Chaleco e inducción incluidos — solo trae las ganas.",
        "hero.cta": "Reservar ahora",
        "hero.secondary": "Ver modelos",
        "hero.pill.label": "Desde",
        "hero.pill.price": "$1,000",
        "hero.pill.detail": "MXN · media hora",

        // STATS
        "stats.0.lbl": "modelos de jetski",
        "stats.1.lbl": "personas por unidad",
        "stats.2.lbl": "por hora o media hora",
        "stats.3.lbl": "San Carlos, Sonora",

        // VIDEO GALLERY
        "gallery.eyebrow": "En el agua",
        "gallery.title": "Así se siente<br><em>cada recorrido</em>",
        "gallery.cap.0": "Salida a mar abierto",
        "gallery.cap.1": "Pura velocidad",
        "gallery.cap.2": "Adrenalina en el agua",
        "gallery.cap.3": "Mar de Cortés",

        // EXPERIENCE
        "exp.eyebrow": "La experiencia",
        "exp.title": "Mar de Cortés,<br><em>a toda velocidad</em>",
        "exp.body": "Aguas azules, playa tranquila y el jetski listo para salir. No necesitas experiencia previa: te damos una inducción rápida y sales a disfrutar.",

        // INCLUDED
        "inc.eyebrow": "Incluido en tu renta",
        "inc.title": "Todo listo<br><em>para salir</em>",
        "inc.0.name": "Jetski Sea-Doo",
        "inc.0.desc": "Moto acuática mantenida al día y lista para el agua. Tres modelos para cada tipo de rider.",
        "inc.1.name": "Chaleco salvavidas",
        "inc.1.desc": "Certificado y ajustable. Obligatorio durante todo el recorrido — la seguridad va primero.",
        "inc.2.name": "Inducción de manejo",
        "inc.2.desc": "Antes de salir te explicamos cómo operar la unidad y las reglas de la zona. Fácil y rápido.",
        "inc.3.name": "Gasolina incluida",
        "inc.3.desc": "La unidad sale con combustible para tu tiempo contratado. Sin cargos escondidos.",
        "inc.4.name": "Zona supervisada",
        "inc.4.desc": "Área delimitada por boyas y personal atento desde la playa mientras estás en el agua.",
        "inc.5.name": "Playa Algodones",
        "inc.5.desc": "Salimos desde una de las playas más hermosas del Mar de Cortés, en San Carlos.",

        // SEA-DOO STRIP
        "seadoo.pre": "Operamos exclusivamente con",
        "seadoo.post": "equipos de última generación",

        // FLEET (modelos)
        "pkg.eyebrow": "Los modelos",
        "pkg.title": "Elige tu<br><em>jetski</em>",
        "pkg.body": "Tres modelos según cuántos van y qué complexión. Precios en pesos, por hora o media hora. El tiempo corre desde que se entrega la unidad.",

        "pkg.0.name": "Chico",
        "pkg.0.for": "Ideal para una persona, o dos de complexión muy ligera.",
        "pkg.0.row0.lbl": "1 hora",
        "pkg.0.row1.lbl": "Media hora",
        "pkg.0.inc.0": "1 plaza · ideal para 1 persona",
        "pkg.0.inc.1": "Ágil y fácil de manejar",
        "pkg.0.inc.2": "Chaleco e inducción incluidos",
        "pkg.0.inc.3": "Gasolina incluida",
        "pkg.0.extra": "La opción más <strong>económica</strong> para estrenarte en el agua",
        "pkg.0.cta": "Reservar este modelo",

        "pkg.1.name": "Mediano",
        "pkg.1.for": "Para dos personas de complexión ligera que quieren ir juntas.",
        "pkg.1.row0.lbl": "1 hora",
        "pkg.1.row1.lbl": "Media hora",
        "pkg.1.inc.0": "2 plazas · complexión ligera",
        "pkg.1.inc.1": "Estable y con buena potencia",
        "pkg.1.inc.2": "Chaleco e inducción incluidos",
        "pkg.1.inc.3": "Gasolina incluida",
        "pkg.1.extra": "El <strong>equilibrio</strong> entre espacio y precio",
        "pkg.1.cta": "Reservar este modelo",

        "pkg.2.badge": "El más pedido",
        "pkg.2.name": "Grande",
        "pkg.2.for": "Biplaza para dos adultos de complexión grande. El más potente.",
        "pkg.2.row0.lbl": "1 hora",
        "pkg.2.row1.lbl": "Media hora",
        "pkg.2.inc.0": "2 plazas · dos adultos",
        "pkg.2.inc.1": "La mayor potencia de la flota",
        "pkg.2.inc.2": "Chaleco e inducción incluidos",
        "pkg.2.inc.3": "Gasolina incluida",
        "pkg.2.extra": "El más <strong>cómodo y potente</strong> para dos adultos",
        "pkg.2.cta": "Reservar este modelo",

        // PAYMENT + RULES
        "pay.eyebrow": "Pago y reglas",
        "pay.title": "Pago por<br><em>transferencia</em>",
        "pay.body": "Aparta tu horario con transferencia. Aquí están los datos para el pago y las reglas para el manejo de los jetskis.",
        "pay.card.title": "Datos de transferencia",
        "pay.lbl.banco": "Banco",
        "pay.lbl.titular": "Titular",
        "pay.lbl.clabe": "CLABE",
        "pay.lbl.cuenta": "Tarjeta / Cuenta",
        "pay.lbl.concepto": "Concepto",
        "pay.val.concepto": "Tu nombre + fecha",
        "pay.note": "Envía tu comprobante por WhatsApp para confirmar. El horario se aparta hasta recibir el comprobante de la transferencia.",
        "rules.title": "Reglas e instrucciones",
        "rules.0": "Identificación oficial vigente para rentar. Edad mínima 18 años para manejar.",
        "rules.1": "Uso obligatorio del chaleco salvavidas durante todo el recorrido.",
        "rules.2": "Prohibido operar bajo efectos de alcohol o cualquier sustancia.",
        "rules.3": "Respeta la zona delimitada por boyas y guarda distancia de bañistas y embarcaciones.",
        "rules.4": "Recibes una inducción de manejo antes de salir. Velocidad moderada al entrar y salir de la orilla.",
        "rules.5": "El cliente es responsable por daños al equipo por mal uso. Se solicita depósito en garantía.",
        "rules.6": "El tiempo corre desde que se entrega la unidad. Respeta el horario contratado.",
        "rules.7": "Menores de edad solo a bordo acompañados por un adulto responsable.",
        "rules.8": "Si la unidad se voltea 2 veces, el servicio se cancela automáticamente: entra agua al motor y el riesgo de dañarlo por completo es muy alto.",

        // BANANA RIDE
        "banana.eyebrow": "Otro servicio",
        "banana.title": "Paseo en<br><em>banana</em>",
        "banana.body": "Un recorrido divertido por la bahía, ideal para ir en grupo. Diversión asegurada con chaleco y personal atento.",
        "banana.f0": "<strong>$100 MXN</strong> por persona",
        "banana.f1": "Recorrido por la bahía · 10–15 min",
        "banana.f2": "Mínimo 5 · máximo 7 personas",
        "banana.f3": "Hasta 8 si son de complexión chica o niños",
        "banana.cta": "Reservar paseo",

        // TESTIMONIALS
        "testi.eyebrow": "Lo que dicen",
        "testi.title": "De regreso<br><em>con más ganas</em>",
        "testi.0.quote": "\"Nunca me había subido a un jetski y en cinco minutos ya andaba solo. La inducción fue clarísima y el agua estaba increíble.\"",
        "testi.0.loc": "Hermosillo, Sonora",
        "testi.1.quote": "\"Rentamos el grande entre mi pareja y yo. Súper cómodo para los dos y con una potencia brutal. Repetimos al día siguiente.\"",
        "testi.1.loc": "Phoenix, Arizona",
        "testi.2.quote": "\"El proceso fue rápido: transferencia, mando mi comprobante y listo. Personal muy atento y todo en regla. 100% recomendado.\"",
        "testi.2.loc": "Tucson, Arizona",

        // BOOKING
        "booking.eyebrow": "Reserva tu horario",
        "booking.price": "$1,000",
        "booking.per": "MXN desde · media hora en el jetski chico",
        "booking.cta": "Reservar por WhatsApp",
        "booking.note": "Respuesta en menos de <strong>2 horas</strong> · Horarios disponibles 7 días a la semana · Apartas con <strong>transferencia</strong>",

        // FOOTER
        "footer.tagline": "Renta de jetski en el Mar de Cortés",

        // MODAL
        "modal.eyebrow": "Algodones Rentals",
        "modal.title": "Reserva tu<br><em>jetski</em>",
        "modal.sub": "Te enviamos confirmación por WhatsApp en menos de 2 horas.",
        "modal.nombre": "Nombre",
        "modal.personas": "Personas",
        "modal.modelo": "Modelo",
        "modal.modelo.placeholder": "Elige un modelo",
        "modal.modelo.0": "Chico — 1 persona ($1,700 hr / $1,000 ½ hr)",
        "modal.modelo.1": "Mediano — 2 ligeras ($1,900 hr / $1,300 ½ hr)",
        "modal.modelo.2": "Grande — 2 adultos ($2,500 hr / $1,500 ½ hr)",
        "modal.duracion": "Duración",
        "modal.dur.0": "1 hora",
        "modal.dur.1": "Media hora",
        "modal.fecha": "Fecha",
        "modal.submit": "Enviar por WhatsApp",
        "modal.legal": "Apartas con transferencia · Confirmación en 2 hrs",

        // WHATSAPP MESSAGE
        "wa.greeting": "Hola, quiero reservar un jetski en Algodones Rentals.",
        "wa.nombre": "Nombre",
        "wa.modelo": "Modelo",
        "wa.duracion": "Duración",
        "wa.fecha": "Fecha",
        "wa.personas": "Personas",
        "wa.closing": "Quedo pendiente para hacer la transferencia y enviar mi comprobante.",
        "wa.banana": "Hola, quiero reservar un paseo en banana en Algodones Rentals ($100 MXN por persona). ¿Qué horarios tienen disponibles?",
    },

    en: {
        // NAV
        "nav.cta": "Book Now",

        // HERO
        "hero.eyebrow": "Playa Algodones · San Carlos, Sonora",
        "hero.title": "Jetski<br><em>Rentals.</em>",
        "hero.sub": "Adrenaline on the Sea of Cortez. Three models, by the hour or half hour. Life jacket and induction included — just show up ready.",
        "hero.cta": "Book now",
        "hero.secondary": "See models",
        "hero.pill.label": "From",
        "hero.pill.price": "$1,000",
        "hero.pill.detail": "MXN · half hour",

        // STATS
        "stats.0.lbl": "jetski models",
        "stats.1.lbl": "people per unit",
        "stats.2.lbl": "by hour or half hour",
        "stats.3.lbl": "San Carlos, Sonora",

        // VIDEO GALLERY
        "gallery.eyebrow": "On the water",
        "gallery.title": "What every<br><em>ride feels like</em>",
        "gallery.cap.0": "Out to open water",
        "gallery.cap.1": "Pure speed",
        "gallery.cap.2": "Adrenaline on the water",
        "gallery.cap.3": "Sea of Cortez",

        // EXPERIENCE
        "exp.eyebrow": "The experience",
        "exp.title": "Sea of Cortez,<br><em>at full throttle</em>",
        "exp.body": "Blue water, a calm beach and the jetski ready to go. No prior experience needed — we give you a quick induction and off you go.",

        // INCLUDED
        "inc.eyebrow": "Included in your rental",
        "inc.title": "Everything set<br><em>to hit the water</em>",
        "inc.0.name": "Sea-Doo Jetski",
        "inc.0.desc": "Fully maintained personal watercraft, ready for the water. Three models for every kind of rider.",
        "inc.1.name": "Life jacket",
        "inc.1.desc": "Certified and adjustable. Required for the whole ride — safety comes first.",
        "inc.2.name": "Riding induction",
        "inc.2.desc": "Before you head out we show you how to operate the unit and the zone rules. Quick and easy.",
        "inc.3.name": "Fuel included",
        "inc.3.desc": "The unit goes out fueled for your booked time. No hidden charges.",
        "inc.4.name": "Supervised zone",
        "inc.4.desc": "Area marked by buoys and staff watching from the beach while you're on the water.",
        "inc.5.name": "Playa Algodones",
        "inc.5.desc": "We launch from one of the most beautiful beaches on the Sea of Cortez, in San Carlos.",

        // SEA-DOO STRIP
        "seadoo.pre": "We operate exclusively on",
        "seadoo.post": "latest generation watercraft",

        // FLEET (models)
        "pkg.eyebrow": "The models",
        "pkg.title": "Choose your<br><em>jetski</em>",
        "pkg.body": "Three models depending on how many ride and their build. Prices in pesos, by the hour or half hour. Time starts when the unit is handed over.",

        "pkg.0.name": "Small",
        "pkg.0.for": "Ideal for one person, or two of very light build.",
        "pkg.0.row0.lbl": "1 hour",
        "pkg.0.row1.lbl": "Half hour",
        "pkg.0.inc.0": "1 seat · ideal for 1 rider",
        "pkg.0.inc.1": "Nimble and easy to handle",
        "pkg.0.inc.2": "Life jacket & induction included",
        "pkg.0.inc.3": "Fuel included",
        "pkg.0.extra": "The most <strong>affordable</strong> way to get on the water",
        "pkg.0.cta": "Book this model",

        "pkg.1.name": "Medium",
        "pkg.1.for": "For two people of light build who want to ride together.",
        "pkg.1.row0.lbl": "1 hour",
        "pkg.1.row1.lbl": "Half hour",
        "pkg.1.inc.0": "2 seats · light build",
        "pkg.1.inc.1": "Stable with solid power",
        "pkg.1.inc.2": "Life jacket & induction included",
        "pkg.1.inc.3": "Fuel included",
        "pkg.1.extra": "The <strong>balance</strong> of space and price",
        "pkg.1.cta": "Book this model",

        "pkg.2.badge": "Most requested",
        "pkg.2.name": "Large",
        "pkg.2.for": "Two-seater for two full-size adults. The most powerful.",
        "pkg.2.row0.lbl": "1 hour",
        "pkg.2.row1.lbl": "Half hour",
        "pkg.2.inc.0": "2 seats · two adults",
        "pkg.2.inc.1": "The most power in the fleet",
        "pkg.2.inc.2": "Life jacket & induction included",
        "pkg.2.inc.3": "Fuel included",
        "pkg.2.extra": "The most <strong>comfortable and powerful</strong> for two adults",
        "pkg.2.cta": "Book this model",

        // PAYMENT + RULES
        "pay.eyebrow": "Payment & rules",
        "pay.title": "Pay by<br><em>bank transfer</em>",
        "pay.body": "Hold your time slot with a transfer. Here are the payment details and the rules for handling the jetskis.",
        "pay.card.title": "Transfer details",
        "pay.lbl.banco": "Bank",
        "pay.lbl.titular": "Account holder",
        "pay.lbl.clabe": "CLABE",
        "pay.lbl.cuenta": "Card / Account",
        "pay.lbl.concepto": "Reference",
        "pay.val.concepto": "Your name + date",
        "pay.note": "Send your receipt via WhatsApp to confirm. The slot is held until we receive the transfer receipt.",
        "rules.title": "Rules & instructions",
        "rules.0": "Valid government ID required to rent. Minimum age 18 to drive.",
        "rules.1": "Life jacket is mandatory throughout the entire ride.",
        "rules.2": "Operating under the influence of alcohol or any substance is prohibited.",
        "rules.3": "Respect the buoy-marked zone and keep your distance from swimmers and boats.",
        "rules.4": "You get a riding induction before heading out. Slow speed entering and leaving the shore.",
        "rules.5": "The renter is responsible for damage from misuse. A security deposit is required.",
        "rules.6": "Time starts when the unit is handed over. Please respect your booked time.",
        "rules.7": "Minors on board only when accompanied by a responsible adult.",
        "rules.8": "If the unit flips over twice, the service is automatically cancelled: water gets into the engine and the risk of destroying it entirely is very high.",

        // BANANA RIDE
        "banana.eyebrow": "Another service",
        "banana.title": "Banana<br><em>boat ride</em>",
        "banana.body": "A fun ride around the bay, perfect for groups. Guaranteed fun with a life jacket and attentive staff.",
        "banana.f0": "<strong>$100 MXN</strong> per person",
        "banana.f1": "Ride around the bay · 10–15 min",
        "banana.f2": "Minimum 5 · maximum 7 people",
        "banana.f3": "Up to 8 if light build or only kids",
        "banana.cta": "Book the ride",

        // TESTIMONIALS
        "testi.eyebrow": "What they say",
        "testi.title": "Back home,<br><em>already wanting more</em>",
        "testi.0.quote": "\"I'd never been on a jetski and within five minutes I was riding on my own. The induction was crystal clear and the water was amazing.\"",
        "testi.0.loc": "Hermosillo, Sonora",
        "testi.1.quote": "\"My partner and I rented the large one. Super comfortable for two and brutally powerful. We came back the next day.\"",
        "testi.1.loc": "Phoenix, Arizona",
        "testi.2.quote": "\"The process was fast: transfer, send my receipt and done. Very attentive staff and everything by the book. 100% recommended.\"",
        "testi.2.loc": "Tucson, Arizona",

        // BOOKING
        "booking.eyebrow": "Reserve your slot",
        "booking.price": "$1,000",
        "booking.per": "MXN from · half hour on the small jetski",
        "booking.cta": "Book via WhatsApp",
        "booking.note": "Reply within <strong>2 hours</strong> · Available 7 days a week · Hold your slot with a <strong>transfer</strong>",

        // FOOTER
        "footer.tagline": "Jetski rentals on the Sea of Cortez",

        // MODAL
        "modal.eyebrow": "Algodones Rentals",
        "modal.title": "Book your<br><em>jetski</em>",
        "modal.sub": "We'll confirm via WhatsApp within 2 hours.",
        "modal.nombre": "Name",
        "modal.personas": "People",
        "modal.modelo": "Model",
        "modal.modelo.placeholder": "Choose a model",
        "modal.modelo.0": "Small — 1 rider ($1,700 hr / $1,000 ½ hr)",
        "modal.modelo.1": "Medium — 2 light ($1,900 hr / $1,300 ½ hr)",
        "modal.modelo.2": "Large — 2 adults ($2,500 hr / $1,500 ½ hr)",
        "modal.duracion": "Duration",
        "modal.dur.0": "1 hour",
        "modal.dur.1": "Half hour",
        "modal.fecha": "Date",
        "modal.submit": "Send via WhatsApp",
        "modal.legal": "Hold with a transfer · Confirmation within 2 hrs",

        // WHATSAPP MESSAGE
        "wa.greeting": "Hi, I'd like to reserve a jetski at Algodones Rentals.",
        "wa.nombre": "Name",
        "wa.modelo": "Model",
        "wa.duracion": "Duration",
        "wa.fecha": "Date",
        "wa.personas": "People",
        "wa.closing": "I'll make the transfer and send my receipt.",
        "wa.banana": "Hi, I'd like to book a banana boat ride at Algodones Rentals ($100 MXN per person). What times do you have available?",
    }
};
