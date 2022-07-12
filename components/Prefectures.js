export default function createPrefectures(root, { handleAddRice, handleDeleteRice }) {

    return ({ prefectures }) => {
        root.innerHTML = '';

        for (let prefecture of prefectures) {

            const card = addPrefecture({ prefecture, handleAddRice, handleDeleteRice });

            root.append(card);
        }
    };
}

function addPrefecture({ prefecture, handleAddRice, handleDeleteRice }) {

    const div = document.createElement('div');
    div.classList.add('card');

    const span = document.createElement('span');
    span.textContent = prefecture.prefName;

    const ul = document.createElement('ul');
    ul.classList.add('rice-list');

    ul.addEventListener('dragenter', dragEnter);
    ul.addEventListener('dragover', dragOver);
    ul.addEventListener('dragleave', dragLeave);
    ul.addEventListener('drop', drop);

    for (let rice of prefecture.kome) {
        let li = document.createElement('li');
        li.classList.add('rice-box');
        li.textContent = rice.riceName;
        li.draggable = true;
        li.setAttribute('id', `${rice.id}`);

        li.addEventListener('dragstart', dragStart);

        li.addEventListener('click', () => {
            handleDeleteRice(rice);
        });

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

function dragStart(e) {
    // console.log('we draggin stuff');
    // console.log('target id: ', e.target.id);
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hidden');
    }, 0);
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    if (e.target.tagName === 'UL') {
        e.target.appendChild(draggable);
    }


    // display draggable element
    draggable.classList.remove('hidden');
}