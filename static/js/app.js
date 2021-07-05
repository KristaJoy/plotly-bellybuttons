// Load in the JSON data
d3.json("../samples.json").then((importedData) => {
  var samplesData = importedData.samples;
  var nameData = importedData.names;
  var metaData = importedData.metadata;

  // Sort the data needed for the bar chart
  sortSamplesData = samplesData.sort(function(a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });
  
  console.log(sortSamplesData);
  
  // DROP DOWN MENU
  // Select the drop down menu
  var dropdownMenu = d3.select("#selDataset");
  // assign all the id's to the menu options
  nameData.forEach(id => {
      var idItem = dropdownMenu.append("option");
      idItem.text(id);
  });

  // INIT DATA
  var xdata = [163, 126, 113, 78, 71, 51, 50, 47, 40, 40],
  ydata = ["OTU 1167", "OTU 2859", "OTU 482", "OTU 2264", "OTU 41", "OTU 1189", "OTU 352", "OTU 189", "OTU 2318", "OTU 1977"],
  tdata = ["Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas",
  "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria", 
  "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria",
  "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", 
  "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus",
  "Bacteria;Firmicutes;Clostridia;Clostridiales"];

  function init() {
    bardata = [{
      x: xdata.reverse(),
      y: ydata.reverse(),
      text: tdata.reverse(),
      type: "bar",
      orientation: "h"}];
    layout = {
        title: "Top 10 Bacteria Cultures Found",
        };
    Plotly.newPlot("bar", bardata, layout);
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
    };

  init();

});


// // Create data for chosen id
// barData = sortSamplesData[Object.keys(samplesData)[19]];

// // Grab the values for the h-bar chart
// var xValues = barData.sample_values.slice(0,10);
// var yValues = barData.otu_ids.slice(0,10);
// function myFunction(value) {return "UTO " + value;} // add OTU and turn num into string
// var yEdit = yValues.map(myFunction);
// var textValues = barData.otu_labels.slice(0,10);

// // Trace for horizontal chart
// var trace = {
//   x: xValues.reverse(),
//   y: yEdit.reverse(),
//   text: textValues.reverse(),
//   type: "bar",
//   orientation: "h"
//   };
   
// // data and layouts
// var chartData = [trace];
// var layout = {
//   title: "Top 10 Bacteria Cultures Found",
// };
  
// // Plot the chart
// Plotly.newPlot("bar", chartData, layout);
