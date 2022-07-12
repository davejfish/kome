export default function createPagingButtons(root) {
    return () => {
        root.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('paging-buttons');

        const a1 = document.createElement('a');
        a1.href = '/';

        const button1 = document.createElement('button');
        button1.textContent = 'prefectures';

        a1.append(button1);

        const a2 = document.createElement('a');
        a2.href = './rice/';

        const button2 = document.createElement('button');
        button2.textContent = 'rice';

        a2.append(button2);

        div.append(a1, a2);
        root.append(div);
    };
}