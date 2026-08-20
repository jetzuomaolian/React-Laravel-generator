export function copy() {


    const items = document.querySelectorAll('.item');
    //console.log(items.length);
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            const copyBtn=e.target.closest('.copyBtn');
            const targetId = copyBtn.dataset.target;
            const div = document.getElementById(targetId);
            const textarea = document.createElement('textarea');
            textarea.value = div.innerText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            console.log('复制成功', div.innerText);
            copyBtn.classList.remove('clipboard-icon');
            copyBtn.textContent = '√';

        })
    })


    /*return ;
    const copyBtns = document.querySelectorAll('.copyBtn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            console.log('按钮被点击了');
            const targetId = this.dataset.target;
            const div = document.getElementById(targetId);
            const textarea = document.createElement('textarea');
            textarea.value = div.innerText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            console.log('复制成功', div.innerText);
        });
    });*/
}