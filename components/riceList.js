export default function createRiceList(table, handleDeleteRice) {

    return ({ rice }) => {
        table.innerHTML = '';

        for (let kome of rice) {
            const item = createTable(kome, handleDeleteRice);
            table.append(item);
        }
    };
}

function createTable(kome, handleDeleteRice) {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = kome.riceName;

    const td2 = document.createElement('td');
    td2.textContent = kome.prefectures.prefName;

    const td3 = document.createElement('td');
    td3.textContent = new Date(kome.created_at);

    const td4 = document.createElement('td');
    td4.classList.add('short');
    const deleteButton = deleteRice(kome, handleDeleteRice);
    td4.append(deleteButton);

    tr.append(td1, td2, td3, td4);
    return tr;
}

function deleteRice(kome, handleDeleteRice) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', async () => {
        await handleDeleteRice(kome);
    });

    return deleteButton;
}