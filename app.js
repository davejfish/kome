import { getUser, signOut } from './services/auth-service.js';
import { protectPage, findByID } from './utils.js';
import createUser from './components/User.js';
import createPrefectures from './components/Prefectures.js';
import { getPrefectureRice, addRice, deleteRice, updateRice } from './services/client.js';

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

async function handleDeleteRice(kome) {
    const message = `Delete ${kome.riceName}?`;
    if (!confirm(message)) return;

    await deleteRice(kome.id);

    const pref = findByID(state.prefectures, kome.prefID);
    const index = pref.kome.indexOf(kome);

    pref.kome.splice(index, 1);

    display();
}

export default async function handleUpdateRice(prefID, id) {
    await updateRice(prefID, id);
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Prefectures = createPrefectures(document.querySelector('.pref-cards'), {
    handleAddRice,
    handleDeleteRice,
    handleUpdateRice
});

function display() {
    User({ user: state.user });
    // PagingButtons();
    Prefectures({ prefectures: state.prefectures });
}

handlePageLoad();
