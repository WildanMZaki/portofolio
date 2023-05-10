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
    getData('./projects.json', data => {
        const selectedProject = data[index];
        $('#projectImg').attr('src', './img/projects-preview/'+selectedProject.image);
        $('#projectDate-Created').html(dateConvert(selectedProject.details["date-created"]));
        $('.projectName').html(selectedProject.name);
        $('#projectVersion').html(selectedProject.version);
        $('#projectStatus').html(selectedProject.status);
        $('#projectTags').html('');
        if (selectedProject.details.tags) {
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
    });
}

init(index);