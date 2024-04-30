"use strict"
// ------------------------------------------

//loading condition
$(window).ready(function () {
    $('#loading').fadeOut(1200, function () {
        $('body').css('overflow', 'visible');
    })
})

// Disable back and forward navigation
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};


let yummyImg = document.querySelector('.yummy-image')
yummyImg.addEventListener('click', function () {
    window.open('./index.html' , "_self");
    sidebarlinks.animate({ top: "300px" }, 0)
    $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
    $('.sidebar-show i.fa-x').hide();
    $('.sidebar-show i.fa-bars').show();
})




let categorieAnchor = document.querySelector('span#categories');
categorieAnchor.addEventListener('click', () => {
    // window.open('categories.html', '_self');
    window.open('./categories.html' , "_self");
    // location.pathname = './categories.html'
    sidebarlinks.animate({ top: "300px" }, 0)
    $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
    $('.sidebar-show i.fa-x').hide();
    $('.sidebar-show i.fa-bars').show();
});


let searchAnchor = document.querySelector('#search1');
searchAnchor.addEventListener("click", function () {
    // window.open('search.html', "_self")
    window.open('./search.html' , "_self")
    sidebarlinks.animate({ top: "300px" }, 0)
    $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
    $('.sidebar-show i.fa-x').hide();
    $('.sidebar-show i.fa-bars').show();
})

let areaAnchor = document.querySelector('#area')
if (areaAnchor != null) {
    areaAnchor.addEventListener('click', function () {
        // location.pathname = './Area.html'
        window.open('./Area.html' , "_self")
        sidebarlinks.animate({ top: "300px" }, 0)
        $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
        $('.sidebar-show i.fa-x').hide();
        $('.sidebar-show i.fa-bars').show();
    })
}

let ingredientsAnchor = document.querySelector('#ingredients')
if (ingredientsAnchor != null) {
    ingredientsAnchor.addEventListener('click', function () {
        // location.pathname = './Ingredients.html'
        window.open('./Ingredients.html' , "_self")
        sidebarlinks.animate({ top: "300px" }, 0)
        $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
        $('.sidebar-show i.fa-x').hide();
        $('.sidebar-show i.fa-bars').show();
    })
}

let contacAnchor = document.querySelector('#contact-us');
if (contacAnchor != null) {
    contacAnchor.addEventListener('click', function () {
        window.open('./contact-us.html' , "_self")
        sidebarlinks.animate({ top: "300px" }, 0)
        $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
        $('.sidebar-show i.fa-x').hide();
        $('.sidebar-show i.fa-bars').show();
    })
}






// sidebar ------------------------------------------------

let sidebarInnerWidth = $(".sidebar-inner").innerWidth();
let sidebarlinks = $('.sidebar-links span');

$('.sidebar-show i.fa-bars').click(function () {
    if ($(".sidebar-inner").offset().left < 0) {
        sidebarlinks.each(function (index) {
            $(this).delay(70 * index).animate({ top: "0px" }, 0);
        });
        $(".sidebar").animate({ left: 0 }, 500);
        $(this).hide();
        $('.sidebar-show i.fa-x').show();
    }
});

$('.sidebar-show i.fa-x').click(function () {
    if ($(".sidebar-inner").offset().left == 0) {
        sidebarlinks.animate({ top: "300px" }, 0)
        $(".sidebar").animate({ left: -sidebarInnerWidth }, 500);
        $(this).hide();
        $('.sidebar-show i.fa-bars').show();
    }
});

//-------------------   fetch data when web start    ---------------------------------------------------------------

async function getdata() {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let response = await request.json();
    display(response)
}

let mealData;
let data1;

