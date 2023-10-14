// Define the Calendar class
class Calendar {
    constructor() {
      this.events = []; // array to store events
      this.currentDate = new Date(); // current date
    }
  
    // method to fetch events from the server
    fetchEvents() {
      // use AJAX to fetch events from the server
      // store them in the this.events array
      // ...
    }
  
    // method to render the calendar
    render() {
      // create the table element and header row
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
  
      // add the day of week headers
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // create the tbody element and rows for each week
      const tbody = document.createElement('tbody');
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const weekRow = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
          const dateCell = document.createElement('td');
          dateCell.textContent = currentDate.getDate();
          dateCell.dataset.date = currentDate.toISOString();
          dateCell.addEventListener('click', this.handleCellClick.bind(this));
          weekRow.appendChild(dateCell);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        tbody.appendChild(weekRow);
      }
      table.appendChild(tbody);
  
      // add the events to the calendar
      this.addEventsToCalendar(table);
  
      return table;
    }
  
    // method to get the start date for the calendar
    getStartDate() {
      const currentDate = new Date(this.currentDate);
      currentDate.setDate(1);
      const dayOfWeek = currentDate.getDay();
      currentDate.setDate(currentDate.getDate() - dayOfWeek);
      return currentDate;
    }
  
    // method to get the end date for the calendar
    getEndDate() {
      const currentDate = new Date(this.currentDate);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const dayOfWeek = lastDayOfMonth.getDay();
      currentDate.setDate(lastDayOfMonth.getDate() + (6 - dayOfWeek));
      return currentDate;
    }
  
    // method to add events to the calendar
    addEventsToCalendar(table) {
      for (let event of this.events) {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        const startCell = table.querySelector(`td[data-date="${startDate.toISOString()}"]`);
        const endCell = table.querySelector(`td[data-date="${endDate.toISOString()}"]`);
        const eventCell = document.createElement('div');
        eventCell.textContent = event.title;
        eventCell.classList.add('event');
        eventCell.dataset.eventId = event.id;
        eventCell.addEventListener('click', this.handleEventClick.bind(this));
        if (startCell === endCell) {
          startCell.appendChild(eventCell);
        } else {
          let currentCell = startCell;
          while (currentCell !== endCell) {
            currentCell.appendChild(eventCell.cloneNode(true));
            currentCell = currentCell.nextElementSibling;
          }
          endCell.appendChild(eventCell.cloneNode(true));
        }
      }
    }
  
    //
  