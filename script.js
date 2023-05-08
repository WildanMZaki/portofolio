const menu = document.querySelector('#menu-icon');
const nav = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('open');
}

// Skills Section
function getData(url, callback) {
    $.get(
        url, data => callback(data)
    );
}

function showSkill(){
    $('#hSkillsTitle').html("Hard Skills");
    $('[data-item="all"]').addClass('active');
    $('#mySkills').html('');        
    getData("./skills.json", data => {
        data.forEach((el, ind) => {            
            // Cek apakah punya value atau child
            let value;
            if (el.hasOwnProperty("value")) {
                value = el.value;
            } else {
                let values = el.childs.map(e => e.value)
                value = Math.round(values.reduce((a, b) => a+b, 0) / values.length); 
            }
            $('#mySkills').append(`
                <div class="skill-item my-2">
                    <div class="d-flex justify-content-between">
                        <h5>${el.name}</h5>
                        <h5>${value} %</h5>
                    </div>
                    <div class="w-100 bg-light rounded-pill">
                        <div class="w${value} bg-warning text-warning rounded-pill">.</div>
                    </div>
                    ${(el.hasOwnProperty("childs")) ? 
                        `<div class="d-flex justify-content-end">
                            <small class="text-warning more-skill" data-index="${ind}">Show more..</small>
                        </div>`: ''}
                </div>
            `);
        });
    })
}

showSkill();

$('#mySkills').on('click', '.more-skill', (e) => {
     getData("./skills.json", data => {
        let selected = data[parseInt(e.currentTarget.dataset.index)];
        $('#hSkillsTitle').html(selected.name);
        $('#hardSkilBreadcrumb').append(`<li class="breadcrumb-item item-breadcrumb active" data-item="sub">${selected.name}</li>`);
        $('[data-item="all"]').removeClass('active');
        $('#mySkills').html('');
        selected.childs.forEach(el => {
            $('#mySkills').append(`
                <div class="skill-item my-2">
                    <div class="d-flex justify-content-between">
                        <h5>${el.name}</h5>
                        <h5>${el.value} %</h5>
                    </div>
                    <div class="w-100 bg-light rounded-pill">
                        <div class="w${el.value} bg-warning text-warning rounded-pill">.</div>
                    </div>
                </div>
            `);
        })
     })
});

$('[data-item="all"]').click(e => {
    $('[data-item="sub"]').remove();
    showSkill();    
});

// Projects Section
function showProject(){
    getData("./projects.json", data => {
        $('#total-projects').html(data.length)
        const rows = Math.floor(data.length / 3);
        let p = 0;        
        for (let r = 0; r < rows; r++) {
            let row = '<div class="row">';
            for (let c = 0; c < 3; c++) {
                if (p < data.length) {                    
                    const element = data[p];                
                    row += `
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-header d-flex justify-content-between">
                                    <h5 class="card-title">${element.name}</h5>
                                    <a href="${element.link}">
                                        <i class="ri-computer-line project-detail fs-5" title="Get Detail"></i>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <img src="./img/projects-preview/${element.image}" alt="${element.name} Preview" class="mb-3 card-img img-fluid">
                                    <p class="card-text">${element.description}</p>
                                </div>
                            </div>
                        </div>   
                    `;
                    p++;
                }
            }
            row += '</div>';
            $('.projects-wrapper').append(row);
        }        
    })
}

showProject();

const sr = ScrollReveal ({
    distance: '65px',
    duration: 1600,
    delay: 450,
    reset: true
});

sr.reveal('.hero-text', {delay:200, origin:'top'});
sr.reveal('.hero-img', {delay:450, origin:'top'});
sr.reveal('.sosmed', {delay:500, origin:'left'});
sr.reveal('.scroll-down', {delay:500, origin:'right'});

sr.reveal('#aboutMe', {delay:200, origin:'left'});
sr.reveal('#myImg', {delay:400, origin:'bottom'});
sr.reveal('#myDescription', {delay:550, origin:'top'});
