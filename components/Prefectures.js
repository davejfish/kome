export default function createPrefectures(root, { handleAddRice }) {

    return ({ prefectures }) => {
        root.innerHTML = '';

        for (let prefecture of prefectures) {

            const card = addPrefecture({ prefecture, handleAddRice });

            root.append(card);
        }
    };
}

function addPrefecture({ prefecture, handleAddRice }) {

    const div = document.createElement('div');
    div.classList.add('card');

    const span = document.createElement('span');
    span.textContent = prefecture.prefName;

    const ul = document.createElement('ul');
    ul.classList.add('rice-list');

    for (let rice of prefecture.kome) {
        let li = document.createElement('li');
        li.classList.add('rice-box');
        li.textContent = rice.riceName;
        ul.append(li);
    }

    const addKome = updateRice({ prefecture, handleAddRice });

    div.append(span, ul, addKome);

    return div;
}

function updateRice({ prefecture, handleAddRice }) {

    const form = document.createElement('form');

    const label = document.createElement('label');
    label.innerHTML = 'add rice: ';

    const input = document.createElement('input');
    input.setAttribute('id', 'rice-input');
    input.name = 'name';

    label.append(input);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddRice(input.value, prefecture.id);

        form.reset();
    });

    form.append(label);

    return form;
}