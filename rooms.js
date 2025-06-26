document.addEventListener('DOMContentLoaded', function () {
  const monthsContainer = document.getElementById('monthsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const todayBtn = document.getElementById('todayBtn');

  let startDate = new Date();
  startDate.setDate(1);

  function renderCalendars(startMonthDate) {
    monthsContainer.innerHTML = '';

    for (let i = 0; i < 4; i++) {
      const monthDate = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth() + i, 1);
      const calendarHTML = generateMonthBlock(monthDate);
      monthsContainer.appendChild(calendarHTML);
    }
  }

  function generateMonthBlock(date) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const block = document.createElement('div');
    block.className = 'month-block';
    block.innerHTML = `
      <h3>${monthNames[month]} <span>${year}</span></h3>
      <table>
        <thead>
          <tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    `;

    const tbody = block.querySelector('tbody');
    let day = 1;
    let row = document.createElement('tr');

    for (let i = 0; i < firstWeekday; i++) {
      const td = document.createElement('td');
      td.className = 'empty';
      row.appendChild(td);
    }

    for (let i = firstWeekday; i < 7; i++) {
      row.appendChild(createDayCell(year, month, day++, today));
    }
    tbody.appendChild(row);

    while (day <= daysInMonth) {
      row = document.createElement('tr');
      for (let i = 0; i < 7; i++) {
        if (day <= daysInMonth) {
          row.appendChild(createDayCell(year, month, day++, today));
        } else {
          const td = document.createElement('td');
          td.className = 'empty';
          row.appendChild(td);
        }
      }
      tbody.appendChild(row);
    }

    return block;
  }

  function createDayCell(year, month, day, today) {
    const td = document.createElement('td');
    td.textContent = day;

    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    td.className = date < today ? 'past' : 'active';

    return td;
  }

  prevBtn.addEventListener('click', () => {
    startDate.setMonth(startDate.getMonth() - 4);
    renderCalendars(startDate);
  });

  nextBtn.addEventListener('click', () => {
    startDate.setMonth(startDate.getMonth() + 4);
    renderCalendars(startDate);
  });

  todayBtn.addEventListener('click', () => {
    startDate = new Date();
    startDate.setDate(1);
    renderCalendars(startDate);
  });

  renderCalendars(startDate);
});
