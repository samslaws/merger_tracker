//case insensitive jquery matching
jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// JavaScript for hyperlinking rows
function URLRedirect() {
  window.open($(this).attr('id'));
  console.log($(this).attr('id'));
};

// handling form submission
$('#emit').submit(function(event) {
  event.preventDefault();
  return false;
});

$('#emit_data').submit(function(event) {
  event.preventDefault();
  return false;
});

//JavaScript for converting csv to table
var globaldata = new Array();
var cities_set = new Set();
var states_set = new Set();
var firms_set = new Set();
d3.csv("https://assets.law360news.com/1417000/1417316/final_df-2025-12-05.csv").then(function(data) {
  $('table').find('#data-load').each(function() {
    this.remove();
  });

  for (let i = 0; i < data.length; i++) {
    var globaldata_row = new Object();

    var tbl = document.getElementById("table-content-inner");
    var row = tbl.insertRow();
    row.className = "content-row";
    row.id = data[i].link.toString();
    row.href = data[i].link.toString();
    globaldata_row['id'] = data[i].index1.toString();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    cell0.className = "cell0";
    cell1.className = "cell1";
    cell2.className = "cell2";
    cell3.className = "cell3";
    cell4.className = "cell4";
    cell5.className = "cell5";
    cell6.className = "cell6";
    cell7.className = "cell7";

    globaldata_row['link'] = data[i].link;

    cell0.innerHTML = data[i].report_date;
    globaldata_row['report_date'] = data[i].report_date;

    cell1.innerHTML = data[i].firm_name_1;
    firms_set.add(data[i].firm_name_1);
    globaldata_row['firm_name_1'] = data[i].firm_name_1;

    cell2.innerHTML = data[i].final_firm_location_1;
    globaldata_row['final_firm_location_1'] = data[i].final_firm_location_1;

    cell3.innerHTML = data[i].firm_size_1;
    globaldata_row['firm_size_1'] = data[i].firm_size_1;

    cell4.innerHTML = data[i].firm_name_2;
    globaldata_row['firm_name_2'] = data[i].firm_name_2;
    firms_set.add(data[i].firm_name_2);

    cell5.innerHTML = data[i].final_firm_location_2;
    globaldata_row['firm_location_2'] = data[i].firm_location_2;

    cell6.innerHTML = data[i].firm_size_2;
    globaldata_row['firm_size_2'] = data[i].firm_size_2;

    cell7.innerHTML = data[i].merge_date;
    globaldata_row['merge_date'] = data[i].merge_date;

    globaldata_row['cities'] = data[i].firm_location_city_1;
    globaldata_row['cities2'] = data[i].firm_location_city_2;
    globaldata_row['states'] = data[i].firm_location_state_1;
    globaldata_row['states2'] = data[i].firm_location_state_2;
    globaldata_row['firms1'] = data[i].firm_name_1;
    globaldata_row['firms2'] = data[i].firm_name_2;

    cities_set.add(data[i].firm_location_city_1);
    cities_set.add(data[i].firm_location_city_2);
    states_set.add(data[i].firm_location_state_1);
    states_set.add(data[i].firm_location_state_2);

    globaldata.push(globaldata_row);
  }

  var select = document.getElementById("dropdown-city-content-id");

  for(var i = 0; i < cities_set.length; i++) {
      var opt = cities_set[i];
      var el = document.createElement("P");
      el.className = "dropdown-city-item";
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }

    for(var i = 0; i < states_set.length; i++) {
      var opt = states_set[i];
      var el = document.createElement("P");
      el.className = "dropdown-state-item";
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }

  var city_array = Array.from(cities_set);
  var state_array = Array.from(states_set);
  var firm_array = Array.from(firms_set);

  //Alphabetizes array
  city_array.sort()
  state_array.sort()
  firm_array.sort()

  //Remove blanks from array
  state_array = $.grep(state_array,function(n){ return n == 0 || n });



// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


  $("#data-table tbody tr").on('click', URLRedirect);

  //Remove blank firm
  var newFirmset = Array.from(firms_set).sort()

  d3.select(".dropdown-firm-content")
    .selectAll('p')
    .data(newFirmset)
    .enter()
    .append('p')
    .text(dta => dta);

  $('.dropdown-firm-content p').on('click', function(e) {
    $('.dropdown-firm-content')
      .removeClass('show');
    $('.dropdown-firm').find('#dropdown-firm-input').val("");
  })

  $('table').trigger('update');
});




