document.addEventListener('DOMContentLoaded', ()=>{
    $('#color').hide();
    $('label[for=color]').hide();
    let div = document.createElement('div');
    div.className='btn';
    let button = document.querySelector('button');
    let form = document.querySelector('form');
    div.appendChild(button);
    form.appendChild(div);
    $('button').prop( "disabled", true );
    let cardNumberValid = false;
    let zipValid = false;
    let cvvValid = false;
    let paymentMethod = false;
    let total = 0;
    let ccradSelection = false;
    const colorList = $('#color option');
    const labelList = $('.activities label');
    const price = [];
    const activities = document.querySelector('.activities');
    const totallabel = document.createElement('label');
    totallabel.textContent = `Total: ${total}`;
    activities.appendChild(totallabel);

    function basicInfoValidation() {
        let isValid = false;
        let textHtml = document.querySelector('#name');
        let emailHtml = document.querySelector('#mail');
        let text = textHtml.value;
        let email = emailHtml.value;
        let labelName = $('label[for=name]');
        let labelEmail = $('label[for=mail]');
        if(!text.length > 0){
            textHtml.style.borderColor = 'red';
            $('#nameError').show();
            if($("#nameError").length == 0) {
                $('<label id="nameError" class="act">Please enter Name</label>').insertBefore(labelName);
                $('#nameError').css("color","red");
                isValid = false;
            }
        } else {
            textHtml.style.borderColor = '';
            $('#nameError').hide();
            isValid = true;

        }
        if(!email.length > 0){
            emailHtml.style.borderColor = 'red';
            $('#nameError').show();
            if($("#mailError").length == 0) {
                $('<label id="mailError" class="act">Please enter Email</label>').insertBefore(labelEmail);
                $('#mailError').css("color","red");
                isValid = false;
            }

        } else {
            emailHtml.style.borderColor = '';
            $('#mailError').hide();
            isValid = true;
        }
        return isValid;
    }

    function activitiesValidation() {
        let isValid = false;
        $('#activitiesError').show();
        if (!$("label input:checkbox:checked").length > 0) {
            if($("#activitiesError").length == 0) {
                $('<label id="activitiesError" color="red">Please select one of the activities</label>').insertBefore('.activities legend');
                document.querySelector('#activitiesError').style.color = 'red';
            }
        } else {
            $('#activitiesError').hide();
            isValid = true;
        }
        return isValid;
    }



    function buttonEnable(){
        let isBasicInfoValid = basicInfoValidation();
        let isActivitiesValid = activitiesValidation();
        let isCrediCardNumberValid = cardNumberValid;
        let isZipValid = zipValid;
        let isCvvValid = cvvValid;
        let isPaymnetMethod = paymentMethod;
        if(isBasicInfoValid &&
            isActivitiesValid &&
            isCrediCardNumberValid &&
            isZipValid &&
            isCvvValid) {
            $('button').prop( "disabled", false );
        } else {
            if (isPaymnetMethod) {
                if($("#zipErr").length == 0 && !isZipValid || !$('#cc-num').value.length > 0) {
                    $('<label id="zipErr" class="act">Zip Code must be of 5 digit</label>').insertBefore('button');
                    $('#zipErr').css("color","red");
                }else {
                    $('#zipErr').show();
                }

                if($("#ccErr").length == 0 && !isCrediCardNumberValid || !$('#zip').value.length > 0)  {
                    $('<label id="ccErr" class="act">CrediCard Number must be of 16 digit</label>').insertBefore('button');
                    $('#ccErr').css("color","red");

                }else{
                    $('#ccErr').show()
                }

                if($("#cvvErr").length == 0 && !isCvvValid || !$('#zip').value.length > 0) {
                    $('<label id="cvvErr" class="act">CVV Number must be of 3 digit</label>').insertBefore('button');
                    $('#cvvErr').css("color","red");

                } else {
                    $('#cvvErr').show();
                }
            } else {

                if($("#payErr").length == 0 && !isPaymnetMethod) {
                    $('<label id="payErr">Select one of the payment method please</label>').insertBefore('button');
                    $('#payErr').css("color","red");
                } else { $('#payErr').show();}


            }
            console.log('disabled');
        }

    }


    $('#name').on('input', (e)=>{

        if(e.target.value.length > 0){
            $('#nameError').hide();
            $('#name').css("border-color","");
        }

    });

    $('#mail').on('input', (e)=>{

        if(e.target.value.length > 0){
            $('#mailError').hide();
            $('#mail').css("border-color","");
        }

    });




    $('#credit-card').hide();
    let divp = document.querySelectorAll('p');

    divp[0].className = 'paypal';
    divp[1].className = 'bitcoin';
    divp[0].style.display = 'none';
    divp[1].style.display = 'none';

    $('[type="checkbox"]').addClass('activityCheckbox');
    function isdisplay(arg){
        for (let i = 0 ; i < colorList.length; i+=1){
            if(!($(colorList[i]).text().toLowerCase().includes(arg))){
                $(colorList[i]).hide();
            } else {
                $(colorList[i]).show();
            }
        }
    }


    //When the page loads, give focus to the first text field
    $('#name').focus();

    //A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.

    $("#title").on("change", function () {
        let selectedVal = $(this).find(':selected').text();
        if(selectedVal.toLowerCase() === 'other'){
            //Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
            $('<input type="text" id="other-title"  placeholder="Your Job Role" name="otherinput">').insertAfter('#title');
            $("#other-title").focus();
        } else {
            $('#other-title').hide();
        }

            basicInfoValidation();
    }

    );


    //For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
    //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."

    $("#colors-js-puns").on("change", function () {
        let selectedVal = $(this).find(':selected').text();
        if(selectedVal.toLowerCase() === 'other'){

        }
    });

    $("#design").on("change", function () {
        let selectedVal = $(this).find(':selected').val();
        switch (selectedVal) {
            case 'js puns':
                isdisplay('js puns');
                $('#color').show();
                $('label[for=color]').show();
                break;
            case 'heart js':
                isdisplay('js shirt');
                $('#color').show();
                $('label[for=color]').show();
                break;
            default:
                isdisplay('shirt');
                $('#color').hide();
                $('label[for=color]').hide();
        }

    });


    $('.activityCheckbox').on('change', (e)=>{
            $('#activitiesError').hide();
            let priceTotal = [0];
            let str = e.target.parentElement.textContent;
            let time=str.substring(str.lastIndexOf("— ")+1,str.lastIndexOf(","));
            let isChecked = $(e.target).is(':checked')
        if(isChecked) {
                for (i = 0; i < labelList.length; i +=1) {
                    if(labelList[i].textContent.includes(time) && !(labelList[i].textContent === str)){
                        labelList[i].children[0].setAttribute('disabled', 'true');
                    }
                }
        } else {
            for (i = 0; i < labelList.length; i +=1) {
                labelList[i].children[0].disabled = false;
            }
        }

        for(i = 0; i < labelList.length; i +=1){
                if($(labelList[i].children[0]).is(':checked')){
                    let price = parseInt(labelList[i].textContent.split('$')[1]);

                    priceTotal.push(price);
            }
        }
        total = priceTotal.reduce((a, x) => a + x);
        totallabel.textContent = `Total price: ${total}`;
    });

    $('#payment').on('change', (e)=>{
        paymentMethod = true;
        $('#payErr').hide();
       payment =  $(e.target).find(':selected').text();
       if(payment === 'Credit Card'){
           $('#credit-card').show();
           $('#cc-num').focus();
           divp[0].style.display = 'none';
           divp[1].style.display = 'none';
           cardNumberValid = false;
           zipValid = false;
           cvvValid = false;
       } else if(payment === 'PayPal'){
           divp[0].style.display = '';
           divp[1].style.display = 'none';
           $('#zipErr').hide();
           $('#ccErr').hide();
           $('#cvvErr').hide();
           $('#credit-card').hide();
           cardNumberValid = true;
           zipValid = true;
           cvvValid = true;
       } else if(payment === 'Bitcoin'){
           $('#credit-card').hide();
           divp[0].style.display = 'none';
           divp[1].style.display = '';
           $('#zipErr').hide();
           $('#ccErr').hide();
           $('#cvvErr').hide();
           $('#credit-card').hide();
           cardNumberValid = true;
           zipValid = true;
           cvvValid = true;
       } else if(payment === 'Selected Paymnet Method'){
           divp[0].style.display = 'none';
           divp[1].style.display = 'none';
           $('#zipErr').hide();
           $('#ccErr').hide();
           $('#cvvErr').hide();
           $('#credit-card').hide();
           paymentMethod = true;
           cardNumberValid = true;
           zipValid = true;
           cvvValid = true;
       } else {
           divp[0].style.display = 'none';
           divp[1].style.display = 'none';
           $('#zipErr').hide();
           $('#ccErr').hide();
           $('#cvvErr').hide();
           $('#credit-card').hide();
           paymentMethod = true;
           cardNumberValid = true;
           zipValid = true;
           cvvValid = true;
       }
            basicInfoValidation();
            activitiesValidation();
    }
    );

    $('#cc-num').on('input', (e)=>{
        let ccNumber = e.target.value;
        if(ccNumber.length < 16 || ccNumber.length>16 || !/^\d+$/.test(ccNumber)){
            cardNumberValid = false;
            if($("#ccErr").length == 0) {
                $('<label id="ccErr" class="act">CrediCard Number must be of 16 digits and in numbers</label>').insertBefore('button');
                $('#ccErr').css("color","red");

            }
            $('#ccErr').show();
            cardNumberValid=false;
            document.querySelector('#cc-num').style.borderColor = 'red';
        }else{
            document.querySelector('#cc-num').style.borderColor = '';
            cardNumberValid=true;
            $('#ccErr').hide();
        }
        basicInfoValidation();
        activitiesValidation();
    });
    $('#zip').on('input', (e)=>{
        zipValid = flase;
        let zip = e.target.value;
        if(zip.length < 5 || zip.length > 5 || !/^\d+$/.test(zip)){
            if($("#zipErr").length == 0) {
                $('<label id="zipErr" class="act">Zip Code must be of 5 digits and in numbers</label>').insertBefore('button');
                $('#zipErr').css("color","red");

            }
            $('#zipErr').show();
            zipValid = false;
            document.querySelector('#zip').style.borderColor = 'red';
        }else{
            document.querySelector('#zip').style.borderColor = '';
            zipValid = true;
            $('#zipErr').hide();
        }
        basicInfoValidation();
        activitiesValidation()
    });
    $('#cvv').on('input', (e)=>{
        cvvValid = false;
        let cvv = e.target.value;
        if(cvv.length < 3 || cvv.length > 3 || !/^\d+$/.test(cvv)){
            if($("#cvvErr").length == 0) {
                $('<label id="cvvErr" class="act">CVV Number must be of 3 digis and in numbers</label>').insertBefore('button');
                $('#cvvErr').css("color","red");

            }
            $('#cvvErr').show()
            cvvValid=false;
            document.querySelector('#cvv').style.borderColor = 'red';
        }else{
            document.querySelector('#cvv').style.borderColor = '';
            cvvValid = true;
            $('#cvvErr').hide()
        }
        basicInfoValidation();
        activitiesValidation();
        buttonEnable();
    });

    $('.btn').on('mouseover', ()=>{
        buttonEnable();
    });

});