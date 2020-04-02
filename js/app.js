/*
Copyright 2020 Rishabh Anand, Raphael Lee, Dr. Sebastian Maurer-Stroh, Suma Tiruvayipati. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================
*/

// pscp -p 22 -pw openrishabha -C:\Users\rishabha\Desktop\BII\COVID-Visualisation\data\FASTA\corona2020_2561gens.fasta rishabha@ssh.bii.a-star.edu.sg:/afs/bii.a-star.edu.sg/dept/mendel/METHODS/HEIDI/sarscov2/data/
// mafft --thread -1 --nomemsave corona2020_2561gens.fasta > corona2020_2561gens_aligned.fasta

document.addEventListener("DOMContentLoaded", () => {
    console.log("App loaded.")

    var phylocanvas = new Phylocanvas.Tree('tree-viewer');
    var newickTree = "((((((((France_IDF0571_islP1:0.000001,France_IDF0515_isl:0.000001)26:0.000001,France_IDF0515:0.000001)50:0.000067,Singapore_3:0.000001)7:0.000001,Chongqing_IVDC_CQ_001:0.000001)2:0.000001,Hong_Kong_VM20026565_1:0.000034)3:0.000001,Shandong_IVDC_SD_001:0.000201)8:0.000033,(((Germany_BavPat1:0.000101,(Wuhan_IVDC_HB_envF13_21:0.000067,(Wuhan_IVDC_HB_envF13:0.000070,(France_RA739:0.000139,Wuhan_IVDC_HB_envF13_20:0.000001)11:0.000001)1:0.000031)1:0.000017)1:0.000017,(France_IDF0626:0.000034,((C16_:0.000033,(Japan_OS_20_07_1:0.000001,(C1_:0.000100,(Thailand_74:0.000001,(C10_:0.000001,(USA_CA6:0.000001,((C7_:0.000001,(((Nepal_61:0.000001,USA_MA1:0.000101)22:0.000032,USA_IL1:0.000001)3:0.000001,((C3_:0.000001,(Singapore_1:0.000034,(Jiangsu_JSU01:0.000100,(C11_:0.000033,(C4_:0.000067,(((Jiangsu_JS03:0.000001,((Taiwan_CGMH_CGU_01:0.000001,(C12_:0.000201,(Hefei_2:0.000001,((Singapore_6:0.000001,Singapore_2:0.000001)41:0.000034,(Cambodia_0012:0.000034,(C17_:0.000001,((C19_:0.000001,(Japan_NA_20_05_1:0.000001,((((Sydney_2:0.000067,(((Zhejiang_WZ_02:0.000001,(Thailand_61:0.000001,((China_WH09:0.000347,Jiangxi_IVDC_JX_002:0.000034)0:0.000001,Finland_1:0.000001)0:0.000001)0:0.000001)0:0.000001,(Jiangsu_IVDC_JS_001:0.000001,Wuhan_IVDC_HB_envF54:0.000716)0:0.000033)0:0.000001,Guangdong_20SF201:0.000001)0:0.000001)0:0.000001,Wuhan_WIV04:0.000001)0:0.000001,Hangzhou_HZ_1:0.000001)0:0.000001,((((((((((France_IDF0386_islP3:0.000001,France_IDF0386_islP1:0.000001)9:0.000001,France_IDF0372_isl:0.000001)5:0.000001,France_IDF0372:0.000001)8:0.000001,France_IDF0373:0.000001)33:0.000034,((Singapore_10:0.000001,Singapore_9:0.000001)26:0.000001,Singapore_5:0.000001)45:0.000033)2:0.000001,(((((Sydney_3:0.000001,Taiwan_2:0.000099)10:0.000001,Singapore_8:0.000034)3:0.000001,Italy_INMI1_isl:0.000034)0:0.000001,Hong_Kong_VM20001988_1:0.000034)0:0.000001,((Wuhan_WH05:0.000071,Italy_INMI1_cs:0.000032)14:0.000001,England_03:0.000101)10:0.000001)7:0.000001)1:0.000001,(Australia_VIC01:0.000067,Sweden_01:0.000201)4:0.000001)0:0.000001,Singapore_7:0.000033)0:0.000001,South_Korea_SNU01:0.000268)2:0.000001,USA_CA2:0.000034)26:0.000033)0:0.000001)0:0.000001)0:0.000001,Taiwan_4:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001,Taiwan_NTU02:0.000067)0:0.000001)0:0.000001,C13_:0.000001)0:0.000001,Japan_AI:0.000067)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001,((((Singapore_11:0.000034,USA_WI1:0.000001)10:0.000001,Fujian_13:0.000033)4:0.000001,Foshan_20SF211:0.000001)6:0.000001,Foshan_20SF210:0.000001)31:0.000033)0:0.000001)0:0.000001)0:0.000001,(C14_:0.001832,(USA_CA8:0.000001,C5_:0.000034)43:0.000032)3:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001)0:0.000001,Zhejiang_WZ_01:0.000067)0:0.000001)0:0.000001)0:0.000001,C6_:0.000067)0:0.000001)0:0.000001,(((((C2_:0.000067,(C8_:0.000067,(((((Guangdong_20SF014:0.000001,Shenzhen_SZTH_004:0.000268)30:0.000033,((Foshan_20SF207:0.000034,(USA_CA3:0.000001,USA_CA4:0.000001)58:0.000067)9:0.000001,Shenzhen_SZTH_003:0.000033)8:0.000033)1:0.000001,((((Guangdong_20SF028:0.000001,USA_CA5:0.000034)6:0.000001,Guangdong_20SF040:0.000001)6:0.000001,Guangdong_20SF174:0.000001)12:0.000001,Jiangsu_JS02:0.000134)29:0.000033)0:0.000001,(Guangdong_20SF206:0.000001,Japan_KY_V_029:0.000067)59:0.000067)0:0.000001,Hangzhou_HZCDC0001:0.000001)0:0.000001)0:0.000001)0:0.000001,((((Guangdong_20SF012:0.000001,((((Japan_TY_WK_501:0.000001,Japan_TY_WK_012:0.000034)23:0.000001,Japan_TY_WK_521:0.000034)39:0.000034,(Shenzhen_HKU_SZ_005:0.000067,Shenzhen_SZTH_001:0.000873)14:0.000001)0:0.000001,((((USA_TX1:0.000134,Guangdong_20SF013:0.000001)3:0.000001,Guangdong_20SF025:0.000001)1:0.000001,Shenzhen_HKU_SZ_002:0.000001)1:0.000001,Shenzhen_SZTH_002:0.000001)0:0.000001)0:0.000001)8:0.000033,(USA_AZ1:0.000033,Yunnan_IVDC_YN_003:0.000001)34:0.000033)2:0.000001,(((England_2:0.000034,England_1:0.000001)65:0.000067,(((Korea_KCDC03:0.000067,Belgium_GHB_03021:0.000017)20:0.000017,(Australia_NSW01:0.000001,(Taiwan_NTU01:0.000001,C20_:0.000001)5:0.000001)3:0.000001)2:0.000030,(((((Australia_QLD04:0.000001,USA_CA7:0.000001)11:0.000001,Australia_QLD03:0.000034)4:0.000001,(Australia_QLD02:0.000067,Australia_QLD01:0.000001)16:0.000001)28:0.000001,Singapore_4:0.000001)34:0.000067,Taiwan_3:0.000017)2:0.000015)2:0.000001)1:0.000001,(((((Henan_IVDC_HeN_002:0.000758,Chongqing_YC01:0.000066)34:0.000001,(USA_WA1_A12:0.000001,Fujian_8:0.000001)6:0.000001)3:0.000001,USA_WA1_F6:0.000001)5:0.000001,USA_WA1:0.000001)34:0.000033,((USA_CA1:0.000067,(USA_IL2:0.000067,(Sichuan_IVDC_SC_001:0.000034,Beijing_IVDC_BJ_005:0.000369)62:0.000001)7:0.000001)11:0.000001,(Hong_Kong_VM20001061_1:0.000094,BetaCoV/Vietnam/VR03-38142/2020|EPI_ISL_408668|2020-01-24:0.000129)44:0.000012)43:0.000100)3:0.000001)0:0.000001)0:0.000001,Shanghai_IVDC_BJ_001:0.000849)8:0.000067)0:0.000001,C9_:0.000034)0:0.000001,Chongqing_ZX01:0.000001)0:0.000001,C15_:0.000067)0:0.000001,C18_:0.000001)"
    phylocanvas.setTreeType("circular")
    phylocanvas.load(newickTree)  
    phylocanvas.setZoom(3)
    phylocanvas.offsetx = 400

    var allLeaves = []
    for (var i in phylocanvas.leaves) {
        allLeaves.push(phylocanvas.leaves[i].id)
    }

    phylocanvas.draw()

    MicroModal.init();

    var darkBtn = document.getElementById("ms-dark")
    var lightBtn = document.getElementById("ms-light")
    var satelliteBtn = document.getElementById("ms-satellite")
    var streetBtn = document.getElementById("ms-street")
    var edgeToggle = document.getElementById("switch-checkbox")
    var edgesOn = 0

    var clusterInfoSection = document.getElementById("clusterText")
    var clusterTable = document.getElementById("myTable")

    var globeContainer = document.getElementById("globalArea")
    var controller = new GIO.Controller(globeContainer)

    var globeConfig = {
        control: {
            stats: false,
            disableUnmentioned: false,
            lightenMentioned: true,
            inOnly: false,
            outOnly: false,
            initCountry: "CN",
            halo: true
        },
        color: {
                surface: "#54a0ff",
                selected: "#10ac84",
                in: "#feca57",
                out: "#ff6b6b",
                halo: 0xFFFFFF,
                background: "#dfe6e9"
        },
        brightness: {
                ocean: 0.5,
                mentioned: 0.5,
                related: 0.5
        }
    }

    controller.configure(globeConfig)

    // controller.addData([{
    //                         "e": "CN",
    //                         "i": "US",
    //                         "v": 2935070
    //                     },
    //                     {
    //                         "e": "CN",
    //                         "i": "RU",
    //                         "v": 6408452
    //                     },
    //                     {
    //                         "e": "JP",
    //                         "i": "CA",
    //                         "v": 1912811
    //                     }
    //                 ])
    controller.init()

    /*
    streets-v9
    satellite-streets-v9
    light-v9
    dark-v9
    outdoors-v9
    */
    // L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     id: 'light-v9',
    //     accessToken: 'pk.eyJ1IjoicmlzaGFiaDE2IiwiYSI6ImNqaTM3MHQxMDA1cW0zcW80cXg4eHhqcGQifQ.yYhLp6B08oCzE502Kxy-pw'
    // }).addTo(map);

    // map._initPathRoot()

    // var svg = d3.select("#map").select("svg")
    // var circleGroup = svg.append("g")

    // // Changing map style
    // darkBtn.addEventListener("click", () => {
    //     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //         id: 'dark-v9',
    //         accessToken: 'pk.eyJ1IjoicmlzaGFiaDE2IiwiYSI6ImNqaTM3MHQxMDA1cW0zcW80cXg4eHhqcGQifQ.yYhLp6B08oCzE502Kxy-pw'
    //     }).addTo(map);

    //     map._initPathRoot()
    // })

    // lightBtn.addEventListener("click", () => {
    //     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //         id: 'light-v9',
    //         accessToken: 'pk.eyJ1IjoicmlzaGFiaDE2IiwiYSI6ImNqaTM3MHQxMDA1cW0zcW80cXg4eHhqcGQifQ.yYhLp6B08oCzE502Kxy-pw'
    //     }).addTo(map);

    //     map._initPathRoot()
    // })

    // satelliteBtn.addEventListener("click", () => {
    //     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //         id: 'satellite-streets-v9',
    //         accessToken: 'pk.eyJ1IjoicmlzaGFiaDE2IiwiYSI6ImNqaTM3MHQxMDA1cW0zcW80cXg4eHhqcGQifQ.yYhLp6B08oCzE502Kxy-pw'
    //     }).addTo(map);

    //     map._initPathRoot()
    // })

    // streetBtn.addEventListener("click", () => {
    //     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //         id: 'streets-v9',
    //         accessToken: 'pk.eyJ1IjoicmlzaGFiaDE2IiwiYSI6ImNqaTM3MHQxMDA1cW0zcW80cXg4eHhqcGQifQ.yYhLp6B08oCzE502Kxy-pw'
    //     }).addTo(map);

    //     map._initPathRoot()
    // })

    var virusName2treesampleXvalues = {};
    var virusName2treesampleYvalues = {};
    var virusName2clusternum = {};
    var virusName2date = {};
    var virusName2covv_subm_lab = {};
    var virusName2age = {};
    var virusName2gender = {};
    var virusName2color = {};

    var colorrange = ["#1b70fc", "#feca57", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9", "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", "#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", "#678275", "#c5a121", "#a978ba", "#ee534e", "#d24506", "#59c3fa", "#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", "#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf", "#d77cd1", "#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", "#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", "#bb59d8", "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", "#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0", "#20c773", "#8b696d", "#78762d", "#e154c6", "#40835f", "#d73656", "#1afd5c", "#c4f546", "#3d88d8", "#bd3896", "#1397a3", "#f940a5", "#66aeff", "#d097e7", "#fe6ef9", "#d86507", "#8b900a", "#d47270", "#e8ac48", "#cf7c97", "#cebb11", "#718a90", "#e78139", "#ff7463", "#bea1fd"];
    var colorScale = d3.scale.ordinal().range(colorrange);

    var x = d3.scale.linear()
        .domain([0, 20])
        .range([0, 500])
        .clamp(true);

    var targetHandleValue = 0

    var brush = d3.svg.brush()
        .x(x)
        .extent([targetHandleValue, targetHandleValue]); 

    // Parse JSON file, create charts, draw markers on map 
    d3.json('../data/JSON/corona2020_2561gens.json', function(error, data) {
        if (error) {
            console.log(error)
        };

        var allRecords = data.data;

        var sampleRecords = [];
        // var pwNucDiffData = allRecords[0].pwNucDiff;

        allRecords.forEach(function(d) {
            if (d.covv_host == "Human") {
                sampleRecords.push(d);
            }
        })

        var strStrain2pwdiff = {};
        var strStrain2geodist = {};

        // pwNucDiffData.forEach(function(d) {
        //     if (strStrain2pwdiff[d.source] === undefined) {
        //         strStrain2pwdiff[d.source] = {};
        //         strStrain2geodist[d.source] = {};
        //         if (strStrain2pwdiff[d.source][d.target] === undefined) {
        //             strStrain2pwdiff[d.source][d.target] = {};
        //             strStrain2pwdiff[d.source][d.target] = d.nuc_diff;
        //             strStrain2geodist[d.source][d.target] = {};
        //             strStrain2geodist[d.source][d.target] = d.geo_dist_K;
        //         }
        //     } else {
        //         if (strStrain2pwdiff[d.source][d.target] === undefined) {
        //             strStrain2pwdiff[d.source][d.target] = {};
        //             strStrain2pwdiff[d.source][d.target] = d.nuc_diff;
        //             strStrain2geodist[d.source][d.target] = {};
        //             strStrain2geodist[d.source][d.target] = d.geo_dist_K;
        //         } else {
        //             strStrain2pwdiff[d.source][d.target] = d.nuc_diff;
        //             strStrain2geodist[d.source][d.target] = d.geo_dist_K;
        //         }
        //     }

        //     if (strStrain2pwdiff[d.target] === undefined) {
        //         strStrain2pwdiff[d.target] = {};
        //         strStrain2geodist[d.target] = {};
        //         if (strStrain2pwdiff[d.target][d.source] === undefined) {
        //             strStrain2pwdiff[d.target][d.source] = {};
        //             strStrain2pwdiff[d.target][d.source] = d.nuc_diff;
        //             strStrain2geodist[d.target][d.source] = {};
        //             strStrain2geodist[d.target][d.source] = d.geo_dist_K;
        //         }
        //     } else {
        //         if (strStrain2pwdiff[d.target][d.source] === undefined) {
        //             strStrain2pwdiff[d.target][d.source] = {};
        //             strStrain2pwdiff[d.target][d.source] = d.nuc_diff;
        //             strStrain2geodist[d.target][d.source] = {};
        //             strStrain2geodist[d.target][d.source] = d.geo_dist_K;
        //         } else {
        //             strStrain2pwdiff[d.target][d.source] = d.nuc_diff;
        //             strStrain2geodist[d.target][d.source] = d.geo_dist_K;
        //         }
        //     }
        // });

        brush.on("brush", brushed);

        var sliderThreshControl = d3.select("#nucDiffThreshSlider").append("svg")
            .attr("class", "slider-svg")
            .attr("height", 50)
            .attr("width", 550);

        sliderThreshControl.append("g")
            .attr("class", "x axis slider")
            .attr("transform", "translate(" + 20 + ",10)")
            .call(d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(function(d) {
                    return d;
                })
                .tickSize(5)
                .tickPadding(20))
            .select(".domain")
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "halo");

        var slider = sliderThreshControl.append("g")
            .attr("class", "slider")
            .call(brush);
        slider.selectAll(".extent,.resize").remove();

        var handle = slider.append("circle")
            .attr("class", "handle");
        handle.attr("transform", "translate(" + 20 + ",10)")
            .attr("r", 5);
        slider
            .call(brush.extent([targetHandleValue, targetHandleValue]))
            .call(brush.event);

        var NucDiffTitle = d3.select(".nucDiffTitle");
        NucDiffTitle.on("mouseover", function(d) {
                var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                tooltip.html("samples with the same nucleotide difference<br>from the original strain will have the same color.")
                    .style('top', d3.event.pageY - 10 + 'px')
                    .style('left', d3.event.pageX + 10 + 'px')
                    .style("opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(".tooltip").remove()
            });

        var fullDateFormat = d3.time.format('%Y-%m-%d');
        var yearMonthFormat = d3.time.format('%Y-%m');
        var yearFormat = d3.time.format('%Y');

        _.each(sampleRecords, function(d) {
            if (d.covv_collection_date.length == 7) { // YYYY-MM
                d.covv_collection_date = d.covv_collection_date + "-01"
            } else if (d.covv_collection_date.length == 4) { // YYYY
                d.covv_collection_date = d.covv_collection_date + "-01-01"
            }

            d.collection_date_fullFormat = fullDateFormat.parse(d.covv_collection_date);
            d.collection_date_yearMonth = yearMonthFormat(d.collection_date_fullFormat);
            d.collection_date_year = yearFormat(d.collection_date_fullFormat);

            if (virusName2date[d.covv_virus_name] === undefined) {
                virusName2date[d.covv_virus_name] = {};
                virusName2date[d.covv_virus_name] = d.covv_collection_date;
            }
            if (virusName2covv_subm_lab[d.covv_virus_name] === undefined) {
                virusName2covv_subm_lab[d.covv_virus_name] = {};
                virusName2covv_subm_lab[d.covv_virus_name] = d.covv_subm_lab;
            }
            if (virusName2age[d.covv_virus_name] === undefined) {
                virusName2age[d.covv_virus_name] = {};
                virusName2age[d.covv_virus_name] = d.covv_patient_age;
            }
            if (virusName2gender[d.covv_virus_name] === undefined) {
                virusName2gender[d.covv_virus_name] = {};
                virusName2gender[d.covv_virus_name] = d.covv_gender;
            }
        });

        var ndx = crossfilter(sampleRecords);

        var yearDim = ndx.dimension(function(d) {
                return d.collection_date_year
            }),
            yearMonthDim = ndx.dimension(function(d) {
                return d.collection_date_fullFormat
            }),
            ageDim = ndx.dimension(dc.pluck('covv_patient_age')),
            genderDim = ndx.dimension(dc.pluck('covv_gender')),
            allDim = ndx.dimension(function(d) {
                return d.collection_date_fullFormat;
            });

        var all = ndx.groupAll();

        var countPerYearGroup = yearDim.group().reduceCount(),
            countYearMonthGroup = yearMonthDim.group().reduceCount()

        var ageGroup = ageDim.group().reduceCount(),
            genderGroup = genderDim.group().reduceCount()


        var yearChart = dc.pieChart('#chart-ring-year'),
            yearMonthChart = dc.barChart('#chart-bar-yearMonth'),
            dataCount = dc.dataCount('#data-count'),
            ageBarChart = dc.barChart('#chart-bar-age'),
            genderChart = dc.pieChart('#chart-ring-gender'),
            dataTable = dc.dataTable('#data-table');

        var yearMonthDomainObject = {};
        var yearMonthDomainArray = [];
        var minYearMonth;
        var maxYearMonth;

        _.each(allDim.bottom(Infinity), function(d, i) {
            if (i === 0) {
                minYearMonth = d.collection_date_fullFormat;
            }
            if (yearMonthDomainObject[d.collection_date_fullFormat] === undefined) {
                yearMonthDomainObject[d.collection_date_fullFormat] = 1;
                yearMonthDomainArray.push(d.collection_date_fullFormat);
            } else {
                yearMonthDomainObject[d.collection_date_fullFormat] += 1;
            }
            maxYearMonth = d.collection_date_fullFormat;
        });

        yearChart
            .width(250)
            .height(150)
            .dimension(yearDim)
            .group(countPerYearGroup)
            .ordinalColors(['#1dd1a1', '#feca57', '#5f27cd', '#54a0ff', '#222f3e', '#00d2d3', '#ff6b6b'])
            .innerRadius(20);

        genderChart
            .width(250)
            .height(150)
            .dimension(genderDim)
            .group(genderGroup)
            .ordinalColors(['#1dd1a1', '#feca57', '#5f27cd', '#54a0ff', '#222f3e', '#00d2d3', '#ff6b6b'])
            .innerRadius(20);

        ageBarChart
            .width(550)
            .height(180)
            .dimension(ageDim)
            .group(ageGroup)
            .x(d3.scale.linear().domain([1, 100]))
            .elasticY(false)
            .centerBar(true)
            .barPadding(0.7)
            .xUnits(function() {
                return 55;
            })
            .xAxisLabel('Age')
            .yAxisLabel('Count')
            .margins({
                top: 10,
                right: 20,
                bottom: 50,
                left: 50
            });

        yearMonthChart
            .width(550)
            .height(180)
            .x(d3.time.scale().domain([minYearMonth, maxYearMonth]))
            .dimension(yearMonthDim)
            .group(countYearMonthGroup)
            .elasticY(false)
            .elasticX(true)
            .centerBar(true)
            .xUnits(function() {
                return 25;
            }).xAxisPadding(20)
            .barPadding(0.2)
            .outerPadding(5)
            .xAxisLabel('Month')
            .yAxisLabel('Count')
            .margins({
                top: 10,
                right: 20,
                bottom: 50,
                left: 50
            }).xAxis().ticks(12);

        dataCount
            .dimension(ndx)
            .group(all);

        function getNoisyCoords(lat, lng, kms) {
            var rad_Earth = 6378.16;
            var one_degree = (2 * Math.PI * rad_Earth) / 360;
            var one_km = 1 / one_degree;

            function randomInRange(from, to) {
                return (Math.random() * (to - from) + from).toFixed(7 || 10) * 1;
            }

            var newLat = randomInRange(
                lat - (kms * one_km),
                lat + (kms * one_km),
            )

            var newLng = randomInRange(
                lng - (kms * one_km),
                lng + (kms * one_km),
            )

            return [newLat, newLng]
        }

        // _.each(allDim.bottom(Infinity), function(d, i) {
        //     var coords = getNoisyCoords(d.covv_coords['lat'], d.covv_coords['lng'], 2)
        //     d.LatLng = new L.LatLng(coords[0], coords[1])
        // });

        var treeCircleGroup;
        dataTable
            .dimension(allDim)
            .group(function(d) {
                return 'dc.js insists on putting a row here so I remove it using JS';
            })
            .size(200)
            .columns([])
            .on('renderlet', function(table) {

                d3.selectAll(".sample").remove();
                d3.selectAll(".treesample").remove();

                // var allSamples = circleGroup.selectAll(".sample")
                //     .data(allDim.bottom(Infinity))
                //     .enter().append("circle")
                //     .style("stroke", "black")
                //     .style("opacity", .6)
                //     .attr("class", "sample")
                //     .attr("r", 5);

                // brushed_init();

                // allSamples.on("mouseover", function(d) {
                //         var tooltip = d3.select("body").append("div")
                //             .attr("class", "tooltip")
                //             .style("opacity", 0);
                //         var locDate = d.covv_collection_date;
                //         var locVirusName = d.covv_virus_name;
                //         var locClinicHosp = d.covv_subm_lab;
                //         var locAge = d.covv_patient_age;
                //         var locGender = d.covv_gender;
                //         var locLocation = d.covv_location
                //         locLocation = locLocation.split(" / ")
                //         locLocation = locLocation.reverse()
                //         locLocation = locLocation.join(", ")

                //         tooltip.html("<strong>Virus Name:</strong> " + locVirusName +
                //                 "<br><strong>Date:</strong> " + locDate +
                //                 "<br><strong>Location:</strong> " + locClinicHosp +
                //                 "<br><strong>Age:</strong> " + locAge +
                //                 "<br><strong>Gender:</strong> " + locGender +
                //                 "<br><strong>Location:</strong> " + locLocation
                //             )
                //             .style('top', d3.event.pageY - 10 + 'px')
                //             .style('left', d3.event.pageX + 10 + 'px')
                //             .style("opacity", 1);
                //     })
                //     .on("mouseout", function() {
                //         d3.select(".tooltip").remove()
                //     });

                // map.on("viewreset", circlePosUpdate);
                // circlePosUpdate();

                function circlePosUpdate() {
                    allSamples.attr("transform", function(d) {
                        return "translate(" +
                            map.latLngToLayerPoint(d.LatLng).x + "," +
                            map.latLngToLayerPoint(d.LatLng).y +
                            ")";
                    })
                }
            });

        d3.selectAll('a#all').on('click', function() {
            phylocanvas.redrawOriginalTree()
            phylocanvas.setZoom(3)
            phylocanvas.offsetx = 400
            phylocanvas.draw()
            dc.filterAll();
            dc.renderAll();
        });

        d3.selectAll('a#year').on('click', function() {
            yearChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#yearMonth').on('click', function() {
            yearMonthChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#gender').on('click', function() {
            genderChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#barAge').on('click', function() {
            ageBarChart.filterAll();
            dc.redrawAll();
        });

        dc.renderAll();

        function brushed_init() {
            targetHandleValue = brush.extent()[0];
            handle.attr("cx", x(targetHandleValue));
            // clusterSamples();
        }

        function brushed() {
            if (d3.event.sourceEvent) {
                targetHandleValue = x.invert(d3.mouse(this)[0]).toFixed(0);
                handle.attr("cx", x(targetHandleValue));
            }
            // clusterSamples(edgesOn);
        }

        function createClusterCard(allSamples, idx, parent) {
            var clusterCard = document.createElement("div")
            clusterCard.classList += "cluster-aggr"

            var clusterColor = document.createElement("div")
            clusterColor.classList += "caggr-color"
            var key = Object.keys(allSamples)[0]
            clusterColor.style.backgroundColor = virusName2color[key]

            var clusterMeta = document.createElement("div")
            clusterMeta.classList += "caggr-meta"

            var clusterTitle = document.createElement("p")
            clusterTitle.classList += "caggr-idx"
            clusterTitle.innerHTML = "Cluster " + idx

            var clusterCount = document.createElement("div")
            clusterCount.classList += "caggr-count"
            if (Object.keys(allSamples).length === 1) {
                clusterCount.innerHTML = Object.keys(allSamples).length + " sample"
            } else {
                clusterCount.innerHTML = Object.keys(allSamples).length + " samples"
            }

            clusterMeta.appendChild(clusterTitle)
            clusterMeta.appendChild(clusterCount)

            clusterCard.appendChild(clusterColor)
            clusterCard.appendChild(clusterMeta)

            clusterCard.addEventListener("click", () => {
                showTable(allSamples, idx, virusName2color[key])
            })

            clusterColor.addEventListener('click', () => {
                showTable(allSamples, idx, virusName2color[key])
            })

            clusterMeta.addEventListener('click', () => {
                showTable(allSamples, idx, virusName2color[key])
            })

            return clusterCard
        }

        function addToTable(name, sampleInfo) {
            sampleInfo = sampleInfo[1]
            var date = sampleInfo.covv_collection_date
            var submLab = sampleInfo.covv_subm_lab
            var location = sampleInfo.covv_location.split(" / ").reverse().join(", ")
            var accesionID = sampleInfo.covv_accession_id
            accesionCode = accesionID.split("_")[2]
            accesionID = `<a target="blank_" href="https://platform.gisaid.org/epi3/start/EPI_ISL/${accesionCode}">${accesionID}</a>`
            var age = sampleInfo.covv_patient_age
            var gender = sampleInfo.covv_gender
            var allInfo = [name, accesionID, location, date, age, gender, submLab]

            var tr = document.createElement("tr")
            for (field in allInfo) {
                var td = document.createElement("td")
                td.innerHTML = allInfo[field]
                tr.appendChild(td)
            }
            clusterTable.appendChild(tr)
        }

        function showTable(samples, clusterIdx, color) {
            for (var i in allLeaves) {
                phylocanvas.branches[allLeaves[i]].collapsed = true
                phylocanvas.branches[allLeaves[i]].color = "#black"
            }

            clusterTable.innerHTML = ""
            clusterTable.innerHTML += `<tr class="header">
                                        <th>Virus Name</th>
                                        <th>Accession ID</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Submission Lab</th>
                                       </tr>`
            document.getElementById("modal-1-title").innerHTML = "Cluster " + clusterIdx
            MicroModal.show('modal-1');

            for (var key in samples) {
                var info = samples[key]
                addToTable(key, info)
                var procKey = key.split("/")
                procKey = procKey[1] + '_' + procKey[2]
                for (var i in allLeaves) {
                    if (allLeaves[i].includes(procKey)) {
                        phylocanvas.branches[allLeaves[i]].collapsed = false
                        phylocanvas.branches[allLeaves[i]].colour = color
                    }
                }
            }

            // Render cluster on Map
            if (edgesOn === 1) {
                clearMap(map)
                removeLines()
                console.log("Adding lines")
                var allPoints = []
                for (var i in samples) {
                    allPoints.push([samples[i][1].covv_coords['lat'], samples[i][1].covv_coords['lng']])
                }
                var pathline = L.polyline(allPoints)
                pathline.setStyle({
                    'weight': 2,
                    'color': color
                })
                pathline.addTo(map)
            } else if (edgesOn === 0) {
                removeLines()
                clearMap(map)
            }
        }

        function clearMap(m) {
            for(i in m._layers) {
                if (m._layers[i]._path != undefined) {
                    try {
                        m.removeLayer(m._layers[i]);
                    }
                    catch(e) {
                        console.log("problem with " + e + m._layers[i]);
                    }
                }
            }
        }

        function clusterSamples() {
            var clusterNum = 0;
            var strainInCluster = {};
            var clusternum2StrainsObject = {};
            var currSamplesOnMap = d3.selectAll(".sample");
            var clusterList = []

            _.each(currSamplesOnMap[0], function(d) {
                var refStr = d.__data__.covv_virus_name;

                if (strainInCluster[refStr] === undefined) {
                    clusterNum++;
                    strainInCluster[refStr] = 1;
                    if (clusternum2StrainsObject[clusterNum] === undefined) {
                        clusternum2StrainsObject[clusterNum] = {};
                    }
                    if (clusternum2StrainsObject[clusterNum][refStr] === undefined) {
                        clusternum2StrainsObject[clusterNum][refStr] = {};
                        clusternum2StrainsObject[clusterNum][refStr] = [1, d.__data__];
                    }
                    var foundNewClusterMember = 0;
                    FINDNEWCLUSTERMEMBER: while (true) {
                        for (var strInCluster in clusternum2StrainsObject[clusterNum]) {
                            _.each(currSamplesOnMap[0], function(sampleData) {
                                var varStr = sampleData.__data__.covv_virus_name;
                                if ((strInCluster !== varStr) && (strainInCluster[varStr] === undefined)) {
                                    if (strStrain2pwdiff[refStr][varStr] <= targetHandleValue) {
                                        clusternum2StrainsObject[clusterNum][varStr] = {};
                                        clusternum2StrainsObject[clusterNum][varStr] = [1, sampleData.__data__];
                                        strainInCluster[varStr] = {};
                                        strainInCluster[varStr] = 1;
                                        foundNewClusterMember = 1;
                                    }
                                }
                            });
                            if (foundNewClusterMember == 1) {
                                foundNewClusterMember = 0;
                                continue FINDNEWCLUSTERMEMBER;
                            }
                        }
                        break;
                    }
                }
            });

            currSamplesOnMap.style("fill", function(d) {
                for (var key in clusternum2StrainsObject) {
                    if (clusternum2StrainsObject.hasOwnProperty(key)) {
                        if (clusternum2StrainsObject[key][d.covv_virus_name] !== undefined) {
                            if (virusName2clusternum[d.covv_virus_name] === undefined) {
                                virusName2clusternum[d.covv_virus_name] = {};
                                virusName2clusternum[d.covv_virus_name] = key;
                            } else {
                                virusName2clusternum[d.covv_virus_name] = key;
                            }
                            virusName2color[d.covv_virus_name] = colorScale(key);
                            return colorScale(key);
                        }
                    }
                }
            });

            clusterInfoSection.innerHTML = ""
            var curClusterCount = 1
            for (var cIdx in clusternum2StrainsObject) {
                var curCluster = clusternum2StrainsObject[cIdx]
                var clusterCard = createClusterCard(curCluster, curClusterCount, clusterInfoSection)
                clusterList.push([Object.keys(curCluster).length, clusterCard])
                curClusterCount += 1
            }

            if (clusterList.length > 1) {
                clusterList = clusterList.sort((a, b) => (a[0] < b[0]) ? 1 : -1)
                for (var i in clusterList) {
                    clusterInfoSection.appendChild(clusterList[i][1])
                }
            }
            
            // Update number of clusters
            document.getElementById("num-clusters").innerHTML = (curClusterCount - 1) + " clusters"

            function drawLines() {
                clearMap(map)
                d3.selectAll(".links").remove();
                for (var cluster in clusternum2StrainsObject) {
                    if (Object.keys(clusternum2StrainsObject[cluster]).length > 1) {
                        var firstSampleInCluster;
                        var prevSampleLatLngInCluster;
                        var varStrainCounter = 0;
                        for (var variableStr in clusternum2StrainsObject[cluster]) {
                            varStrainCounter++;
                            _.each(currSamplesOnMap[0], function(d) {
                                var varStr = d.__data__.covv_virus_name;
                                if (variableStr === varStr) {
                                    if (varStrainCounter === 1) {
                                        firstSampleInCluster = d.__data__.LatLng;
                                    } else if (varStrainCounter > 1) { // draw line between varStr & prevSampleLatLngInCluster
                                        circleGroup.append("line")
                                            .style("stroke", virusName2color[varStr])
                                            .attr("class", "links")
                                            .attr("x1", map.latLngToLayerPoint(prevSampleLatLngInCluster).x)
                                            .attr("y1", map.latLngToLayerPoint(prevSampleLatLngInCluster).y)
                                            .attr("x2", map.latLngToLayerPoint(d.__data__.LatLng).x)
                                            .attr("y2", map.latLngToLayerPoint(d.__data__.LatLng).y);
                                    }
                                    prevSampleLatLngInCluster = d.__data__.LatLng;
                                }
                            });
                        }
                        // Now draw line between last variableStr and firstSampleInCluster
                        circleGroup.append("line")
                            .style("stroke", "#ff6b6b")
                            .style("weight", 10)
                            .attr("class", "links")
                            .attr("x1", map.latLngToLayerPoint(prevSampleLatLngInCluster).x)
                            .attr("y1", map.latLngToLayerPoint(prevSampleLatLngInCluster).y)
                            .attr("x2", map.latLngToLayerPoint(firstSampleInCluster).x)
                            .attr("y2", map.latLngToLayerPoint(firstSampleInCluster).y);
                    }
                }
            }

            if (edgesOn === 1) {
                clearMap(map)
                drawLines()
            } else if (edgesOn === 0) {
                removeLines()
                clearMap(map)
            }
        }

        function removeLines() {
            d3.selectAll(".links").remove();
            clearMap(map)
        }

        edgeToggle.addEventListener("change", () => {
            if (edgesOn === 0) {
                edgesOn = 1
                controller.addData()
                // clusterSamples()
            } else if (edgesOn === 1) {
                edgesOn = 0
                controller.clearData()
                // clusterSamples()
            }
        })
    });
})