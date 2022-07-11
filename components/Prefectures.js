export default function createPrefectures(root) {

    return ({ prefectures }) => {
        root.innerHTML = '';

        for (let prefecture of prefectures) {
            const form = document.createElement('form');

            const span = document.createElement('span');
            span.textContent = prefecture.prefName;

            const ul = addPrefecture(prefecture);
            ul.classList.add('rice-list');

            const label = document.createElement('label');
            label.innerHTML = 'add rice: ';

            const input = document.createElement('input');
            input.setAttribute('id', 'rice-input');
            input.name = 'name';

            label.append(input);

            form.append(span, ul, label);
            root.append(form);
        }
    };
}

function addPrefecture(prefecture) {
    const ul = document.createElement('ul');

    for (let rice of prefecture.kome) {
        let li = document.createElement('li');
        li.classList.add('rice-box');
        li.textContent = rice.riceName;
        ul.append(li);
    }
    return ul;
}