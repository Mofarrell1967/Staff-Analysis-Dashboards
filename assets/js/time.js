queue()
    .defer(d3.csv, "assets/data/work.csv")
    .await(makeGraphs);

function makeGraphs(error, workData) {
    var ndx = crossfilter(workData);

    var parseDate = d3.time.format("%Y/%m/%d").parse;
    workData.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    var date_dim = ndx.dimension(dc.pluck('date'));
    var total_duration_per_date = date_dim.group().reduceSum(dc.pluck('duration'));

    var minDate = date_dim.bottom(1)[0].date;
    var maxDate = date_dim.top(1)[0].date;

    dc.lineChart("#line-chart")
        .width(1400)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .dimension(date_dim)
        .group(total_duration_per_date)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxisLabel("Hours")
        .renderArea(true)
        .renderHorizontalGridLines(true)
        .yAxis().ticks(10);

    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_hours_by_name = name_dim.group().reduceSum(dc.pluck('duration'));

    dc.barChart("#total-hours-chart")
        .width(350)
        .height(275)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .dimension(name_dim)
        .group(total_hours_by_name)
        .transitionDuration(500)
        .renderLabel(true)
        .elasticY(true)
        .clipPadding(10)
        .yAxisLabel("Hours")
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .barPadding(0.1)
        .outerPadding(0.05)
        .colorAccessor(d => d.key)
        .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF'])
        .yAxis().ticks(10);

    var work_dim = ndx.dimension(dc.pluck('worktype'));
    var total_hours_by_work = work_dim.group().reduceSum(dc.pluck('duration'));

    dc.barChart("#worktype-chart")
        .width(350)
        .height(275)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .dimension(work_dim)
        .group(total_hours_by_work)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .renderLabel(true)
        .elasticY(true)
        .clipPadding(10)
        .barPadding(0.1)
        .outerPadding(0.05)
        .colorAccessor(d => d.key)
        .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF'])
        .yAxis().ticks(4);

    var priority_dim = ndx.dimension(dc.pluck('priority'));
    var total_hours_by_pri = priority_dim.group().reduceSum(dc.pluck('duration'));

    dc.barChart("#priority-chart")
        .width(350)
        .height(275)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .dimension(priority_dim)
        .group(total_hours_by_pri)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .renderLabel(true)
        .elasticY(true)
        .clipPadding(10)
        .barPadding(0.1)
        .outerPadding(0.05)
        .colorAccessor(d => d.key)
        .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF'])
        .yAxis().ticks(4);

    var plat_dim = ndx.dimension(dc.pluck('platform'));
    var total_hours_by_plat = plat_dim.group().reduceSum(dc.pluck('duration'));

    dc.barChart("#platform-chart")
        .width(350)
        .height(275)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .dimension(plat_dim)
        .group(total_hours_by_plat)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .renderLabel(true)
        .elasticY(true)
        .clipPadding(10)
        .barPadding(0.1)
        .outerPadding(0.05)
        .colorAccessor(d => d.key)
        .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF'])
        .yAxis().ticks(4);

    dc.renderAll();
}