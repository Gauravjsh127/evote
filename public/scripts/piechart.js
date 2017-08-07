/**
 * Created by lherstix on 28.07.2015.
 */
$(function () {

    // Radialize the colors
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    // Build the chart
    $('#assetpie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Asset Classes'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {

                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
        series: [{
            name: "Brands",
            data: [
                {name: "Investment", y: 50.00},

                {name: "Bank Account", y: 40.00},
                {name: "Others", y: 10}

            ]
        }]
    });
    $('#industrypie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Industry of Investment'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {

            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: "Brands",
            data: [
                {name: "Automobile", y: 56.33},

                {name: "Solar", y: 10.38},
                {name: "Financial", y: 4.77},
                {name: "Energy", y: 0.91},
                {name: "IT", y: 0.2}
            ]
        }]
    });
    $('#regionpie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Region of Investment'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {

            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: "Brands",
            data: [
                {name: "German", y: 9.0},
                {name: "Europe (exkluding Germany)",y: 55.0,},
                {name: "Africa", y: 11.0},
                {name: "USA", y: 15.0},
                {name: "Asia", y: 5.},
                {name: "South America", y: 5.0}
            ]
        }]
    });

});