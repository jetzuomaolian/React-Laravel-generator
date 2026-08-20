export function generate(){
    const container = document.getElementById('container');
    const addBtn = document.getElementById('addBtn');

    addBtn.addEventListener('click', function () {

        // 创建一组
        const group = document.createElement('div');

        // 创建名称输入框
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = '字段名称';


        // 创建类型下拉框
        const typeSelect = document.createElement('select');

        typeSelect.innerHTML = `
                <option value="">请选择类型</option>
                <option value="string">string</option>
                <option value="text">text</option>
                <option value="integer">integer</option>
                <option value="boolean">boolean</option>
                <option value="foreignId">foreignId</option>

            `;

        // 动态内容区域
        const valueContainer = document.createElement('span');

        // 类型改变
        typeSelect.addEventListener('change', function () {

            // 先清空原来的内容
            valueContainer.innerHTML = '';

            if (
                this.value === 'string' ||
                this.value === 'text' ||
                this.value === 'foreignId' ||
                this.value === 'integer'
            ) {

                // 创建输入框
                const valueInput = document.createElement('input');
                valueInput.className='form-control';

                valueInput.type = 'text';
                valueInput.placeholder = '请输入默认值';

                valueContainer.appendChild(valueInput);

            } else if (this.value === 'boolean') {

                // 创建 true / false 下拉框
                const booleanSelect = document.createElement('select');

                booleanSelect.innerHTML = `
                        <option value="true">true</option>
                        <option value="false">false</option>
                    `;

                valueContainer.appendChild(booleanSelect);
            }
        });
        // checkbox 1
        const checkbox1 = document.createElement('input');

        checkbox1.type = 'checkbox';
        checkbox1.name = 'option1[]';
        checkbox1.value = '1';


        // checkbox 2
        const checkbox2 = document.createElement('input');

        checkbox2.type = 'checkbox';
        checkbox2.name = 'option2[]';
        checkbox2.value = '1';


        // 添加到这一组
        group.appendChild(nameInput);
        group.appendChild(typeSelect);
        group.appendChild(valueContainer);

        group.appendChild(checkbox1);
        group.appendChild(document.createTextNode('nullable'));

        group.appendChild(checkbox2);
        group.appendChild(document.createTextNode('unique'));

        // 添加到页面
        container.appendChild(group);

    })

}