function display(data) {
    let row = document.querySelector('.row-home')
    data1 = data;
    for (let i = 0; i < 25; i++) {
        let colDiv = document.createElement('div')

        let mealBox = document.createElement('div')
        mealBox.dataset.mealIndex = i; // Store the meal index as a data attribute
        mealBox.addEventListener('click', getMealIndex)

        let mealImg = document.createElement('img')
        let layerDiv = document.createElement('div')
        let mealTitle = document.createElement('h1');
        colDiv.classList.add('col-md-3');

        mealBox.classList.add('meal-box', 'position-relative', 'rounded-3')

        mealImg.classList.add('w-100')
        mealBox.append(mealImg)


        layerDiv.classList.add('layer', "position-absolute", "rounded-3")


        mealTitle.classList.add('ms-2')
        layerDiv.append(mealTitle);

        mealBox.append(layerDiv);

        colDiv.append(mealBox);

        if (row != null) {
            row.append(colDiv)
        }
        mealImg.setAttribute('src', data.meals[i].strMealThumb);
        mealTitle.innerHTML = data.meals[i].strMeal;
    }
    function getMealIndex() {
        // Access the meal index stored in the data attribute
        let mealIndex = this.dataset.mealIndex;
        // Access the meal data using the meal index
        mealData = mealIndex;
        displayMealDetails(mealData)
    }
}
getdata()

// -----------------------------   display Meal Details ----------------------------------
let mealDetails = document.querySelector('.meal-details .row')


function displayMealDetails(index, mealObject = null) {
    $('#loading').fadeIn(300)
    $(searchSection).css('display', 'none')
    $(homeSection).css('display', 'none')
    $(mealsOfCategorySection).css('display', 'none')
    $(mealNameByAreaSection).css('display', 'none')
    $(mealNameByIngredientSection).css('display', 'none')
    let mealImg;
    let mealName;
    let mealInstruction;
    let mealArea;
    let mealCategory;
    let MealSource;
    let MealYoutube;

    let ingredientsList = '';
    let ingredientsTags = '';

    if (mealObject == null) {
        mealImg = data1.meals[index].strMealThumb;
        mealName = data1.meals[index].strMeal;
        mealInstruction = data1.meals[index].strInstructions;
        mealArea = data1.meals[index].strArea
        mealCategory = data1.meals[index].strCategory;
        MealSource = data1.meals[index].strSource;
        MealYoutube = data1.meals[index].strYoutube;

        for (let i = 1; i <= 20; i++) {
            if (data1.meals[index]['strMeasure' + i] && data1.meals[index]['strIngredient' + i]) {
                ingredientsList += `<li class="alert alert-info m-2 p-1">${data1.meals[index]['strMeasure' + i]} ${data1.meals[index]['strIngredient' + i]}</li>`;
            }
        }

        let mealTags = data1.meals[index].strTags;
        if (mealTags != null) {
            let mealTagsArray = mealTags.split(",")
            for (let x = 0; x < mealTagsArray.length; x++) {
                ingredientsTags += `<li class="alert alert-danger m-2 p-1">${mealTagsArray[x]}</li>`
            }
        }
    }
    else {
        mealImg = mealObject.strMealThumb;
        mealName = mealObject.strMeal;
        mealInstruction = mealObject.strInstructions;
        mealArea = mealObject.strArea
        mealCategory = mealObject.strCategory;
        MealSource = mealObject.strSource;
        MealYoutube = mealObject.strYoutube;

        for (let i = 1; i <= 20; i++) {
            if (mealObject['strMeasure' + i] && mealObject['strIngredient' + i]) {
                ingredientsList += `<li class="alert alert-info m-2 p-1">${mealObject['strMeasure' + i]} ${mealObject['strIngredient' + i]}</li>`;
            }
        }

        let mealTags = mealObject.strTags;
        if (mealTags != null) {
            let mealTagsArray = mealTags.split(",")
            for (let x = 0; x < mealTagsArray.length; x++) {
                ingredientsTags += `<li class="alert alert-danger m-2 p-1">${mealTagsArray[x]}</li>`
            }
        }
    }

    let mealDetailsText = ``;

    mealDetailsText +=
        ` <div class="col-md-4">
    <div>
        <img class="w-100 rounded-3" src="${mealImg}" alt="">
        <h2 class="text-white">${mealName}</h2>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
        <h2>Instructions</h2>
        <p>${mealInstruction}</p>
        <h3><span class="fw-bolder">Area : ${mealArea}</span></h3>
        <h3><span class="fw-bolder">Category : ${mealCategory}</span></h3>
        <h3>Recipes :</h3>
        
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsList}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">

            ${ingredientsTags}
        </ul>

        <a target="_blank" href="${MealSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${MealYoutube}" class="btn btn-danger">Youtube</a>
    </div >
</div > `
    mealDetails.innerHTML = mealDetailsText;
    if (mealObject != null && searchSection !== null) {
        searchDiv.innerHTML = '';
        searchByNameInput.value = null;
        searchByLetterInput.value = null;
    }
    $(window).ready(function () {
        $('#loading').fadeOut(300)
    })

}

