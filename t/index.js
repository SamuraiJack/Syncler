var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title       : 'Syncler Test Suite',
    
    runCore         : 'sequential',
    keepResults     : true,
    
//    transparentEx   : true,
//    disableCaching  : false,
    
    preload : [
        "Task.Syncler.Prereq",
        {
            text : "use.paths = " + Harness.prepareINC(INC)
        },
        "Task.Syncler.Test",
        {
            text : "WebSocket.__initialize && WebSocket.__initialize()"
        }
    ]
})


Harness.start(
    '001_sanity.t.js',
    
    '010_replica_basics.t.js',
    
    '015_mutation_attribute.t.js',
    '020_mutation_object.t.js',
    '030_mutation_array.t.js',
    
//    '040_mutation_group.t.js',
    
//    '100_fixtures_kioku.t.js',
    
    '110_fixture_transfer.t.js'
//    ,
//    '115_fixture_transfer2.t.js',
//    
//    '120_fixture_stressload.t.js'
)
