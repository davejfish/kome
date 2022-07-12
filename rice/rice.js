import { getUser, signOut } from '../services/auth-service.js';
import { protectPage, findByID } from '../utils.js';
import createUser from '../components/User.js';
import createRiceList from '../components/riceList.js';
import { addRice, deleteRice, getRicePrefecture } from '../services/client.js';

// State
import state from '../state.js';

// Action Handlers
async function handlePageLoad() {
    state.user = getUser();
    protectPage(state.user);

    state.rice = await getRicePrefecture();

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

    const index = state.rice.indexOf(kome);
    state.rice.splice(index, 1);

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

const RiceList = createRiceList(document.querySelector('.rice-table'), handleDeleteRice);

function display() {
    User({ user: state.user });
    RiceList({ rice: state.rice });
}

handlePageLoad();
