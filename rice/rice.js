import { getUser, signOut } from '../services/auth-service.js';
import { findByID, protectPage } from '../utils.js';
import createUser from '../components/User.js';
import createRiceList from '../components/riceList.js';
import createForm from '../components/form.js';
import { addRice, deleteRice, getPrefectures, getRicePrefecture } from '../services/client.js';

// State
import state from '../state.js';

// Action Handlers
async function handlePageLoad() {
    state.user = getUser();
    protectPage(state.user);

    state.rice = await getRicePrefecture();
    state.prefectures = await getPrefectures();

    display();
}

async function handleAddRice(riceName, prefID) {
    const newRice = await addRice(
        riceName,
        prefID
    );

    const prefectures = findByID(state.prefectures, Number(prefID));
    newRice.prefectures = prefectures;
    state.rice.unshift(newRice);

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

const CreateForm = createForm(document.querySelector('.add-rice'), handleAddRice);

function display() {
    User({ user: state.user });
    RiceList({ rice: state.rice });
    CreateForm();

}

handlePageLoad();