// pagination
$(document).ready(function() {
  $("table")
    .tablesorter({
      widthFixed: true,
      delayInit: true,
      ignoreCase: true,
      sortReset: true,
      sortList: [
        [0, 1],
        [1, 0],
        [4, 1]
      ],
      emptyTo: "bottom"
    })
    .tablesorterPager({
      container: $(".pager"),
      removeRows: false,
      output: '{startRow} to {endRow} of {totalRows} rows',
      updateArrows: true,
      size: 10
    });

  $('#emit_data').keyup(searchFunction);

});



// JavaScript for searching table
function searchFunction() {
  var $row,
    row = "<tr class='content-row' id='{y}'><td class='cell0'>{z}</td><td class='cell1'>{m}</td><td class='cell2'>{g}</td><td class='cell3'>{r}</td><td class='cell4'>{j}</td><td class='cell5'>{h}</td><td class='cell6'>{e}</td><td class='cell7'>{a}</td></tr>";
  var r = "";
  var input = document.getElementById("emit_data");
  var input_up = input.value.toUpperCase();
  var size_range = [];
  for (let i = slide_min; i <= slide_max; i++) {
    size_range.push(i.toString());
  }

  // loop through data
  for (let i = 0; i < globaldata.length; i++) {
    var tmpstr = "";
    for (let x = 0; x < globaldata[i].practice.length; x++) {
      tmpstr = tmpstr + "<p>" + globaldata[i].final_firm_location_1[x] + "</p>"
    };

    // check city filter, state filter, date range, and query
    if (city_arr && city_arr.length && state_arr && state_arr.length) {
      if (city_arr.includes(globaldata[i].firm_location_city_1.toUpperCase()) || city_arr.
      city_arr.includes(globaldata[i].firm_location_city_1.toUpperCase()) &&
      city_arr.includes(globaldata[i].firm_location_city_1.toUpperCase()) &&
      city_arr.includes(globaldata[i].firm_location_city_1.toUpperCase()) &&
      city_arr.includes(globaldata[i].firm_location_city_1.toUpperCase()) &&







      practice_arr.some(r => globaldata[i].practice.map(function(x) {
          return x.toUpperCase()
        }).indexOf(r) > -1) && size_range.includes(globaldata[i].firm_size_1) && (globaldata[i].firm_name_1.toUpperCase().indexOf(input_up) > -1 || globaldata[i].firm_name_1.toUpperCase().indexOf(input_up) > -1)) {
        r = r + row.replace(/\{[zmgrjy]\}/g, function(m) {
          return {
            '{z}': globaldata[i].report_date,
            '{m}': globaldata[i].firm_name_1,
            '{g}': tmpstr,
            '{r}': globaldata[i].firm_size_1,
            '{j}': globaldata[i].firm_name_2,
            '{h}': globaldata[i].final_firm_location_2,
            '{e}': globaldata[i].firm_size_2,
            '{a}': globaldata[i].merge_date,
            '{y}': globaldata[i].id
          } [m];
        });
      }
      // check award filter, date range, and query
    } else if (award_arr && award_arr.length) {
      if (award_arr.includes(globaldata[i].award.toUpperCase()) && size_range.includes(globaldata[i].date) && (globaldata[i].firm.toUpperCase().indexOf(input_up) > -1 || globaldata[i].name.toUpperCase().indexOf(input_up) > -1)) {
        r = r + row.replace(/\{[zmgrjy]\}/g, function(m) {
          return {
            '{z}': globaldata[i].report_date,
            '{m}': globaldata[i].firm,
            '{g}': tmpstr,
            '{r}': globaldata[i].date,
            '{j}': globaldata[i].award,
            '{y}': globaldata[i].id
          } [m];
        });
      }
      // check practice filter, date range, and query
    } else if (practice_arr && practice_arr.length) {
      if (practice_arr.some(r => globaldata[i].practice.map(function(x) {
          return x.toUpperCase()
        }).indexOf(r) > -1) && size_range.includes(globaldata[i].date) && (globaldata[i].firm.toUpperCase().indexOf(input_up) > -1 || globaldata[i].name.toUpperCase().indexOf(input_up) > -1)) {
        r = r + row.replace(/\{[zmgrjy]\}/g, function(m) {
          return {
            '{z}': globaldata[i].name,
            '{m}': globaldata[i].firm,
            '{g}': tmpstr,
            '{r}': globaldata[i].date,
            '{j}': globaldata[i].award,
            '{y}': globaldata[i].id
          } [m];
        });
      }
      // check date range and query
    } else if (size_range.includes(globaldata[i].date) && (globaldata[i].firm.toUpperCase().indexOf(input_up) > -1 || globaldata[i].name.toUpperCase().indexOf(input_up) > -1)) {
      r = r + row.replace(/\{[zmgrjy]\}/g, function(m) {
        return {
          '{z}': globaldata[i].name,
          '{m}': globaldata[i].firm,
          '{g}': tmpstr,
          '{r}': globaldata[i].date,
          '{j}': globaldata[i].award,
          '{y}': globaldata[i].id
        } [m];
      });
    }
  };
  $row = $(r);
  $('table')
    .find('.content-row').each(function() {
      this.remove();
    });
  $('table').trigger('update');
  $('table')
    .find('tbody').append($row)
    .trigger('addRows', [$row]);
  $("#data-table tbody tr").on('click', URLRedirect);
  if (document.getElementById("table-content-inner").rows.length == 0) {
    $('table').find('tbody').append($("<tr class='content-row'><td></td><td></td><td>No matches were found.</td><td></td><td></td></tr>"));
  }
  return false;
};

