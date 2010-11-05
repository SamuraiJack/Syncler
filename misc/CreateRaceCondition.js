Class('Syncler.Test.Fixture.CreateRaceCondition', {
    
    use     : 'Syncler.Test.TestClass',
    
    isa     : 'KiokuJS.Test.Fixture',
    
    
    has : {
        sort                    : 10
    },

    
    continued : {
        
        methods : {
            
            populate : function (handle, t) {
                //======================================================================================================================================================================================================================================================
                t.diag('Syncler.Test.Fixture.CreateRaceCondition - Sanity')
                
                t.ok(Syncler.Vero.Meta, "Syncler.Vero.Meta is here")
                t.ok(Syncler.Test.TestClass, 'Syncler.Test.TestClass is here')
                
                var CONTINUE = this.getCONTINUE()
                
                //======================================================================================================================================================================================================================================================
                t.diag('Establishing source channel')
                
                
                var test = new Syncler.Test.TestClass({
                    channel : handle.newChannel(),
                    
                    attr2   : 'attr2',
                    attr3   : 'attr3'
                })
                
                
                handle.setupChannel({ topic : test }).andThen(function (channelSource) {
                    
                    var handle2 = new KiokuJS.Backend.CouchDB({
                        trait   : [ Syncler.Client, KiokuJS.Backend.Batch ],
                        
                        baseURL     : 'http://local/' + handle.__port__,
                        dbURL       : handle.dbURL,
                        
                        fayeClient  : handle.fayeClient
                    })
                    
                    //======================================================================================================================================================================================================================================================
                    t.diag('Establishing receiver channel')
                    
                    handle2.setupChannel({ topicID : test.getTopicID() }).andThen(function (channelReceiver) {
                        
                        t.ok(channelReceiver, 'Receiver channel has been created')
                        
//                        //======================================================================================================================================================================================================================================================
//                        t.diag('Checking topic')
//                        
//                        var topic = channelReceiver.getTopic()
//                        
//
//                        t.isa_ok(topic, Syncler.Test.TestClass, 'Channel has topic set')
//                        
//                        t.ok(topic.channel == channelReceiver, 'Topic refer to correct channel')
//                        
//                        t.ok(topic.VERO, 'Topic has VERO instance attached')
//                        
//                        t.ok(topic.attr2 == 'attr2' && topic.attr3 == 'attr3', 'Topic has correct attribute values')
//                        
//                        // delay to give faye time to subscribe
//                        setTimeout(function () {
//                            
//                            //======================================================================================================================================================================================================================================================
//                            t.diag('Mutation in the source channel')
//                        
//                            var foo = { foo : 'bar' }
//                            
//                            test.setAttr1(foo)
//                            test.setAttr2([ foo, 'baz', foo ])
//                            test.setAttr3('attr3-mutated')
//                            
//                            channelSource.commit()
//                            
//                        }, 1000)
//                        
//                        
//                        channelReceiver.on('update-packet', function (channel, mutations) {
//                            t.pass('Reached `update-packet` handler of the receiver channel')
//                            
//                            instanceMutated = true
//                            
//                            t.ok(mutations.length == 3, 'Correct length of mutation packet')
//                            
//                            var instance = channel.getTopic()
//                            
//                            var attr1 = instance.attr1
//                            var attr2 = instance.attr2
//                            var attr3 = instance.attr3
//                            
//                            t.ok(attr1.foo == 'bar', 'Correct value for `attr1`')
//                            t.ok(attr2.length == 3, 'Correct length for `attr2`')
//                            t.ok(attr3 == 'attr3-mutated', 'Correct value for `attr3`')
//                            
//                            t.ok(attr2[0] == attr1 && attr2[2] == attr1, 'Correct value for `attr2` #1')
//                            t.ok(attr2[1] == 'baz', 'Correct value for `attr2` #2')
//                            
//                            //======================================================================================================================================================================================================================================================
//                            t.diag('Mutation in the receiver channel')
//                            
//                            instance.setAttr3('attr3-from-receiver-channel')
//                            
//                            channelReceiver.commit()
//                        })
//                        
//                        
//                        channelSource.on('update-packet', function (channel, mutations) {
//                            t.pass('Reached `update-packet` handler of the source channel')
//                            
//                            instanceMutatedBack = true
//                            
//                            t.ok(test.attr3 == 'attr3-from-receiver-channel', 'Correct value for `attr3`')
//                            
//                            t.ok(test.attr1.foo == 'bar', "Other attributes didn't change")
//                        })
                        
                    })
                })
                
                var instanceMutated     = false
                var instanceMutatedBack = false
            
                // delay to keep the <iframe> of the test, otherwise XHR will stop working
                setTimeout(function () {
                    
//                    t.ok(instanceMutated, 'Instance has been mutated')
//                    t.ok(instanceMutatedBack, 'Instance has been mutated back to the 1st channel')
                    
                    CONTINUE()
                    
                }, 3000)
            },
            // eof populate
            
            
            verify : function (handle, t) {
                this.CONTINUE()
            }
            // eof verify
        }
    }

})