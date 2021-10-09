function processEvents(response) {
    var events = response.result.items;
    console.log(events)
    return getYearLayout([2019, 2020], events)
}

function getMultiYearLayout(years, events) {
    let results = [];
    years.forEach(y => {
        results.push(getYearLayout(y));
    });

    return results;
}

function getYearLayout(year, events) {
    // for (i = 0; i < events.length; i++) {
    //     var event = events[i];
    //     var startTime = event.start.dateTime;
    //     var endTime = event.end.dateTime;
    //     if (!startTime) startTime = event.start.date;
    //     if (!endTime) endTime = event.end.date;
    //     appendPre(event.summary + ' (' + startTime + ' to ' + endTime + ')')
    // }

    const MONTH_NAMES = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // let layout = [];
    let results = [];

    let currentDay = 1;
    // Get preceding Sunday
    currentDay-= new Date(year, 0, 1).getDay();

    let weekBuffer = []
    let lastMonthStartIndex = -1;
    let currentWeeksInMonth = 0;
    let currentMonth = 0;
    while (true)
    {
        // Increment
        let currentDate = new Date(year, 0, currentDay);
        currentDay++;
        isShaded = ((currentDate.getMonth() % 2) == 0);

        // Reset month
        if (currentDate.getDate() == 1 || currentDate.getFullYear() > year)
        {
            if (currentWeeksInMonth)
            {
                let month = MONTH_NAMES[currentMonth];
                results[lastMonthStartIndex].unshift({month: month, span: currentWeeksInMonth, shade: isShaded});
                currentMonth++;
            }
            currentWeeksInMonth = 0;
            lastMonthStartIndex = results.length;
        }
    
        // Check end of year
        if (currentDate.getFullYear() > year)
            break;

        // Add day to week
        weekBuffer.push({
            day: (currentDate.getFullYear() == year) ? currentDate.getDate() : null,
            date: currentDate,
            shade: isShaded,
        });

        // Reset week
        if (currentDate.getDay() == 6)
        {
            results.push(weekBuffer);
            weekBuffer = [];
            currentWeeksInMonth++;
        }
    }

    console.log(results);

    return results;
}

function getTestYearLayout(year) {
    var layout = [
        [
            {month: "January", span: 4, shade: false},
            {day: null, shade: false},
            {day: null, shade: false},
            {day: null, shade: false},
            {day: 1, shade: false},
            {day: 2, shade: false},
            {day: 3, shade: false},
            {day: 4, shade: false},
        ],
        [
            {day: 5, shade: false},
            {day: 6, shade: false},
            {day: 7, shade: false},
            {day: 8, shade: false},
            {day: 9, shade: false},
            {day: 10, shade: false},
            {day: 11, shade: false},
        ],
        [
            {day: 12, shade: false},
            {day: 13, shade: false},
            {day: 14, shade: false},
            {day: 15, shade: false},
            {day: 16, shade: false},
            {day: 17, shade: false},
            {day: 18, shade: false},
        ],
        [
            {day: 19, shade: false},
            {day: 20, shade: false},
            {day: 21, shade: false},
            {day: 22, shade: false},
            {day: 23, shade: false},
            {day: 24, shade: false},
            {day: 25, shade: false},
        ],
        [
            {month: "February", span: 1, shade: true},
            {day: 26, shade: false},
            {day: 27, shade: false},
            {day: 28, shade: false},
            {day: 29, shade: false},
            {day: 30, shade: false},
            {day: 31, shade: false},
            {day: 1, shade: true},
        ],
    ];

    return layout;
}