// JavaScript for showing dropdown menus
$('.dropdown-city .dropdown-city-btn').on('click', (event) => {
  $(event.target).siblings('#dropdown-city-content-id')
    .toggleClass('show');
});

$(document).click(function(e) {
  $('.dropdown-city')
    .not($('.dropdown-city').has($(e.target)))
    .children('#dropdown-city-content-id')
    .removeClass('show');
});

$('.dropdown-city .dropdown-city-btn').on('click', (event) => {
  $(event.target).siblings('#dropdown-city-content-id')
    .toggleClass('show');
  $('.dropdown-city').find('#dropdown-city-input').val("");
  /*filterMenuCity();*/
});

$(document).click(function(e) {
  $('.dropdown-city')
    .not($('.dropdown-city').has($(e.target)))
    .children('#dropdown-city-content-id')
    .removeClass('show');
  $('.dropdown-city')
    .not($('.dropdown-city').has($(e.target)))
    .find('#dropdown-city-input').val("");
  /*filterMenuCity();*/
});

$('.dropdown-state .dropdown-state-btn').on('click', (event) => {
  $(event.target).siblings('#dropdown-state-content-id')
    .toggleClass('show');
  $('.dropdown-state').find('#dropdown-state-input').val("");
  /*filterMenuState();*/
});

// $('.dropdown-firm-content').not(":nth-child(1)").on('click', function(e) {
//   $('.dropdown-firm-content')
//     .removeClass('show');
//   $('.dropdown-firm').find('#dropdown-firm-input').val("");
// })

$(document).click(function(e) {
  $('.dropdown-firm')
    .not($('.dropdown-firm').has($(e.target)))
    .children('#dropdown-firm-content-id')
    .removeClass('show');
  $('.dropdown-firm')
    .not($('.dropdown-firm').has($(e.target)))
    .find('#dropdown-firm-input').val("");
  /*filterMenuFirm();*/
});

$('.dropdown p').click(function(e) {
  $('.dropdown')
    .removeClass('show');
})

