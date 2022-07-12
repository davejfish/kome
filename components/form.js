export default function createForm(form, handleAddRice) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formdata = new FormData(form);
        const data = {
            name: formdata.get('rice-name'),
            prefID: formdata.get('made-in')
        };

        await handleAddRice(data.name, data.prefID);
        form.reset();
    });

    return () => {
        const select = form.querySelector('select');
        select.innerHTML = '';

        const option1 = document.createElement('option');
        option1.value = '';
        option1.selected = true;
        option1.disabled = true;
        option1.textContent = '-';

        const option2 = document.createElement('option');
        option2.value = 1;
        option2.textContent = 'Yamagata';

        const option3 = document.createElement('option');
        option3.value = 2;
        option3.textContent = 'Niigata';

        const option4 = document.createElement('option');
        option4.value = 3;
        option4.textContent = 'Hokkaido';

        const option5 = document.createElement('option');
        option5.value = 4;
        option5.textContent = 'Chiba';

        const option6 = document.createElement('option');
        option6.value = 5;
        option6.textContent = 'Fukushima';

        select.append(option1, option2, option3, option4, option5, option6);
    };
}