// ----------------- search by name and letter -------------------------


let homeSection = document.querySelector('.home-section');
let searchSection = document.querySelector('#search_by_N_L');




let searchByNameInput = document.querySelector("input.byName");
let searchByLetterInput = document.querySelector("input.byLetter");

if (searchByNameInput != null) {
    searchByNameInput.addEventListener("input", function () {

        getSearchDataByName(this.value);
    })
}


if (searchByLetterInput != null) {
    searchByLetterInput.addEventListener('input', function () {

        let inputValue = this.value.trim();
        if (inputValue.length > 1) {
            this.value = inputValue.slice(0, 1);
        }

        getSearchDataByletter(this.value);

    })
}

async function getSearchDataByName(name) {

    $('#loading').fadeIn(200)
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let response = await request.json();
    displaySearchByNameLetter(response);
    $(window).ready(function () {
        $('#loading').fadeOut(200)
    })
}

let searchDiv = document.querySelector('.displaySearch .row');

function displaySearchByNameLetter(data) {
    if (data.meals != null) {
        let mealText = ``;

        for (let i = 0; i < data.meals.length; i++) {
            mealText += `            
        <div class="col-md-3">
            <div class=" meal-box position-relative  rounded-3 mt-5" onclick = 'DisplayMealDetailsbyId(${data.meals[i].idMeal})'>
                <img src="${data.meals[i].strMealThumb}" alt="" class='w-100'>
                <div class="layer position-absolute rounded-3">
                    <h1 class="ms-2">${data.meals[i].strMeal}</h1>
                </div>
            </div>
        </div>`
        }
        searchDiv.innerHTML = mealText;
    }
    else {
        searchDiv.innerHTML = '';
    }
}

async function getMealDetailsById(mealId) {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let response = await request.json();
    return response.meals[0];
}

async function DisplayMealDetailsbyId(mealId) {
    let mealDetails = await getMealDetailsById(mealId);

    displayMealDetails(null, mealDetails)
}





async function getSearchDataByletter(L) {
    if (L) {
        $('#loading').fadeIn(200)

        let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${L}`)
        let response = await request.json();
        displaySearchByNameLetter(response);

        $(window).ready(function () {
            $('#loading').fadeOut(200)
        })
    }
    else {
        $('#loading').fadeIn(200)

        let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`)
        let response = await request.json();
        displaySearchByNameLetter(response);

        $(window).ready(function () {
            $('#loading').fadeOut(200)
        })
    }

}

// ---------------------------  Categories ---------------------->


let categoryRowDiv = document.querySelector('.categories-section .row');
let categoriesSection = document.querySelector('.categories-section')

let mealsOfCategorySection = document.querySelector('.meals-of-category');
let mealsOfCategoryRowDiv = document.querySelector('.meals-of-category .row');



// ------------ Categories fetch  -------------------
async function fetchCategoriesData() {
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let response = await request.json();
    let categoriesArray = response.categories;
    displayCategoriesData(categoriesArray);
}