//JavaScript for searching dropdown menu
/*function filterMenuCity() {
  var input = document.getElementById("dropdown-city-input");
  var input_up = input.value.toUpperCase();
  var div = document.getElementById("dropdown-city-content-id");
  var p = div.getElementsByTagName("p");
  for (let i = 0; i < p.length; i++) {
    txtValue = p[i].textContent || p[i].innerText;
    if (txtValue.toUpperCase().indexOf(input_up) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
};

function filterMenuState() {
  var input = document.getElementById("dropdown-state-input");
  var input_up = input.value.toUpperCase();
  var div = document.getElementById("dropdown-state-content-id");
  var p = div.getElementsByTagName("p");
  for (let i = 0; i < p.length; i++) {
    txtValue = p[i].textContent || p[i].innerText;
    if (txtValue.toUpperCase().indexOf(input_up) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
};

function filterMenuFirm() {
  var input = document.getElementById("dropdown-firm-input");
  var input_up = input.value.toUpperCase();
  var div = document.getElementById("dropdown-firm-content-id");
  var p = div.getElementsByTagName("p");
  for (let i = 0; i < p.length; i++) {
    txtValue = p[i].textContent || p[i].innerText;
    if (txtValue.toUpperCase().indexOf(input_up) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
};
*/
// JavaScript for slider
// https://jqueryui.com/slider/#range
var slide_max, slide_min;
$(function() {
  $("#slider-range").slider({
    range: true,
    min: 2,
    max: 12000,
    values: [2, 12000],
    slide: function(event, ui) {
      slide_max = ui.values[1];
      slide_min = ui.values[0];
      searchFunction();
      var delay = function() {
        var handleIndex = $(ui.handle).index();
        var label = handleIndex == 2 ? '#min' : '#max';
        $(label).html(ui.value).position({
          my: 'center top',
          at: 'center bottom',
          of: ui.handle,
          offset: "0, 11"
        });
      };
      setTimeout(delay, 5);
    }
  });
  slide_max = $("#slider-range").slider("values", 1);
  slide_min = $("#slider-range").slider("values", 0);

  $('#min').html(slide_min).position({
    my: 'center top',
    at: 'center bottom',
    of: $('#slider-range span').eq(0),
    offset: "0, 11"
  });

  $('#max').html(slide_max).position({
    my: 'center top',
    at: 'center bottom',
    of: $('#slider-range span').eq(1),
    offset: "0, 11"
  });
  searchFunction();
});

// Declare variables
var filter_city_arr = [];
var filter_state_arr = [];


