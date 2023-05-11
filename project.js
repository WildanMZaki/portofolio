function getData(url, callback) {
    $.get(
        url, data => callback(data)
    );
}

const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

function dateConvert(date) {
    const dates = date.split('-');
    return parseInt(dates[2])+' '+months[parseInt(dates[1])-1]+' '+parseInt(dates[0]);
}

const url = document.URL;
const index = parseInt(url.slice(url.search('#')+1));

function init(index) {
    let ind = !index ? 0 : index;
    getData('./projects.json', data => {
        const selectedProject = data[ind];
        $('#projectImg').attr('src', './img/projects-preview/'+selectedProject.image);
        $('#projectDate-Created').html(dateConvert(selectedProject.details["date-created"]));
        $('.projectName').html(selectedProject.name);
        $('#projectVersion').html(selectedProject.version);
        $('#projectStatus').html(selectedProject.status);
        $('#projectTags').html('');
        if (selectedProject.details.tags.length) {
            selectedProject.details.tags.forEach(el => {                
                $('#projectTags').append(`<span class="badge bg-light text-primary tag me-1">#${el}</span>`);                
            });
        }
        $('#projectDescription').html(selectedProject.description);
        if (selectedProject.link) {
            $('#projectLink').attr('href', selectedProject.link);
        } else {
            $('#projectLink').remove()
        }
        $('#projectSource').attr('href', selectedProject.source);
        if (selectedProject.status == 'development') {
            $('#projectLink').remove()
            $('#projectSource').remove()
        }
        $('.placeholder').removeClass('placeholder');

        // Middle Section (Abilities, Techs, and Requirements)
        let abilities;
        if (!selectedProject.abilities) {
            abilities = '<small class="p-5 text-center text-muted">Hmmm, data not found</small>';
        } else if (selectedProject.abilities.length === 1) {
            abilities = `<p>${selectedProject.abilities[0]}</p>`;            
        } else {
            abilities = '<ol>';
            selectedProject.abilities.forEach(ab => {
                abilities += `<li>${ab}</li>`;
            });
            abilities += '</ol>';            
        }
        $('#projectAbilities').append(abilities);

        if (selectedProject.details.technologies.length) {
            selectedProject.details.technologies.forEach(tech => {                
                $('#projectTech').append(`<span class="badge bg-warning text-dark me-1">${tech}</span>`);                
            });
        } else {
            $('#projectTech').remove();
            $('#projectTechHeader').remove();
        }
        
        let requirements;
        if (!selectedProject.details.requirements) {
            requirements = '<small class="p-5 text-center text-muted">Hmmm, data not found</small>';
        } else if (selectedProject.details.requirements.length === 1) {
            requirements = `<p>${selectedProject.details.requirements[0]}</p>`;            
        } else {
            requirements = '<ol>';
            selectedProject.details.requirements.forEach(req => {
                requirements += `<li>${req}</li>`;
            });
            requirements += '</ol>';            
        }
        $('#projectRequirements').append(requirements);
    });
}

init(index);