// Domain-layer stuff
function AddYears(years) {
    let layout = GetMultiYearLayout(years);
    console.log(layout);

    var canvas = d3.select("div#canvas");

    var yearDiv = canvas.selectAll("div.year")
        .data(layout)
        .enter().append("div")
        .attr("class", "year");

    yearDiv.append("table")

    var tr = yearDiv.selectAll("table>tr")
        .data(function(d) { return d; })
        .enter().append("tr")

    var td = tr.selectAll("td")
        .data(function(d) { return d; })
        .enter().append("td")
        .attr("rowspan", function(d) {
            if (d.month)
                return d.span
            return null;
        })
        .attr("class", function(d) {
            let classList = [
                d.shade ? "shaded" : "",
                d.month ? "month" : "",
            ];
            return classList.join(" ")
        })
        .text(function(d){
            if (d.month)
                return d.month;
            return d.day;
        })
}
