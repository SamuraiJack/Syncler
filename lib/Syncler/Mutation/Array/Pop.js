Class('Syncler.Mutation.Array.Pop', {
    
    does    : 'Syncler.Mutation',
    
    use     : 'Syncler.Mutation.Void',
    
    
    has : {
        popedValue      : null,
        
        label           : 'pop'
    },
    
    
    methods : {
        
        merge : function () {
            return new Syncler.Mutation.Void({ insteadOf : this })
        },
        
        
        realize : function (replica) {
            var object      = this.getObjectFrom(replica)
            
            this.popedValue = object.value.pop()
        },
        
        
        deRealize : function (replica) {
            var object      = this.getObjectFrom(replica)
            
            object.value.push(this.popedValue)
            
            delete this.popedValue
        },
        
        
        savePrecondition : function (replica) {
        },
        
        
        checkPrecondition : function (replica) {
            if (!this.hasLiveInstanceOf(replica, Syncler.Composite.Array)) return false
            
            var object      = this.getObjectFrom(replica)
            var array       = object.value
            
            return array.length && array[ array.length - 1 ] === this.popedValue
        }
    }
})