function displayCategoriesData(arr) {
    for (let i = 0; i < arr.length; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let mealImgBox = document.createElement('div');
        mealImgBox.classList.add('meal-img-box', 'position-relative', 'rounded-3');

        let categorieImg = document.createElement('img');
        categorieImg.classList.add('w-100')
        categorieImg.setAttribute('src', arr[i].strCategoryThumb);
        mealImgBox.append(categorieImg);

        let layer1Div = document.createElement('div');
        layer1Div.classList.add('layer1', 'position-absolute', 'rounded-3');

        let categorieTitle = document.createElement('h1');
        categorieTitle.textContent = arr[i].strCategory;

        let categorieParagragh = document.createElement('p');
        categorieParagragh.classList.add('categorie-Paragragh');
        let words = arr[i].strCategoryDescription.split(/\s+/).slice(0, 20).join(' ');
        categorieParagragh.textContent = words;

        layer1Div.append(categorieTitle, categorieParagragh);
        mealImgBox.append(layer1Div);
        divCol3.append(mealImgBox);

        if (categoryRowDiv != null) {
            categoryRowDiv.append(divCol3);
        }

        divCol3.addEventListener('click', () => getDataMealsByCategory(arr[i].strCategory));
    }
}
fetchCategoriesData();

async function getDataMealsByCategory(categorie) {
    $('#loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    let request = await response.json();
    let mealsArrOfObject = request.meals
    $(categoriesSection).css("display", "none");
    displayMealsByCategory(mealsArrOfObject);
    $(window).ready(function () {
        $('#loading').fadeOut(300)
    })
}

function displayMealsByCategory(arrOfObject) {

    for (let i = 0; i < arrOfObject.length; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let mealImgBox = document.createElement('div');
        mealImgBox.classList.add('meal-img-box', 'position-relative', 'rounded-3');
        mealImgBox.addEventListener('click', () => {
            MealsByCategoryData(arrOfObject[i].strMeal);
        })

        let categorieImg = document.createElement('img');
        categorieImg.classList.add('w-100')
        categorieImg.setAttribute('src', arrOfObject[i].strMealThumb);
        mealImgBox.append(categorieImg);

        let layer1Div = document.createElement('div');
        layer1Div.classList.add('layer1', 'position-absolute', 'rounded-3', 'justify-content-start', 'flex-row', 'align-items-center');

        let categorieTitle = document.createElement('h1');
        categorieTitle.textContent = arrOfObject[i].strMeal;

        layer1Div.append(categorieTitle);
        mealImgBox.append(layer1Div);
        divCol3.append(mealImgBox);

        if (mealsOfCategoryRowDiv != null) {
            mealsOfCategoryRowDiv.append(divCol3);
        }

        // arrOfObject[i].strMeal
        // arrOfObject[i].strMealThumb
    }
}

async function MealsByCategoryData(mealName) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let request = await response.json();
    displayMealDetails(null, request.meals[0]);
}

// ----------------------------  Area section --------------------

let areaNamesSection = document.querySelector('.area-names1');
let areaNamesRow = document.querySelector('.area-names-row');

let mealNameByAreaRow = document.querySelector('.meal-names-row')
let mealNameByAreaSection = document.querySelector('.meal-names-by-area');


async function fetchAreaData() {
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let response = await request.json();
    displayAreaNames(response.meals);
}


function displayAreaNames(nameArr) {
    for (let i = 0; i < nameArr.length; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let areaDiv = document.createElement('div');
        areaDiv.classList.add('text-center', 'text-white', 'area-div');

        let homeIcon = document.createElement('i');
        homeIcon.classList.add("fa-solid", "fa-house-laptop", 'fa-4x');

        let areaName = document.createElement('h3');
        areaName.textContent = nameArr[i].strArea;

        areaDiv.append(homeIcon, areaName)
        divCol3.append(areaDiv);

        if (areaNamesRow != null) {
            areaNamesRow.append(divCol3);
        }

        divCol3.addEventListener('click', () => getDataMealsByArea(nameArr[i].strArea));
    }
}


