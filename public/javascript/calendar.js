document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        googleCalendarApiKey: 'AIzaSyAPRI9sO3Jq1sDPEgz5ply9kMiQib5ZZLY',
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: {
            googleCalendarId: 'ag2c5620rn7vnm9hslau2veokk@group.calendar.google.com'
        }
    });

    calendar.render();
});