// JavaScript for removing from bank by clicking bank filter
function removeFilter() {
  var n = $(this).text().toUpperCase();
  if (filter_city_arr.indexOf(n) > -1) {
    filter_city_arr.splice(filter_city_arr.indexOf(n), 1);
    document.getElementById(n).remove();
    $(".dropdown-city-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  } else if (filter_state_arr.indexOf(n) > -1) {
    filter_state_arr.splice(filter_state_arr.indexOf(n), 1);
    document.getElementById(n).remove();
    $(".dropdown-state-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  }
  searchFunction();
};

// JavaScript for removing all filters
function removeAllFilters() {
  filter_city_arr = [];
  filter_state_arr = [];
  var $slider = $("#slider-range");
  $slider.slider("values", 0, 2);
  $slider.slider("values", 1, 12000);
  slide_min = 2;
  slide_max = 12000;
  $('#min').html(slide_min).position({
    my: 'center top',
    at: 'center bottom',
    of: $('#slider-range span').eq(0),
    offset: "0, 11"
  });

  $('#max').html(slide_max).position({
    my: 'center top',
    at: 'center bottom',
    of: $('#slider-range span').eq(1),
    offset: "0, 11"
  });
  const tag = document.querySelector("#filter-bank-content");
  while (tag.firstChild) {
    tag.removeChild(tag.firstChild);
  }
  $(".dropdown-state-content p i").removeClass("fa-square-o").removeClass("fa-check-square-o").addClass("fa-square-o");
  $(".dropdown-city-content p i").removeClass("fa-square-o").removeClass("fa-check-square-o").addClass("fa-square-o");
  searchFunction();
};

// JavaScript for saving filters and adding to/removing from bank
function city_filter() {
  var n = $(this).text().toUpperCase();
  if (filter_city_arr.indexOf(n) > -1) {
    filter_city_arr.splice(filter_city_arr.indexOf(n), 1);
    document.getElementById(n).remove();
    $(".dropdown-city-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  } else {
    filter_city_arr.push(n);
    const tag = document.getElementById("filter-bank-content")
    const newTag = document.createElement("button");
    newTag.setAttribute('id', n);
    newTag.setAttribute('class', "filter-bank-single");
    if (n != "MVP") {
      var words = n.toLowerCase().split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      words = words.join(" ");
    } else {
      var words = n
    }
    const content = document.createTextNode(words);
    newTag.appendChild(content);
    tag.appendChild(newTag);
    $(".dropdown-city-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  }
  searchFunction();
};

function state_filter() {
  var n = $(this).text().toUpperCase();
  if (filter_state_arr.indexOf(n) > -1) {
    filter_state_arr.splice(filter_state_arr.indexOf(n), 1);
    document.getElementById(n).remove();
    $(".dropdown-state-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  } else {
    filter_state_arr.push(n);
    const tag = document.getElementById("filter-bank-content")
    const newTag = document.createElement("button");
    newTag.setAttribute('id', n);
    newTag.setAttribute('class', "filter-bank-single");
    var words = n.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    words = words.join(" ");
    const content = document.createTextNode(words);
    newTag.appendChild(content);
    tag.appendChild(newTag);
    $(".dropdown-state-content p:icontains('{}')".replace("{}", n)).find("i").toggleClass("fa-square-o fa-check-square-o");
  }
  searchFunction();
};

// event handlers
$(document).ready(function() {
 /* $('#dropdown-city-input').keyup(filterMenuCity);
  $('#dropdown-state-input').keyup(filterMenuState);

  $('#dropdown-firm-input').keyup(filterMenuFirm);*/
  $(".dropdown-state-item").click(state_filter);
  $(".dropdown-city-item").click(city_filter);
  $('.clear-container').on('click', '.clear-all-btn', removeAllFilters);
  $('.filter-bank-content').on('click', '.filter-bank-single', removeFilter);
});

// update svg tags with data viz
function updateLine(d, t) {
  d3.selectAll(".line-chart > *").remove();

  const svg = d3.select('.line-chart');
  const width = window.innerWidth < 768 ? window.innerWidth : 640;
  const height = window.innerWidth < 768 ? 350 : 500;
  const title = "Awards won over time by the firm " + t;
  const xValue = d => d.date;
  const xAxisLabel = "Years";
  const yValue = d => d.count;
  const yAxisLabel = "Number of awards won";
  const colorValue = d => d.award;
  const margin = {
    top: 25,
    right: 50,
    bottom: 50,
    left: 50
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleTime()
    .domain(d3.extent(d, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain([0, 22])
    //Was d3.extent(d, yValue), now constant max for easy comparison between firms,
    //need to programatically change, or check Gibson Dunn's max
    .rangeRound([innerHeight, 0])
    .nice();

  const yAxisTicks = yScale.ticks()
    .filter(tick => Number.isInteger(tick));

  const colorScale = d3.scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range(["#004A8F", "#B01116", "#FAA916", "#6BA292"]);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale)
    .tickValues(yAxisTicks)
    .tickFormat(d3.format('d'));

  const yAxisG = g.append('g').call(yAxis);

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  const tooltip = d3.select('.line-tooltip');

  //y axis
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -40)
    .attr('x', -innerHeight / 2)
    .attr('fill', '#373739')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel)
    .style('font-size', '14px');

  // x axis
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 40)
    .attr('x', innerWidth / 2)
    .attr('fill', '#373739')
    .text(xAxisLabel)
    .style('font-size', '14px');

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));
  //.curve(d3.curveBasis);

  const lastYValue = d =>
    yValue(d.values[d.values.length - 1]);

  const nested = d3.nest()
    .key(colorValue)
    .entries(d);

  colorScale.domain(nested.map(d => d.key));

  // lines
  var linesContainer = svg.append('g')
    .attr('class', 'lines-container')

  const lineGroup = linesContainer.selectAll(".line-group")
    .data(nested)
    .enter()
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('class', d => `line-group ${d.key.toLowerCase().replaceAll(' ', '-').replaceAll('<br>', '-')}`);

  const path = lineGroup.append('path')
    .attr('class', 'line-path')
    .attr('d', d => lineGenerator(d.values))
    .attr('stroke', d => colorScale(d.key))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .style('fill', 'none')
    .style('stroke-width', 5)
    .style('opacity', 0.7);

  // title
  d3.select('.line-wrapper .title')
    .text(title)
    .style('font-size', '18px');
  // g.append('text')
  //   .attr('class', 'title')
  //   .attr('y', -10)
  //   .text(title)
  //   .style('font-size', '18px');

  var bisectDate = d3.bisector(function(d) {
    return xScale(d.date) - margin.left;
  }).left

  var bisectType = d3.bisector(function(d) {
    return yScale(d.count) - (margin.bottom + margin.top);
  }).left

  // interactive logic
  msover = function(data) {
    var x0 = d3.mouse(event.target)[0],
      y0 = d3.mouse(event.target)[1],
      i = bisectDate(data, x0, 1),
      j = bisectType(data, y0, 1)

    var d0 = data[i - 1] !== 'dummy' ? data[i - 1] : data[i],
      d1 = i < data.length ? data[i] : data[i - 1]

    var d = (x0 + margin.left) - xScale(d0.date) > xScale(d1.date) - (x0 + margin.left) ? d1 : d0;

    if (d0 !== d1) {
      var selectDate = new Date(d.date)
      selectDate.setMonth(selectDate.getMonth() - 12)
    } else {
      var selectDate = d.date
    }
    var rawPoints = data.filter(d => d.date.getYear() === selectDate.getYear())
    var linePoints = {}
    rawPoints.forEach(d => linePoints[d.award] = d.count)

    var lineKeys = Object.keys(linePoints)
    var closestKey = lineKeys[0]

    for (let i = 1; i < lineKeys.length; i++) {
      closestKey = Math.abs(y0 - yScale(linePoints[closestKey])) < Math.abs(y0 - yScale(linePoints[lineKeys[i]])) ? closestKey : lineKeys[i]
    }

    d = rawPoints.filter(d => d.award === closestKey)[0]

    tooltip
      .style('opacity', 1)
      .style('background-color', colorScale(d.award));

    var offsetParent = document.querySelector(`.line-wrapper`).offsetParent
    var offY = offsetParent.offsetTop
    var cursorY = 5
    var ch = document.querySelector(`.line-tooltip`).clientHeight
    var cy = d3.event.pageY - offY

    var offX = offsetParent.offsetLeft
    var cursorX = 10
    var cx = d3.event.pageX - offX

    tooltip.html("<p style='margin: 5px 5px 0 5px; padding: 5px 5px 0 5px; font-weight: bold;'>" + d.award + "</p><p style='margin: 0 5px 5px 5px; padding: 0 5px 5px 5px;'>" + d.count + "</p>")
      .style('left', (cx + cursorX) + 'px')
      .style('top', (cy - 28) + 'px');

    var tag = '.' + d.award.toLowerCase().replaceAll(' ', '-').replaceAll('<br>', '-')
    const selection = d3.select(tag).raise();

    // selection.transition()
    //   .delay("20")
    //   .duration('200')
    //   .attr('r', 10)
    //   .style('fill-opacity', 1)
    //   .style('stroke-opacity', 1)
    //   .style('stroke', colorScale(d.award))
    //   .style('stroke-width', "5px")
    //   .style('fill', 'white');

    d3.selectAll('.line-point')
      .attr('r', 0)
      .style('fill-opacity', 0)
      .style('stroke-opacity', 0)
      .style('stroke', 'black')
      .style('stroke-width', 0)

    var circle = d3.select(tag + '-' + d.date.getFullYear())
      .attr('r', 8)
      .style('fill-opacity', 1)
      .style('stroke-opacity', 1)
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .style('fill', colorScale(d.award));
  };

  msout = function() {
    tooltip.style('opacity', 0);

    d3.selectAll('.line-point')
      .attr('r', 0)
      .style('fill-opacity', 0)
      .style('stroke-opacity', 0)
      .style('stroke', 'black')
      .style('stroke-width', 0)
    //
    // selection.transition()
    //   .delay("20")
    //   .duration('200')
    //   .attr('r', 20)
    //   .style('fill-opacity', 0)
    //   .style('stroke-opacity', 0);
  };

  svg.append('rect')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("class", "hover-overlay")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .data([d])
    .on("mouseover mousemove touchstart touchmove", function(data) {
      return msover(data)
    })
    .on("mouseout", msout);

  // points
  lineGroup.selectAll('line-point')
    .data(d => d.values)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.count))
    .attr('r', 20)
    .attr('class', (d) => {
      var award = d.award.toLowerCase().replaceAll(' ', '-').replaceAll('<br>', '-')
      var year = d.date.getFullYear()
      return `${award}-${year} line-point`
    })
    .style('fill-opacity', 0)
    .style('stroke-opacity', 0)
  // events
  // .on('mouseover', msover)
  // .on('mousemove', msmove)
  // .on('mouseout', msout);
}

function updateBar(d, t) {
  d3.selectAll(".bar-chart > *").remove();

  const svg = d3.select('.bar-chart');
  const width = window.innerWidth < 768 ? window.innerWidth : 640;
  const height = window.innerWidth < 768 ? 350 : 500;
  const title = "Top award-winning practice areas for the firm " + t;
  const xValue = d => d.practice;
  const xAxisLabel = "Practice area";
  const yValue = d => d.count;
  const yAxisLabel = "Number of awards won";
  const margin = {
    top: 25,
    right: 50,
    bottom: 50,
    left: 50
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  var countarr = new Array();
  for (let i = 0; i < d.length; i++) {
    countarr.push(d[i].count);
  }

  const xScale = d3.scaleBand()
    .domain(d.map(function(d) {
      return d.practice
    }))
    .range([0, innerWidth])
    .padding(0.2);

  const yScale = d3.scaleLinear()
    .domain([0, 40])
    //Was max, now constant max for easy comparison between firms,
    //need to programatically change, or check Gibson Dunn's max
    .rangeRound([innerHeight, 0])
    .nice();

  const yAxisTicks = yScale.ticks()
    .filter(tick => Number.isInteger(tick));

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const barGroup = svg.selectAll(".bar-group")
    .data(d)
    .enter()
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('class', 'bar-group');

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d => d === '' ? 'N/A' : d)

  const yAxis = d3.axisLeft(yScale)
    .tickValues(yAxisTicks)
    .tickFormat(d3.format('d'));

  const yAxisG = g.append('g').call(yAxis);

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  //y axis
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -40)
    .attr('x', -innerHeight / 2)
    .attr('fill', '#373739')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel)
    .style('font-size', '14px');

  // x axis
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 40)
    .attr('x', innerWidth / 2)
    .attr('fill', '#373739')
    .text(xAxisLabel)
    .style('font-size', '14px');

  const barText = barGroup.append('text')
    .attr('class', 'bar-text')
    .attr("x", function(d) {
      return xScale(d.practice) + (xScale.bandwidth() / 2);
    })
    .attr("y", function(d) {
      return yScale(d.count) - 10;
    })
    .text(function(d) {
      return d.count;
    })
    .style("text-anchor", "middle")
    .style("text-align", "center")
    .style('fill', 'black')
    .style('opacity', 1)
    .style('font-size', '20px');

  // bars
  barGroup.append("rect")
    .attr("class", "bar-path")
    .attr("x", function(d) {
      return xScale(d.practice);
    })
    .attr("y", function(d) {
      return yScale(d.count);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return innerHeight - yScale(d.count);
    })
    .attr("fill", "#654F6F")
    .attr('fill-opacity', 1)
  // .on('mouseover', function(d) {
  //   const selection = d3.select(this).lower();
  //
  //   selection.transition()
  //     .delay("20")
  //     .duration('200')
  //     .attr('fill-opacity', 0.7);
  //
  //   barText.transition()
  //     .delay(30)
  //     .duration(0)
  //     .style('opacity', 1);
  // })
  // .on('mouseout', function(d) {
  //   const selection = d3.select(this).raise();
  //
  //   selection.transition()
  //     .delay("20")
  //     .duration('200')
  //     .attr('fill-opacity', 1);
  //
  //   barText.transition()
  //     .delay(30)
  //     .duration(0)
  //     .style('opacity', 0);
  // });

  // title
  d3.select('.bar-wrapper .title')
    .text(title)
    .style('font-size', '18px');
  // g.append('text')
  //   .attr('class', 'title')
  //   .attr('y', -10)
  //   //.attr('x', width / 2)
  //   .text(title)
  //   .style('font-size', '18px');
}