async function getDataMealsByArea(areaName) {
    $('#loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let request = await response.json();
    let mealsArrOfObject = request.meals
    $(areaNamesSection).css('display', 'none');
    displayMealsByAreaName(mealsArrOfObject);
    $(window).ready(function () {
        $('#loading').fadeOut(300)
    })
}


function displayMealsByAreaName(arrOfObjectMeals) {

    for (let i = 0; i < arrOfObjectMeals.length; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let mealImgBox = document.createElement('div');
        mealImgBox.classList.add('meal-img-box', 'position-relative', 'rounded-3');
        mealImgBox.addEventListener('click', () => {
            MealsByAreayData(arrOfObjectMeals[i].strMeal);
        })

        let areaMealnameImg = document.createElement('img');
        areaMealnameImg.classList.add('w-100')
        areaMealnameImg.setAttribute('src', arrOfObjectMeals[i].strMealThumb);
        mealImgBox.append(areaMealnameImg);

        let layer1Div = document.createElement('div');
        layer1Div.classList.add('layer1', 'position-absolute', 'rounded-3', 'justify-content-start', 'flex-row', 'align-items-center');

        let areaMealTitle = document.createElement('h1');
        areaMealTitle.textContent = arrOfObjectMeals[i].strMeal;

        layer1Div.append(areaMealTitle);
        mealImgBox.append(layer1Div);
        divCol3.append(mealImgBox);

        if (mealNameByAreaRow != null) {
            mealNameByAreaRow.append(divCol3);
        }
    }

}

async function MealsByAreayData(mealName) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let request = await response.json();
    // console.log(mealName);
    // console.log(request.meals[0]);
    displayMealDetails(null, request.meals[0]);
}




fetchAreaData()


// ----------------------------  ingredient section --------------------

// Ingredient
async function fetchIngredientData() {
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let response = await request.json();
    // console.log(response.meals);
    displayIngredientNames(response.meals);
}

let ingredientNamesSection = document.querySelector('.ingredient-names');
let ingredientNamesRow = document.querySelector('.ingredient-names-row');

let mealNameByIngredientRow = document.querySelector('.meal-names-row')
let mealNameByIngredientSection = document.querySelector('.meal-names-by-ingredient');


function displayIngredientNames(nameArr) {
    for (let i = 0; i < 25; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let IngredientDiv = document.createElement('div');
        IngredientDiv.classList.add('text-center', 'text-white', 'area-div');

        let drumStickIcon = document.createElement('i');
        drumStickIcon.classList.add("fa-solid", "fa-drumstick-bite", 'fa-4x');

        let IngredientName = document.createElement('h3');
        IngredientName.textContent = nameArr[i].strIngredient;

        let IngredientDesc = document.createElement('p')
        IngredientDesc.classList.add('ingredient-Paragragh');
        let words = nameArr[i].strDescription.split(/\s+/).slice(0, 20).join(' ');
        IngredientDesc.textContent = words;



        IngredientDiv.append(drumStickIcon, IngredientName, IngredientDesc)
        divCol3.append(IngredientDiv);

        if (ingredientNamesRow != null) {
            ingredientNamesRow.append(divCol3);
        }

        divCol3.addEventListener('click', () => getDataMealsByIngredient(nameArr[i].strIngredient));
    }
}


