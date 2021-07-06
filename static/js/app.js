// Load in the JSON data
d3.json("../samples.json").then((importedData) => {
  var samplesData = importedData.samples;
  var nameData = importedData.names;
  var metaData = importedData.metadata;

  // Sort the data needed for the bar chart
  var sortSamplesData = samplesData.sort(function(a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });
  
  // DROP DOWN MENU
  // Select the drop down menu
  var dropdownMenu = d3.select("#selDataset");
  
  // assign all the id's to the menu options
  nameData.forEach(id => {
      var idItem = dropdownMenu.append("option");
      idItem.text(id);
  });

    // INIT DATA
  var idOnLoad = 940;
  var onLoadData = sortSamplesData.filter(obj => parseInt(obj.id) === idOnLoad);
  var onLoadDemoData = metaData.filter(obj => obj.id === idOnLoad);

  // Bar Chart
  var xdata = onLoadData[0].sample_values.slice(0,10);
  var yvalues = onLoadData[0].otu_ids.slice(0,10);
  function myFunction(value) {return "UTO " + value;} // add OTU and turn num into string
  var ydata = yvalues.map(myFunction);
  var tdata = onLoadData[0].otu_labels.slice(0,10);

  // Bubble Chart
  var xbubb = onLoadData[0].otu_ids;
  var ybubb = onLoadData[0].sample_values;
  var tbubb = onLoadData[0].otu_labels;
  
  // DISPLAY DATA ON PAGE LOAD
  function init() {
    
    // Demographic Info
    // Select the drop down menu
    var demoInfo = d3.select("#sample-metadata");
    
    // assign demo info to div
    Object.entries(onLoadDemoData[0]).forEach(meta => {
        var demoData = demoInfo.append("p");
        demoData.text(meta);
        console.log(demoData);
    });
    
//Object.entries(onLoadDemoData[0]).forEach(([key, value]) => console.log(`${key}: ${value}`));

    // Bar Chart
    trace = [{
      x: xdata.reverse(),
      y: ydata.reverse(),
      text: tdata.reverse(),
      type: "bar",
      orientation: "h",
      marker: {color: "rgb(121,190,199"}}];
    layout = {
        title: "Top 10 Bacteria Cultures Found",
        };
    Plotly.newPlot("bar", trace, layout);
    
    // Bubble Chart
    var trace1 = {
      x: xbubb,
      y: ybubb,
      text: tbubb,
      mode: 'markers',
      marker: {
        size: ybubb,
        color: xbubb,
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false,
      height: 500,
      width: 750
    };
    
    Plotly.newPlot("bubble", data, layout);
  }
    
  // ON CHANGE 
  // Select the drop down menu
  d3.selectAll("#selDataset").on("change", optionChanged);
    
  // Create a function for the change event
    
  function optionChanged() {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
        
    // check the value is correct
    console.log(selectedOption);
    // buildPlot(selectedOption)
    
    // * * * * * * * * *
    // DEMOGRAPHIC INFO
    // Select the div
    var demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");
 
    // filter the data
    var filterDemoData = metaData.filter(obj => obj.id === parseInt(selectedOption));
    console.log(filterDemoData);

    // assign demo info to div
    Object.entries(filterDemoData[0]).forEach(meta => {
        var demoData = demoInfo.append("p");
        demoData.text(meta);
        console.log(demoData);
    });

    // CHART DATA
    var filterData = sortSamplesData.filter(obj => obj.id === selectedOption);

    // Create BAR CHART data for chosen id
    var xValues = filterData[0].sample_values.slice(0,10);
    var yValues = filterData[0].otu_ids.slice(0,10);
    function myFunction(value) {return "UTO " + value;} // add OTU and turn num into string
    var yEdit = yValues.map(myFunction);
    var textValues = filterData[0].otu_labels.slice(0,10);

    // trace for horizontal chart
    var trace = {
      x: xValues.reverse(),
      y: yEdit.reverse(),
      text: textValues.reverse(),
      type: "bar",
      orientation: "h"
      };
     
    // update the plot
    Plotly.restyle("bar", "x", [trace.x]);
    Plotly.restyle("bar", "y", [trace.y]);
    Plotly.restyle("bar", "text", [trace.text]);
    
    // Create BUBBLE CHART data for chosen id
    var xBubb = filterData[0].otu_ids,
    yBubb = filterData[0].sample_values,
    tBubb = filterData[0].otu_labels;

    var trace1 = {
      x: xBubb,
      y: yBubb,
      text: tBubb,
      mode: 'markers',
      marker: {
        size: yBubb,
        color: xBubb,
      }
    };
    
    // update the plot
    Plotly.restyle("bubble", "x", [trace1.x]);
    Plotly.restyle("bubble", "y", [trace1.y]);
    Plotly.restyle("bubble", "text", [trace1.text]);
    Plotly.restyle("bubble", "marker", [trace1.marker]);


  };

  // Call the function to populate the page on load
  init();

});


//var filterData = sortSamplesData[Object.keys(sortSamplesData)[19]];
