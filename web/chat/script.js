// https://www.scaledrone.com/blog/javascript-chat-room-tutorial
// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'Jmz5s9shgrqsKKkT';

const drone = new ScaleDrone(CLIENT_ID, {
    data: { // Will be sent out as clientData via events
        name: getRandomName(),
        color: getRandomColor(),
    },
});

let members = [];

drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe('observable-room');
    room.on('open', error => {
        if (error) {
            return console.error(error);
        }
        console.log('Successfully joined room');
    });

    room.on('members', m => {
        members = m;
        updateMembersDOM();
    });

    room.on('member_join', member => {
        members.push(member);
        updateMembersDOM();
    });

    room.on('member_leave', ({id}) => {
        const index = members.findIndex(member => member.id === id);
        members.splice(index, 1);
        updateMembersDOM();
    });

    room.on('data', (text, member) => {
        if (member) {
            addMessageToListDOM(text, member);
        } else {
            // Message is from server
        }
    });
});

drone.on('close', event => {
    console.log('Connection was closed', event);
});

drone.on('error', error => {
    console.error(error);
});

// @formatter:off
function getRandomName() {
    const animal = ["Abadejo","Abalone","Abejarón","Abejaruco","Abeja","Abejorro","Ácaro","Acedía","Acentor","Agamido",
        "Águila","Alacrán","Albatros","Alce","Almeja","Alondra","Ánade Real","Anchoa","Anémona de mar","Anfioxo",
        "Angelote","Anguila","Antílope","Araña","Arenque","Armadillo","Armiño","Asno","Atún","Avefría","Avestruz",
        "Avetoro","Avispa Babirusa","Babosa","Babuino","Bacalao","Ballena","Banteng","Barasinga","Barracuda","Becada",
        "Beira","Beluga","Bengalí","Bermejuela","Berrendo","Besugo","Bisbita","Bisonte","Blanquillo","Boa","Bogavante",
        "Bongo","Bonito","Bonobo","Boto","Buey","Búfalo","Búho","Buitre","Burro	Caballo","Caballito de mar","Cacatúa",
        "Cachalote","Calamón","Camaleón","Camello","Canguro","Canario","Cangrejo","Caracol","Castor","Cebra","Centollo",
        "Cerdo","Chacal","Chimpancé","Chinchilla","Ciempiés","Ciervo","Cigala","Cisne","Cobaya","Cochinilla","Cocodrilo"
        ,"Coendú","Coipú","Colibrí","Comadreja","Conejo","Coral","Coridora","Cormorán","Cóndor","Cotorra","Coyote",
        "Damán","Delfín","Diablo de Tasmania","Dik-dik","Dingo","Dragón de Komodo","Dromedario","Elefante","Emú",
        "Equidna","Erizo","Escarabajo","Escorpión","Escuerzo","Espátula común","Estrella de mar	Farra","Faisán",
        "Flamingo","Flamenco","Foca	Gacela","Galápago","Gallina","Gallipato","Gallo","Gamba","Ganso","Garcilla",
        "Garrapata","Garza","Gato","Gavilán","Glotón","Golondrina","Gorila","Gorgojo","Gorrión","Grillo","Grulla",
        "Guepardo","Halcón","Hamster","Hiena","Hipocampo","Hipopótamo","Holoturia","Hormiga","Hurón","Hupón","Ibice",
        "Icotea","Iguana","Insecto palo","Intendio","Impala	","Jabalí","Jabirú","Jerbo","Jirafa","Jaguar","Kaguang",
        "Kiwi","Krill","Koala","Labro","Lagarto","Langosta","Langostino","Lechuza","Lémur","León","León marino",
        "Leopardo","Libélula","Liebre","Lince","Llama","Lobo","Lobo marino","Lombriz","Loro","Luciérnaga","Mamut",
        "Mandril","Mantis religiosa","Mapache","Marabú","Marabunta","Mariposa","Marmota","Medusa","Mejillón","Milpiés",
        "Mofeta","Mono","Mosca","Mosquito","Morsa","Murciélago","Narval","Navaja","Nécora","Nutria","Ñandú","Ñu",
        "Ocelote","Okapi","Oso","Oso de agua","Oso hormiguero","Oso panda","Oso pardo","Ornitorrinco","Oveja","Pájaro",
        "Paloma","Pantera","Papagayo","Pelicano","Perca","Perdiz","Perezoso","Perico","Peripato","Periquito","Perro",
        "Petirrojo","Pez","Pingüino","Pinzón","Piojo","Piquituerto","Polilla","Puercoespín","Pulga","Pulpo","Puma",
        "Quebrantahuesos","Quetzal","Quitón	","Rana","Rata","Ratón","Raya","Rebeco","Rémora","Reno","Rinoceronte",
        "Rubia Gallega","Ruiseñor","Salamandra","Salmón","Saltamontes","Sanguijuela","Sapo","Sepia","Serpiente",
        "Tábano","Tejón","Tenia","Termita","Tiburón","Tigre","Tijereta","Topo","Toro","Tortuga","Tritón","Trucha",
        "Tucán","Urogallo","Urraca	","Vaca","Varano","Venado","Vicuña","Wapití","Walabi","Walaró","Weta","Wombat",
        "Xenopus","Xenopus laevis","Xoloescuintle","Yak","Yacare","Yegua","Zarigüeya","Zorro","Zebra"];
    const colors = ["Naranja","Azul","Verde","Rosa","Marrón","Gris"];
    return (
        animal[Math.floor(Math.random() * animal.length)] +
        "_" +
        colors[Math.floor(Math.random() * colors.length)]
    );
}
// @formatter:on

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
    const value = DOM.input.value;
    if (value === '') {
        return;
    }
    DOM.input.value = '';
    drone.publish({
        room: 'observable-room',
        message: value,
    });
}

function createMemberElement(member) {
    const {name, color} = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
}

function updateMembersDOM() {
    if (members.length==1){
        DOM.membersCount.innerText = `${members.length} Estás sólo en el chat:`;

    }
    DOM.membersCount.innerText = `${members.length} usuario activo:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
        DOM.membersList.appendChild(createMemberElement(member))
    );
}

function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
}

function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}
