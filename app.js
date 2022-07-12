import { getUser, signOut } from './services/auth-service.js';
import { protectPage, findByID } from './utils.js';
import createUser from './components/User.js';
import createPrefectures from './components/Prefectures.js';
import { getPrefectureRice, addRice } from './services/client.js';

// State
import state from './state.js';

// Action Handlers
async function handlePageLoad() {
    state.user = getUser();
    protectPage(state.user);

    state.prefectures = await getPrefectureRice();

    display();
}

async function handleAddRice(riceName, prefID) {
    const newRice = await addRice(riceName, prefID);

    const pref = findByID(state.prefectures, prefID);

    pref.kome.push(newRice);

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Prefectures = createPrefectures(document.querySelector('.pref-cards'), { handleAddRice });

function display() {
    User({ user: state.user });
    Prefectures({ prefectures: state.prefectures });
}

handlePageLoad();
