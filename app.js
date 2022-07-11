import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createPrefectures from './components/Prefectures.js';
import { getPrefectureRice } from './services/client.js';

// State
import state from './state.js';

// Action Handlers
async function handlePageLoad() {
    state.user = getUser();
    protectPage(state.user);

    state.prefectures = await getPrefectureRice();

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

const Prefectures = createPrefectures(document.querySelector('.pref-cards'));

function display() {
    User({ user: state.user });
    Prefectures({ prefectures: state.prefectures });
}

handlePageLoad();
