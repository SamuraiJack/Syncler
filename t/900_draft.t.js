// client - A - source

var handle = new KiokuJS.Backend.CouchDB({
    
    traits      : [ Syncler.Client, KiokuJS.Backend.Batch ],
    
    dbURL       : '/5984/db',
    baseURL     : '/8080'
})


// new topic

var replica     = handle.newReplica()

var topic = new Topic({ replica : replica })

replica.setup(topic).andThen(function (replica) {
    
    var topic = replica.getTopic()

    topic.setAttr('yo')
})




// client - B - receiver


// existing topic

handle.newReplica().setup('ABC-123').andThen(function (replica) {
    
    var topic = replica.getTopic()
    
    replica.on('mutate', function () {
    
    })

})





// server


var handle = new KiokuJS.Backend.CouchDB({
    
    trait       : Syncler.Server,
    
    parallelMax : 10,
    
    dbURL       : '/5984/somebase'
})


handle.setupReplica({ topicID : 'ABCD' }).andThen(function (replica) {
    
    var topic = replica.getTopic()

})







replica.write({
    type        : 'Syncler.Mutation.Class.Attribute',
    
    object      : line,
    
    name        : 'x1',
    value       : 10,
    
    consisteny  : 'firstwin'
})

line.setX1(10)


this.line.on('/mutation/class/Syncler.Mutation.Class.Attribute', function (e, mutation) {

})




line.write({
    type            : 'Syncler.Mutation.Class.Attribute',
    
    attributeName   : 'x1',
    newValue        : 10,
    
    consisteny      : 'firstwin',
    
    label           : 'startPointX'
})

line.setX1(10)


this.line.on('/mutation/label/startPointX', function (e, mutation) {

})




line.set('coords', {
    x1          : 10,
    y1          : 15
})

this.line.on('/mutation/label/coords', function (e, mutation) {

})




line.set({
    status      : 'element'
}, {
    label       : 'status',
    consistency : 'lastWin'
})

this.line.on('/mutation/label/coords', function (e, mutation) {

})







replica.on('/create/ShareBoard.Model.Board.Element', this.onNewBoardElement, this)

replica.on('/create/*', this.onNewBoardElement, this, {
    
    filter : function (event, instance) {
        return instance instanceof ShareBoard.Model.Board.Element
    }
})


board.on('new-element', this.onNewBoardElement, this)

replica.on('mutation', function (replica, instance, mutation) {
    
    if ((mutation instanceof Syncler.Vero.Mutation.Create) && (instance instanceof ShareBoard.Model.Board.Element)) me.onNewBoardElement(board, instance)
})


replica.onInstanceMutation('ShareBoard.Model.Board.Element', this.onElementMutation, this)