async function getDataMealsByIngredient(Ingredient) {
    $('#loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    let request = await response.json();
    // console.log(request.meals);
    $(ingredientNamesSection).css('display', 'none');
    displayMealsByAreaName(request.meals);
    $(window).ready(function () {
        $('#loading').fadeOut(300)
    })
}


function displayMealsByAreaName(arrOfObjectMeals) {

    for (let i = 0; i < arrOfObjectMeals.length; i++) {
        let divCol3 = document.createElement('div');
        divCol3.classList.add('col-md-3');

        let mealImgBox = document.createElement('div');
        mealImgBox.classList.add('meal-img-box', 'position-relative', 'rounded-3');
        mealImgBox.addEventListener('click', () => {
            MealsByIngredientData(arrOfObjectMeals[i].strMeal);
        })

        let areaMealnameImg = document.createElement('img');
        areaMealnameImg.classList.add('w-100')
        areaMealnameImg.setAttribute('src', arrOfObjectMeals[i].strMealThumb);
        mealImgBox.append(areaMealnameImg);

        let layer1Div = document.createElement('div');
        layer1Div.classList.add('layer1', 'position-absolute', 'rounded-3', 'justify-content-start', 'flex-row', 'align-items-center');

        let areaMealTitle = document.createElement('h1');
        areaMealTitle.textContent = arrOfObjectMeals[i].strMeal;

        layer1Div.append(areaMealTitle);
        mealImgBox.append(layer1Div);
        divCol3.append(mealImgBox);

        if (mealNameByIngredientRow != null) {
            mealNameByIngredientRow.append(divCol3);
        }
    }

}

async function MealsByIngredientData(mealName) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let request = await response.json();
    // console.log(mealName);
    // console.log(request.meals[0]);
    displayMealDetails(null, request.meals[0]);
}


fetchIngredientData()

// ----------------------  contact-us ------------------>

let nameRegex = /^[a-zA-Z]+$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let phoneNumberRegex = /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
let ageRegex = /^(?:0*[1-9][0-9]*)$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let nameInput = document.querySelector('#nameInput');
if (nameInput != null) {
    nameInput.addEventListener('input', function () {
        isValidInputField(nameRegex, this);
        // enableSubmit();
    });
}

let emailInput = document.querySelector('#emailInput'); // Added missing id selector
if (emailInput != null) {
    emailInput.addEventListener('input', function () {
        isValidInputField(emailRegex, this);
        // enableSubmit();
    });
}


let phoneInput = document.querySelector('#phoneInput'); // Added missing id selector
if (phoneInput != null) {
    phoneInput.addEventListener('input', function () {
        isValidInputField(phoneNumberRegex, this)
        // enableSubmit();
    });
}

let ageInput = document.querySelector('#ageInput');
if (ageInput != null) {
    ageInput.addEventListener('input', function () {
        isValidInputField(ageRegex, this);
        // enableSubmit();
    });
}

let passwordInput = document.querySelector('#passwordInput');
if (passwordInput != null) {
    passwordInput.addEventListener('input', function () {
        isValidInputField(passwordRegex, this);
        // enableSubmit();
    });
}

let repasswordInput = document.querySelector('#repasswordInput');
if (repasswordInput != null) {
    repasswordInput.addEventListener('input', function () {
        passwordMatch(passwordInput, this);
        enableSubmit()
    });

}
let submitBtn = document.querySelector('#submitBtn');

function isValidInputField(regex, element) {
    if (regex.test(element.value)) {
        element.nextElementSibling.classList.replace('d-block', 'd-none');

        return true;
    } else {
        element.nextElementSibling.classList.replace('d-none', 'd-block');
        return false;
    }
}

function passwordMatch(element1, element2) {
    const password1 = element1.value;
    const password2 = element2.value;

    if (password1 === password2 && password2 !== '') {
        // Passwords match and "repassword" field is not empty
        element2.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    } else {
        // Passwords don't match or "repassword" field is empty
        element2.nextElementSibling.classList.replace('d-none', 'd-block');
        return false;
    }
}

if (submitBtn != null) {

    submitBtn.disabled = true;
}
function enableSubmit() {
    if (
        isValidInputField(nameRegex, nameInput) &&
        isValidInputField(emailRegex, emailInput) &&
        isValidInputField(phoneNumberRegex, phoneInput) &&
        isValidInputField(ageRegex, ageInput) &&
        isValidInputField(passwordRegex, passwordInput) &&
        passwordMatch(passwordInput, repasswordInput)
    ) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}


