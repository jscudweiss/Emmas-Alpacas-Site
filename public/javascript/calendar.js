document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        googleCalendarApiKey: 'AIzaSyAX8G6BQ7251lgDblOKQjdSUkq3JbvT9gA',
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: {
            googleCalendarId: '08g6o144ot5l6e2niu01td1dmo@group.calendar.google.com'
        }
    });

    calendar.render();
});