// on clicking a firm, aggregate data for viz
$(document).ready(function() {
  $(".dropdown-firm-content").on("click", "p", function(event) {
    subset = new Array();
    aggdata = new Array();
    aggbar = new Array();

    for (let i = 0; i < globaldata.length; i++) {
      if (globaldata[i].firm.indexOf($(this).text()) > -1) {
        subset.push(globaldata[i]);
      };
    };

    // line chart aggregation
    for (let i = 2010; i <= 2021; i++) {
      var aggdata_row0 = new Object();
      var aggdata_row1 = new Object();
      var aggdata_row2 = new Object();
      var aggdata_row3 = new Object();
      aggdata_row0['date'] = currentDate;
      aggdata_row1['date'] = currentDate;
      aggdata_row2['date'] = currentDate;
      aggdata_row3['date'] = currentDate;
      var MVP = 0;
      var Titan = 0;
      var PG = 0;
      var RS = 0;
      for (let x = 0; x < subset.length; x++) {
        if (subset[x].date.indexOf(i.toString()) > -1) {
          if (subset[x].award.indexOf("MVP") > -1) {
            MVP += 1;
          } else if (subset[x].award.indexOf("Titans Of The Plaintiffs Bar") > -1) {
            Titan += 1;
          } else if (subset[x].award.indexOf("Rising Stars") > -1) {
            RS += 1;
          } else {
            PG += 1;
          }
        }
      }
      aggdata_row0["award"] = "MVP";
      aggdata_row1["award"] = "Titans of the<br>Plaintiffs Bar";
      aggdata_row2['award'] = "Practice Groups<br>of the Year";
      aggdata_row3['award'] = "Rising Stars";

      aggdata_row0["count"] = MVP;
      aggdata_row1["count"] = Titan;
      aggdata_row2['count'] = PG;
      aggdata_row3['count'] = RS;

      aggdata.push(aggdata_row0);
      aggdata.push(aggdata_row1);
      aggdata.push(aggdata_row2);
      aggdata.push(aggdata_row3);
    };
    updateLine(d = aggdata, t = $(this).text());

    // bar chart aggregation
    seenPractice = new Object();
    for (let i = 0; i < subset.length; i++) {
      for (let x = 0; x < subset[i].practice.length; x++) {
        let tmp1 = subset[i].practice[x];
        if (!Object.keys(seenPractice).includes(tmp1)) {
          seenPractice["{}".replace("{}", tmp1)] = 1;
        } else {
          seenPractice["{}".replace("{}", tmp1)] += 1;
        }
      }
    };
    var sortable = [];
    for (var key in seenPractice) {
      if (seenPractice.hasOwnProperty(key)) {
        sortable.push([key, seenPractice[key]]);
      }
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    var subsort = sortable.slice(0, 5);
    var subsort2 = new Array();
    for (let i = 0; i < subsort.length; i++) {
      var subsort3 = new Object();
      subsort3['practice'] = subsort[i][0];
      subsort3['count'] = subsort[i][1];
      subsort2.push(subsort3);
    };
    updateBar(d = subsort2, t = $(this).text());
  });
});
