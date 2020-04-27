console.log('ml5 version:', ml5.version);

let soundClassifier;
let resultP;
let predictionP;
let count1 = 0;
let count2 = 0;
let count3 = 0;
let countnon=0;




function preload() {
  let options = {
    probabilityThreshold: 0
  };
  soundClassifier = ml5.soundClassifier('https://storage.googleapis.com/tm-model/3b3r6MW-s/model.json', options);
}

function setup() {  
  soundClassifier.classify(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.log('wrong');
    console.error(error);
  }

  select('#res').html(`${results[0].label}, ${(results[0].confidence * 100).toFixed(2)}%`);
  
 
  select('#1').html(`${(results.find(s => s.label == "Bronchial Breats").confidence * 100).toFixed(2)} %`);
  select('#1bar').style('width', `${(results.find(s => s.label == "Bronchial Breats").confidence * 100).toFixed(2)}%`);
  select('#2').html(`${(results.find(s => s.label == "Coarse Crackles (Rales) ").confidence * 100).toFixed(2)} %`);
  select('#2bar').style('width', `${(results.find(s => s.label == "Coarse Crackles (Rales) ").confidence * 100).toFixed(2)}%`);
  select('#3').html(`${(results.find(s => s.label == "Fine Crackles (Rales)").confidence * 100).toFixed(2)} %`);
  select('#3bar').style('width', `${(results.find(s => s.label == "Fine Crackles (Rales)").confidence * 100).toFixed(2)}%`);
  select('#4').html(`${(results.find(s => s.label == "Rhonchi ").confidence * 100).toFixed(2)} %`);
  select('#4bar').style('width', `${(results.find(s => s.label == "Rhonchi ").confidence * 100).toFixed(2)}%`);
  select('#5').html(`${(results.find(s => s.label == "Wheezing (expiratory) ").confidence * 100).toFixed(2)} %`);
  select('#5bar').style('width', `${(results.find(s => s.label == "Wheezing (expiratory) ").confidence * 100).toFixed(2)}%`);
  select('#6').html(`${(results.find(s => s.label == "Normal").confidence * 100).toFixed(2)} %`);
  select('#6bar').style('width', `${(results.find(s => s.label == "Normal").confidence * 100).toFixed(2)}%`);
  select('#7').html(`${(results.find(s => s.label == "Stridor").confidence * 100).toFixed(2)} %`);
  select('#7bar').style('width', `${(results.find(s => s.label == "Stridor").confidence * 100).toFixed(2)}%`);



  if (results[0].label == 'Wheezing (expiratory) ') {
    
    count1 = count1 + 1;
  
  } else if (results[0].label == 'Fine Crackles (Rales)' && results[1].label == 'Bronchial Breats') {
   
    count2 = count2 + 1;
   
  } else if (results[1].label == 'Fine Crackles (Rales)' && results[0].label == 'Bronchial Breats') {
   
    count2 = count2 + 1;
   
  } else if (results[0].label == 'Coarse Crackles (Rales) ' && results[1].label == 'Rhonchi ') {
  
    count3 = count3 + 1;
    
  } else if (results[1].label == 'Coarse Crackles (Rales) ' && results[0].label == 'Rhonchi ') {
   
    count3 = count3 + 1;
  
  } else {
	  
	countnon=countnon+1;
  }

  //end
  
    if(countnon>99 || count1>99 || count2>99 || count3>99){
			countnon=0;
			count1=0;
			count2=0;
			count3=0;
		}

  }
  
  
  
  
google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
 
  
  
  function drawChart() {

        var datadraw = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Not Covid-19', countnon],
		  ['Early Covid-19', count1],
          ['Mild Covid-19', count2],
          ['Extreme Covid-19', count3]
        ]);

        var optionsdraw = {
          width: 500, 
         height: 500,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

        chart.draw(datadraw, optionsdraw);

      
		
        setInterval(function() {
		  datadraw.setValue(0, 1, countnon);
          datadraw.setValue(1, 1, count1);
		  datadraw.setValue(2, 1, count2);
		  datadraw.setValue(3, 1, count3);
          chart.draw(datadraw, optionsdraw);
        }, 1000);
      }
	  
	  
	  
