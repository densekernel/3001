var tasks = {
    data:[
        {id:1, text:"Planning", start_date:"28-09-2014", duration:14, progress: 0.9, open: true},
        {id:2, text:"Analysing", start_date:"05-10-2014", duration:14, progress: 0.8, open: true },
        {id:3, text:"Development", start_date:"19-10-2014", duration:35, progress: 0.1, open: true},
        {id:4, text:"Contingency Period", start_date:"23-11-2014", duration:7, progress: 0, open: true},
        {id:5, text:"Deployment", start_date:"30-11-2014", duration:7, progress: 0, open: true}
    ],
    links:[
        {id:1, source:1, target:2, type:"0"},
        {id:2, source:2, target:3, type:"0"},
        {id:3, source:3, target:4, type:"0"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};