export function submit(){

    const subBtn=document.querySelector('#submit');
    subBtn.addEventListener('click', e => {

        let migrateString='';
        let fillableString='protected $fillable = [\n';
        let typeString='';
        let controllerString="'id' => $item->id,\n";


        const groups = document.querySelectorAll('#container > div');
        //alert(groups.length);
        groups.forEach(function(group) {

            const inputs = group.querySelectorAll('input');
            const selects = group.querySelectorAll('select');

            // 两个 checkbox
            const checkboxes = group.querySelectorAll(
                'input[type="checkbox"]'
            );

            const input1=inputs[0].value;
            const input2=inputs[1].value;

            const  selectType=selects[0].value;
            //console.log(selectType);

            let selectBoolean;
            if(selectType==='boolean'){
                selectBoolean=selects[1].value;
            }
            //console.log(selectBoolean);exit;

            const nullable = checkboxes[0].checked;
            const unique = checkboxes[1].checked;

            //console.log(nullable);
            //console.log(unique);

            fillableString+=`'${input1}',\n`;
            migrateString+=`$table->${selectType}('${input1}')`;
            typeString+=`${input1}:`;

            if (input1.includes("image")) {
                //console.log("包含 image");
                controllerString+=`'${input1}' => Storage::disk('public')->url($item->${input1}),\n`;
            }
            else{
                controllerString+=`'${input1}' => $item->${input1},\n`;


            }

            switch (selectType) {
                case 'boolean':
                    migrateString+=`->default(${selectBoolean})`;
                    break;
                case 'foreignId':
                    migrateString+=`->constrained('${input2}')->cascadeOnDelete()`;
                    break;
                case 'integer':
                    if(input2!=='')
                    {migrateString+=`->default(${input2})`;}
                    break;
                default:
                    if(input2!==''){migrateString+=`->default('${input2}')`;};

            }

            if(selectType!=="boolean"){
                if(selectType==='integer'){
                    typeString+='number';
                }
                else {
                    typeString+='string';
                }

            }
            else
            {
                typeString+='boolean';
                //migrateString+=`->default(${selectBoolean})`;
            }


            if(nullable){
                typeString+=" | null";
                migrateString+='->nullable()'
            }
            if(unique){
                migrateString+='->unique()'

            }
            migrateString+=';\n';
            typeString+=';\n';


        });

        console.log(migrateString);
        document.querySelector('.migrateDiv').innerHTML = migrateString;

        console.log(fillableString);
        document.querySelector('.fillableDiv').innerHTML = fillableString;

        console.log(typeString);
        document.querySelector('.typeDiv').innerHTML = typeString;

        console.log(controllerString);
        document.querySelector('.controllerDiv').innerHTML = controllerString;


        const m1 = document.querySelector('[name="m1"]').value;
        const m2 = document.querySelector('[name="m2"]').value;

        const ModelName=m1;
        const ModelNames=m2;
        const varName= m2.charAt(0).toLowerCase() + m2.slice(1);
        //alert(varName)

        //alert(valName);exit;

        const findBidLetterMore = (m1.match(/[A-Z]/g) || []).length >= 2;
        //alert(result);

        let urlName;
        //找到多个大写字母
        if(findBidLetterMore){
            urlName = m2
                .replace(/([A-Z])/g, '-$1')
                .replace(/^-/, '')
                .toLowerCase();
        }
        else {
            urlName= m2.toLowerCase();
        }

        //alert(urlName);
        document.querySelectorAll('.item').forEach(item => {
            item.innerHTML = item.innerHTML.replaceAll('#ModelName#', ModelName);
            item.innerHTML = item.innerHTML.replaceAll('#ModelNames#', ModelNames);
            item.innerHTML = item.innerHTML.replaceAll('#urlName#', urlName);
            item.innerHTML = item.innerHTML.replaceAll('#varName#', varName);
        });




    })

}
