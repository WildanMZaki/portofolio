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
        const selectedProjects = ((data.sort((a, b) => a.grade - b.grade)).reverse()).slice(0, 3);
        let row = '<div class="row">';
        for (let c = 0; c < 3; c++) {
            const element = selectedProjects[c];                
            row += `
                <div class="col-lg-4 mb-lg-0 mb-3">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <h5 class="card-title">${element.name}</h5>
                            <a href="./project.html#${element.id}">
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
        }
        row += '</div>';
        $('.projects-wrapper').append(row);            
    });
}

showProject();

// Certificates Section
function showCerts(filter = null){
    $('#certs-wrapper').html('');
    let col = '';
    let row;
    certs.forEach((element, ind) => {        
        if (!ind || !((ind+1)%4)) {
            row = '<div class="row mb-lg-3">';            
        }
        if ((!filter || filter == 'all') || element.type.includes(filter)) {            
            col += `
                <div class="col-lg-3 col-12 mb-lg-0 mb-3">
                    <div class="card" data-ind="${ind}">
                        <div class="card-body"> 
                        <h5 class="card-title">${element.label}</h5>
                        <img src="./img/certificates/${element.image}" alt="${element.label}" class="card-img cert-img">
                        </div>                                
                    </div>
                </div>
            `;
        }
        if (!((ind+1)%4) || ind == certs.length -1) {
            row += col + '</div>';
            $('#certs-wrapper').append(row);
            col = '';
            row = '';
        }
    });
   
}

showCerts();

$('#certFilter').change(e => {
    showCerts($('#certFilter').val());
});

let selectedCert;
$('#certs-wrapper').on('click', '.card', (e) => {
    selectedCert = e.currentTarget.dataset.ind;    
    $('#certModal').modal('show');
});
$('#certModal').on('show.bs.modal', () => {
    let el = certs[selectedCert];
    $('#certLabel').html(el.label);
    $('#certImg').attr('src', `./img/certificates/${el.image}`);
    $('#certLink').attr('href', el.link);    
});

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
